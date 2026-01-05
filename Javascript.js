/**
 * Ghamdan Abdu - Personal Portfolio Website
 * Main JavaScript File
 * Version 1.0.0
 */

// ==========================================================================
// Global Variables & Configuration
// ==========================================================================

const config = {
    isArabic: true,
    isDarkMode: false,
    currentSection: 'home',
    particlesEnabled: true,
    animationsEnabled: true
};

// Language Texts
const translations = {
    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'نبذة عني',
        education: 'التعليم',
        experience: 'الخبرات',
        skills: 'المهارات',
        projects: 'المشاريع',
        services: 'الخدمات',
        contact: 'اتصل بي',
        
        // Hero Section
        heroTitle: 'مرحباً، أنا',
        typedStrings: [
            'مبرمج ومحلل نظم',
            'مطور حلول رقمية',
            'خبير في الأرشفة الإلكترونية',
            'متخصص في الأنظمة الإدارية'
        ],
        heroDescription: 'مبرمج ومحلل نظم بخبرة إدارية، متخصص في تطوير الحلول الرقمية والأرشفة الإلكترونية. أمتلك خبرة واسعة في تصميم وتنفيذ الأنظمة الإدارية المتكاملة.',
        contactMe: 'تواصل معي',
        viewProjects: 'عرض المشاريع',
        intro: 'مقدمة',
        followMe: 'تابعني على:',
        
        // About Section
        aboutTitle: 'تعرف عليّ بشكل أفضل',
        aboutSubtitle: 'نبذة عني',
        aboutTab: 'عنّي',
        experienceTab: 'خبرتي',
        missionTab: 'رسالتي',
        fullName: 'الاسم الكامل:',
        birthDate: 'تاريخ الميلاد:',
        address: 'العنوان:',
        maritalStatus: 'الحالة الاجتماعية:',
        email: 'البريد الإلكتروني:',
        phone: 'الهاتف:',
        viewMyWork: 'عرض أعمالي',
        
        // Education Section
        educationTitle: 'رحلة التعلم والتعليم',
        educationSubtitle: 'التعليم والمؤهلات',
        academicEducation: 'التعليم الأكاديمي',
        bachelor: 'بكالوريوس علوم الحاسوب',
        highSchool: 'الثانوية العامة',
        veryGood: 'جيد جداً',
        completed: 'مكتمل',
        certifications: 'الشهادات والدورات',
        cybersecurity: 'الأمن السيبراني',
        icdl: 'الرخصة الدولية لقيادة الحاسوب',
        endpointProtection: 'حماية الطرفيات والأجهزة',
        languages: 'اللغات',
        arabic: 'العربية',
        english: 'الإنجليزية',
        native: 'اللغة الأم',
        intermediate: 'متوسط',
        learningPath: 'مسار التعلم المستمر',
        
        // Experience Section
        experienceTitle: 'رحلتي المهنية والمشاريع',
        experienceSubtitle: 'الخبرات العملية',
        featuredProject: 'مشروع رئيسي',
        studentPortal: 'بوابة الطالب الإلكترونية',
        objectives: 'الأهداف',
        keyFeatures: 'الميزات الرئيسية',
        technologiesUsed: 'التقنيات المستخدمة',
        clientSatisfaction: 'رضا العملاء',
        monthsDevelopment: 'أشهر تطوير',
        studentUsers: 'طالب مستخدم',
        experienceTimeline: 'الخط الزمني للخبرات',
        
        // Skills Section
        skillsTitle: 'مجالات التميز والخبرة',
        skillsSubtitle: 'المهارات والقدرات',
        technicalSkills: 'المهارات التقنية',
        programmingLanguages: 'لغات البرمجة',
        databases: 'قواعد البيانات',
        webDevelopment: 'تطوير الويب',
        toolsPlatforms: 'الأدوات والمنصات',
        professionalSkills: 'المهارات المهنية',
        computerSkills: 'استخدام الحاسوب',
        webDesign: 'تصميم المواقع',
        databaseManagement: 'إدارة قواعد البيانات',
        problemSolving: 'حل المشكلات',
        fastTyping: 'الطباعة السريعة',
        officeSuite: 'حزمة Office',
        archiving: 'الأرشفة',
        teamwork: 'العمل الجماعي',
        skillsDistribution: 'توزيع المهارات',
        
        // Projects Section
        projectsTitle: 'معرض الأعمال والمشاريع',
        projectsSubtitle: 'المشاريع والأعمال',
        allProjects: 'الكل',
        webDevelopmentProjects: 'تطوير الويب',
        systemProjects: 'الأنظمة',
        gameProjects: 'الألعاب',
        viewMoreProjects: 'عرض المزيد من المشاريع',
        
        // Services Section
        servicesTitle: 'ما أقدمه من خدمات احترافية',
        servicesSubtitle: 'الخدمات المقدمة',
        webDevService: 'تطوير الويب',
        systemAnalysis: 'تحليل النظم',
        digitalArchiving: 'الأرشفة الرقمية',
        databaseManagementService: 'إدارة قواعد البيانات',
        technicalConsultation: 'الاستشارات التقنية',
        trainingSupport: 'التدريب والدعم',
        orderService: 'اطلب الخدمة',
        serviceProcess: 'عملية تقديم الخدمة',
        consultation: 'الاستشارة',
        analysis: 'التحليل',
        design: 'التصميم',
        implementation: 'التنفيذ',
        deliverySupport: 'التسليم والدعم',
        
        // Contact Section
        contactTitle: 'لنعمل معاً على مشروعك القادم',
        contactSubtitle: 'اتصل بي',
        fullNameField: 'الاسم الكامل',
        emailField: 'البريد الإلكتروني',
        messageSubject: 'موضوع الرسالة',
        messageField: 'الرسالة',
        serviceType: 'نوع الخدمة المطلوبة',
        selectService: 'اختر الخدمة',
        webDevOption: 'تطوير الويب',
        systemAnalysisOption: 'تحليل النظم',
        digitalArchivingOption: 'الأرشفة الرقمية',
        technicalConsultationOption: 'استشارات تقنية',
        newsletter: 'أرغب في تلقي النشرات الإخبارية والعروض',
        sendMessage: 'إرسال الرسالة',
        workingHours: 'أوقات العمل',
        followMeFooter: 'تابعني على',
        
        // Footer
        quickLinks: 'روابط سريعة',
        myServices: 'خدماتي',
        newsletterFooter: 'النشرة الإخبارية',
        subscribeUpdates: 'اشترك للحصول على آخر التحديثات',
        allRightsReserved: 'جميع الحقوق محفوظة',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfUse: 'شروط الاستخدام',
        sitemap: 'خريطة الموقع',
        
        // Common
        downloadCV: 'تحميل السيرة الذاتية',
        viewLive: 'عرض المشروع الحي',
        viewSource: 'عرض الكود المصدري',
        downloadDemo: 'تحميل العرض التوضيحي'
    },
    
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        services: 'Services',
        contact: 'Contact',
        
        // Hero Section
        heroTitle: 'Hello, I am',
        typedStrings: [
            'Programmer & System Analyst',
            'Digital Solutions Developer',
            'Electronic Archiving Expert',
            'Administrative Systems Specialist'
        ],
        heroDescription: 'Programmer and systems analyst with administrative experience, specialized in developing digital solutions and electronic archiving. I have extensive experience in designing and implementing integrated administrative systems.',
        contactMe: 'Contact Me',
        viewProjects: 'View Projects',
        intro: 'Intro',
        followMe: 'Follow me:',
        
        // About Section
        aboutTitle: 'Get to Know Me Better',
        aboutSubtitle: 'About Me',
        aboutTab: 'About',
        experienceTab: 'Experience',
        missionTab: 'Mission',
        fullName: 'Full Name:',
        birthDate: 'Date of Birth:',
        address: 'Address:',
        maritalStatus: 'Marital Status:',
        email: 'Email:',
        phone: 'Phone:',
        viewMyWork: 'View My Work',
        
        // Education Section
        educationTitle: 'Learning Journey',
        educationSubtitle: 'Education & Qualifications',
        academicEducation: 'Academic Education',
        bachelor: 'Bachelor of Computer Science',
        highSchool: 'High School',
        veryGood: 'Very Good',
        completed: 'Completed',
        certifications: 'Certifications & Courses',
        cybersecurity: 'Cybersecurity',
        icdl: 'International Computer Driving License',
        endpointProtection: 'Endpoint Protection',
        languages: 'Languages',
        arabic: 'Arabic',
        english: 'English',
        native: 'Native',
        intermediate: 'Intermediate',
        learningPath: 'Continuous Learning Path',
        
        // Experience Section
        experienceTitle: 'My Professional Journey & Projects',
        experienceSubtitle: 'Professional Experience',
        featuredProject: 'Featured Project',
        studentPortal: 'Student E-Portal',
        objectives: 'Objectives',
        keyFeatures: 'Key Features',
        technologiesUsed: 'Technologies Used',
        clientSatisfaction: 'Client Satisfaction',
        monthsDevelopment: 'Months Development',
        studentUsers: 'Student Users',
        experienceTimeline: 'Experience Timeline',
        
        // Skills Section
        skillsTitle: 'Areas of Expertise',
        skillsSubtitle: 'Skills & Abilities',
        technicalSkills: 'Technical Skills',
        programmingLanguages: 'Programming Languages',
        databases: 'Databases',
        webDevelopment: 'Web Development',
        toolsPlatforms: 'Tools & Platforms',
        professionalSkills: 'Professional Skills',
        computerSkills: 'Computer Skills',
        webDesign: 'Web Design',
        databaseManagement: 'Database Management',
        problemSolving: 'Problem Solving',
        fastTyping: 'Fast Typing',
        officeSuite: 'Office Suite',
        archiving: 'Archiving',
        teamwork: 'Teamwork',
        skillsDistribution: 'Skills Distribution',
        
        // Projects Section
        projectsTitle: 'Portfolio Gallery',
        projectsSubtitle: 'Projects & Works',
        allProjects: 'All',
        webDevelopmentProjects: 'Web Development',
        systemProjects: 'Systems',
        gameProjects: 'Games',
        viewMoreProjects: 'View More Projects',
        
        // Services Section
        servicesTitle: 'Professional Services I Offer',
        servicesSubtitle: 'Services Offered',
        webDevService: 'Web Development',
        systemAnalysis: 'System Analysis',
        digitalArchiving: 'Digital Archiving',
        databaseManagementService: 'Database Management',
        technicalConsultation: 'Technical Consultation',
        trainingSupport: 'Training & Support',
        orderService: 'Order Service',
        serviceProcess: 'Service Delivery Process',
        consultation: 'Consultation',
        analysis: 'Analysis',
        design: 'Design',
        implementation: 'Implementation',
        deliverySupport: 'Delivery & Support',
        
        // Contact Section
        contactTitle: 'Let\'s Work Together on Your Next Project',
        contactSubtitle: 'Contact Me',
        fullNameField: 'Full Name',
        emailField: 'Email Address',
        messageSubject: 'Message Subject',
        messageField: 'Message',
        serviceType: 'Required Service Type',
        selectService: 'Select Service',
        webDevOption: 'Web Development',
        systemAnalysisOption: 'System Analysis',
        digitalArchivingOption: 'Digital Archiving',
        technicalConsultationOption: 'Technical Consultation',
        newsletter: 'I want to receive newsletters and offers',
        sendMessage: 'Send Message',
        workingHours: 'Working Hours',
        followMeFooter: 'Follow Me',
        
        // Footer
        quickLinks: 'Quick Links',
        myServices: 'My Services',
        newsletterFooter: 'Newsletter',
        subscribeUpdates: 'Subscribe for latest updates',
        allRightsReserved: 'All rights reserved',
        privacyPolicy: 'Privacy Policy',
        termsOfUse: 'Terms of Use',
        sitemap: 'Sitemap',
        
        // Common
        downloadCV: 'Download CV',
        viewLive: 'View Live Project',
        viewSource: 'View Source Code',
        downloadDemo: 'Download Demo'
    }
};

