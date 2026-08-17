(function(){
'use strict';

const ICONS = {
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M10 11v6M14 11v6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6v.5"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L12 16.8l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.7z"/></svg>',
  starFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L12 16.8l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.7z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7.5 11.5L12 16l4.5-4.5"/><path d="M5 19h14"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V5"/><path d="M7.5 9.5L12 5l4.5 4.5"/><path d="M5 19h14"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 20l-4-4 4-4"/></svg>',
  chevLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h18M7 3v4M17 3v4M4 5h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c-.5 3-3 4.5-3 8a3 3 0 003 3 3 3 0 003-3c0-1-1-1.5-1-1.5.5 2-1 3-2 3a2 2 0 01-2-2c0-2.5 2.5-3.5 2-7.5zM7 14a5 5 0 0010 0c0-3-2-4-2-4 .5 2.5-1 3.5-1 3.5A3 3 0 018 14c0-1 .5-2 .5-2C6 13 7 14 7 14z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>'
};

function E(name, star){ return {name, star: !!star}; }
function WARMUP(){ return [E('Elíptica'), E('Bicicleta'), E('Cinta'), E('Remo')]; }

const MUSCLES = {
  'Pecho': [
    ['Pectoral superior', [E('Press inclinado con mancuernas',1), E('Press inclinado con barra',1), E('Press inclinado en máquina'), E('Cruce de poleas de abajo hacia arriba'), E('Aperturas inclinadas con mancuernas')]],
    ['Pectoral medio', [E('Press banca con barra',1), E('Press plano con mancuernas',1), E('Press en máquina convergente'), E('Aperturas en máquina (Pec Deck)'), E('Aperturas con mancuernas')]],
    ['Pectoral inferior', [E('Fondos inclinando el torso',1), E('Press declinado'), E('Cruce de poleas de arriba hacia abajo')]]
  ],
  'Bíceps': [
    ['Cabeza larga', [E('Curl inclinado con mancuernas',1), E('Curl con barra recta',1), E('Curl en polea por detrás del cuerpo'), E('Curl tipo Drag Curl')]],
    ['Cabeza corta', [E('Curl predicador',1), E('Curl Scott en máquina'), E('Curl con barra EZ agarre cerrado'), E('Curl concentrado')]],
    ['Braquial', [E('Curl martillo',1), E('Curl martillo con cuerda'), E('Curl cruzado (Cross Body Hammer Curl)')]],
    ['Braquiorradial', [E('Curl inverso con barra EZ'), E('Curl inverso en polea')]]
  ],
  'Espalda': [
    ['Dorsal ancho', [E('Dominadas',1), E('Jalón al pecho',1), E('Jalón unilateral'), E('Pullover en polea')]],
    ['Espalda media', [E('Remo con barra',1), E('Remo con mancuerna',1), E('Remo sentado en polea'), E('Remo en máquina Hammer')]],
    ['Espalda alta', [E('Face Pull',1), E('Remo alto en polea'), E('Pájaros en máquina')]],
    ['Trapecio superior', [E('Encogimientos con mancuernas',1), E('Encogimientos con barra')]],
    ['Erectores lumbares', [E('Peso muerto rumano',1), E('Hiperextensiones')]]
  ],
  'Tríceps': [
    ['Cabeza larga', [E('Extensión por encima de la cabeza con cuerda',1), E('Press francés',1), E('Extensión unilateral con mancuerna')]],
    ['Cabeza lateral', [E('Jalón en polea con barra',1), E('Jalón con barra V'), E('Fondos en máquina')]],
    ['Cabeza medial', [E('Jalón con agarre invertido'), E('Press cerrado')]]
  ],
  'Hombros': [
    ['Deltoides anterior', [E('Press militar',1), E('Press con mancuernas',1), E('Elevaciones frontales')]],
    ['Deltoides lateral', [E('Elevaciones laterales',1), E('Elevaciones laterales en polea'), E('Elevaciones laterales en máquina')]],
    ['Deltoides posterior', [E('Pájaros con mancuernas',1), E('Reverse Pec Deck',1), E('Face Pull')]]
  ],
  'Core': [
    ['Recto abdominal', [E('Crunch en polea',1), E('Elevaciones de piernas colgado',1), E('Crunch en máquina'), E('Ab Wheel')]],
    ['Oblicuos', [E('Pallof Press'), E('Wood Chop en polea'), E('Plancha lateral')]],
    ['Transverso abdominal', [E('Plancha',1), E('Hollow Hold'), E('Dead Bug')]]
  ],
  'Piernas': [
    ['Cuádriceps', [E('Sentadilla',1), E('Prensa',1), E('Sentadilla Hack',1), E('Zancadas'), E('Sentadilla búlgara'), E('Extensión de cuádriceps')]],
    ['Isquiotibiales', [E('Peso muerto rumano',1), E('Curl femoral tumbado',1), E('Curl femoral sentado'), E('Buenos días')]],
    ['Glúteos', [E('Hip Thrust',1), E('Sentadilla profunda',1), E('Patada de glúteo en polea'), E('Abducción en máquina')]],
    ['Aductores', [E('Máquina de aductores'), E('Sentadilla sumo')]],
    ['Abductores', [E('Máquina de abductores'), E('Paseo del monstruo con banda')]],
    ['Gemelos', [E('Elevación de gemelos de pie',1), E('Elevación de gemelos sentado',1), E('Gemelos en prensa')]]
  ]
};

function principalSlots(muscleNames){
  const slots = [];
  muscleNames.forEach(m=>{
    MUSCLES[m].forEach(([zone, alts], i)=>{
      slots.push({id:'p-'+m+'-'+i, cat:'principal', muscle:m, zone, alts: alts.map(a=>({...a}))});
    });
  });
  return slots;
}

const STRETCHES = {
  'Pecho': [E('Estiramiento de pectoral en puerta'), E('Estiramiento de pectoral cruzado')],
  'Bíceps': [E('Estiramiento de bíceps con brazo extendido'), E('Estiramiento de bíceps en pared')],
  'Espalda': [E('Estiramiento de dorsal (gato-camello)'), E('Estiramiento de dorsal colgado en barra')],
  'Tríceps': [E('Estiramiento de tríceps por detrás de la cabeza'), E('Estiramiento de tríceps cruzado')],
  'Hombros': [E('Estiramiento de hombro cruzado'), E('Estiramiento de hombro por detrás de la espalda')],
  'Core': [E('Postura del niño (zona lumbar)'), E('Estiramiento tipo cobra')],
  'Piernas': [E('Estiramiento de cuádriceps'), E('Estiramiento de isquiotibiales'), E('Estiramiento de gemelos')]
};
function stretchSlots(muscleNames){
  return muscleNames.map(m=>({id:'e-'+m, cat:'estiramiento', muscle:m, alts:(STRETCHES[m]||[E('Estiramiento general')]).map(a=>({...a}))}));
}
function pickSlot(muscle, zoneIndex){
  const [zone, alts] = MUSCLES[muscle][zoneIndex];
  return {id:'p-'+muscle+'-fb-'+zoneIndex, cat:'principal', muscle, zone, alts: alts.map(a=>({...a}))};
}
function fullBodySlots(){
  return [pickSlot('Pecho', 1), pickSlot('Espalda', 1), pickSlot('Piernas', 0), pickSlot('Hombros', 0), pickSlot('Core', 2)];
}
function defaultProgram(){
  return {
    days:[
      {id:'d1', name:'Día 1', subtitle:'Pecho y bíceps', slots:[{id:'s1', cat:'calentamiento', alts:WARMUP()}, ...principalSlots(['Pecho','Bíceps']), ...stretchSlots(['Pecho','Bíceps'])]},
      {id:'d2', name:'Día 2', subtitle:'Espalda y tríceps', slots:[{id:'s1', cat:'calentamiento', alts:WARMUP()}, ...principalSlots(['Espalda','Tríceps']), ...stretchSlots(['Espalda','Tríceps'])]},
      {id:'d3', name:'Día 3', subtitle:'Hombros y core', slots:[{id:'s1', cat:'calentamiento', alts:WARMUP()}, ...principalSlots(['Hombros','Core']), ...stretchSlots(['Hombros','Core'])]},
      {id:'d4', name:'Día 4', subtitle:'Piernas', slots:[{id:'s1', cat:'calentamiento', alts:WARMUP()}, ...principalSlots(['Piernas']), ...stretchSlots(['Piernas'])]},
      {id:'d5', name:'Día 5', subtitle:'Full body', slots:[{id:'s1', cat:'calentamiento', alts:WARMUP()}, ...fullBodySlots(), ...stretchSlots(['Pecho','Espalda','Piernas','Hombros','Core'])]}
    ]
  };
}
const CAT_LABELS = {calentamiento:'Calentamiento', principal:'Ejercicios musculares', estiramiento:'Estiramientos'};
const FIELD_CONFIG = {
  cardio: [{key:'minutos', label:'Min', type:'number', placeholder:'min'}, {key:'intensidad', label:'Intensidad', type:'select', options:['Baja','Media','Alta']}],
  principal: [{key:'reps', label:'Reps', type:'number', placeholder:'reps'}, {key:'weight', label:'Kg', type:'number', placeholder:'kg'}],
  isometrico: [{key:'segundos', label:'Seg', type:'number', placeholder:'seg'}],
  estiramiento: []
};
const TIMED_EXERCISES = new Set(['Plancha', 'Plancha lateral', 'Hollow Hold']);
function fieldsKind(cat, exName){
  if(cat === 'calentamiento') return 'cardio';
  if(cat === 'estiramiento') return 'estiramiento';
  if(TIMED_EXERCISES.has(exName)) return 'isometrico';
  return 'principal';
}
function fieldsFor(cat, exName){ return FIELD_CONFIG[fieldsKind(cat, exName)]; }
function emptySet(cat, exName){ const o = {}; fieldsFor(cat, exName).forEach(f=>o[f.key]=''); return o; }
function maxValueOfEntry(e){
  const kind = fieldsKind(e.cat, e.exercise);
  const key = kind==='cardio' ? 'minutos' : kind==='isometrico' ? 'segundos' : 'weight';
  let max = 0;
  (e.sets||[]).forEach(s=>{ const v = parseFloat(s[key]); if(!isNaN(v) && v>max) max = v; });
  return max;
}
function setsLineFor(e){
  if(!e.sets || !e.sets.length) return 'Hecho';
  const kind = fieldsKind(e.cat, e.exercise);
  if(kind==='cardio') return e.sets.map(s=> `${s.minutos||'–'} min${s.intensidad?` (${s.intensidad})`:''}`).join(' · ');
  if(kind==='isometrico') return e.sets.map(s=> `<b>${s.segundos||'–'}</b> seg`).join(' · ');
  return e.sets.map(s=> `<b>${s.reps||'–'}</b>×<b>${s.weight||'–'}kg</b>`).join(' · ');
}
const MEASURE_FIELDS = [
  {key:'peso', label:'Peso (kg)'}, {key:'pecho', label:'Pecho (cm)'}, {key:'cintura', label:'Cintura (cm)'},
  {key:'cadera', label:'Cadera (cm)'}, {key:'biceps', label:'Bíceps (cm)'}, {key:'muslo', label:'Muslo (cm)'}, {key:'gemelo', label:'Gemelo (cm)'}
];

const QUALITY_LABEL = {bueno:'Bueno', mediocre:'Mediocre', malo:'Malo'};
const PLATE_TIERS = ['#35b56a','#f2b705','#2f7fd6','#e8433f'];

const MUSCLE_BADGE_GROUPS = {
  pechotes: ['Pecho'],
  brazacos: ['Hombros','Bíceps','Tríceps'],
  piernacas: ['Piernas']
};
const BADGES = [
  {id:'perfectweek', icon:'🗓️', name:'Semana perfecta', desc:'Acumula 4 entrenos en 7 días o menos.', xpValue:35, check:d=>d.perfectWeek},
  {id:'streak7', icon:'🔥', name:'Racha de 7', desc:'Entrena 7 días seguidos.', xpValue:30, check:d=>d.maxStreak>=7},
  {id:'streak30', icon:'🌋', name:'Racha de 30', desc:'Entrena 30 días seguidos.', xpValue:100, check:d=>d.maxStreak>=30},
  {id:'days50', icon:'📅', name:'50 entrenos', desc:'Acumula 50 días de entreno.', xpValue:60, check:d=>d.workoutDays>=50},
  {id:'sets100', icon:'💯', name:'100 series', desc:'Registra 100 series en total.', xpValue:40, check:d=>d.totalSets>=100},
  {id:'good1', icon:'✅', name:'Entreno Bueno', desc:'Completa tu primer entreno valorado como Bueno.', xpValue:15, check:d=>d.goodDays>=1},
  {id:'goldstreak', icon:'👑', name:'Racha dorada', desc:'Encadena 5 entrenos Buenos seguidos.', xpValue:50, check:d=>d.maxGoldStreak>=5},
  {id:'pechotes', icon:'🛡️', name:'Pechotes', desc:'3 ejercicios de pecho distintos en al menos 4 días, en menos de 2 semanas.', xpValue:25, check:d=>d.pechotes},
  {id:'brazacos', icon:'💪', name:'Brazacos', desc:'3 ejercicios de hombro/bíceps/tríceps distintos en al menos 4 días, en menos de 2 semanas.', xpValue:25, check:d=>d.brazacos},
  {id:'piernacas', icon:'🦵', name:'Piernacas', desc:'3 ejercicios de pierna distintos en al menos 4 días, en menos de 2 semanas.', xpValue:25, check:d=>d.piernacas},
  {id:'boss1', icon:'🐲', name:'Cazamonstruos', desc:'Derrota a tu primer rival en la pestaña Batalla.', xpValue:20, check:d=>d.bossesDefeated>=1},
  {id:'boss10', icon:'⚔️', name:'Leyenda de la arena', desc:'Derrota a 10 rivales en la pestaña Batalla.', xpValue:90, check:d=>d.bossesDefeated>=10},
  {id:'bestiary', icon:'📖', name:'Bestiario completo', desc:'Derrota al menos una vez a los 16 monstruos de las 4 familias.', xpValue:35, check:d=>d.bestiaryComplete},
  {id:'megaguerrero', icon:'🐉', name:'Megaguerrero', desc:'Derrota al Dragón Anciano.', xpValue:100, check:d=>d.dragonDefeated},
  {id:'level5', icon:'🥈', name:'Nivel 5', desc:'Alcanza el nivel 5.', xpValue:20, check:d=>d.level>=5},
  {id:'level10', icon:'🥇', name:'Nivel 10', desc:'Alcanza el nivel 10.', xpValue:40, check:d=>d.level>=10},
  {id:'level20', icon:'💎', name:'Nivel 20', desc:'Alcanza el nivel 20.', xpValue:80, check:d=>d.level>=20}
];

const useCloud = (typeof window.storage !== 'undefined');
async function storageGet(key){
  try{
    if(useCloud){ const r = await window.storage.get(key, true); return r ? JSON.parse(r.value) : null; }
    const v = localStorage.getItem(key); return v ? JSON.parse(v) : null;
  }catch(e){ return null; }
}
async function storageSet(key, value){
  try{
    if(useCloud){ await window.storage.set(key, JSON.stringify(value), true); }
    else{ localStorage.setItem(key, JSON.stringify(value)); }
  }catch(e){ console.error('storage error', e); }
}

async function migrateLegacyIfNeeded(){
  const already = await storageGet('gt:logs');
  if(already !== null) return;
  const legacyLogs = await storageGet('logs');
  const legacyMeasures = await storageGet('measures');
  const legacyProgram = await storageGet('program-structure');
  if(legacyLogs) await storageSet('gt:logs', legacyLogs);
  if(legacyMeasures) await storageSet('gt:measures', legacyMeasures);
  if(legacyProgram) await storageSet('gt:program', legacyProgram);
}

let state = { tab:'hoy', program:null, activeDayId:'d1', slotIndex:{}, pendingSets:{}, logs:[], measures:[], calYear:null, calMonth:null, calSelected:null, earnedBadgeIds:new Set(), defeatedBosses:[], battleChoice:null, battlePickFamily:null, goals:{}, editDate:null, exerciseImages:new Set(), equippedSet:null };

function dateToStr(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function todayStr(){ return dateToStr(new Date()); }
// Fecha sobre la que actúa la pestaña Hoy. Normalmente hoy, pero al editar una
// fecha pasada desde el Calendario apunta a esa. La gamificación y la Batalla
// siguen usando todayStr() siempre, para que editar el pasado no las altere.
function activeDate(){ return state.editDate || todayStr(); }
function isEditingPast(){ return !!state.editDate && state.editDate !== todayStr(); }
function fmtDate(d){ const dt = new Date(d+'T00:00:00'); return dt.toLocaleDateString('es-ES', {day:'2-digit', month:'short'}); }
function fmtDateLong(d){ const dt = new Date(d+'T00:00:00'); return dt.toLocaleDateString('es-ES', {weekday:'short', day:'2-digit', month:'short'}); }
let toastQueue = []; let toastBusy = false;
function showToast(msg){
  toastQueue.push(msg);
  if(toastBusy) return;
  const step = ()=>{
    if(!toastQueue.length){ toastBusy=false; return; }
    toastBusy = true;
    const t = document.getElementById('toast');
    t.textContent = toastQueue.shift();
    t.classList.add('show');
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(step, 220); }, 1700);
  };
  step();
}
function $(sel, root){ return (root||document).querySelector(sel); }
function $$(sel, root){ return (root||document).querySelectorAll(sel); }

async function loadProgram(){
  let p = await storageGet('gt:program');
  if(!p){ p = defaultProgram(); await storageSet('gt:program', p); }
  state.program = p;
}
async function saveProgram(){ await storageSet('gt:program', state.program); }
async function loadData(){
  state.logs = (await storageGet('gt:logs')) || [];
  state.measures = (await storageGet('gt:measures')) || [];
  // Descarta insignias guardadas que ya no existen (p. ej. las retiradas del catálogo).
  const validBadgeIds = new Set(BADGES.map(b=>b.id));
  state.earnedBadgeIds = new Set(((await storageGet('gt:badges')) || []).filter(id=>validBadgeIds.has(id)));
  const legacyBosses = (await storageGet('gt:bosses')) || [];
  state.defeatedBosses = legacyBosses.map(b => typeof b === 'string' ? {date:b, monster:'goblin'} : b);
  state.battleChoice = (await storageGet('gt:battleChoice')) || null;
  state.goals = (await storageGet('gt:goals')) || {};
  state.equippedSet = (await storageGet('gt:equippedSet')) || null;
  // Si el set guardado ya no es válido, o nunca se eligió uno, viste el primero
  // completo que haya: el premio debe verse sin tener que ir a buscarlo.
  if(!state.equippedSet || !setCompleto(state.equippedSet)){
    const disponible = setsCompletos()[0] || null;
    if(state.equippedSet !== disponible){
      state.equippedSet = disponible;
      await storageSet('gt:equippedSet', disponible);
    }
  }
  state.pendingSets = {};
  state.activeDayId = (await storageGet('gt:activeDayId')) || 'd1';
  const todayLog = state.logs.find(l=>l.date===todayStr());
  if(todayLog) state.activeDayId = todayLog.dayId;
}
async function saveLogs(){ await storageSet('gt:logs', state.logs); checkBadgesAndNotify(); }
async function saveMeasures(){ await storageSet('gt:measures', state.measures); checkBadgesAndNotify(); }
function persistEarnedBadges(){ storageSet('gt:badges', [...state.earnedBadgeIds]); }
function persistDefeatedBosses(){ storageSet('gt:bosses', state.defeatedBosses); }

/* ---------------- Derived data / gamification ---------------- */

function logsForDate(date){ return state.logs.filter(l=>l.date===date); }
function allWorkoutDates(){ return new Set(state.logs.map(l=>l.date)); }

function classifyDay(date){
  const logs = logsForDate(date);
  if(!logs.length) return null;
  const principalCount = logs.filter(l=>l.cat==='principal').length;
  const calentamiento = logs.some(l=>l.cat==='calentamiento');
  const estiramiento = logs.some(l=>l.cat==='estiramiento');
  if(principalCount < 4) return 'malo';
  if(principalCount >= 6 && calentamiento && estiramiento) return 'bueno';
  return 'mediocre';
}

function liveMeterInfo(){
  const t = todayStr();
  const logs = logsForDate(t);
  const principalCount = logs.filter(l=>l.cat==='principal').length;
  const calentamiento = logs.some(l=>l.cat==='calentamiento');
  const estiramiento = logs.some(l=>l.cat==='estiramiento');
  let msg, cls;
  if(principalCount===0 && !calentamiento && !estiramiento){
    msg = 'Aún no has registrado nada hoy. ¡Vamos a ello!'; cls='';
  }else if(principalCount < 4){
    msg = `Llevas ${principalCount}/4 ejercicios — ese es el mínimo para no quedarte en un entreno flojo.`; cls='q-malo';
  }else if(principalCount < 6){
    msg = `Bien. Te falta${6-principalCount===1?'n':'n'} ${6-principalCount} ejercicio(s) más para sellar un entreno Bueno.`; cls='q-mediocre';
  }else if(!calentamiento || !estiramiento){
    const faltan = [!calentamiento?'el calentamiento':null, !estiramiento?'el estiramiento':null].filter(Boolean).join(' y ');
    msg = `${principalCount} ejercicios completados. Añade ${faltan} para sellar un entreno Bueno.`; cls='q-mediocre';
  }else{
    msg = `¡Entreno Bueno! Calentamiento, ${principalCount} ejercicios y estiramiento completos.`; cls='q-bueno';
  }
  return {principalCount, calentamiento, estiramiento, msg, cls};
}

function toStr(d){ return dateToStr(d); }
function computeStreak(){
  const dates = allWorkoutDates();
  let streak=0;
  const cursor = new Date(); cursor.setHours(0,0,0,0);
  if(!dates.has(toStr(cursor))) cursor.setDate(cursor.getDate()-1);
  while(dates.has(toStr(cursor))){ streak++; cursor.setDate(cursor.getDate()-1); }
  return streak;
}
function computeMaxStreak(){
  const dates = [...allWorkoutDates()].sort();
  if(!dates.length) return 0;
  let max=1, cur=1;
  for(let i=1;i<dates.length;i++){
    const diff = Math.round((new Date(dates[i]+'T00:00:00') - new Date(dates[i-1]+'T00:00:00'))/86400000);
    if(diff===1){ cur++; max=Math.max(max,cur); } else if(diff>1){ cur=1; }
  }
  return max;
}
function computeMaxGoldStreak(){
  const dates = [...allWorkoutDates()].sort();
  let max=0, cur=0, prev=null;
  dates.forEach(d=>{
    const q = classifyDay(d);
    const consec = prev && Math.round((new Date(d+'T00:00:00')-new Date(prev+'T00:00:00'))/86400000)===1;
    if(q==='bueno'){ cur = consec ? cur+1 : 1; max = Math.max(max,cur); }
    else cur = 0;
    prev = d;
  });
  return max;
}
function prDatesForExercise(name){
  const entries = state.logs.filter(l=>l.cat==='principal' && l.exercise===name).sort((a,b)=>a.date.localeCompare(b.date));
  let max=0; const prDates = new Set();
  entries.forEach(e=>{
    const entryMax = maxValueOfEntry(e);
    if(entryMax>max){ max=entryMax; prDates.add(e.date); }
  });
  return prDates;
}
function countPRs(){
  const names = [...new Set(state.logs.filter(l=>l.cat==='principal').map(l=>l.exercise))];
  return names.reduce((sum,n)=> sum + prDatesForExercise(n).size, 0);
}
const XP_BY_QUALITY = {bueno:25, mediocre:20, malo:15};
const XP_PER_PR = 3;
const XP_INACTIVITY_GRACE_DAYS = 4;
const XP_INACTIVITY_PENALTY = 10;
const XP_LEVEL_BASE = 200;
const XP_LEVEL_STEP = 50;
function xpCostForLevel(level){ return XP_LEVEL_BASE + (level-1)*XP_LEVEL_STEP; }

function computeBaseXp(){
  const dates = [...allWorkoutDates()].sort();
  let xp = 0;
  if(dates.length){
    const start = new Date(dates[0]+'T00:00:00');
    const end = new Date(todayStr()+'T00:00:00');
    const trained = allWorkoutDates();
    let gap = 0;
    for(let cursor=new Date(start); cursor<=end; cursor.setDate(cursor.getDate()+1)){
      const ds = toStr(cursor);
      if(trained.has(ds)){
        xp += XP_BY_QUALITY[classifyDay(ds)];
        gap = 0;
      }else{
        gap++;
        if(gap > XP_INACTIVITY_GRACE_DAYS) xp -= XP_INACTIVITY_PENALTY;
      }
    }
  }
  xp += countPRs() * XP_PER_PR;
  xp += state.defeatedBosses.reduce((s,b)=> s + ((findMonsterDef(b.monster)||{}).reward || 0), 0);
  return xp;
}
function levelFromXP(xp){
  let level = 1;
  let remaining = Math.max(0, xp);
  let cost = xpCostForLevel(level);
  while(remaining >= cost){
    remaining -= cost;
    level++;
    cost = xpCostForLevel(level);
  }
  return {level, xpInLevel: remaining, xpForNext: cost, progress: remaining/cost};
}
function hasMuscleBlockBadge(muscleNames){
  const logs = state.logs.filter(l=>l.cat==='principal' && muscleNames.includes(l.muscle));
  if(!logs.length) return false;
  const dates = [...new Set(logs.map(l=>l.date))].sort();
  for(let i=0;i<dates.length;i++){
    const windowStart = new Date(dates[i]+'T00:00:00');
    const windowEnd = new Date(windowStart); windowEnd.setDate(windowEnd.getDate()+13);
    const windowDates = dates.filter(d=>{ const dt=new Date(d+'T00:00:00'); return dt>=windowStart && dt<=windowEnd; });
    if(windowDates.length >= 4){
      const exNames = new Set(logs.filter(l=>windowDates.includes(l.date)).map(l=>l.exercise));
      if(exNames.size >= 3) return true;
    }
  }
  return false;
}
// 4 entrenos dentro de cualquier ventana de 7 días naturales.
function hasPerfectWeek(){
  const dates = [...allWorkoutDates()].sort();
  for(let i=0; i<dates.length; i++){
    const start = new Date(dates[i]+'T00:00:00');
    const limit = new Date(start); limit.setDate(limit.getDate()+6);
    const limitStr = toStr(limit);
    let count = 0;
    for(let j=i; j<dates.length && dates[j]<=limitStr; j++) count++;
    if(count>=4) return true;
  }
  return false;
}
function computeGamification(){
  const workoutDays = allWorkoutDates().size;
  const totalSets = state.logs.reduce((s,l)=> s+((l.sets||[]).length), 0);
  const prCount = countPRs();
  const goodDays = [...allWorkoutDates()].filter(d=>classifyDay(d)==='bueno').length;
  const streak = computeStreak();
  const maxStreak = Math.max(computeMaxStreak(), streak);
  const maxGoldStreak = computeMaxGoldStreak();
  const bossesDefeated = state.defeatedBosses.length;
  const bestiaryDone = bestiaryComplete();
  const dragonDefeated = defeatCount('dragon') > 0;
  const pechotes = hasMuscleBlockBadge(MUSCLE_BADGE_GROUPS.pechotes);
  const brazacos = hasMuscleBlockBadge(MUSCLE_BADGE_GROUPS.brazacos);
  const piernacas = hasMuscleBlockBadge(MUSCLE_BADGE_GROUPS.piernacas);
  const perfectWeek = hasPerfectWeek();
  const counts = {workoutDays, totalSets, prCount, goodDays, streak, maxStreak, maxGoldStreak, bossesDefeated, bestiaryComplete:bestiaryDone, dragonDefeated, perfectWeek, pechotes, brazacos, piernacas};
  const baseXp = computeBaseXp();

  let level = levelFromXP(Math.max(0,baseXp)).level;
  let badgesResolved = [], badgeXpTotal = 0;
  for(let iter=0; iter<6; iter++){
    const data = {...counts, level};
    badgesResolved = BADGES.map(b=>{
      const rawOn = !!b.check(data);
      const on = state.earnedBadgeIds.has(b.id) || rawOn;
      return {...b, rawOn, on};
    });
    const newBadgeXp = badgesResolved.filter(b=>b.on).reduce((s,b)=>s+b.xpValue, 0);
    const newLevel = levelFromXP(Math.max(0, baseXp+newBadgeXp)).level;
    if(newLevel===level && newBadgeXp===badgeXpTotal){ badgeXpTotal = newBadgeXp; break; }
    level = newLevel; badgeXpTotal = newBadgeXp;
  }
  const xp = Math.max(0, baseXp + badgeXpTotal);
  const lvl = levelFromXP(xp);
  const newlyEarned = badgesResolved.filter(b=> b.rawOn && !state.earnedBadgeIds.has(b.id));
  return {...counts, xp, baseXp, badgeXpTotal, ...lvl, badges: badgesResolved, newlyEarned};
}
function checkBadgesAndNotify(){
  const g = computeGamification();
  if(g.newlyEarned.length){
    g.newlyEarned.forEach(b=> state.earnedBadgeIds.add(b.id));
    persistEarnedBadges();
    g.newlyEarned.forEach(b=> showToast(`🏅 Insignia conseguida: ${b.name} (+${b.xpValue} XP)`));
  }
  updateTopbarStreak();
}

/* ---------------- Root render ---------------- */

function renderChrome(){
  $$('.tab-btn').forEach(b=>{ b.classList.toggle('active', b.dataset.tab === state.tab); });
  // El ambiente (fondo y escenario) lo gobiernan estos dos atributos desde CSS.
  const app = document.getElementById('app');
  if(app){
    app.dataset.tab = state.tab;
    const amb = elementoAmbiente();
    if(amb) app.dataset.elem = amb; else delete app.dataset.elem;
  }
  renderHeroScene();
}
// Héroe a la izquierda y, si hoy hay combate, el rival enfrentado a la derecha.
function renderHeroScene(){
  const cont = document.getElementById('heroScene');
  if(!cont) return;
  const heroe = heroeActual();
  const activo = state.battleChoice && state.battleChoice.date===todayStr() ? state.battleChoice.monster : null;
  const def = activo ? findMonsterDef(activo) : null;
  const vencidoHoy = activo && state.defeatedBosses.some(b=>b.date===todayStr() && b.monster===activo);
  cont.innerHTML = `
    <img class="hs-hero" src="${heroe.img}" alt="Tu héroe">
    ${def ? `<img class="hs-foe ${vencidoHoy?'vencido':''}" src="${monsterImg(def.img)}" alt="${def.name}">` : ''}
  `;
  cont.classList.toggle('en-combate', !!def);
}
function updateTopbarStreak(){
  const el = document.getElementById('topbarStreak');
  if(!el) return;
  const streak = computeStreak();
  el.innerHTML = `${ICONS.flame}<span class="n">${streak}</span>`;
}

function render(){
  renderChrome();
  const main = $('#main');
  if(state.tab === 'hoy') main.innerHTML = renderHoy();
  else if(state.tab === 'medidas') main.innerHTML = renderMedidas();
  else if(state.tab === 'progreso') main.innerHTML = renderProgreso();
  else if(state.tab === 'calendario') main.innerHTML = renderCalendario();
  else main.innerHTML = renderBatalla();
  attachTabHandlers();
  updateTopbarStreak();
}

/* ---------------- Tab: Hoy (ejercicios) ---------------- */

function meterCardHtml(){
  const m = liveMeterInfo();
  return `
    <div class="meter-card">
      <div class="meter-plates">
        <div class="meter-plate ${m.calentamiento?'on':''}"><div class="ring">${ICONS.flame}</div><span class="lbl">Calent.</span></div>
        <div class="meter-plate ${m.principalCount>=6?'on':''}"><div class="ring">${ICONS.trend}</div><span class="lbl">Ejercicios</span><span class="count">${m.principalCount}/6</span></div>
        <div class="meter-plate ${m.estiramiento?'on':''}"><div class="ring">${ICONS.check}</div><span class="lbl">Estiram.</span></div>
      </div>
      <div class="meter-msg ${m.cls}">${m.msg}</div>
    </div>
  `;
}
function refreshMeter(){
  const card = $('.meter-card');
  if(!card) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = meterCardHtml();
  card.replaceWith(tmp.firstElementChild);
}

/* ---------------- Batalla (familias por día + Dragón Anciano) ---------------- */

function monsterImg(file){ return `icons/monsters/${file}`; }

// Ruta por convención: icons/ejercicios/<Músculo>/<nombre-en-slug>.webp
// Si el archivo no existe la miniatura se oculta sola (onerror), así se pueden
// ir añadiendo imágenes sin tocar el código.
function slugify(str){
  return str.normalize('NFD').replace(/[̀-ͯ]/g,'')
    .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function exerciseImgPath(muscle, exerciseName){
  if(!muscle || !exerciseName) return null;
  return `icons/ejercicios/${muscle}/${slugify(exerciseName)}.webp`;
}
// El botón solo se dibuja si existe la imagen, según el índice cargado al arrancar.
function hasExerciseImg(muscle, exerciseName){
  if(!muscle || !exerciseName) return false;
  return state.exerciseImages.has(`${muscle}/${slugify(exerciseName)}`);
}
function exerciseInfoBtnHtml(muscle, exerciseName){
  if(!hasExerciseImg(muscle, exerciseName)) return '';
  const src = exerciseImgPath(muscle, exerciseName);
  return `<button class="ex-info-btn" data-eximg="${src}" data-exname="${exerciseName}"
    aria-label="Ver cómo se hace ${exerciseName}" title="Ver cómo se hace">${ICONS.info}</button>`;
}
function openExerciseImgModal(src, name){
  const box = $('#modalBox');
  box.innerHTML = `<div class="modal-title">${name} <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <img src="${src}" alt="${name}" style="width:100%;border-radius:12px;background:var(--panel-2);">`;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
}

function dayStatsFor(dateStr){
  const logs = logsForDate(dateStr);
  const principal = logs.filter(l=>l.cat==='principal');
  const calentamientoEntry = logs.find(l=>l.cat==='calentamiento');
  const calMinutes = calentamientoEntry ? (calentamientoEntry.sets||[]).reduce((s,st)=> s+(parseFloat(st.minutos)||0), 0) : 0;
  const calIntensidad = calentamientoEntry ? (calentamientoEntry.sets||[]).map(s=>s.intensidad).filter(Boolean).slice(-1)[0] || null : null;
  return {
    date: dateStr,
    principal,
    principalCount: principal.length,
    calentamientoDone: !!calentamientoEntry,
    calMinutes,
    calIntensidad,
    estiramientoDone: logs.some(l=>l.cat==='estiramiento')
  };
}
function prevEntryFor(exerciseName, beforeDate){
  return state.logs.filter(l=>l.cat==='principal' && l.exercise===exerciseName && l.date<beforeDate).sort((a,b)=>b.date.localeCompare(a.date))[0] || null;
}
function prevAllTimeMaxFor(exerciseName, beforeDate){
  const entries = state.logs.filter(l=>l.cat==='principal' && l.exercise===exerciseName && l.date<beforeDate);
  if(!entries.length) return null;
  return Math.max(...entries.map(e=>maxValueOfEntry(e)));
}
function weightIncreaseCount(stats){
  let count = 0;
  stats.principal.forEach(l=>{
    const prev = prevEntryFor(l.exercise, stats.date);
    if(prev && maxValueOfEntry(l) > maxValueOfEntry(prev)) count++;
  });
  return count;
}
function extraSetCount(stats){
  let count = 0;
  stats.principal.forEach(l=>{
    const prev = prevEntryFor(l.exercise, stats.date);
    if(prev && (l.sets||[]).length > (prev.sets||[]).length) count++;
  });
  return count;
}
function countExercisesWithMinSets(stats, minSets){ return stats.principal.filter(l=>(l.sets||[]).length>=minSets).length; }
function allExercisesHaveMinSets(stats, minSets){ return stats.principal.length>0 && stats.principal.every(l=>(l.sets||[]).length>=minSets); }
function allSetsRepsAtLeast(stats, min){
  const sets = stats.principal.filter(l=>fieldsKind(l.cat,l.exercise)==='principal').flatMap(l=>l.sets||[]);
  return sets.length>0 && sets.every(s=> parseFloat(s.reps)>=min);
}
function improvedAllExercises(stats){
  if(!stats.principal.length) return false;
  return stats.principal.every(l=>{
    const prev = prevEntryFor(l.exercise, stats.date);
    return !!prev && maxValueOfEntry(l) > maxValueOfEntry(prev);
  });
}
function buenoItems(stats){
  return [
    {label:'Calentamiento registrado', met: stats.calentamientoDone},
    {label:`6 ejercicios musculares (${stats.principalCount}/6)`, met: stats.principalCount>=6},
    {label:'Estiramiento registrado', met: stats.estiramientoDone}
  ];
}

const FAMILIES = {
  fuego: {
    name:'Fuego', theme:'Potencia', icon:'elemento-fuego.png',
    tiers: [
      {id:'fuego1', name:'Slime', img:'fuego-1-slime.png', reward:15, evaluate:buenoItems},
      {id:'fuego2', name:'Guerrero', img:'fuego-2-guerrero.png', reward:25, evaluate:(s)=>{
        const n = weightIncreaseCount(s);
        return [...buenoItems(s), {label:`Sube el peso en 1 ejercicio (${Math.min(n,1)}/1)`, met:n>=1}];
      }},
      {id:'fuego3', name:'Caballero Oscuro', img:'fuego-3-caballero-oscuro.png', reward:40, evaluate:(s)=>{
        const n = weightIncreaseCount(s);
        return [...buenoItems(s), {label:`Sube el peso en 3 ejercicios (${Math.min(n,3)}/3)`, met:n>=3}];
      }},
      {id:'fuego4', name:'Señor de la Guerra', img:'fuego-4-senor-de-la-guerra.png', reward:60, evaluate:(s)=>{
        const n = weightIncreaseCount(s);
        return [...buenoItems(s), {label:`Sube el peso en 5 ejercicios (${Math.min(n,5)}/5)`, met:n>=5}];
      }}
    ]
  },
  tierra: {
    name:'Tierra', theme:'Volumen', icon:'elemento-tierra.png',
    tiers: [
      {id:'tierra1', name:'Slime', img:'tierra-1-slime.png', reward:15, evaluate:buenoItems},
      {id:'tierra2', name:'Goblin', img:'tierra-2-goblin.png', reward:25, evaluate:(s)=>{
        const n = extraSetCount(s);
        return [...buenoItems(s), {label:`2 ejercicios con una serie más (${Math.min(n,2)}/2)`, met:n>=2}];
      }},
      {id:'tierra3', name:'Orco', img:'tierra-3-orco.png', reward:40, evaluate:(s)=>{
        const need = Math.ceil(s.principalCount/2);
        const n = countExercisesWithMinSets(s,4);
        return [...buenoItems(s), {label:`4+ series en la mitad de tus ejercicios (${n}/${need||0})`, met: s.principalCount>0 && n>=need}];
      }},
      {id:'tierra4', name:'Gran Orco', img:'tierra-4-gran-orco.png', reward:60, evaluate:(s)=>[...buenoItems(s), {label:'4+ series en todos los ejercicios', met: allExercisesHaveMinSets(s,4)}]}
    ]
  },
  viento: {
    name:'Viento', theme:'Cardio', icon:'elemento-viento.png',
    tiers: [
      {id:'viento1', name:'Slime', img:'viento-1-slime.png', reward:15, evaluate:buenoItems},
      {id:'viento2', name:'Zombie', img:'viento-2-zombie.png', reward:25, evaluate:(s)=>[...buenoItems(s), {label:`Calentamiento 10+ min (${Math.round(s.calMinutes)} min)`, met: s.calMinutes>=10}]},
      {id:'viento3', name:'Esqueleto', img:'viento-3-esqueleto.png', reward:40, evaluate:(s)=>[...buenoItems(s), {label:`Calentamiento 15+ min (${Math.round(s.calMinutes)} min)`, met: s.calMinutes>=15}]},
      {id:'viento4', name:'Nigromante', img:'viento-4-nigromante.png', reward:60, evaluate:(s)=>[...buenoItems(s), {label:`Calentamiento 20+ min a intensidad Alta (${Math.round(s.calMinutes)} min, ${s.calIntensidad||'—'})`, met: s.calMinutes>=20 && s.calIntensidad==='Alta'}]}
    ]
  },
  agua: {
    name:'Agua', theme:'Resistencia', icon:'elemento-agua.png',
    tiers: [
      {id:'agua1', name:'Slime', img:'agua-1-slime.png', reward:15, evaluate:buenoItems},
      {id:'agua2', name:'Tritón', img:'agua-2-triton.png', reward:25, evaluate:(s)=>[...buenoItems(s), {label:'Todas las series con 10+ reps', met: allSetsRepsAtLeast(s,10)}]},
      {id:'agua3', name:'Neptuno', img:'agua-3-neptuno.png', reward:40, evaluate:(s)=>[...buenoItems(s), {label:'Todas las series con 12+ reps', met: allSetsRepsAtLeast(s,12)}]},
      {id:'agua4', name:'Hidra', img:'agua-4-hidra.png', reward:60, evaluate:(s)=>[...buenoItems(s), {label:'Todas las series con 12+ reps', met: allSetsRepsAtLeast(s,12)}, {label:'Mejoras cada ejercicio respecto a tu sesión anterior', met: improvedAllExercises(s)}]}
    ]
  }
};
const ALL_FAMILY_MONSTER_IDS = Object.values(FAMILIES).flatMap(f=>f.tiers.map(t=>t.id));

/* ---------------- Héroe y equipamiento ---------------- */
// Cada tier otorga una pieza: el Slime da las botas y el jefe de la familia, el arma.
const EQUIPO_POR_TIER = ['botas','coraza','casco','espada'];
const EQUIPO_LABEL = {botas:'Botas', coraza:'Coraza', casco:'Casco', espada:'Espada'};
const ELEMENT_KEYS = ['fuego','tierra','viento','agua'];

function temaImg(file){ return `icons/tema/${file}`; }
// 'fuego2' -> {el:'fuego', tierIndex:1, pieza:'coraza'}
function equipoDeMonstruo(monsterId){
  const m = /^([a-z]+)(\d)$/.exec(monsterId||'');
  if(!m || !FAMILIES[m[1]]) return null;
  const tierIndex = parseInt(m[2],10) - 1;
  const pieza = EQUIPO_POR_TIER[tierIndex];
  return pieza ? {el:m[1], tierIndex, pieza} : null;
}
function piezaGanada(el, pieza){
  const tierIndex = EQUIPO_POR_TIER.indexOf(pieza);
  if(tierIndex < 0) return false;
  return defeatCount(`${el}${tierIndex+1}`) > 0;
}
function setCompleto(el){ return EQUIPO_POR_TIER.every(p=>piezaGanada(el,p)); }
function setsCompletos(){ return ELEMENT_KEYS.filter(setCompleto); }
function totalPiezasGanadas(){
  return ELEMENT_KEYS.reduce((n,el)=> n + EQUIPO_POR_TIER.filter(p=>piezaGanada(el,p)).length, 0);
}
// El héroe solo viste un set cuando está completo; si no, aparece sin equipo.
function heroeActual(){
  const eq = state.equippedSet;
  if(eq && setCompleto(eq)) return {el:eq, img:temaImg(`heroe-${eq}.webp`)};
  return {el:null, img:temaImg('heroe-base.webp')};
}
async function equiparSet(el){
  state.equippedSet = (el && setCompleto(el)) ? el : null;
  await storageSet('gt:equippedSet', state.equippedSet);
  render();
}
// Elemento que ambienta la pantalla: el del rival de hoy, si lo hay.
function elementoAmbiente(){
  const activo = state.battleChoice && state.battleChoice.date===todayStr() ? state.battleChoice.monster : null;
  if(!activo) return null;
  if(activo==='dragon') return 'dragon';
  const eq = equipoDeMonstruo(activo);
  return eq ? eq.el : null;
}

const DRAGON_GROUPS = ['Pecho','Bíceps','Tríceps','Espalda','Hombros','Piernas','Core'];
const DRAGON = {
  id:'dragon', name:'Dragón Anciano', img:'dragon-anciano.png', reward:150,
  evaluate(stats){
    const calOk = stats.calentamientoDone && stats.calMinutes>=30 && stats.calIntensidad==='Media';
    const items = [{label:`Calentamiento 30+ min a intensidad Media (${Math.round(stats.calMinutes)} min, ${stats.calIntensidad||'—'})`, met: calOk}];
    DRAGON_GROUPS.forEach(muscle=>{
      const exs = stats.principal.filter(l=>l.muscle===muscle);
      let qualifying = 0;
      exs.forEach(l=>{
        const prevMax = prevAllTimeMaxFor(l.exercise, stats.date);
        if(prevMax!==null && maxValueOfEntry(l)>=prevMax) qualifying++;
      });
      items.push({label:`${muscle}: 2 ejercicios al nivel máximo (${Math.min(qualifying,2)}/2)`, met: qualifying>=2});
    });
    return items;
  }
};

function findMonsterDef(id){
  if(id==='dragon') return DRAGON;
  for(const fam of Object.values(FAMILIES)){
    const t = fam.tiers.find(t=>t.id===id);
    if(t) return t;
  }
  return null;
}
function tierUnlocked(family, tierIndex){
  if(tierIndex===0) return true;
  const prevId = family.tiers[tierIndex-1].id;
  return state.defeatedBosses.some(b=>b.monster===prevId);
}
function bestiaryComplete(){ return ALL_FAMILY_MONSTER_IDS.every(id=> state.defeatedBosses.some(b=>b.monster===id)); }
function defeatCount(monsterId){ return state.defeatedBosses.filter(b=>b.monster===monsterId).length; }

function evaluateMonster(monsterId){
  const stats = dayStatsFor(todayStr());
  const def = findMonsterDef(monsterId);
  if(!def) return {items:[], defeated:false};
  const items = def.evaluate(stats);
  return {items, defeated: items.length>0 && items.every(i=>i.met)};
}
function checkMonsterDefeat(monsterId, result){
  const def = findMonsterDef(monsterId);
  const t = todayStr();
  if(result.defeated && !state.defeatedBosses.some(b=>b.date===t && b.monster===monsterId)){
    state.defeatedBosses.push({date:t, monster:monsterId});
    persistDefeatedBosses();
    showToast(`🏆 ¡${def.name} derrotado! (${defeatCount(monsterId)}×) +${def.reward} XP`);
    // Primera victoria sobre este rival: entrega su pieza de equipo.
    const eq = equipoDeMonstruo(monsterId);
    if(eq && defeatCount(monsterId)===1){
      setTimeout(()=> showToast(`🛡️ Consigues ${EQUIPO_LABEL[eq.pieza]} de ${FAMILIES[eq.el].name}`), 1500);
      if(setCompleto(eq.el)){
        setTimeout(()=> showToast(`⚔️ ¡Equipo de ${FAMILIES[eq.el].name} completo!`), 3000);
        if(!state.equippedSet){ state.equippedSet = eq.el; storageSet('gt:equippedSet', eq.el); }
      }
    }
    checkBadgesAndNotify();
  }
}
async function chooseMonster(monsterId){
  state.battleChoice = {date: todayStr(), monster: monsterId};
  state.battlePickFamily = null;
  await storageSet('gt:battleChoice', state.battleChoice);
  render();
}
// Abandonar el combate del día. Si ya se ha registrado algo, hay que empezar de
// cero: se avisa y se borra, para que no se aproveche el avance con otro rival.
async function abandonarCombate(){
  const t = todayStr();
  const registros = state.logs.filter(l=>l.date===t);
  if(registros.length){
    if(!confirm('Cambiar de rival borrará todo lo que has registrado hoy para empezar de cero. ¿Quieres continuar?')) return;
    state.logs = state.logs.filter(l=>l.date!==t);
    state.pendingSets = {};
    await saveLogs();
    showToast('Progreso de hoy borrado');
  }
  state.battleChoice = null;
  state.battlePickFamily = null;
  await storageSet('gt:battleChoice', null);
  render();
}
function tierCardHtml(family, tierIndex){
  const tier = family.tiers[tierIndex];
  const unlocked = tierUnlocked(family, tierIndex);
  const count = defeatCount(tier.id);
  const cls = ['monster-tier-card']; if(!unlocked) cls.push('locked'); if(count>0) cls.push('cleared');
  return `
    <div class="${cls.join(' ')}" ${unlocked ? `data-pick-monster="${tier.id}"` : ''}>
      <img class="mtc-img" src="${monsterImg(tier.img)}" alt="${tier.name}">
      <div class="mtc-info">
        <div class="mtc-name">${tier.name}${!unlocked ? ' 🔒' : ''}</div>
        <div class="mtc-reward mono">+${tier.reward} XP${count>0 ? ` · derrotado ${count}×` : ''}</div>
      </div>
    </div>`;
}
function elementSelectHtml(){
  const cards = Object.entries(FAMILIES).map(([key,family])=>{
    const done = family.tiers.filter(t=>defeatCount(t.id)>0).length;
    return `<div class="element-card" data-pick-family="${key}">
      <img class="element-img" src="${monsterImg(family.icon)}" alt="${family.name}">
      <div class="element-name">${family.name}</div>
      <div class="element-theme">${family.theme}</div>
      <div class="element-progress mono">${done}/${family.tiers.length} derrotados</div>
    </div>`;
  }).join('');
  return `<div class="section-label">Elige tu elemento</div><p class="io-desc">La lucha solo empieza a contar lo que hagas hoy después de que actives un rival. Si no activas ninguno, no se mide nada. Puedes enfrentarte a cualquier elemento cualquier día.</p><div class="element-grid">${cards}</div>`;
}
function familyTierSelectHtml(familyKey){
  const family = FAMILIES[familyKey];
  const cards = family.tiers.map((t,i)=>tierCardHtml(family,i)).join('');
  return `<div class="section-label">${family.name} — tema: ${family.theme} <a href="#" id="backToElementsLink">‹ cambiar elemento</a></div><div class="monster-tier-list">${cards}</div>`;
}
function battleSelectHtml(){
  const body = state.battlePickFamily && FAMILIES[state.battlePickFamily]
    ? familyTierSelectHtml(state.battlePickFamily)
    : elementSelectHtml();
  const dragonHtml = (!state.battlePickFamily && bestiaryComplete()) ? `
    <div class="section-label">Jefe final</div>
    <div class="monster-tier-card dragon-card" data-pick-monster="dragon">
      <img class="mtc-img" src="${monsterImg(DRAGON.img)}" alt="Dragón Anciano">
      <div class="mtc-info">
        <div class="mtc-name">${DRAGON.name}</div>
        <div class="mtc-reward mono">+${DRAGON.reward} XP${defeatCount('dragon')>0 ? ` · derrotado ${defeatCount('dragon')}×` : ''}</div>
      </div>
    </div>` : '';
  return body + dragonHtml;
}
function battleViewHtml(monsterId){
  const def = findMonsterDef(monsterId);
  if(!def) return battleSelectHtml();
  const result = evaluateMonster(monsterId);
  checkMonsterDefeat(monsterId, result);
  const defeated = result.defeated;
  const metCount = result.items.filter(i=>i.met).length;
  const pct = Math.round((metCount/result.items.length)*100);
  const count = defeatCount(monsterId);
  const itemsHtml = result.items.map(i=>`
    <div class="battle-check ${i.met?'met':''}">
      <span class="bc-icon">${i.met ? ICONS.check : ICONS.x}</span>
      <span class="bc-label">${i.label}</span>
    </div>
  `).join('');
  return `
    <div class="battle-hero">
      <img class="battle-hero-img ${defeated?'defeated':''}" src="${monsterImg(def.img)}" alt="${def.name}">
      <div class="battle-hero-name">${defeated?'¡Derrotado! ':''}${def.name}</div>
      <div class="battle-hero-tier mono">+${def.reward} XP${count>0 ? ` · derrotado ${count}×` : ''}</div>
      <div class="battle-hp-bar"><div class="battle-hp-fill" style="width:${pct}%;background:${defeated?'var(--green)':'var(--blue)'}"></div></div>
      <div class="battle-hp-label mono">${metCount} / ${result.items.length} condiciones de hoy</div>
    </div>
    <div class="battle-detail">${itemsHtml}</div>
    <button class="add-slot-btn" id="changeMonsterBtn">${ICONS.swap} Cambiar de rival o salir del combate</button>
    <p class="io-warn">Cambiar de rival borra lo registrado hoy para empezar de cero.</p>
  `;
}
function armoryHtml(){
  const filas = ELEMENT_KEYS.map(el=>{
    const fam = FAMILIES[el];
    const completo = setCompleto(el);
    const equipado = state.equippedSet === el;
    const celdas = EQUIPO_POR_TIER.map(p=>{
      const tengo = piezaGanada(el,p);
      return `<div class="armory-cell ${tengo?'':'locked'}" title="${EQUIPO_LABEL[p]} de ${fam.name}">
        <img src="${temaImg(`equipo-${el}-${p}.webp`)}" alt="${EQUIPO_LABEL[p]} de ${fam.name}" loading="lazy">
      </div>`;
    }).join('');
    const n = EQUIPO_POR_TIER.filter(p=>piezaGanada(el,p)).length;
    const boton = completo
      ? `<button class="set-equip-btn ${equipado?'on':''}" data-equip="${equipado?'':el}">${equipado?'Equipado':'Equipar'}</button>`
      : '';
    return `<div class="armory-row-label">${fam.name} <span class="${completo?'done':''}">${n}/4</span>${boton}</div>
            <div class="armory-grid">${celdas}</div>`;
  }).join('');
  return `<div class="section-label">Armería (${totalPiezasGanadas()}/16)</div>
    <p class="io-desc">Cada monstruo derrotado entrega una pieza de su elemento. Al reunir las cuatro de un elemento podrás vestir el equipo completo.</p>
    ${filas}`;
}
function bestiaryProgressHtml(){
  const done = ALL_FAMILY_MONSTER_IDS.filter(id=>state.defeatedBosses.some(b=>b.monster===id)).length;
  return `<div class="section-label">Bestiario (${done}/${ALL_FAMILY_MONSTER_IDS.length}) — <a href="#" id="bestiaryLink">ver todos</a></div>`;
}
function openBestiaryModal(){
  const box = $('#modalBox');
  const groupsHtml = Object.values(FAMILIES).map(family=>{
    const rows = family.tiers.map((t,i)=>{
      const unlocked = tierUnlocked(family,i);
      const count = defeatCount(t.id);
      return `<div class="badge-row ${count>0?'on':''}">
        <img class="ic" style="border-radius:50%;object-fit:cover;" src="${monsterImg(t.img)}" alt="${t.name}">
        <div class="tx"><b>${t.name} <span class="xpv">+${t.reward} XP</span></b><span>${!unlocked ? 'Bloqueado — derrota al anterior' : count>0 ? `Derrotado ${count}×` : 'Disponible'}</span></div>
      </div>`;
    }).join('');
    return `<div class="modal-zone-title">${family.name} · ${family.theme}</div>${rows}`;
  }).join('');
  const dragonRow = `<div class="modal-zone-title">Jefe final</div><div class="badge-row ${defeatCount('dragon')>0?'on':''}">
    <img class="ic" style="border-radius:50%;object-fit:cover;" src="${monsterImg(DRAGON.img)}" alt="Dragón">
    <div class="tx"><b>${DRAGON.name} <span class="xpv">+${DRAGON.reward} XP</span></b><span>${bestiaryComplete() ? (defeatCount('dragon')>0?`Derrotado ${defeatCount('dragon')}×`:'Disponible') : 'Bloqueado — derrota a los 16 primero'}</span></div>
  </div>`;
  box.innerHTML = `<div class="modal-title">Bestiario <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <div class="badge-detail-list">${groupsHtml}${dragonRow}</div>`;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
}
function dayRowHtml(){
  return `<div class="day-row">${state.program.days.map(d=>`
    <div class="day-chip ${d.id===state.activeDayId?'active':''}" data-day="${d.id}">
      <div class="dn">${d.name}</div>
      <div class="ds">${d.subtitle}</div>
    </div>
  `).join('')}</div>`;
}
function battleDayBannerHtml(){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  if(!day) return '';
  return `<div class="section-label">Día de entrenamiento de hoy</div>${dayRowHtml()}`;
}
function renderBatalla(){
  const active = state.battleChoice && state.battleChoice.date===todayStr() ? state.battleChoice.monster : null;
  const battleSection = active
    ? `<div class="section-label">Tu combate de hoy</div>${battleViewHtml(active)}`
    : battleSelectHtml();
  const g = computeGamification();
  const gamiSection = gamiHeaderHtml(g) + badgesGridHtml(g);
  return gamiSection + `<div style="margin-top:22px;">${battleDayBannerHtml()}</div><div style="margin-top:14px;">${bestiaryProgressHtml()}</div><div style="margin-top:10px;">${battleSection}</div><div style="margin-top:26px;">${armoryHtml()}</div>`;
}

function renderHoy(){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  const cats = ['calentamiento','principal','estiramiento'];
  const catsHtml = cats.map(cat=>{
    const slots = day.slots.filter(s=>s.cat===cat);
    if(cat === 'principal'){
      const muscles = [...new Set(slots.map(s=>s.muscle))];
      const groupsHtml = muscles.map(m=>{
        const zoneSlots = slots.filter(s=>s.muscle===m);
        return `
          <div class="muscle-group">
            <div class="muscle-title">${m}</div>
            ${zoneSlots.map(s=>`${s.zone ? `<div class="zone-label">${s.zone}</div>` : ''}${renderSlot(day, s)}`).join('')}
            <button class="add-slot-btn" data-add-zone="${m}">+ añadir ejercicio a ${m}</button>
          </div>
        `;
      }).join('');
      return `<div class="category-block"><div class="category-title">${CAT_LABELS[cat]} <span class="pill">${slots.length}</span></div>${groupsHtml}</div>`;
    }
    if(cat === 'estiramiento'){
      return `<div class="category-block"><div class="category-title">${CAT_LABELS[cat]} <span class="pill">${slots.length}</span></div>${slots.map(s=>`<div class="zone-label">${s.muscle}</div>${renderSlot(day, s)}`).join('')}</div>`;
    }
    return `<div class="category-block"><div class="category-title">${CAT_LABELS[cat]} <span class="pill">${slots.length}</span></div>${slots.map(s=>renderSlot(day, s)).join('')}</div>`;
  }).join('');

  const editBanner = isEditingPast()
    ? `<div class="edit-banner">
         <div><b>Editando ${fmtDateLong(state.editDate)}</b><span>Los cambios se guardan en esa fecha, no en hoy.</span></div>
         <button class="btn" id="exitEditBtn">Salir</button>
       </div>`
    : '';
  return `${editBanner}<div class="section-label">Elige tu día</div>${dayRowHtml()}${meterCardHtml()}${catsHtml}`;
}

function slotLoggedToday(slotId){ const t = activeDate(); return state.logs.find(l=>l.date===t && l.slotId===slotId); }

function renderSlot(day, slot){
  const idx = state.slotIndex[slot.id] || 0;
  const curAlt = slot.alts[idx % slot.alts.length];
  const exName = curAlt.name;
  const isStar = !!curAlt.star;
  const loggedEntry = slotLoggedToday(slot.id);
  const isLoggedThisExercise = loggedEntry && loggedEntry.exercise === exName;
  const kind = fieldsKind(slot.cat, exName);
  const fields = FIELD_CONFIG[kind];
  const isCardio = kind === 'cardio';
  const isTimed = kind === 'isometrico';
  const showStar = slot.cat === 'principal';
  const hasFields = fields.length > 0;
  const dots = slot.alts.map((_,i)=>`<span class="${i===(idx%slot.alts.length)?'on':''}"></span>`).join('');

  function renderInput(f, value){
    if(f.type === 'select'){
      const opts = f.options.map(o=>`<option value="${o}" ${value===o?'selected':''}>${o}</option>`).join('');
      return `<select data-field="${f.key}"><option value="">${f.label}</option>${opts}</select>`;
    }
    return `<input type="number" inputmode="decimal" placeholder="${f.placeholder}" value="${value}" data-field="${f.key}">`;
  }

  let bodyHtml;
  if(hasFields){
    let sets = state.pendingSets[slot.id];
    if(!sets){
      sets = (loggedEntry && loggedEntry.exercise===exName) ? loggedEntry.sets.map(s=>({...s})) : [emptySet(slot.cat, exName)];
      state.pendingSets[slot.id] = sets;
    }
    const rowClass = fields.length===1 ? 'set-row set-row-1f' : 'set-row';
    const setsHtml = sets.map((s,i)=>`
      <div class="${rowClass}" data-slot="${slot.id}" data-setidx="${i}">
        <span class="idx">${i+1}</span>
        ${fields.map(f=>renderInput(f, s[f.key])).join('')}
        <button class="rm" data-rmset="${i}" title="Quitar">${ICONS.x}</button>
      </div>
    `).join('');
    bodyHtml = `
      <div class="sets-wrap">
        <div class="${fields.length===1?'set-field-labels set-field-labels-1f':'set-field-labels'}"><span></span>${fields.map(f=>`<span>${f.label}</span>`).join('')}<span></span></div>
        ${setsHtml}
        <div class="slot-footer">
          <button class="btn btn-add-set" data-addset="${slot.id}">${isCardio ? '+ tramo' : isTimed ? '+ intento' : '+ serie'}</button>
          <button class="btn btn-save ${isLoggedThisExercise?'saved':''}" data-save="${slot.id}">${isLoggedThisExercise?'✓ Guardado':'Guardar'}</button>
        </div>
      </div>
    `;
  }else{
    bodyHtml = `<div class="sets-wrap"><div class="slot-footer"><button class="btn btn-save ${isLoggedThisExercise?'saved':''}" data-donetoggle="${slot.id}">${isLoggedThisExercise?'✓ Hecho hoy':'Marcar como hecho'}</button></div></div>`;
  }

  return `
    <div class="slot" data-slot-id="${slot.id}">
      ${isLoggedThisExercise ? '<div class="logged-badge">Registrado hoy</div>' : ''}
      <div class="slot-head">
        <div class="slot-nav">
          <button class="swipe-btn" data-swipe="${slot.id}:-1">${ICONS.chevLeft}</button>
          <div class="swipe-dots">${dots}</div>
          <button class="swipe-btn" data-swipe="${slot.id}:1">${ICONS.chevRight}</button>
        </div>
        <div class="slot-actions">
          ${showStar ? `<button class="icon-btn ${isStar?'star-active':''}" data-togglestar="${slot.id}" title="Marcar como ejercicio estrella para hipertrofia">${isStar?ICONS.starFilled:ICONS.starOutline}</button>` : ''}
          ${slot.cat!=='calentamiento' ? `<button class="delete-btn" data-deleteslot="${slot.id}" title="Eliminar este ejercicio de hoy">${ICONS.x}</button>` : ''}
        </div>
      </div>
      <div class="exercise-name-row">
        <div class="exercise-name">${exName}${isStar ? ` <span class="star-mark">${ICONS.starFilled}</span>` : ''}</div>
        ${slot.cat==='principal' ? exerciseInfoBtnHtml(slot.muscle, exName) : ''}
      </div>
      ${bodyHtml}
    </div>
  `;
}

function openAddExerciseModal(muscle){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  const present = new Set(day.slots.filter(s=>s.cat==='principal' && s.muscle===muscle).flatMap(s=>s.alts.map(a=>a.name)));
  const zones = MUSCLES[muscle] || [];
  let html = `<div class="modal-title">${muscle} <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <p class="io-desc">Elige un ejercicio para añadir como tarjeta extra hoy — útil si vas con ganas de más.</p>`;
  zones.forEach(([zone, alts])=>{
    html += `<div class="modal-zone-title">${zone}</div>`;
    alts.forEach(a=>{
      const already = present.has(a.name);
      html += `<div class="modal-item" data-pick-zone="${zone}" data-pick-name="${a.name}" data-pick-star="${a.star?1:0}">
        <span class="name">${a.name}${already ? ' <span class="already-tag">ya en tu día</span>' : ''}</span>${a.star?`<span class="star">${ICONS.starFilled}</span>`:''}
      </div>`;
    });
  });
  const box = $('#modalBox');
  box.innerHTML = html;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
  box.querySelectorAll('[data-pick-name]').forEach(el=>{
    el.addEventListener('click', ()=>{
      addExerciseToDay(muscle, el.dataset.pickZone, el.dataset.pickName, el.dataset.pickStar==='1');
      closeModal();
    });
  });
}
function closeModal(){ $('#modalOverlay').classList.remove('open'); }
function addExerciseToDay(muscle, zone, name, star){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  const slot = {id:'p-'+Date.now(), cat:'principal', muscle, zone, alts:[{name, star}]};
  day.slots.push(slot);
  saveProgram(); render();
}

function openIoModal(){
  const box = $('#modalBox');
  box.innerHTML = `
    <div class="modal-title">Copia de seguridad <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <p class="io-desc">Descarga toda tu información (entrenos registrados, medidas y tu programa personalizado) en un Excel. Si algún día pierdes la app o cambias de móvil, puedes volver a cargarlo desde aquí.</p>
    <button class="btn btn-save" style="width:100%; margin-top:6px;" id="exportBtn">${ICONS.download} Exportar a Excel</button>
    <div class="io-divider">o</div>
    <label class="btn btn-add-set" for="importInput" style="width:100%; cursor:pointer;" id="importLabel">${ICONS.upload} Importar desde Excel</label>
    <input type="file" id="importInput" class="visually-hidden"
      accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
    <p class="io-warn">Importar sustituye los datos que tengas ahora mismo en este dispositivo.</p>
  `;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
  $('#exportBtn').addEventListener('click', exportExcel);
  $('#importInput').addEventListener('change', (e)=>{
    const file = e.target.files[0];
    // Se limpia el valor para que volver a elegir el mismo archivo dispare 'change'.
    e.target.value = '';
    if(file) importExcel(file);
  });
}

function openBadgesModal(g){
  const box = $('#modalBox');
  const rows = g.badges.map(b=>`
    <div class="badge-row ${b.on?'on':''}">
      <div class="ic">${b.icon}</div>
      <div class="tx"><b>${b.name} <span class="xpv">+${b.xpValue} XP</span></b><span>${b.desc}</span></div>
    </div>
  `).join('');
  box.innerHTML = `<div class="modal-title">Insignias <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <p class="io-desc">${g.badges.filter(b=>b.on).length} de ${g.badges.length} conseguidas. Cada insignia da XP una sola vez y se queda contigo para siempre.</p>
    <div class="badge-detail-list">${rows}</div>`;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
}

function openXpInfoModal(){
  const box = $('#modalBox');
  box.innerHTML = `
    <div class="modal-title">¿Cómo se gana XP? <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <p class="io-desc">El nivel 1 cuesta ${XP_LEVEL_BASE} XP, y cada nivel siguiente pide ${XP_LEVEL_STEP} XP más que el anterior — subir de nivel se pone cuesta arriba. Así se consigue y se pierde XP:</p>
    <div class="badge-detail-list">
      <div class="badge-row on"><div class="ic">✅</div><div class="tx"><b>Entreno Bueno <span class="xpv">+${XP_BY_QUALITY.bueno} XP</span></b><span>Calentamiento + 6 ejercicios + estiramiento ese día.</span></div></div>
      <div class="badge-row on"><div class="ic">🟡</div><div class="tx"><b>Entreno Mediocre <span class="xpv">+${XP_BY_QUALITY.mediocre} XP</span></b><span>Entrenaste ese día pero sin completar los tres requisitos.</span></div></div>
      <div class="badge-row on"><div class="ic">🔴</div><div class="tx"><b>Entreno Malo <span class="xpv">+${XP_BY_QUALITY.malo} XP</span></b><span>Menos de 4 ejercicios ese día.</span></div></div>
      <div class="badge-row"><div class="ic">💤</div><div class="tx"><b>Inactividad <span class="xpv neg">-${XP_INACTIVITY_PENALTY} XP / día</span></b><span>Si pasan más de ${XP_INACTIVITY_GRACE_DAYS} días seguidos sin entrenar, pierdes ${XP_INACTIVITY_PENALTY} XP por cada día extra de descanso.</span></div></div>
      <div class="badge-row on"><div class="ic">🏆</div><div class="tx"><b>Récord personal <span class="xpv">+${XP_PER_PR} XP</span></b><span>Cada vez que superas tu marca anterior en un ejercicio.</span></div></div>
      <div class="badge-row on"><div class="ic">🐲</div><div class="tx"><b>Derrotar un rival <span class="xpv">15–60 XP</span></b><span>Elige un monstruo en la pestaña Batalla. Cuanto más difícil, más XP da.</span></div></div>
      <div class="badge-row on"><div class="ic">🎖️</div><div class="tx"><b>Insignias <span class="xpv">variable</span></b><span>Cada insignia conseguida suma su propio XP una sola vez, y se queda para siempre en tu apartado de insignias conseguidas.</span></div></div>
    </div>
  `;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
}

function exportExcel(){
  const wb = XLSX.utils.book_new();
  const logsRows = [];
  state.logs.forEach(l=>{
    const kind = fieldsKind(l.cat, l.exercise);
    if(!l.sets || !l.sets.length){
      logsRows.push({Fecha:l.date, Categoria:l.cat, Musculo:l.muscle||'', Ejercicio:l.exercise, Serie:'Hecho', 'Reps o Minutos':'', 'Kg o Intensidad':'', 'Segundos':''});
    }else{
      l.sets.forEach((s,i)=>{
        logsRows.push({Fecha:l.date, Categoria:l.cat, Musculo:l.muscle||'', Ejercicio:l.exercise, Serie:i+1,
          'Reps o Minutos': kind==='cardio' ? (s.minutos||'') : kind==='isometrico' ? '' : (s.reps||''),
          'Kg o Intensidad': kind==='cardio' ? (s.intensidad||'') : kind==='isometrico' ? '' : (s.weight||''),
          'Segundos': kind==='isometrico' ? (s.segundos||'') : ''});
      });
    }
  });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(logsRows), 'Registros');
  const measRows = state.measures.map(m=>({
    Fecha:m.date, 'Peso (kg)':m.peso||'', 'Pecho (cm)':m.pecho||'', 'Cintura (cm)':m.cintura||'', 'Cadera (cm)':m.cadera||'',
    'Bíceps (cm)':m.biceps||'', 'Muslo (cm)':m.muslo||'', 'Gemelo (cm)':m.gemelo||''
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(measRows), 'Medidas');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([{programaJSON: JSON.stringify(state.program)}]), 'Programa');
  XLSX.writeFile(wb, 'gym-tracker-backup-'+todayStr()+'.xlsx');
  storageSet('gt:lastBackup', todayStr());
  closeModal();
}

async function importExcel(file){
  try{
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, {type:'array'});
    const logsSheet = wb.Sheets['Registros'];
    if(logsSheet){
      const rows = XLSX.utils.sheet_to_json(logsSheet);
      const grouped = new Map();
      rows.forEach(r=>{
        const fecha = String(r.Fecha||'');
        const cat = r.Categoria||'';
        const muscle = r.Musculo||'';
        const exercise = r.Ejercicio||'';
        const key = fecha+'|'+cat+'|'+muscle+'|'+exercise;
        if(!grouped.has(key)) grouped.set(key, {date:fecha, cat, muscle: muscle||undefined, exercise, sets:[]});
        const kind = fieldsKind(cat, exercise);
        const v1 = r['Reps o Minutos'], v2 = r['Kg o Intensidad'], v3 = r['Segundos'];
        if(r.Serie !== 'Hecho'){
          if(kind==='isometrico' && v3!==undefined && v3!==''){
            grouped.get(key).sets.push({segundos:v3});
          }else if(v1!==undefined && v1!=='' || v2!==undefined && v2!==''){
            grouped.get(key).sets.push(kind==='cardio' ? {minutos:v1||'', intensidad:v2||''} : {reps:v1||'', weight:v2||''});
          }
        }
      });
      state.logs = [...grouped.values()].map((l,i)=>({...l, id:Date.now()+'-'+i, slotId: l.slotId || ('imp-'+i)}));
      await saveLogs();
    }
    const measSheet = wb.Sheets['Medidas'];
    if(measSheet){
      const rows = XLSX.utils.sheet_to_json(measSheet);
      state.measures = rows.map((r,i)=>({
        id: Date.now()+i, date: String(r.Fecha||''),
        peso:r['Peso (kg)']||'', pecho:r['Pecho (cm)']||'', cintura:r['Cintura (cm)']||'', cadera:r['Cadera (cm)']||'',
        biceps:r['Bíceps (cm)']||'', muslo:r['Muslo (cm)']||'', gemelo:r['Gemelo (cm)']||''
      }));
      await saveMeasures();
    }
    const progSheet = wb.Sheets['Programa'];
    if(progSheet){
      const rows = XLSX.utils.sheet_to_json(progSheet);
      if(rows[0] && rows[0].programaJSON){ state.program = JSON.parse(rows[0].programaJSON); await saveProgram(); }
    }
    closeModal();
    showToast('Datos importados ✓');
    render();
  }catch(err){
    console.error(err);
    showToast('No se pudo leer el archivo');
  }
}

async function wipeAllData(){
  state.logs = [];
  state.measures = [];
  state.program = defaultProgram();
  state.slotIndex = {};
  state.pendingSets = {};
  state.calSelected = null;
  state.defeatedBosses = [];
  state.earnedBadgeIds = new Set();
  state.battleChoice = null;
  state.battlePickFamily = null;
  state.goals = {};
  state.equippedSet = null;
  await saveLogs();
  await saveMeasures();
  await saveProgram();
  await storageSet('gt:bosses', []);
  await storageSet('gt:badges', []);
  await storageSet('gt:battleChoice', null);
  await storageSet('gt:goals', {});
  await storageSet('gt:equippedSet', null);
  await storageSet('gt:lastBackup', null);
  showToast('Datos borrados');
  render();
}

function refreshSlot(slotId){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  const slot = day.slots.find(s=>s.id===slotId);
  const oldEl = document.querySelector('.slot[data-slot-id="'+slotId+'"]');
  if(!slot || !oldEl){ render(); return null; }
  const tmp = document.createElement('div');
  tmp.innerHTML = renderSlot(day, slot).trim();
  const newEl = tmp.firstElementChild;
  oldEl.replaceWith(newEl);
  bindSlotEvents(newEl);
  refreshMeter();
  return newEl;
}
function swapSlot(slotId, dir){
  const day = state.program.days.find(d=>d.id===state.activeDayId);
  const slot = day.slots.find(s=>s.id===slotId);
  const oldEl = document.querySelector('.slot[data-slot-id="'+slotId+'"]');
  if(!slot || !oldEl){ render(); return; }
  const tmp = document.createElement('div');
  tmp.innerHTML = renderSlot(day, slot).trim();
  const newEl = tmp.firstElementChild;
  oldEl.replaceWith(newEl);
  bindSlotEvents(newEl);
}
function bindSlotEvents(el){
  const slotId = el.dataset.slotId;
  el.querySelectorAll('[data-swipe]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const [id, dir] = btn.dataset.swipe.split(':');
      const day = state.program.days.find(d=>d.id===state.activeDayId);
      const slot = day.slots.find(s=>s.id===id);
      const cur = state.slotIndex[id] || 0;
      let next = (cur + parseInt(dir)) % slot.alts.length;
      if(next<0) next += slot.alts.length;
      state.slotIndex[id] = next;
      delete state.pendingSets[id];
      swapSlot(id, parseInt(dir));
    });
  });
  el.querySelectorAll('[data-addset]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.addset;
      const day = state.program.days.find(d=>d.id===state.activeDayId);
      const slot = day.slots.find(s=>s.id===id);
      const curName = slot.alts[(state.slotIndex[id]||0) % slot.alts.length].name;
      state.pendingSets[id] = state.pendingSets[id] || [];
      state.pendingSets[id].push(emptySet(slot.cat, curName));
      refreshSlot(id);
    });
  });
  el.querySelectorAll('.set-row input, .set-row select').forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const row = inp.closest('.set-row');
      const idx = parseInt(row.dataset.setidx);
      const field = inp.dataset.field;
      state.pendingSets[slotId][idx][field] = inp.value;
    });
  });
  el.querySelectorAll('.rm[data-rmset]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.rmset);
      const day = state.program.days.find(d=>d.id===state.activeDayId);
      const slot = day.slots.find(s=>s.id===slotId);
      const curName = slot.alts[(state.slotIndex[slotId]||0) % slot.alts.length].name;
      state.pendingSets[slotId].splice(idx,1);
      if(!state.pendingSets[slotId].length) state.pendingSets[slotId].push(emptySet(slot.cat, curName));
      refreshSlot(slotId);
    });
  });
  const saveBtn = el.querySelector('[data-save]');
  if(saveBtn) saveBtn.addEventListener('click', async ()=>{
    const day = state.program.days.find(d=>d.id===state.activeDayId);
    const slot = day.slots.find(s=>s.id===slotId);
    const idx = state.slotIndex[slotId] || 0;
    const exName = slot.alts[idx % slot.alts.length].name;
    const sets = (state.pendingSets[slotId]||[]).filter(s=>Object.values(s).some(v=>v!==''));
    if(!sets.length){ showToast('Añade al menos un dato'); return; }
    const t = activeDate();
    state.logs = state.logs.filter(l=>!(l.date===t && l.slotId===slotId));
    state.logs.push({ id: Date.now()+'-'+slotId, date: t, dayId: day.id, slotId, cat: slot.cat, muscle: slot.muscle, exercise: exName, sets: sets.map(s=>({...s})) });
    await saveLogs();
    showToast('Guardado ✓');
    refreshSlot(slotId);
  });
  const doneBtn = el.querySelector('[data-donetoggle]');
  if(doneBtn) doneBtn.addEventListener('click', async ()=>{
    const day = state.program.days.find(d=>d.id===state.activeDayId);
    const slot = day.slots.find(s=>s.id===slotId);
    const idx = state.slotIndex[slotId] || 0;
    const exName = slot.alts[idx % slot.alts.length].name;
    const t = activeDate();
    const already = state.logs.find(l=>l.date===t && l.slotId===slotId && l.exercise===exName);
    if(already){ state.logs = state.logs.filter(l=>l.id!==already.id); }
    else{ state.logs = state.logs.filter(l=>!(l.date===t && l.slotId===slotId)); state.logs.push({id:Date.now()+'-'+slotId, date:t, dayId:day.id, slotId, cat:slot.cat, muscle:slot.muscle, exercise:exName, sets:[]}); }
    await saveLogs();
    refreshSlot(slotId);
  });
  const starBtn = el.querySelector('[data-togglestar]');
  if(starBtn) starBtn.addEventListener('click', ()=>{
    const day = state.program.days.find(d=>d.id===state.activeDayId);
    const slot = day.slots.find(s=>s.id===slotId);
    const idx = state.slotIndex[slotId] || 0;
    const cur = slot.alts[idx % slot.alts.length];
    cur.star = !cur.star;
    saveProgram();
    refreshSlot(slotId);
  });
  const delBtn = el.querySelector('[data-deleteslot]');
  if(delBtn) delBtn.addEventListener('click', ()=>{
    if(!confirm('¿Quitar este ejercicio de hoy?')) return;
    const day = state.program.days.find(d=>d.id===state.activeDayId);
    day.slots = day.slots.filter(s=>s.id!==slotId);
    delete state.slotIndex[slotId];
    delete state.pendingSets[slotId];
    saveProgram(); render();
  });
}

