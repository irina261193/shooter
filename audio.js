/* Prepared synthetic recordings first; browser voices are a fallback. */
class LessonSpeech {
 constructor({manifest={},onStatus=()=>{},enabled=()=>true,AudioClass=globalThis.Audio,synth=globalThis.speechSynthesis,Utterance=globalThis.SpeechSynthesisUtterance}={}){Object.assign(this,{manifest,onStatus,enabled,AudioClass,synth,Utterance});this.serial=0;this.timers=new Set();this.media=null;this.utterance=null;this.lastText='';this.status='idle';}
 key(text){return String(text).replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();}
 later(fn,ms){const timer=setTimeout(()=>{this.timers.delete(timer);fn();},ms);this.timers.add(timer);return timer;}
 clearTimers(){for(const t of this.timers)clearTimeout(t);this.timers.clear();}
 statusChange(state,message='',mode=''){this.status=state;this.onStatus({state,message,mode});}
 stop(){this.serial++;this.clearTimers();if(this.media){this.media.onended=this.media.onerror=this.media.onplaying=this.media.onwaiting=null;this.media.pause();}try{this.synth?.cancel();}catch{}this.utterance=null;this.statusChange('idle');}
 play(text,slow=false){
  text=String(text||'').trim();this.stop();if(!text)return;this.lastText=text;
  if(!this.enabled()){this.statusChange('error','Канал «Речь» выключен. Включите его вверху.');return;}
  const id=this.serial,entry=this.manifest[this.key(text)];this.statusChange('loading','Подготовка звука…');
  if(!entry||!this.AudioClass){this.browser(text,slow,id);return;}
  if(!this.media)this.media=new this.AudioClass();const media=this.media;let fallback=false;
  const recover=error=>{if(id!==this.serial||fallback)return;fallback=true;this.clearTimers();media.onended=media.onerror=media.onplaying=media.onwaiting=null;media.pause();if(error?.name==='NotAllowedError'){this.statusChange('error','Браузер заблокировал звук. Нажмите LISTEN ещё раз или «Проверить звук».');return;}this.browser(text,slow,id);};
  media.preload='auto';media.volume=1;media.defaultPlaybackRate=slow?.75:1;media.playbackRate=slow?.75:1;media.preservesPitch=true;
  media.onplaying=()=>{if(id===this.serial){this.clearTimers();this.statusChange('playing','Готовая озвучка · синтез','file');}};
  media.onended=()=>{if(id===this.serial){this.clearTimers();this.statusChange('idle','Реплика завершена.','file');}};
  media.onerror=()=>recover(media.error);
  media.onwaiting=()=>{if(id===this.serial){this.clearTimers();this.later(()=>recover(new Error('Audio stalled')),12000);}};
  media.src=typeof entry==='string'?entry:entry.file;media.playbackRate=slow?.75:1;this.later(()=>recover(new Error('Audio did not start')),10000);
  try{media.play()?.catch(recover);}catch(error){recover(error);}
 }
 browser(text,slow,id){
  if(id!==this.serial)return;this.clearTimers();
  if(!this.synth||!this.Utterance){this.statusChange('error','Аудиофайл недоступен, синтез речи не поддерживается. Проверьте интернет и повторите LISTEN.');return;}
  this.statusChange('loading','Загружаю резервный английский голос…','browser');let tries=0;
  const findVoice=()=>{
   if(id!==this.serial)return;let voices=[];try{voices=this.synth.getVoices().filter(v=>/^en([-_]|$)/i.test(v.lang));}catch{}
   if(!voices.length){if(tries++<15){this.later(findVoice,200);return;}this.statusChange('error','Аудиофайл не загрузился, английский голос недоступен. Проверьте соединение, затем нажмите LISTEN. Реплику также может прочитать учитель.');return;}
   const voice=voices.find(v=>v.lang==='en-GB'&&v.localService)||voices.find(v=>v.lang==='en-GB')||voices.find(v=>v.localService)||voices[0];
   const chunks=text.match(/[^.!?]+[.!?]?/g)||[text];let index=0;
   const send=()=>{
    if(id!==this.serial)return;if(index>=chunks.length){this.utterance=null;this.statusChange('idle','Реплика завершена.','browser');return;}
    const chunk=chunks[index++].trim();let retry=0;
    const attempt=()=>{
     if(id!==this.serial)return;this.clearTimers();let started=false;
     const u=new this.Utterance(chunk);this.utterance=u;u.voice=voice;u.lang=voice.lang;u.rate=slow?.65:.88;u.volume=1;
     const fail=()=>{if(id!==this.serial)return;this.clearTimers();u.onstart=u.onend=u.onerror=null;try{this.synth.cancel();}catch{}if(retry++===0)this.later(attempt,150);else{this.utterance=null;this.statusChange('error','Резервный голос не ответил. Нажмите LISTEN для повтора или «Проверить звук».');}};
     u.onstart=()=>{if(id!==this.serial)return;started=true;this.clearTimers();this.statusChange('playing','Резервный синтез браузера','browser');this.later(fail,Math.max(20000,chunk.length*170));};
     u.onend=()=>{if(id===this.serial){this.clearTimers();send();}};u.onerror=()=>{if(id===this.serial)fail();};
     this.later(()=>{if(!started)fail();},4500);
     try{this.synth.resume?.();this.synth.speak(u);}catch{fail();}
    };attempt();
   };send();
  };findVoice();
 }
}
if(typeof module!=='undefined')module.exports={LessonSpeech};

