/* =====================================================
   main.js - كل التفاعلية في الموقع
   الملف مربوط بكل الصفحات، لذلك نتأكد دائماً أن العنصر
   موجود قبل استخدامه (if) حتى لا يحدث خطأ في صفحة ثانية.
   ===================================================== */


/* ========== 1) فلترة الفعاليات (events.html) ========== */
const searchInput    = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const dateFilter     = document.getElementById("dateFilter");
const resetBtn       = document.getElementById("resetBtn");
const noResults      = document.getElementById("noResults");

// نتنفذ الكود فقط إذا كنا في صفحة الفعاليات
if (searchInput) {

  // نجلب كل بطاقات الفعاليات
  const items = document.querySelectorAll(".event-item");

  function filterEvents() {
    // نقرأ قيم الفلاتر الحالية
    const text     = searchInput.value.trim();
    const category = categoryFilter.value;
    const location = locationFilter.value;
    const date     = dateFilter.value;

    let visibleCount = 0;

    // نمر على كل فعالية ونقرر هل نظهرها أم نخفيها
    items.forEach(function (item) {
      const itemTitle    = item.dataset.title;
      const itemCategory = item.dataset.category;
      const itemLocation = item.dataset.location;
      const itemDate     = item.dataset.date;

      // كل شرط يكون true إذا الفعالية تطابق الفلتر (أو الفلتر غير مستخدم)
      const matchText     = text === ""        || itemTitle.includes(text);
      const matchCategory = category === "all" || itemCategory === category;
      const matchLocation = location === "all" || itemLocation === location;
      const matchDate     = date === ""        || itemDate >= date;

      // تظهر الفعالية فقط إذا تحققت كل الشروط معاً
      if (matchText && matchCategory && matchLocation && matchDate) {
        item.classList.remove("d-none");
        visibleCount++;
      } else {
        item.classList.add("d-none");
      }
    });

    // إذا لم يبق شيء نعرض رسالة "لا توجد نتائج"
    if (visibleCount === 0) {
      noResults.classList.remove("d-none");
    } else {
      noResults.classList.add("d-none");
    }
  }

  // ننفذ الفلترة عند أي تغيير في الفلاتر
  searchInput.addEventListener("input", filterEvents);
  categoryFilter.addEventListener("change", filterEvents);
  locationFilter.addEventListener("change", filterEvents);
  dateFilter.addEventListener("change", filterEvents);

  // زر إعادة الضبط
  resetBtn.addEventListener("click", function () {
    searchInput.value    = "";
    categoryFilter.value = "all";
    locationFilter.value = "all";
    dateFilter.value     = "";
    filterEvents();
  });
}


/* ========== 2) التحقق من نموذج اتصل بنا (contact.html) ========== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {

  const alertBox = document.getElementById("alertBox");

  // دالة تعرض Bootstrap Alert (النوع: success أو danger)
  function showAlert(message, type) {
    alertBox.innerHTML =
      '<div class="alert alert-' + type + '">' + message + '</div>';
  }

  contactForm.addEventListener("submit", function (event) {
    // نمنع الإرسال الافتراضي للصفحة
    event.preventDefault();

    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // صيغة البريد الصحيحة (Regular Expression)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1) الحقول المطلوبة
    if (name === "" || email === "" || message === "") {
      showAlert("❌ الرجاء تعبئة جميع الحقول.", "danger");
      return;
    }

    // 2) صيغة البريد
    if (!emailPattern.test(email)) {
      showAlert("❌ صيغة البريد الإلكتروني غير صحيحة.", "danger");
      return;
    }

    // 3) كل شيء صحيح
    showAlert("✅ تم إرسال رسالتك بنجاح، شكراً لتواصلك " + name + ".", "success");
    contactForm.reset();   // تفريغ الحقول
  });
}


/* ========== 3) زر المشاركة (event.html) ========== */
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
  const shareMsg = document.getElementById("shareMsg");

  shareBtn.addEventListener("click", function () {
    // ننسخ رابط الصفحة الحالية إلى الحافظة
    navigator.clipboard.writeText(window.location.href).then(function () {
      shareMsg.classList.remove("d-none");
      // نخفي الرسالة بعد 3 ثواني
      setTimeout(function () {
        shareMsg.classList.add("d-none");
      }, 3000);
    });
  });
}


/* ========== 4) زر أضف للتقويم (event.html) ========== */
const calendarBtn = document.getElementById("calendarBtn");

if (calendarBtn) {
  calendarBtn.addEventListener("click", function () {
    // محتوى ملف تقويم (ICS) تفتحه كل برامج التقويم
    const icsContent =
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "SUMMARY:الحفل الموسيقي السنوي\n" +
      "DTSTART:20261101T180000\n" +
      "DTEND:20261101T210000\n" +
      "LOCATION:قاعة الجامعة\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    // ننشئ ملفاً مؤقتاً ونحمّله تلقائياً
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "event.ics";
    link.click();
  });
}


/* ========== 5) حجز مكان وهمي (Modal في event.html) ========== */
const bookBtn = document.getElementById("bookBtn");

if (bookBtn) {
  const bookName = document.getElementById("bookName");
  const bookMsg  = document.getElementById("bookMsg");

  bookBtn.addEventListener("click", function () {
    if (bookName.value.trim() === "") {
      bookName.classList.add("is-invalid");   // إطار أحمر
      return;
    }
    bookName.classList.remove("is-invalid");
    bookMsg.classList.remove("d-none");       // رسالة النجاح
    bookName.value = "";
  });
}