/* ---------------- Tab: Medidas ---------------- */

let measuresChart = null;
// Para cada medida devuelve el último valor registrado, aunque venga de días
// distintos: si un día solo anotas el peso, el resto conserva su valor previo.
function mergedLatestMeasures(){
  const sorted = [...state.measures].sort((a,b)=>a.date.localeCompare(b.date));
  const out = {};
  MEASURE_FIELDS.forEach(f=>{
    for(let i=sorted.length-1; i>=0; i--){
      const v = sorted[i][f.key];
      if(v!=='' && v!=null){ out[f.key] = v; out[f.key+'_date'] = sorted[i].date; break; }
    }
  });
  return out;
}
function latestSummaryHtml(m){
  const val = (k, suf) => (m && m[k] !== undefined && m[k] !== '' && m[k] != null) ? m[k]+suf : '–';
  const goal = (k, suf) => (state.goals && state.goals[k]) ? `<span class="ls-goal">obj ${state.goals[k]}${suf}</span>` : '';
  return `
    <div class="ls-weight">${val('peso',' kg')}</div>
    <div class="ls-sub">Peso actual ${state.goals && state.goals.peso ? `· objetivo ${state.goals.peso} kg` : ''}</div>
    <div class="ls-grid">
      <div class="ls-item"><span class="ls-label">Pecho</span><span class="ls-val">${val('pecho',' cm')}</span>${goal('pecho','')}</div>
      <div class="ls-item"><span class="ls-label">Bíceps</span><span class="ls-val">${val('biceps',' cm')}</span>${goal('biceps','')}</div>
      <div class="ls-item"><span class="ls-label">Cintura</span><span class="ls-val">${val('cintura',' cm')}</span>${goal('cintura','')}</div>
      <div class="ls-item"><span class="ls-label">Cadera</span><span class="ls-val">${val('cadera',' cm')}</span>${goal('cadera','')}</div>
      <div class="ls-item"><span class="ls-label">Muslo</span><span class="ls-val">${val('muslo',' cm')}</span>${goal('muslo','')}</div>
      <div class="ls-item"><span class="ls-label">Gemelo</span><span class="ls-val">${val('gemelo',' cm')}</span>${goal('gemelo','')}</div>
    </div>
  `;
}
function renderMedidas(){
  const fieldsHtml = MEASURE_FIELDS.map(f=>`<div class="field"><label>${f.label}</label><input type="number" inputmode="decimal" id="mf-${f.key}" placeholder="—"></div>`).join('');
  const sorted = [...state.measures].sort((a,b)=>a.date.localeCompare(b.date));
  const latest = mergedLatestMeasures();
  const options = MEASURE_FIELDS.map(f=>`<option value="${f.key}">${f.label}</option>`).join('');
  const historyHtml = sorted.length ? [...sorted].reverse().map(m=>`
    <div class="history-row">
      <span class="hd">${fmtDate(m.date)}</span>
      <span class="hv">${MEASURE_FIELDS.filter(f=>m[f.key]!=='' && m[f.key]!=null).map(f=>`${f.label.split(' ')[0]}: ${m[f.key]}`).join(' · ') || '—'}</span>
      <button class="del" data-delmeasure="${m.id}">${ICONS.x}</button>
    </div>
  `).join('') : `<div class="empty-state"><p>Aún no hay medidas registradas.</p></div>`;
  return `
    <div class="chart-card">${sorted.length ? latestSummaryHtml(latest) : '<div class="empty-state"><p>Registra tus medidas para verlas aquí.</p></div>'}</div>
    <div class="section-label">Registrar hoy</div>
    <div class="measure-form">
      <div class="measure-grid">${fieldsHtml}</div>
      <button class="btn btn-save" style="width:100%; margin-top:12px;" id="saveMeasureBtn">Guardar medidas de hoy</button>
    </div>
    <button class="add-slot-btn" id="goalsBtn" style="margin-top:10px;">${ICONS.trend} Definir objetivos</button>
    <div class="chart-card">
      <div class="chart-head"><strong>Evolución</strong><select id="measureMetric">${options}</select></div>
      <canvas id="measuresCanvas" height="180"></canvas>
    </div>
    <div class="section-label">Historial</div>
    <div class="history-list">${historyHtml}</div>
  `;
}
const MEASURE_NEON = {
  peso:{line:'#f4f8ff', glow:'rgba(244,248,255,0.5)', point:'#ffffff', fill:'rgba(244,248,255,0.08)'},
  pecho:{line:'#e8433f', glow:'rgba(232,67,63,0.5)', point:'#f2938f', fill:'rgba(232,67,63,0.1)'},
  cintura:{line:'#35b56a', glow:'rgba(53,181,106,0.5)', point:'#8fe0ac', fill:'rgba(53,181,106,0.1)'},
  cadera:{line:'#35b56a', glow:'rgba(53,181,106,0.5)', point:'#8fe0ac', fill:'rgba(53,181,106,0.1)'},
  biceps:{line:'#f2b705', glow:'rgba(242,183,5,0.5)', point:'#f8d766', fill:'rgba(242,183,5,0.1)'},
  muslo:{line:'#2f7fd6', glow:'rgba(47,127,214,0.5)', point:'#8fb9e8', fill:'rgba(47,127,214,0.1)'},
  gemelo:{line:'#c77dff', glow:'rgba(199,125,255,0.5)', point:'#dcaeff', fill:'rgba(199,125,255,0.1)'}
};
function openGoalsModal(){
  const box = $('#modalBox');
  const rows = MEASURE_FIELDS.map(f=>`
    <div class="field"><label>${f.label}</label>
      <input type="number" inputmode="decimal" id="gf-${f.key}" placeholder="—" value="${state.goals[f.key]!=null?state.goals[f.key]:''}">
    </div>`).join('');
  box.innerHTML = `<div class="modal-title">Objetivos <button class="modal-close" id="modalCloseBtn">${ICONS.x}</button></div>
    <p class="io-desc">Se dibujarán como una línea horizontal en la gráfica de evolución. Deja un campo vacío para no fijar objetivo.</p>
    <div class="measure-grid">${rows}</div>
    <button class="btn btn-save" style="width:100%;margin-top:14px;" id="saveGoalsBtn">Guardar objetivos</button>`;
  $('#modalOverlay').classList.add('open');
  $('#modalCloseBtn').addEventListener('click', closeModal);
  $('#saveGoalsBtn').addEventListener('click', async ()=>{
    const next = {};
    MEASURE_FIELDS.forEach(f=>{
      const v = $('#gf-'+f.key).value.trim();
      if(v!=='' && !isNaN(parseFloat(v))) next[f.key] = parseFloat(v);
    });
    state.goals = next;
    await storageSet('gt:goals', next);
    closeModal();
    showToast('Objetivos guardados ✓');
    render();
  });
}
function drawMeasuresChart(metric){
  const canvas = $('#measuresCanvas');
  if(!canvas) return;
  const sorted = [...state.measures].filter(m=>m[metric]!=='' && m[metric]!=null).sort((a,b)=>a.date.localeCompare(b.date));
  if(measuresChart){ measuresChart.destroy(); }
  const neon = MEASURE_NEON[metric] || MEASURE_NEON.peso;
  const rawGoal = state.goals ? state.goals[metric] : null;
  const goalValue = (rawGoal!=='' && rawGoal!=null && !isNaN(parseFloat(rawGoal))) ? parseFloat(rawGoal) : null;
  measuresChart = new Chart(canvas, {
    type:'line',
    data:{ labels: sorted.map(m=>fmtDate(m.date)), datasets:[
      { data: sorted.map(m=>m[metric]), borderColor:neon.line, backgroundColor:neon.fill, borderWidth:2.5, pointRadius:3.5, pointBackgroundColor:neon.point, pointBorderColor:neon.line, tension:.3, fill:true },
      ...(goalValue!=null ? [{ label:'Objetivo', data: sorted.map(()=>goalValue), borderColor:'#f2b705', borderWidth:1.8, borderDash:[6,5], pointRadius:0, fill:false, tension:0 }] : [])
    ] },
    options:{ plugins:{legend:{display:false}}, scales:{ y:{grid:{color:'rgba(255,255,255,.06)'}, ticks:{color:'#9a9d9f', font:{size:10.5}}}, x:{grid:{display:false}, ticks:{color:'#9a9d9f', font:{size:10.5}}} } }
  });
}