// ==========================================================================
// Preloader Functions
// ==========================================================================

function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    const preloaderPercentage = document.getElementById('preloaderPercentage');
    const floatingElements = document.getElementById('floatingElements');
    
    // Create floating elements
    if (floatingElements) {
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.width = `${Math.random() * 100 + 50}px`;
            element.style.height = element.style.width;
            element.style.top = `${Math.random() * 100}%`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 20}s`;
            element.style.animationDuration = `${Math.random() * 10 + 20}s`;
            floatingElements.appendChild(element);
        }
    }
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        if (preloaderBar) preloaderBar.style.width = `${progress}%`;
        if (preloaderPercentage) preloaderPercentage.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }
                initializeAllFeatures();
            }, 500);
        }
    }, 200);
}

// ==========================================================================
// Language Switching Functions
// ==========================================================================

function initializeLanguageSwitcher() {
    const langSwitch = document.getElementById('langSwitch');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langSwitch) return;
    
    // Set initial language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('portfolio-lang') || 'ar';
    config.isArabic = savedLang === 'ar';
    updateLanguageDisplay();
    
    // Main language switch button
    langSwitch.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Language options
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            config.isArabic = selectedLang === 'ar';
            localStorage.setItem('portfolio-lang', selectedLang);
            
            // Update UI
            updateLanguageDisplay();
            updatePageLanguage();
            
            // Close dropdown
            const dropdown = this.closest('.lang-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-switcher')) {
            const dropdown = document.querySelector('.lang-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        }
    });
    
    function updateLanguageDisplay() {
        const langBtn = document.getElementById('langSwitch');
        if (!langBtn) return;
        
        const flag = langBtn.querySelector('.lang-flag');
        const texts = langBtn.querySelectorAll('.lang-text');
        
        if (config.isArabic) {
            if (flag) flag.textContent = '🇸🇦';
            texts[0].style.display = 'inline';
            texts[1].style.display = 'none';
            document.body.classList.remove('en');
            document.body.classList.add('ar');
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
        } else {
            if (flag) flag.textContent = '🇬🇧';
            texts[0].style.display = 'none';
            texts[1].style.display = 'inline';
            document.body.classList.remove('ar');
            document.body.classList.add('en');
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
    }
}

function updatePageLanguage() {
    const lang = config.isArabic ? 'ar' : 'en';
    const texts = translations[lang];
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (texts[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = texts[key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });
    
    // Update typed.js strings
    if (window.typedInstance) {
        window.typedInstance.destroy();
    }
    initializeTypedJS();
    
    // Update logo name
    const logoName = document.getElementById('logoName');
    if (logoName) logoName.textContent = config.isArabic ? 'غمدان عبده' : 'Ghamdan Abdu';
    
    // Update typed name
    const typedName = document.getElementById('typedName');
    if (typedName) typedName.textContent = config.isArabic ? 'غمدان عبده' : 'Ghamdan Abdu';
    
    // Update skills chart if it exists
    if (window.skillsChart) {
        updateSkillsChart();
    }
}

// ==========================================================================
// Theme Switching Functions
// ==========================================================================

function initializeThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Set initial theme from localStorage or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    config.isDarkMode = savedTheme === 'dark';
    updateThemeDisplay();
    
    themeToggle.addEventListener('change', function() {
        config.isDarkMode = this.checked;
        localStorage.setItem('portfolio-theme', config.isDarkMode ? 'dark' : 'light');
        updateThemeDisplay();
    });
    
    function updateThemeDisplay() {
        themeToggle.checked = config.isDarkMode;
        
        if (config.isDarkMode) {
            document.body.setAttribute('data-theme', 'dark');
            document.documentElement.style.setProperty('color-scheme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            document.documentElement.style.setProperty('color-scheme', 'light');
        }
        
        // Update particle colors if enabled
        if (window.particlesJS && config.particlesEnabled) {
            updateParticleColors();
        }
    }
}

// ==========================================================================
// Navigation Functions
// ==========================================================================

function initializeNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navProgressBar = document.querySelector('.nav-progress-bar');
    
    if (!navbar || !navProgressBar) return;
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // إغلاق القائمة المتنقلة على الهاتف
                closeMobileMenu();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update current section
                config.currentSection = targetId.substring(1);
            }
        });
    });
    
    // Navbar scroll effect
    function updateNavbarOnScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update progress bar
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.scrollY / documentHeight) * 100;
        navProgressBar.style.width = `${scrolled}%`;
    }
    
    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll(); // Initialize
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarContent = document.getElementById('navbarContent');
    
    if (navbarToggler && navbarContent) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navbarContent.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navbarContent && navbarContent.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // دالة لإغلاق القائمة المتنقلة
    function closeMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarContent = document.getElementById('navbarContent');
        
        if (navbarToggler && navbarContent) {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarContent.classList.remove('show');
        }
    }
}

// ==========================================================================
// Hero Section Functions
// ==========================================================================

function initializeHeroSection() {
    // Initialize typed.js
    initializeTypedJS();
    
    // Initialize particles.js
    initializeParticles();
    
    // Play intro button
    const playIntroBtn = document.getElementById('playIntro');
    if (playIntroBtn) {
        playIntroBtn.addEventListener('click', function() {
            // Create and show intro modal
            showIntroModal();
        });
    }
    
    // Floating tech badges animation
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
    });
}

function initializeTypedJS() {
    const typedElement = document.getElementById('typed');
    if (!typedElement || typeof Typed === 'undefined') return;
    
    const lang = config.isArabic ? 'ar' : 'en';
    const strings = translations[lang].typedStrings;
    
    try {
        window.typedInstance = new Typed('#typed', {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    } catch (error) {
        console.error('خطأ في تهيئة Typed.js:', error);
        // Fallback: Display static text
        typedElement.textContent = strings[0];
    }
}

function initializeParticles() {
    if (typeof particlesJS === 'undefined' || !document.getElementById('particles-js')) {
        console.warn('Particles.js is not available');
        return;
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: config.isDarkMode ? '#ffffff' : '#6a11cb'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: config.isDarkMode ? '#ffffff' : '#2575fc',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
    
    config.particlesEnabled = true;
}

function updateParticleColors() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        const pJS = window.pJSDom[0].pJS;
        
        pJS.particles.color.value = config.isDarkMode ? '#ffffff' : '#6a11cb';
        pJS.particles.line_linked.color = config.isDarkMode ? '#ffffff' : '#2575fc';
        
        pJS.fn.particlesRefresh();
    }
}

function showIntroModal() {
    const modalHTML = `
        <div class="modal-overlay" id="introModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${config.isArabic ? 'مقدمة عن غمدان عبده' : 'Introduction to Ghamdan Abdu'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="intro-video">
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>${config.isArabic ? 'فيديو تعريفي قريباً' : 'Intro video coming soon'}</p>
                        </div>
                    </div>
                    <div class="intro-text">
                        <p>${config.isArabic ? 
                            'غمدان عبده هو مبرمج ومحلل نظم يمني متخصص في تطوير الحلول الرقمية والأنظمة الإدارية. يتمتع بخبرة تزيد عن 5 سنوات في مجال البرمجة وتحليل النظم.' :
                            'Ghamdan Abdu is a Yemeni programmer and systems analyst specialized in developing digital solutions and administrative systems. He has over 5 years of experience in programming and systems analysis.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('introModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal on button click
    closeBtn.addEventListener('click', closeIntroModal);
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeIntroModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal) {
            closeIntroModal();
        }
    });
    
    function closeIntroModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ==========================================================================
