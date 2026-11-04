

// فلترة الفعاليات - صفحة events
const searchInput = document.getElementById("searchInput");
const catFilter = document.getElementById("categoryFilter");
const locFilter = document.getElementById("locationFilter");
const dateFilter = document.getElementById("dateFilter");
const resetBtn = document.getElementById("resetBtn");
const noResults = document.getElementById("noResults");

// بس إذا كنا بصفحة الفعاليات
if (searchInput) {

  // كل الكروت
  const cards = document.querySelectorAll(".event-item");

  function filterEvents() {
    console.log("filter");
    const text = searchInput.value.trim();
    const category = catFilter.value;
    const loc = locFilter.value;
    const date = dateFilter.value;

    let count = 0;

    // نعدّي على كل فعالية
    cards.forEach(function (item) {
      const itemTitle = item.dataset.title;
      const itemCategory = item.dataset.category;
      const itemLoc = item.dataset.location;
      const itemDate     = item.dataset.date;

      const matchText = text === "" || itemTitle.includes(text);
      const matchCat = category == "all" || itemCategory == category;
      const matchLoc = loc == "all" || itemLoc == loc;
      const matchDate = date == "" || itemDate >= date;

      // لازم كل الشروط تتحقق
      if (matchText && matchCat && matchLoc && matchDate) {
        item.classList.remove("d-none");
        count++;
      } else {
        item.classList.add("d-none");
      }
    });

    // إذا ما طلع ولا نتيجة
    if (count == 0) {
      noResults.classList.remove("d-none");
    } else {
      noResults.classList.add("d-none");
    }
  }

  // الفلترة بتشتغل مع أي تغيير
  searchInput.addEventListener("input" , filterEvents);
  catFilter.addEventListener("change", filterEvents);
  locFilter.addEventListener("change", filterEvents);
  dateFilter.addEventListener("change", filterEvents);

  // زر الريست  (مو متأكد اذا لازم)
  resetBtn.addEventListener("click", function () {
    searchInput.value    = "";
    catFilter.value = "all";
    locFilter.value = "all";
    dateFilter.value     = "";
    filterEvents();
  });
}


// نموذج اتصل بنا
const contactForm = document.getElementById("contactForm");

if (contactForm) {

  var alertBox = document.getElementById("alertBox");

  // رسالة النجاح / الخطأ
  function showAlert(message, type) {
    alertBox.innerHTML =
      '<div class="alert alert-' + type + '">' + message + '</div>';
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // فحص الايميل
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // لو في حقل فاضي
    if (name == "" || email == "" || message == ""){
      showAlert("الرجاء تعبئة جميع الحقول.", "danger");
      return;
    }

    // الايميل مو صحيح
    if (!emailPattern.test(email)) {
      showAlert("صيغة البريد الإلكتروني غير صحيحة.", "danger");
      return;
    }

    // نجح
    showAlert("تم إرسال رسالتك بنجاح، شكراً لتواصلك " + name + ".", "success");
    contactForm.reset();
  });
}


// زر المشاركة
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
  const shareMsg = document.getElementById("shareMsg");

  shareBtn.addEventListener("click", function () {
    // copy
    navigator.clipboard.writeText(window.location.href).then(function () {
      shareMsg.classList.remove("d-none");
      // بتختفي بعد 3 ثواني
      setTimeout(function () {
        shareMsg.classList.add("d-none");
      }, 3000);
    });
  });
}


// زر التقويم
const calendarBtn = document.getElementById("calendarBtn");

if (calendarBtn) {
  calendarBtn.addEventListener("click", function () {
 alert("تمت اضافة الفعالية الى التقويم الخاص بك " + ".", "success");
    
  });
}


// الحجز
const bookBtn = document.getElementById("bookBtn");