/* ---------------- Tab: Progreso (gamificación + evolución) ---------------- */

function gamiHeaderHtml(g){
  const tier = PLATE_TIERS[(g.level-1)%PLATE_TIERS.length];
  const circ = 2*Math.PI*30;
  const offset = circ * (1 - g.progress);
  return `
    <div class="gami-card" id="gamiHeader">
      <div class="level-plate">
        <svg viewBox="0 0 72 72"><circle class="track" cx="36" cy="36" r="30"/><circle class="prog" cx="36" cy="36" r="30" stroke="${tier}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/></svg>
        <div class="num"><b>${g.level}</b><span>Nivel</span></div>
      </div>
      <div class="gami-info">
        <div class="gami-title">Progreso de entrenamiento <button class="info-btn" id="xpInfoBtn" title="¿Cómo se gana XP?">i</button></div>
        <div class="gami-xp mono">${g.xpInLevel} / ${g.xpForNext} XP</div>
        <div class="xp-bar"><div class="xp-fill" style="width:${Math.round(g.progress*100)}%"></div></div>
        <div class="streak-row">${ICONS.flame}<span>Racha actual: <b>${g.streak}</b> día(s) · Récord: <b>${g.maxStreak}</b></span></div>
      </div>
    </div>
  `;
}
function badgesGridHtml(g){
  const earned = g.badges.filter(b=>b.on);
  const body = earned.length
    ? `<div class="badges-grid" id="badgesGrid">${earned.map(b=>`<div class="badge on" title="${b.desc}"><div class="ic">${b.icon}</div><div class="bn">${b.name}</div></div>`).join('')}</div>`
    : `<div class="empty-state" style="padding:22px 16px;"><p>Aún no tienes insignias. Entrena y aparecerán aquí para quedarse.</p></div>`;
  return `<div class="section-label">Insignias conseguidas (${earned.length}/${g.badges.length}) — <a href="#" id="allBadgesLink">ver todas</a></div>${body}`;
}

