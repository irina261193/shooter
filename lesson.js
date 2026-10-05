
/* Author-created classroom scaffolding, in addition to the original textbook tasks. */
const LESSON_BLOCKS=[
{id:'warmup',segments:['login'],name:'AGENT LOGIN',phase:'Разминка',start:0,minutes:5,steps:['1 мин: аватар, имя и возраст.','2 мин: назвать три игрушки и их количество.','2 мин: задать учителю вопросы и пригласить поиграть.']},
{id:'radio',segments:['radio'],name:'RADIO ROOM',phase:'Presentation',start:5,minutes:6,steps:['2 мин: слушаем what / where / who без текста.','2 мин: открываем текст, читаем вместе.','2 мин: повторяем самостоятельно, объясняем смысл вопросов.']},
{id:'inventory',segments:['inventory'],name:'INVENTORY LAB',phase:'Presentation',start:11,minutes:6,steps:['2 мин: один предмет → несколько; -s / -es, без a/an.','2 мин: we / you / they are на примере команды.','2 мин: вопрос, отрицание, сокращения; ученик даёт свой пример.']},
{id:'signal',segments:['listen','sounds'],name:'RADIO SIGNAL',phase:'Practice',start:17,minutes:7,steps:['3 мин: шесть вопросов на слух, CHECK, прочитать ответ.','3 мин: шесть окончаний /s/, /z/, /ɪz/; сказать слова.','1 мин: ученик сам задаёт два знакомых вопроса.']},
{id:'files',segments:['team'],name:'TEAM FILES',phase:'Practice',start:24,minutes:6,steps:['3 мин: три пропуска my / your / her, читать полные фразы.','2 мин: читать выбранные строки о семье и профессиях.','1 мин: своя фраза с my или her.']},
{id:'break',segments:['break'],name:'TRAINING BREAK',phase:'Practice · пауза',start:30,minutes:3,steps:['1 мин: выполнить три команды робота.','1 мин: ученик командует учителем.','1 мин: поменять порядок команд и вернуться к экрану. Бег только на месте.']},
{id:'code',segments:['code'],name:'CODE ROOM',phase:'Practice',start:33,minutes:7,steps:['3 мин: собрать пять разных слов из букв.','2 мин: три слова на слух → написать и прочитать.','2 мин: тетрадь и проверка. Кроссворды и остальные слова — резерв вместо части блока или для быстрого ученика.']},
{id:'grammar',segments:['grammar'],name:'GRAMMAR GATE',phase:'Practice',start:40,minutes:5,steps:['2 мин: утверждение, вопрос, отрицание.','2 мин: сокращения и короткие ответы.','1 мин: исправить сообщение и задать свой вопрос.']},
{id:'production',segments:['production'],name:'BUILD YOUR TEAM',phase:'Production',start:45,minutes:10,steps:['2 мин: выбрать команду, придумать историю.','3 мин: рассказ с опорами, затем без опор.','3 мин: информационный обмен — три вопроса учителю.','2 мин: новая деталь команды, рассказ и приглашение.']},
{id:'final',segments:['final'],name:'FINAL TRANSMISSION',phase:'Production',start:55,minutes:5,steps:['1 мин: самостоятельно прочитать вопрос.','1 мин: назвать группы предметов.','2 мин: рассказать о команде и задать вопрос.','1 мин: обратная связь и награда.']}
];
const EXTRA_SPEAKING=[
['Radio interviewer','Задай учителю вопросы об имени, стране и игрушках. Затем ответь на его вопросы.'],
['Memory inventory','Посмотри на три группы предметов. Закрой глаза и назови их во множественном числе.'],
['One → many','Учитель называет один предмет, ты — несколько: a cat, a dog, a box, a doll, a bus. Поменяйтесь ролями.'],
['Who is missing?','Опиши члена своей семьи, не называя его. Учитель угадывает: Who is he / she?'],
['True or false?','Скажи три предложения о команде. Одно — неверное. Учитель задаёт вопросы, чтобы найти его.'],
['Question master','Преврати два утверждения с They are в вопросы, попроси учителя ответить.'],
['Secret toys','Мысленно выбери три игрушки. Учитель задаёт вопросы, затем поменяйтесь ролями.'],
['New country','Команда переехала. Расскажи, откуда они теперь и какие у них игрушки.'],
['Family message','Скажи две фразы о семье и профессиях с my и her.'],
['Invite the teacher','Пригласи поиграть, побегать на месте и попрыгать. Учитель выполняет твои команды.']
];
const ROUNDS={
login:[['Introduce yourself','Назови имя и возраст. Спроси имя учителя.'],['Your toy collection','Расскажи минимум о трёх игрушках и их количестве.'],['Ask the teacher','Задай учителю два вопроса об игрушках.']],
radio:[['Listen first','Послушай карточку со скрытым текстом.'],['Read together','Открой текст. Прочитай две фразы вместе с учителем.'],['Your turn','Повтори самостоятельно и объясни смысл вопроса.']],
inventory:[['Look and listen','Рассмотри пример и послушай.'],['Try together','Повтори пример и измени одну часть вместе с учителем.'],['Explain the code','Объясни правило и скажи свой пример.']],
break:[['Follow ECHO','Выполни три команды. Бег — на месте.'],['You are the leader','Сам дай учителю три команды по-английски.']],
production:[['Choose a team','Выбери двух персонажей, профессии, страну и игрушки.'],['Plan your message','Продумай рассказ о каждом персонаже. Не читай готовый текст.']]
};
for(const t of TASKS){
 if(ROUNDS[t.segment]&&t.type!=='exchange')t.rounds=ROUNDS[t.segment];
 if(t.type==='oral'&&t.segment==='team')t.rounds=[['Read aloud','Прочитай 2–3 предложения.'],['Make it yours','Скажи свою фразу о семье или профессии.']];
 if(['listen','sounds','team'].includes(t.segment)&&t.type==='choice')t.readback=true;
 if(t.type==='spell')t.readback=true;
 if(t.type==='exchange')t.rounds=[['Ask and discover','Задай три вопроса о секретной команде. Учитель отмечает их в панели.'],['Check and invite','Сравни догадки с карточками и пригласи учителя поиграть.']];
}
TASKS.find(t=>t.id==='production-1').teacher='Авторская адаптация, 2 минуты. Выберите карточки и дайте ученику придумать содержание. Полный самостоятельный рассказ будет на следующем экране.';
function insertBefore(id,item){TASKS.splice(TASKS.findIndex(t=>t.id===id),0,{author:true,...item});}
insertBefore('production-1',{id:'grammar-repair',segment:'grammar',type:'build',title:'Repair the message',prompt:'Исправь сообщение: «Они не пилоты».',answer:'They are not pilots.',tokens:['They','are','not','pilots.'],source:'67-rule',hint:'После they используем are, затем not.',teacher:'Авторское задание. После сборки скажите утверждение и вопрос с теми же словами.'});
insertBefore('production-1',{id:'grammar-your-question',segment:'grammar',type:'oral',title:'Your own question',prompt:'Задай учителю свой вопрос с Are you…? Выслушай ответ.',source:'67-rule',teacher:'Авторское задание. Ученик сам выбирает профессию; помогайте только после первой попытки.'});
insertBefore('production-2',{id:'production-story',segment:'production',type:'briefing',title:'Tell the story',prompt:'Расскажи о команде. Теперь ты ведёшь передачу!',hint:'They are…|They are from…|He/She has got…|I’ve got…|I like to play with…',rounds:[['Rehearse','С опорами скажи 4–5 фраз о персонажах и своих игрушках.'],['Independent transmission','Скрой опоры и повтори рассказ самостоятельно. Ответь на уточняющий вопрос учителя.']],teacher:'Авторское задание, 3 минуты. Дайте 30 секунд на подготовку. Обсудите 1–2 ошибки после рассказа; не исправляйте каждое слово во время речи.'});
insertBefore('final-1',{id:'production-new-detail',segment:'production',type:'briefing',title:'A new mission',prompt:'Измени одну деталь команды. Расскажи о ней и пригласи поиграть.',challenge:true,rounds:[['Change the story','Измени страну или игрушку одного персонажа.'],['Speak without a script','Скажи 3–4 фразы о новой команде, задай вопрос и пригласи поиграть.']],teacher:'Авторское задание, 2 минуты. Перенос языка в новую ситуацию, без готового текста и вариантов ответа.'});
function blockFor(t=current()){return LESSON_BLOCKS.find(b=>b.segments.includes(t.segment));}
function initLesson(){state.lesson={total:0,byBlock:{},plan:false,extra:0,...state.lesson,running:false};}
function clockText(seconds){const n=Math.max(0,Math.floor(seconds));return Math.floor(n/60).toString().padStart(2,'0')+':'+(n%60).toString().padStart(2,'0');}
function lessonUI(){
 const b=blockFor(),l=state.lesson;
 return '<section class="lesson-clock" aria-label="План урока на 60 минут"><div><b>УРОК · 60 МИНУТ</b><span data-lesson-clock>'+clockText(l.total)+' / 60:00</span></div><div class="lesson-current"><b>'+b.phase+'</b><span>'+b.start+'–'+(b.start+b.minutes)+' мин · '+b.name+'</span><small data-block-clock>В блоке '+clockText(l.byBlock[b.id]||0)+' / '+b.minutes+':00</small></div><div class="clock-actions">'+button('lesson-toggle',l.running?'Ⅱ Пауза':'▶ Начать / продолжить','secondary')+button('lesson-plan',l.plan?'Скрыть план':'План PPP','quiet')+button('lesson-new','Новый урок','quiet')+'</div></section>'+
 (l.plan?'<section class="lesson-plan"><h2>Маршрут на 60 минут</h2><p>5 мин разминка · 12 мин Presentation · 28 мин Practice с движением · 15 мин Production. Таймер ничего не закрывает и не переключает.</p><div class="plan-blocks">'+LESSON_BLOCKS.map(x=>'<article class="'+(b.id===x.id?'current':'')+'"><h3>'+x.start+'–'+(x.start+x.minutes)+' · '+x.name+'</h3><b>'+x.phase+'</b><ul>'+x.steps.map(s=>'<li>'+s+'</li>').join('')+'</ul>'+button('lesson-jump','Перейти к блоку →','secondary','data-block="'+x.id+'"')+'</article>').join('')+'</div><p>Если ученик идёт быстрее — используйте устные миссии. Если медленнее — отключите бонусы; сохраните время на самостоятельный рассказ.</p>'+button('lesson-extra','Другая устная миссия · 1–2 минуты','secondary')+'<div class="extra-mission"><b>'+EXTRA_SPEAKING[l.extra%EXTRA_SPEAKING.length][0]+'</b><p>'+EXTRA_SPEAKING[l.extra%EXTRA_SPEAKING.length][1]+'</p><small>Авторское задание; проверяет учитель, без дополнительного жетона.</small></div></section>':'');
}
function guidedReady(t,p){return !t.rounds||t.rounds.every((_,i)=>p.rounds?.[i]);}
function guidedUI(t,p){
 if(!t.rounds)return '';const i=t.rounds.findIndex((_,i)=>!p.rounds?.[i]);
 return '<section class="guided-round"><span>МИКРОМИССИЯ '+(i<0?t.rounds.length:i+1)+' / '+t.rounds.length+'</span>'+(i<0?'<h3>Готово к подтверждению учителя</h3>':'<h3>'+t.rounds[i][0]+'</h3><p>'+t.rounds[i][1]+'</p>'+button('round-done','Шаг выполнен →','secondary'))+'<div class="round-dots">'+t.rounds.map((_,j)=>'<i class="'+(p.rounds?.[j]?'done':'')+'"></i>').join('')+'</div></section>';
}
function lessonTeacherUI(){const b=blockFor();return '<details class="lesson-method"><summary>Как провести этот блок · '+b.minutes+' мин</summary><ul>'+b.steps.map(s=>'<li>'+s+'</li>').join('')+'</ul><p>После CHECK ребёнок читает ответ вслух; нажмите «Учитель: прочитано». На устных экранах пройдите микромиссии и подтвердите ответ. Скорость не оценивается.</p>'+button('sound-test','Включить и проверить речь','secondary')+button('stop','■ Стоп','secondary')+'<p>Основная озвучка — подготовленные файлы синтеза Microsoft Zira (английский, США); для aunt задано /ɑːnt/. Это не аудиотреки учебника. Резерв — английский голос браузера. <span data-voice-status>Готово к запуску.</span></p></details>';}
function lessonAction(action,b){
 const l=state.lesson,p=progress(),t=current();
 switch(action){
 case'lesson-toggle':tickLesson();l.running=!l.running;lessonTickAt=Date.now();break;
 case'lesson-plan':l.plan=!l.plan;break;
 case'lesson-new':if(!window.confirm('Начать новый урок? Ответы, жетоны и таймер будут сброшены. Настройки звука сохранятся.'))return true;stopSpeech();state={...structuredClone(DEFAULT),speech:state.speech,effects:state.effects,music:state.music,name:state.name,avatar:state.avatar,bonus:false};initLesson();state.lesson.running=true;lessonTickAt=Date.now();break;
 case'lesson-jump':{const block=LESSON_BLOCKS.find(x=>x.id===b.dataset.block);if(block)go(TASKS.find(t=>block.segments.includes(t.segment)).id);return true;}
 case'lesson-extra':l.extra=(l.extra+1)%EXTRA_SPEAKING.length;break;
 case'round-done':{const i=t.rounds.findIndex((_,i)=>!p.rounds?.[i]);if(i>=0){p.rounds=p.rounds||{};p.rounds[i]=true;if(t.id==='production-story'&&i===0)p.supports=false;}break;}
 case'readback':if(p.awaitingReadback){p.readBack=true;p.awaitingReadback=false;finish();}return true;
 case'sound-test':state.speech=true;save();render();speak('Ready, agent? Let’s do this!');return true;
 default:return false;
 }save();render();return true;
}
let lessonTickAt=Date.now();
function tickLesson(){const now=Date.now(),delta=Math.max(0,(now-lessonTickAt)/1000);lessonTickAt=now;if(!state.lesson?.running)return;const l=state.lesson,b=blockFor();l.total+=delta;l.byBlock[b.id]=(l.byBlock[b.id]||0)+delta;save();const total=document.querySelector('[data-lesson-clock]'),block=document.querySelector('[data-block-clock]');if(total)total.textContent=clockText(l.total)+' / 60:00';if(block)block.textContent='В блоке '+clockText(l.byBlock[b.id])+' / '+b.minutes+':00'+(l.byBlock[b.id]>=b.minutes*60?' · можно двигаться дальше':'');}

