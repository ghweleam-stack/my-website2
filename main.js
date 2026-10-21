// ===== البيانات: فعاليات تجريبية (وهمية) =====
const CATS={culture:'ثقافة',sport:'رياضة',music:'موسيقى',family:'عائلي',tech:'تقنية'};
const EVENTS=[
{id:1,t:'مهرجان الثقافة الافتراضي',c:'culture',d:'2026-10-24',h:'18:00',p:'Zoom',s:'ندوات وحوارات مع أدباء ومفكرين.',l:'مهرجان ثقافي يضم ندوات وأمسيات شعرية وحوارات مفتوحة مع نخبة من الأدباء والمفكرين، مع فقرات تفاعلية للطلاب.',f:1},
{id:2,t:'بطولة الشطرنج الإلكترونية',c:'sport',d:'2026-10-25',h:'16:00',p:'Lichess',s:'بطولة بين طلاب الكليات المختلفة.',l:'بطولة شطرنج بنظام سويسري تجمع طلاب الجامعة، مع جوائز رمزية للفائزين وشهادات مشاركة.',f:1},
{id:3,t:'أمسية العود والموسيقى الشرقية',c:'music',d:'2026-10-27',h:'20:00',p:'Microsoft Teams',s:'بث مباشر لأمسية موسيقية هادئة.',l:'أمسية موسيقية مباشرة تقدم أجمل المقطوعات الشرقية بمشاركة عازفين من طلاب الجامعة.',f:1},
{id:4,t:'يوم العائلة الافتراضي',c:'family',d:'2026-10-30',h:'17:00',p:'Zoom',s:'مسابقات وألعاب لكل أفراد الأسرة.',l:'يوم مخصص لعائلات الطلاب فيه مسابقات وألعاب جماعية وفقرات ترفيهية للصغار والكبار.'},
{id:5,t:'هاكاثون الويب 24 ساعة',c:'tech',d:'2026-11-05',h:'09:00',p:'Moodle',s:'ابنِ مشروع ويب خلال يوم كامل.',l:'تحدٍّ برمجي لفرق من 3-5 طلاب لبناء موقع ويب كامل خلال 24 ساعة، مع لجنة تحكيم ومكافآت.',f:1},
{id:6,t:'معرض الكتاب الرقمي',c:'culture',d:'2026-11-08',h:'10:00',p:'Moodle',s:'كتب إلكترونية وورش قراءة.',l:'معرض يعرض مئات الكتب الإلكترونية المجانية مع ورش عن مهارات القراءة السريعة وتلخيص الكتب.'},
{id:7,t:'ماراثون الخطوات الجامعي',c:'sport',d:'2026-11-12',h:'07:00',p:'المركز الرئيسي - دمشق',s:'سباق مشي وجري للجميع.',l:'ماراثون صحي حضوري وافتراضي يشجع على النشاط البدني، ويمكن المشاركة عبر تطبيقات تتبّع الخطى.'},
{id:8,t:'ليلة الإنشاد والمواهب',c:'music',d:'2026-11-15',h:'19:30',p:'Microsoft Teams',s:'مواهب الطلاب في الغناء والإنشاد.',l:'ليلة تعرض مواهب الطلاب في الإنشاد والغناء والعزف، مع تصويت الجمهور لاختيار أفضل أداء.'}];
EVENTS.forEach(e=>e.img='assets/img/e'+e.id+'.svg');