function evoListHtml(){
  const relevant = state.logs.filter(l=>l.cat!=='estiramiento');
  const groupOf = l => l.cat==='calentamiento' ? 'Calentamiento' : (l.muscle || 'Otros');
  const keyOf = l => groupOf(l)+'|'+l.exercise;
  const keys = [...new Set(relevant.map(keyOf))];
  if(!keys.length){
    return `<div class="section-label">Evolución</div><div class="empty-state">${ICONS.trend}<p>Cuando registres series en la pestaña Hoy,<br>aquí verás tu progreso por ejercicio.</p></div>`;
  }
  const groups = {};
  keys.forEach(k=>{ const group = k.split('|')[0]; (groups[group] = groups[group] || []).push(k); });
  const groupNames = Object.keys(groups).sort((a,b)=> a==='Calentamiento' ? -1 : b==='Calentamiento' ? 1 : a.localeCompare(b,'es'));
  const UNIT_LABEL = {cardio:'min máx', isometrico:'seg máx', principal:'kg máx'};
  const body = groupNames.map(group=>{
    const itemsHtml = groups[group].sort().map(key=>{
      const name = key.split('|')[1];
      const entries = relevant.filter(l=>keyOf(l)===key);
      const kind = fieldsKind(entries[0].cat, name);
      const prDates = kind==='cardio' ? new Set() : prDatesForExercise(name);
      let maxV = 0, lastDate = '';
      entries.forEach(e=>{
        const v = maxValueOfEntry(e); if(v>maxV) maxV = v;
        if(e.date > lastDate) lastDate = e.date;
      });
      return `
        <div class="evo-item" data-evo="${key}">
          <div class="evo-top">
            <div>
              <div class="evo-name">${name}${prDates.size?` <span class="pr">🏆</span>`:''}</div>
              <div class="evo-meta">Última vez: ${fmtDate(lastDate)} · ${entries.length} sesión(es)</div>
            </div>
            <div class="evo-max">${maxV || '–'}<span>${UNIT_LABEL[kind]}</span></div>
          </div>
          <div class="evo-detail"></div>
        </div>
      `;
    }).join('');
    return `<div class="muscle-group"><div class="muscle-title">${group}</div>${itemsHtml}</div>`;
  }).join('');
  return `<div class="section-label">Evolución por ejercicio</div>${body}`;
}

