// تهيئة EmailJS (استبدل PUBLIC_KEY بمفتاحك الخاص من موقع EmailJS)
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// بيانات نظام الـ PPLUL بالتمارين والأوزان والعدات
const pplulData = {
    push: {
        title: "يوم الدفع (Push) - صدر / أكتاف / ترايسبس",
        exercises: [
            { name: "Bench Press (بنش برس)", weight: "70 كجم", reps: "4 مجموعات × 8 عدات" },
            { name: "Incline Dumbbell Press (تجميع علوي)", weight: "22 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Overhead Shoulder Press (كتف أمامي)", weight: "40 كجم", reps: "3 مجموعات × 8 عدات" },
            { name: "Lateral Raises (رفرفة جانبي)", weight: "10 كجم", reps: "4 مجموعات × 12 عادة" },
            { name: "Tricep Pushdown (تراي بالكيبل)", weight: "25 كجم", reps: "3 مجموعات × 12 عادة" }
        ]
    },
    pull: {
        title: "يوم السحب (Pull) - ظهر / بايسبس / أكتاف خلفية",
        exercises: [
            { name: "Deadlift (ديدليفت)", weight: "100 كجم", reps: "3 مجموعات × 5 عدات" },
            { name: "Lat Pulldown (سحب عالي)", weight: "55 كجم", reps: "4 مجموعات × 10 عدات" },
            { name: "Barbell Row (سحب بالبار)", weight: "50 كجم", reps: "3 مجموعات × 8 عدات" },
            { name: "Face Pulls (سحب للوجه)", weight: "20 كجم", reps: "4 مجموعات × 15 عادة" },
            { name: "Bicep Barbell Curl (بايسبس بار)", weight: "25 كجم", reps: "3 مجموعات × 10 عدات" }
        ]
    },
    legs: {
        title: "يوم الأرجل (Legs)",
        exercises: [
            { name: "Squats (سكوات)", weight: "80 كجم", reps: "4 مجموعات × 8 عدات" },
            { name: "Leg Press (مكبس أرجل)", weight: "140 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Romanian Deadlift (ديدليفت روماني)", weight: "60 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Leg Curls (خلفيات)", weight: "35 كجم", reps: "3 مجموعات × 12 عادة" },
            { name: "Calf Raises (سمانة)", weight: "50 كجم", reps: "4 مجموعات × 15 عادة" }
        ]
    },
    upper: {
        title: "يوم الجزء العلوي (Upper Body)",
        exercises: [
            { name: "Incline Bench Press (بنش علوي)", weight: "60 كجم", reps: "4 مجموعات × 8 عدات" },
            { name: "Pull-ups (عقلة)", weight: "وزن الجسم", reps: "4 مجموعات × 8 عدات" },
            { name: "Dumbbell Shoulder Press (كتف دمبل)", weight: "20 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Cable Row (سحب أرضي)", weight: "50 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Hammer Curls & Dips (باي وتراي سوبرسيت)", weight: "14 كجم", reps: "3 مجموعات × 12 عادة" }
        ]
    },
    lower: {
        title: "يوم الجزء السفلي (Lower Body)",
        exercises: [
            { name: "Barbell Squats (سكوات ثقيل)", weight: "85 كجم", reps: "3 مجموعات × 6 عدات" },
            { name: "Bulgarian Split Squats (سكوات بلغاري)", weight: "14 كجم", reps: "3 مجموعات × 10 عدات" },
            { name: "Leg Extensions (أمامي أجهزة)", weight: "45 كجم", reps: "3 مجموعات × 12 عادة" },
            { name: "Lying Leg Curls (خلفي أجهزة)", weight: "40 كجم", reps: "3 مجموعات × 12 عادة" },
            { name: "Seated Calf Raises (سمانة جالس)", weight: "40 كجم", reps: "4 مجموعات × 15 عادة" }
        ]
    }
};

let currentSelectedDay = null;

// دالة لعرض التمارين
function showWorkout(dayKey) {
    currentSelectedDay = pplulData[dayKey];
    document.getElementById("day-title").innerText = currentSelectedDay.title;
    
    const listElement = document.getElementById("exercise-list");
    listElement.innerHTML = "";

    currentSelectedDay.exercises.forEach(ex => {
        const li = document.createElement("li");
        li.innerHTML = `<span><strong>${ex.name}</strong></span> <span>${ex.weight} - ${ex.reps}</span>`;
        listElement.appendChild(li);
    });
}

// دالة إرسال البريد الإلكتروني
function sendEmail() {
    const emailInput = document.getElementById("user-email").value;
    const statusText = document.getElementById("email-status");

    if (!currentSelectedDay) {
        statusText.style.color = "#f43f5e";
        statusText.innerText = "يرجى اختيار يوم التمرين أولاً!";
        return;
    }

    if (!emailInput) {
        statusText.style.color = "#f43f5e";
        statusText.innerText = "يرجى إدخال البريد الإلكتروني!";
        return;
    }

    // تجهيز نص التمارين للرسالة
    let workoutDetails = `${currentSelectedDay.title}\n\n`;
    currentSelectedDay.exercises.forEach(ex => {
        workoutDetails += `- ${ex.name}: الوزن (${ex.weight}) | ${ex.reps}\n`;
    });

    statusText.style.color = "#38bdf8";
    statusText.innerText = "جاري إرسال البريد الإلكتروني...";

    // إرسال عبر EmailJS
    const templateParams = {
        to_email: emailInput,
        subject: `جدول تمرين اليوم: ${currentSelectedDay.title}`,
        message: workoutDetails
    };

    /* ملاحظة: لتفعيل الإرسال الفعلي، قم بإنشاء حساب مجاني على موقع https://www.emailjs.com/
       ثم أنشئ Service و Template وضع المعرفات الخاصة بك بدلاً من القيم أدناه.
    */
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            statusText.style.color = "#10b981";
            statusText.innerText = "تم إرسال جدول اليوم بنجاح إلى إيميلك!";
        }, function(error) {
            statusText.style.color = "#f43f5e";
            statusText.innerText = "فشل الإرسال. تأكد من إعداد مفاتيح EmailJS بشكل صحيح.";
            console.error("FAILED...", error);
        });
}