// About Section Functions
// ==========================================================================

function initializeAboutSection() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('#aboutTab .nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('show', 'active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

// ==========================================================================
// Skills Section Functions
// ==========================================================================

function initializeSkillsSection() {
    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.progress-bar');
                const percent = skillItem.querySelector('.skill-percent')?.textContent || '0%';
                
                // Animate progress bar
                if (progressBar) {
                    progressBar.style.width = percent;
                    progressBar.style.transition = 'width 1.5s ease-in-out';
                }
                
                // Add animation class
                skillItem.classList.add('animated');
                
                // Stop observing after animation
                observer.unobserve(skillItem);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => observer.observe(item));
    
    // Initialize skills chart
    initializeSkillsChart();
}

function initializeSkillsChart() {
    const chartCanvas = document.getElementById('skillChart');
    if (!chartCanvas || typeof Chart === 'undefined') {
        return;
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(106, 17, 203, 0.8)');
    gradient.addColorStop(1, 'rgba(37, 117, 252, 0.2)');
    
    // Chart data
    const data = {
        labels: config.isArabic ? 
            ['تطوير الويب', 'قواعد البيانات', 'البرمجة', 'الأدوات', 'المهارات الشخصية'] :
            ['Web Development', 'Databases', 'Programming', 'Tools', 'Soft Skills'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                'rgba(106, 17, 203, 0.8)',
                'rgba(37, 117, 252, 0.8)',
                'rgba(255, 0, 128, 0.8)',
                'rgba(255, 140, 0, 0.8)',
                'rgba(64, 224, 208, 0.8)'
            ],
            borderColor: [
                'rgba(106, 17, 203, 1)',
                'rgba(37, 117, 252, 1)',
                'rgba(255, 0, 128, 1)',
                'rgba(255, 140, 0, 1)',
                'rgba(64, 224, 208, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 20
        }]
    };
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutQuart'
        }
    };
    
    // Create chart
    try {
        window.skillsChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    } catch (error) {
        console.error('حدث خطأ في إنشاء المخطط:', error);
    }
}