function evoDetailHtml(key){
  const [group, name] = key.split('|');
  const entries = state.logs.filter(l=>(l.cat==='calentamiento'?'Calentamiento':(l.muscle||'Otros'))===group && l.exercise===name).sort((a,b)=>a.date.localeCompare(b.date));
  const kind = entries.length ? fieldsKind(entries[0].cat, name) : 'principal';
  const prDates = kind==='cardio' ? new Set() : prDatesForExercise(name);
  const rowsHtml = entries.slice().reverse().map(e=>{
    const q = classifyDay(e.date);
    const setsLine = setsLineFor(e);
    return `
      <div class="evo-hist-row">
        <span class="ehr-date mono">${fmtDate(e.date)}</span>
        ${q ? `<span class="ehr-q q-${q}" title="${QUALITY_LABEL[q]}"></span>` : ''}
        <span class="ehr-sets">${setsLine}</span>
        ${prDates.has(e.date) ? '<span class="ehr-pr">🏆</span>' : ''}
      </div>`;
  }).join('');
  return `<canvas class="evo-canvas" height="130"></canvas><div class="evo-sessions">${rowsHtml}</div>`;
}

const NEON_COLORS = ['#2f7fd6','#f2b705','#35b56a','#e8433f','#c77dff','#f4f8ff','#ff8fb0'];
function neonForKey(key){
  let h = 0;
  for(let i=0;i<key.length;i++) h = (h*31 + key.charCodeAt(i)) >>> 0;
  return NEON_COLORS[h % NEON_COLORS.length];
}
let evoCharts = {};
function drawEvoChart(key, canvas){
  if(!canvas) return;
  const [group, name] = key.split('|');
  const entries = state.logs.filter(l=>(l.cat==='calentamiento'?'Calentamiento':(l.muscle||'Otros'))===group && l.exercise===name).sort((a,b)=>a.date.localeCompare(b.date));
  const data = entries.map(e=> maxValueOfEntry(e));
  if(evoCharts[key]) evoCharts[key].destroy();
  const color = neonForKey(key);
  evoCharts[key] = new Chart(canvas, {
    type:'line',
    data:{ labels: entries.map(e=>fmtDate(e.date)), datasets:[{ data, borderColor:color, backgroundColor:color+'22', borderWidth:2.5, pointRadius:3.5, pointBackgroundColor:color, pointBorderColor:color, tension:.3, fill:true }] },
    options:{ plugins:{legend:{display:false}}, scales:{ y:{grid:{color:'rgba(255,255,255,.06)'}, ticks:{color:'#9a9d9f', font:{size:10.5}}}, x:{grid:{display:false}, ticks:{color:'#9a9d9f', font:{size:10.5}}} } }
  });
}
function toggleEvoDetail(item){
  const key = item.dataset.evo;
  const detail = item.querySelector('.evo-detail');
  const isOpen = detail.classList.contains('open');
  document.querySelectorAll('.evo-item').forEach(other=>{
    if(other===item) return;
    const d = other.querySelector('.evo-detail');
    if(d) d.classList.remove('open');
  });
  if(isOpen){ detail.classList.remove('open'); return; }
  if(!detail.dataset.rendered){
    detail.innerHTML = evoDetailHtml(key);
    detail.dataset.rendered = '1';
  }
  detail.classList.add('open');
  requestAnimationFrame(()=> drawEvoChart(key, detail.querySelector('canvas')));
}