if (bookBtn) {
  const bookName = document.getElementById("bookName");
  const bookMsg  = document.getElementById("bookMsg");

  bookBtn.addEventListener("click", function () {
    if (bookName.value.trim() === "") {
      bookName.classList.add("is-invalid");
      return;
    }
    bookName.classList.remove("is-invalid");
    bookMsg.classList.remove("d-none");
    bookName.value = "";
  });
}
// بيانات الفعاليات (صفحة التفاصيل بتاخد منها)
const eventsData = {
  1: { id: 1, title: "الحفل الموسيقي السنوي", cat: "music", catLabel: "موسيقى",
       date: "2026-11-01", time: "6:00 مساءً", start: "180000", end: "210000",
       location: "قاعة الجامعة", img: "music.jpg",
       desc1: "أمسية موسيقية مميزة تجمع طلاب الجامعة والخريجين مع فرق موسيقية من داخل الجامعة.",
       desc2: "يتضمن الحفل فقرات غنائية وعزفاً حياً ومسابقات خفيفة وجوائز رمزية للمشاركين." },
  2: { id: 2, title: "البطولة الرياضية", cat: "sport", catLabel: "رياضة",
       date: "2026-11-03", time: "4:00 عصراً", start: "160000", end: "190000",
       location: "ساحة الجامعة", img: "sport.jpg",
       desc1: "منافسات رياضية بين كليات الجامعة في عدة ألعاب جماعية.",
       desc2: "يمكن للطلاب التسجيل كلاعبين أو الحضور لتشجيع فرق كلياتهم." },
  3: { id: 3, title: "المعرض الفني الطلابي", cat: "culture", catLabel: "ثقافة",
       date: "2026-11-05", time: "10:00 صباحاً", start: "100000", end: "150000",
       location: "قاعة الجامعة", img: "culture.jpg",
       desc1: "معرض يعرض لوحات وأعمالاً فنية من إبداع طلاب الجامعة.",
       desc2: "يمكن للزوار التعرف على الفنانين الطلاب والتصويت لأفضل عمل." },
  4: { id: 4, title: "ندوة التعلم الإلكتروني", cat: "edu", catLabel: "تعليمي",
       date: "2026-11-08", time: "7:00 مساءً", start: "190000", end: "210000",
       location: "افتراضي (أونلاين)", img: "seminar.jpg",
       desc1: "ندوة عن مستقبل التعليم عن بُعد وأفضل أدواته.",
       desc2: "يشارك فيها أساتذة وخبراء، مع وقت مفتوح لأسئلة الطلاب." },
  5: { id: 5, title: "ورشة تطوير المواقع", cat: "edu", catLabel: "تعليمي",
       date: "2026-11-10", time: "5:00 مساءً", start: "170000", end: "200000",
       location: "افتراضي (أونلاين)", img: "workshop.jpg",
       desc1: "ورشة عملية لتعلم أساسيات HTML وCSS وBootstrap.",
       desc2: "يبني المشاركون صفحة ويب كاملة خلال الورشة." },
  6: { id: 6, title: "اليوم العائلي", cat: "family", catLabel: "عائلي",
       date: "2026-11-15", time: "11:00 صباحاً", start: "110000", end: "160000",
       location: "ساحة الجامعة", img: "family.jpg",
       desc1: "يوم ترفيهي للطلاب وعائلاتهم مع ألعاب وأنشطة للأطفال.",
       desc2: "يتضمن الحدث غداء مفتوحاً وفقرات ترفيهية ومسابقات." },
  7: { id: 7, title: "حفل التخرج", cat: "culture", catLabel: "ثقافة",
       date: "2026-11-20", time: "5:00 مساءً", start: "170000", end: "200000",
       location: "قاعة الجامعة", img: "graduation.jpg",
       desc1: "حفل تكريم الخريجين الجدد بحضور الأساتذة والأهالي.",
       desc2: "يتضمن كلمات الخريجين وتوزيع الشهادات والصور التذكارية." },
  8: { id: 8, title: "جولة في الحرم الجامعي", cat: "family", catLabel: "عائلي",
       date: "2026-11-25", time: "9:00 صباحاً", start: "090000", end: "120000",
       location: "ساحة الجامعة", img: "campus.jpg",
       desc1: "جولة تعريفية للطلاب الجدد في مرافق الجامعة.",
       desc2: "يتعرف المشاركون على القاعات والمكتبة والخدمات الطلابية." }
};

// الرقم من الرابط event.html?id=3
const params = new URLSearchParams(window.location.search);
const currentId = params.get("id") || "1";
const currentEvent = eventsData[currentId] || eventsData[1];
// تعبئة صفحة التفاصيل
const evTitle = document.getElementById("evTitle");

if (evTitle) {
  const e = currentEvent;

  document.title = e.title + " | دليل فعاليات الجامعة الافتراضية";
  document.getElementById("evImg").src = "assets/img/" + e.img;
  document.getElementById("evImg").alt = e.title;

  const badge = document.getElementById("evBadge");
  badge.textContent = e.catLabel;
  badge.classList.add("cat-" + e.cat);

  evTitle.textContent = e.title;
  document.getElementById("evDate").textContent = e.date;
  document.getElementById("evTime").textContent = e.time;
  document.getElementById("evLocation").textContent = e.location;
  document.getElementById("evDesc1").textContent = e.desc1;
  document.getElementById("evDesc2").textContent = e.desc2;

  // المعرض: صورة الفعالية + صورتين غيرها
  const gallery = document.getElementById("evGallery");
  var galleryIds = [e.id, e.id % 8 + 1, (e.id + 1) % 8 + 1];
  galleryIds.forEach(function (i) {
    gallery.innerHTML +=
      '<div class="col-4"><img src="assets/img/' + eventsData[i].img +
      '" class="img-fluid rounded-3 gallery-img" alt="' + eventsData[i].title + '"></div>';
  });

  // فعاليات مشابهة (نفس التصنيف أول شي)
  let related = Object.values(eventsData).filter(function (x) { return x.id !== e.id; });
  related.sort(function (a, b) { return (b.cat === e.cat) - (a.cat === e.cat); });

  var relatedList = document.getElementById("relatedList");
  related.slice(0, 3).forEach(function (x) {
    relatedList.innerHTML +=
      '<div class="col-12 col-md-6 col-lg-4">' +
      '<div class="card event-card h-100">' +
      '<img src="assets/img/' + x.img + '" class="card-img-top" alt="' + x.title + '">' +
      '<div class="card-body">' +
      '<span class="badge cat-' + x.cat + '">' + x.catLabel + '</span>' +
      '<h5 class="card-title mt-2">' + x.title + '</h5>' +
      '<p class="card-text">⏱  '+ x.date + '</p>' +
      '<a href="event.html?id=' + x.id + '" class="btn btn-primary">التفاصيل</a>' +
      '</div></div></div>';
  });
}