function updateSkillsChart() {
    if (window.skillsChart) {
        const lang = config.isArabic ? 'ar' : 'en';
        const labels = lang === 'ar' ? 
            ['تطوير الويب', 'قواعد البيانات', 'البرمجة', 'الأدوات', 'المهارات الشخصية'] :
            ['Web Development', 'Databases', 'Programming', 'Tools', 'Soft Skills'];
        
        window.skillsChart.data.labels = labels;
        window.skillsChart.update();
    }
}

// ==========================================================================
// Projects Section Functions
// ==========================================================================

function initializeProjectsSection() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('#projectsTab .nav-link');
    const projectItems = document.querySelectorAll('.project-card-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-bs-target').replace('#', '');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all-projects') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================================================
// Contact Section Functions
// ==========================================================================

function initializeContactSection() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const email = formData.get('email');
            
            // Basic validation
            if (!validateEmail(email)) {
                showFormError(config.isArabic ? 
                    'البريد الإلكتروني غير صحيح' : 
                    'Invalid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-send');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                ${config.isArabic ? 'جاري الإرسال...' : 'Sending...'}
            `;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showFormSuccess();
                
                // Reset form
                this.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            // Simulate subscription
            emailInput.disabled = true;
            this.querySelector('button').disabled = true;
            
            setTimeout(() => {
                showNewsletterSuccess();
                emailInput.value = '';
                emailInput.disabled = false;
                this.querySelector('button').disabled = false;
                emailInput.style.borderColor = '';
            }, 1500);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================================================
// Download CV Functionality
// ==========================================================================

function initializeDownloadCV() {
    const downloadCVBtn = document.getElementById('downloadCV');
    
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCVDownloadModal();
        });
    }
}

// ==========================================================================
// AOS (Animate On Scroll) Initialization
// ==========================================================================

function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 100
        });
        
        config.animationsEnabled = true;
    }
}

// ==========================================================================
// Main Initialization Function
// ==========================================================================

function initializeAllFeatures() {
    // Initialize AOS first for better performance
    initializeAOS();
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize hero section
    initializeHeroSection();
    
    // Initialize about section
    initializeAboutSection();
    
    // Initialize skills section
    initializeSkillsSection();
    
    // Initialize projects section
    initializeProjectsSection();
    
    // Initialize contact section
    initializeContactSection();
    
    // Initialize download CV
    initializeDownloadCV();
}

// ==========================================================================
// Error Handling
// ==========================================================================

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ==========================================================================
// Initialize When DOM is Ready
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Start with preloader
    initializePreloader();
});

// CSS Variables
document.documentElement.style.setProperty('--primary-color', '#6a11cb');
document.documentElement.style.setProperty('--secondary-color', '#2575fc');
document.documentElement.style.setProperty('--accent-color', '#ff0080');