function renderProgreso(){
  return evoListHtml();
}

/* ---------------- Tab: Calendario ---------------- */

const WEEKDAY_LABELS = ['L','M','X','J','V','S','D'];
const MONTH_LABELS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function ymd(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

// Qué día de rutina (d1..d5) se entrenó en una fecha, según los propios registros.
function trainingDayIdFor(dateStr){
  const log = state.logs.find(l=>l.date===dateStr && l.dayId);
  return log ? log.dayId : null;
}
function trainingDayLabelFor(dateStr){
  const id = trainingDayIdFor(dateStr);
  if(!id) return null;
  const day = state.program.days.find(d=>d.id===id);
  return day ? `${day.name} · ${day.subtitle}` : null;
}
function calGridHtml(){
  const y = state.calYear, m = state.calMonth;
  const first = new Date(y, m, 1);
  const startOffset = (first.getDay()+6)%7; // Monday=0
  const daysInMonth = new Date(y, m+1, 0).getDate();
  const todayS = todayStr();
  let cells = '';
  for(let i=0;i<startOffset;i++) cells += `<div class="cal-day empty"></div>`;
  for(let d=1; d<=daysInMonth; d++){
    const dateStr = ymd(y,m,d);
    const q = classifyDay(dateStr);
    const cls = ['cal-day'];
    if(q) cls.push('q-'+q);
    if(dateStr===todayS) cls.push('today');
    if(dateStr===state.calSelected) cls.push('selected');
    const dayId = trainingDayIdFor(dateStr);
    const dayTag = dayId ? `<span class="cal-day-tag">${dayId.replace('d','D')}</span>` : '';
    cells += `<div class="${cls.join(' ')}" data-date="${dateStr}">${d}${dayTag}${q?'<span class="dot"></span>':''}</div>`;
  }
  return cells;
}

function dayDetailHtml(dateStr){
  if(!dateStr) return `<div class="empty-state">${ICONS.cal}<p>Toca un día del calendario<br>para ver el detalle del entreno.</p></div>`;
  const logs = logsForDate(dateStr);
  const meas = state.measures.find(m=>m.date===dateStr);
  const q = classifyDay(dateStr);
  if(!logs.length && !meas){
    return `<div class="day-detail-head"><h3>${fmtDateLong(dateStr)}</h3></div><div class="empty-state"><p>No hay ningún registro este día.</p></div><button class="add-slot-btn" data-editday="${dateStr}">${ICONS.swap} Registrar en este día</button>`;
  }
  const catOrder = {calentamiento:0, principal:1, estiramiento:2};
  const sorted = [...logs].sort((a,b)=>(catOrder[a.cat]-catOrder[b.cat]));
  const exercisesHtml = sorted.map(l=>{
    const setsLine = setsLineFor(l);
    return `<div class="dd-exercise">
      <div class="dd-exercise-name">${l.exercise}</div>
      <div class="dd-exercise-meta">${CAT_LABELS[l.cat]}${l.muscle?' · '+l.muscle:''}</div>
      <div class="dd-sets">${setsLine}</div>
    </div>`;
  }).join('');
  const measHtml = meas ? `<div class="dd-exercise"><div class="dd-exercise-name">Medidas del día</div><div class="dd-sets">${MEASURE_FIELDS.filter(f=>meas[f.key]!=='' && meas[f.key]!=null).map(f=>`${f.label}: <b>${meas[f.key]}</b>`).join(' · ') || '—'}</div></div>` : '';
  return `
    <div class="day-detail-head">
      <h3>${fmtDateLong(dateStr)}${trainingDayLabelFor(dateStr) ? `<span class="dd-day">${trainingDayLabelFor(dateStr)}</span>` : ''}</h3>
      ${q ? `<span class="day-detail-tag q-${q}" style="background:${q==='bueno'?'var(--green-dim)':q==='mediocre'?'var(--yellow-dim)':'var(--red-dim)'};color:${q==='bueno'?'var(--green)':q==='mediocre'?'var(--yellow)':'var(--red)'}">${QUALITY_LABEL[q]}</span>` : ''}
    </div>
    ${exercisesHtml}${measHtml}
    <button class="add-slot-btn" data-editday="${dateStr}">${ICONS.swap} Editar este día</button>
  `;
}

function renderCalendario(){
  if(state.calYear===null){ const n = new Date(); state.calYear = n.getFullYear(); state.calMonth = n.getMonth(); }
  const weekdaysHtml = WEEKDAY_LABELS.map(w=>`<span>${w}</span>`).join('');
  return `
    <div class="cal-card">
      <div class="cal-head">
        <span class="cal-title">${MONTH_LABELS[state.calMonth]} ${state.calYear}</span>
        <div class="cal-nav">
          <button class="swipe-btn" id="calPrev">${ICONS.chevLeft}</button>
          <button class="swipe-btn" id="calNext">${ICONS.chevRight}</button>
        </div>
      </div>
      <div class="cal-weekdays">${weekdaysHtml}</div>
      <div class="cal-grid" id="calGrid">${calGridHtml()}</div>
      <div class="cal-legend">
        <span class="li"><span class="sw q-bueno"></span>Bueno</span>
        <span class="li"><span class="sw q-mediocre"></span>Mediocre</span>
        <span class="li"><span class="sw q-malo"></span>Malo</span>
      </div>
    </div>
    <div class="day-detail" id="dayDetailContainer">${dayDetailHtml(state.calSelected)}</div>
    <div class="section-label">Datos</div>
    <div style="display:flex;gap:8px;">
      <button class="add-slot-btn" id="ioBtn" style="margin:0;flex:2;">${ICONS.swap} Exportar / importar</button>
      <button class="add-slot-btn" id="wipeBtn" style="margin:0;flex:1;border-color:rgba(232,67,63,.5);color:var(--red);font-size:11px;padding:11px 6px;position:relative;overflow:hidden;">
        <span id="wipeBtnFill" style="position:absolute;left:0;top:0;bottom:0;width:0%;background:rgba(232,67,63,.28);transition:width .05s linear;"></span>
        <span style="position:relative;">Borrar datos</span>
      </button>
    </div>
  `;
}
function selectCalDay(dateStr){
  state.calSelected = dateStr;
  document.querySelectorAll('.cal-day.selected').forEach(el=>el.classList.remove('selected'));
  const dayEl = document.querySelector(`.cal-day[data-date="${dateStr}"]`);
  if(dayEl) dayEl.classList.add('selected');
  const container = document.getElementById('dayDetailContainer');
  if(container) container.innerHTML = dayDetailHtml(dateStr);
}

/* ---------------- Tab handlers ---------------- */

function enterEditMode(dateStr){
  state.editDate = dateStr;
  state.pendingSets = {};
  const loggedDay = trainingDayIdFor(dateStr);
  if(loggedDay) state.activeDayId = loggedDay;
  state.tab = 'hoy';
  render();
  showToast(`Editando ${fmtDate(dateStr)}`);
}
function exitEditMode(){
  state.editDate = null;
  state.pendingSets = {};
  state.tab = 'calendario';
  render();
}
function bindDayChips(){
  $$('.day-chip').forEach(el=>{
    el.addEventListener('click', async ()=>{
      const newDay = el.dataset.day;
      if(newDay === state.activeDayId) return;
      const target = activeDate();
      const todayLogs = state.logs.filter(l=>l.date===target);
      if(todayLogs.length>0){
        const msg = isEditingPast()
          ? `Cambiar de día de entrenamiento borrará lo registrado el ${fmtDate(target)}. ¿Quieres continuar?`
          : 'Cambiar de día de entrenamiento borrará el progreso que has registrado hoy. ¿Quieres continuar?';
        if(!confirm(msg)) return;
        state.logs = state.logs.filter(l=>l.date!==target);
        state.pendingSets = {};
        await saveLogs();
        showToast(isEditingPast() ? 'Registros del día borrados' : 'Progreso de hoy borrado');
      }
      state.activeDayId = newDay;
      if(!isEditingPast()) await storageSet('gt:activeDayId', newDay);
      render();
    });
  });
}

function attachTabHandlers(){
  if(state.tab==='hoy'){
    bindDayChips();
    const exitEditBtn = $('#exitEditBtn');
    if(exitEditBtn) exitEditBtn.addEventListener('click', exitEditMode);
    $$('.slot').forEach(el=>bindSlotEvents(el));
    $$('[data-add-zone]').forEach(el=>{ el.addEventListener('click', ()=>{ openAddExerciseModal(el.dataset.addZone); }); });
  }
  if(state.tab==='medidas'){
    $('#saveMeasureBtn').addEventListener('click', async ()=>{
      const entry = {id:Date.now(), date: todayStr()};
      let any = false;
      MEASURE_FIELDS.forEach(f=>{ const v = $('#mf-'+f.key).value; entry[f.key] = v; if(v!=='') any = true; });
      if(!any){ showToast('Introduce al menos un dato'); return; }
      state.measures = state.measures.filter(m=>m.date!==entry.date);
      state.measures.push(entry);
      await saveMeasures();
      showToast('Medidas guardadas ✓');
      render();
    });
    $$('[data-delmeasure]').forEach(el=>{
      el.addEventListener('click', async ()=>{
        const id = parseInt(el.dataset.delmeasure);
        state.measures = state.measures.filter(m=>m.id!==id);
        await saveMeasures();
        render();
      });
    });
    $('#goalsBtn').addEventListener('click', openGoalsModal);
    const metricSel = $('#measureMetric');
    metricSel.addEventListener('change', ()=>drawMeasuresChart(metricSel.value));
    drawMeasuresChart(metricSel.value);
  }
  if(state.tab==='calendario'){
    $('#calPrev').addEventListener('click', ()=>{
      state.calMonth--; if(state.calMonth<0){ state.calMonth=11; state.calYear--; }
      render();
    });
    $('#calNext').addEventListener('click', ()=>{
      state.calMonth++; if(state.calMonth>11){ state.calMonth=0; state.calYear++; }
      render();
    });
    $('#ioBtn').addEventListener('click', openIoModal);
    const wipeBtn = $('#wipeBtn');
    const wipeFill = $('#wipeBtnFill');
    let wipeInterval = null, wipeStart = null;
    function cancelWipe(){
      if(wipeInterval){ clearInterval(wipeInterval); wipeInterval = null; }
      if(wipeFill) wipeFill.style.width = '0%';
    }
    function startWipe(){
      wipeStart = Date.now();
      cancelWipe();
      wipeInterval = setInterval(()=>{
        const pct = Math.min(100, ((Date.now()-wipeStart)/3000)*100);
        wipeFill.style.width = pct + '%';
        if(pct >= 100){
          cancelWipe();
          if(confirm('¿Seguro que quieres borrar TODOS los datos? Esta acción no se puede deshacer.')){
            wipeAllData();
          }
        }
      }, 40);
    }
    ['mousedown','touchstart'].forEach(ev=>wipeBtn.addEventListener(ev, startWipe));
    ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev=>wipeBtn.addEventListener(ev, cancelWipe));
  }
  if(state.tab==='batalla'){
    bindDayChips();
    const infoBtn = $('#xpInfoBtn');
    if(infoBtn) infoBtn.addEventListener('click', openXpInfoModal);
    const allLink = $('#allBadgesLink');
    if(allLink) allLink.addEventListener('click', (e)=>{ e.preventDefault(); openBadgesModal(computeGamification()); });
    const bestiaryLink = $('#bestiaryLink');
    if(bestiaryLink) bestiaryLink.addEventListener('click', (e)=>{ e.preventDefault(); openBestiaryModal(); });
    $$('[data-pick-monster]').forEach(el=>{
      el.addEventListener('click', ()=> chooseMonster(el.dataset.pickMonster));
    });
    $$('[data-pick-family]').forEach(el=>{
      el.addEventListener('click', ()=>{ state.battlePickFamily = el.dataset.pickFamily; render(); });
    });
    $$('[data-equip]').forEach(el=>{
      el.addEventListener('click', ()=> equiparSet(el.dataset.equip || null));
    });
    const backLink = $('#backToElementsLink');
    if(backLink) backLink.addEventListener('click', (e)=>{ e.preventDefault(); state.battlePickFamily = null; render(); });
    const changeBtn = $('#changeMonsterBtn');
    if(changeBtn) changeBtn.addEventListener('click', abandonarCombate);
  }
}

