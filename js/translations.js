const translations = {
    ar: {
        home: "الرئيسية",
        qatar: "قطر",
        jordan: "الأردن",
        sudan: "السودان",
        palestine: "فلسطين",
        about: "عن الموقع",
        signin: "تسجيل الدخول",
        signup: "إنشاء حساب",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",
        explore: "استكشف الدول",
        aboutArchive: "عن الأرشيف",
        discover: "اكتشف تاريخ وإنجازات وأشهر المعالم في قطر والأردن والسودان وفلسطين",
        arabicArchive: "أرشيف شامل للدول العربية"
    },
    en: {
        home: "Home",
        qatar: "Qatar",
        jordan: "Jordan",
        sudan: "Sudan",
        palestine: "Palestine",
        about: "About",
        signin: "Sign In",
        signup: "Sign Up",
        profile: "Profile",
        logout: "Logout",
        explore: "Explore Countries",
        aboutArchive: "About Archive",
        discover: "Discover the history, achievements, and famous landmarks of Qatar, Jordan, Sudan, and Palestine",
        arabicArchive: "Arabic Countries Archive"
    }
};

let currentLang = 'ar';

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // Update button text
    const langBtn = document.getElementById('langToggle');
    const btnText = langBtn.querySelector('span');
    btnText.textContent = currentLang === 'ar' ? 'English' : 'عربي';
    
    // Update button position based on direction
    langBtn.style.right = currentLang === 'ar' ? '20px' : 'auto';
    langBtn.style.left = currentLang === 'ar' ? 'auto' : '20px';
} 