const $=(s,r=document)=>r.querySelector(s);
const today=new Date().toISOString().slice(0,10);
const fmt=d=>new Date(d+'T00:00').toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'});
const store={get:k=>{try{return localStorage.getItem(k)}catch(_){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};

// تنبيه Bootstrap Alert
function alertBox(target,type,text){target.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show">${text}<button class="btn-close ms-0 me-auto" data-bs-dismiss="alert"></button></div>`}

// بطاقة فعالية (Bootstrap Card + Badge)
function card(e){
  const tag=e.d===today?'<span class="badge bg-danger ms-1">🔴 الحدث اليوم</span>':'';
  return `<div class="col-sm-6 col-lg-3"><div class="card ev-card h-100"><img src="${e.img}" class="card-img-top" alt="${e.t}">
  <div class="card-body d-flex flex-column"><div><span class="badge cat-${e.c}">${CATS[e.c]}</span>${tag}</div>
  <h5 class="mt-2">${e.t}</h5><p class="small text-muted mb-1">📅 ${fmt(e.d)} — ${e.h}</p><p class="small text-muted">📍 ${e.p}</p>
  <p class="small">${e.s}</p><a href="event.html?id=${e.id}" class="btn btn-primary btn-sm mt-auto">التفاصيل</a></div></div></div>`}

// ===== الوضع الداكن (Bonus) =====
const root=document.documentElement;
if(store.get('theme')==='dark')root.dataset.bsTheme='dark';
$('#theme').onclick=()=>{const d=root.dataset.bsTheme!=='dark';root.dataset.bsTheme=d?'dark':'light';store.set('theme',d?'dark':'light')};

// ===== زر العودة للأعلى (Bonus) =====
const up=document.createElement('button');up.id='up';up.className='btn btn-warning rounded-circle';up.textContent='↑';
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});document.body.appendChild(up);
addEventListener('scroll',()=>up.style.display=scrollY>300?'block':'none');

const page=location.pathname.split('/').pop()||'index.html';

// ===== الرئيسية: سلايدر + تصنيفات + أحدث الفعاليات =====
if($('#featured')){
  const f=EVENTS.filter(e=>e.f);
  $('#featured').innerHTML=`<div id="cr" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner">
  ${f.map((e,i)=>`<div class="carousel-item ${i?'':'active'}"><img src="${e.img}" class="d-block w-100 slide-img" alt="${e.t}">
  <div class="carousel-caption"><span class="badge cat-${e.c}">${CATS[e.c]}</span><h3>${e.t}</h3><p>${e.s} — ${fmt(e.d)}</p><a href="event.html?id=${e.id}" class="btn btn-warning btn-sm">التفاصيل</a></div></div>`).join('')}</div>
  <button class="carousel-control-prev" data-bs-target="#cr" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
  <button class="carousel-control-next" data-bs-target="#cr" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button></div>`;
  $('#cats').innerHTML=Object.entries(CATS).map(([k,v])=>`<a href="events.html?cat=${k}" class="badge cat-${k} fs-6 px-4 py-2 text-decoration-none">${v}</a>`).join('');
  $('#latest').innerHTML=[...EVENTS].sort((a,b)=>b.id-a.id).slice(0,4).map(card).join('');
}

// ===== صفحة الفعاليات: بحث + فلترة (تصنيف/مكان/تاريخ) =====
if($('#list')){
  Object.entries(CATS).forEach(([k,v])=>$('#cat').add(new Option(v,k)));
  [...new Set(EVENTS.map(e=>e.p))].forEach(p=>$('#place').add(new Option(p,p)));
  // التصنيف من الرابط، وإلا من التفضيل المحفوظ (Bonus: localStorage)
  $('#cat').value=new URLSearchParams(location.search).get('cat')||store.get('cat')||'';
  const draw=()=>{
    const q=$('#q').value.trim(),c=$('#cat').value,p=$('#place').value,d=$('#from').value;
    store.set('cat',c);
    const r=EVENTS.filter(e=>(!q||e.t.includes(q))&&(!c||e.c===c)&&(!p||e.p===p)&&(!d||e.d>=d));
    $('#count').textContent=`عدد النتائج: ${r.length}`;
    $('#list').innerHTML=r.length?r.map(card).join(''):'<div class="alert alert-warning">لا توجد فعاليات مطابقة.</div>';
  };
  ['q','cat','place','from'].forEach(i=>$('#'+i).addEventListener('input',draw));draw();
}

// ===== صفحة التفاصيل =====
if($('#etitle')){
  const e=EVENTS.find(x=>x.id==new URLSearchParams(location.search).get('id'))||EVENTS[0];
  document.title=e.t;
  $('#etitle').textContent=e.t;$('#ecat').textContent=CATS[e.c];$('#ecat').className='badge mb-2 cat-'+e.c;
  $('#emeta').textContent=`📅 ${fmt(e.d)} — ⏰ ${e.h} — 📍 ${e.p}`;
  $('#eimg').src=e.img;$('#eimg').alt=e.t;$('#edesc').textContent=e.l;
  $('#einfo').innerHTML=`${fmt(e.d)}<br>الساعة ${e.h}<br>${e.p}`;
  $('#gal').innerHTML=[0,1,2].map(i=>{const o=EVENTS[(e.id+i)%EVENTS.length];return `<div class="col-4"><img src="${o.img}" class="img-fluid rounded" alt=""></div>`}).join('');
  $('#related').innerHTML=EVENTS.filter(x=>x.c===e.c&&x.id!==e.id||x.id===(e.id%8)+1&&x.c!==e.c).slice(0,4).map(card).join('');
  // أضف للتقويم: توليد ملف ICS
  $('#cal').onclick=()=>{
    const s=e.d.replace(/-/g,'')+'T'+e.h.replace(':','')+'00';
    const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${e.t}\nDTSTART:${s}\nLOCATION:${e.p}\nDESCRIPTION:${e.s}\nEND:VEVENT\nEND:VCALENDAR`;
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='event.ics';a.click();
    alertBox($('#alertbox'),'success','✅ تم تنزيل ملف التقويم.');
  };
  // مشاركة: Web Share أو نسخ الرابط
  $('#share').onclick=async()=>{
    try{if(navigator.share)await navigator.share({title:e.t,url:location.href});else{await navigator.clipboard.writeText(location.href);alertBox($('#alertbox'),'info','🔗 تم نسخ رابط الفعالية.')}}catch(_){alertBox($('#alertbox'),'warning','تعذّرت المشاركة.')}
  };
  // حجز وهمي داخل Modal
  $('#bok').onclick=()=>{
    if($('#bn').value.trim().length<2||!/^\S+@\S+\.\S+$/.test($('#be').value)){alertBox($('#alertbox'),'danger','❌ أدخل اسمًا وبريدًا صحيحين.');return}
    bootstrap.Modal.getInstance($('#bm')).hide();
    alertBox($('#alertbox'),'success',`✅ تم حجز مكان لـ ${$('#bn').value} في «${e.t}» (حجز تجريبي).`);
  };
}

// ===== اتصل بنا: تحقق الواجهة الأمامية =====
if($('#cf')){
  $('#cf').addEventListener('submit',ev=>{
    ev.preventDefault();
    const ok=[['n',v=>v.trim().length>=2],['e',v=>/^\S+@\S+\.\S+$/.test(v)],['m',v=>v.trim().length>=10]]
      .map(([i,f])=>{const ok=f($('#'+i).value);$('#'+i).classList.toggle('is-invalid',!ok);$('#'+i).classList.toggle('is-valid',ok);return ok}).every(Boolean);
    if(ok){alertBox($('#res'),'success','✅ تم إرسال رسالتك بنجاح، شكرًا لتواصلك!');$('#cf').reset();document.querySelectorAll('.is-valid').forEach(x=>x.classList.remove('is-valid'))}
    else alertBox($('#res'),'danger','❌ يرجى تصحيح الحقول المحددة.');
  });
}