function attachGlobalHandlers(){
  $('#main').addEventListener('click', (e)=>{
    const thumb = e.target.closest('[data-eximg]');
    if(thumb){ e.stopPropagation(); openExerciseImgModal(thumb.dataset.eximg, thumb.dataset.exname); return; }
    if(state.tab==='progreso'){
      const item = e.target.closest('.evo-item');
      if(item){ toggleEvoDetail(item); return; }
    }
    if(state.tab==='calendario'){
      const editBtn = e.target.closest('[data-editday]');
      if(editBtn){ enterEditMode(editBtn.dataset.editday); return; }
      const day = e.target.closest('.cal-day');
      if(day && !day.classList.contains('empty')){ selectCalDay(day.dataset.date); return; }
    }
  });
  $('.tabbar').addEventListener('click', (e)=>{
    const btn = e.target.closest('.tab-btn');
    if(!btn) return;
    state.tab = btn.dataset.tab;
    if(state.tab !== 'batalla') state.battlePickFamily = null;
    // Salir de la pestaña Hoy abandona el modo edición, para no guardar sin querer
    // en una fecha pasada al volver más tarde.
    if(state.tab !== 'hoy' && state.editDate){ state.editDate = null; state.pendingSets = {}; }
    render();
  });
  $('#modalOverlay').addEventListener('click', (e)=>{ if(e.target.id === 'modalOverlay') closeModal(); });
}

async function requestPersistentStorage(){
  try{
    if(navigator.storage && navigator.storage.persist && !(await navigator.storage.persisted())){
      await navigator.storage.persist();
    }
  }catch(e){}
}
async function maybeShowBackupReminder(){
  const workoutDays = allWorkoutDates().size;
  if(workoutDays < 3) return;
  const last = await storageGet('gt:lastBackup');
  const daysSince = last ? Math.floor((new Date(todayStr()+'T00:00:00') - new Date(last+'T00:00:00'))/86400000) : Infinity;
  if(daysSince >= 14){
    setTimeout(()=> showToast('📦 Hace tiempo que no haces copia de seguridad — expórtala en Calendario'), 1400);
  }
}

// Índice de imágenes disponibles. Si falla, simplemente no se muestran los
// botones de información: la app funciona igual.
async function loadExerciseImageIndex(){
  try{
    const r = await fetch('icons/ejercicios/index.json');
    if(r.ok) state.exerciseImages = new Set(await r.json());
  }catch(e){}
}
async function init(){
  await migrateLegacyIfNeeded();
  await loadExerciseImageIndex();
  await loadProgram();
  await loadData();
  attachGlobalHandlers();
  render();
  requestPersistentStorage();
  maybeShowBackupReminder();
}

init();
})();
