/**
 * Ghamdan Abdu - Personal Portfolio Website
 * Main JavaScript File
 * Version 1.0.0
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
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
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            preloaderBar.style.width = `${progress}%`;
            preloaderPercentage.textContent = `${Math.round(progress)}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
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
                this.closest('.lang-dropdown').style.display = 'none';
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                document.querySelector('.lang-dropdown').style.display = 'none';
            }
        });
        
        function updateLanguageDisplay() {
            const langBtn = document.getElementById('langSwitch');
            const flag = langBtn.querySelector('.lang-flag');
            const texts = langBtn.querySelectorAll('.lang-text');
            
            if (config.isArabic) {
                flag.textContent = '🇸🇦';
                texts[0].style.display = 'inline';
                texts[1].style.display = 'none';
                document.body.classList.remove('en');
                document.body.classList.add('ar');
                document.documentElement.lang = 'ar';
                document.documentElement.dir = 'rtl';
            } else {
                flag.textContent = '🇬🇧';
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
        
        // Update logo name animation
        const logoName = document.getElementById('logoName');
        logoName.textContent = config.isArabic ? 'غمدان عبده' : 'Ghamdan Abdu';
        
        // Update typed name
        const typedName = document.getElementById('typedName');
        typedName.textContent = config.isArabic ? 'غمدان عبده' : 'Ghamdan Abdu';
        
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
        
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navbarContent.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navbarContent.classList.contains('show')) {
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
        
        // إغلاق القائمة عند الضغط على زر الهومبورغر إذا كانت مفتوحة
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', function() {
                const navbarContent = document.getElementById('navbarContent');
                if (navbarContent.classList.contains('show')) {
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 300);
                }
            });
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
        playIntroBtn.addEventListener('click', function() {
            // Create and show intro modal
            showIntroModal();
        });
        
        // Social icon tooltips
        const socialIcons = document.querySelectorAll('.social-icon[data-tooltip]');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                const tooltip = this.getAttribute('data-tooltip');
                // Tooltip is already handled by CSS
            });
        });
        
        // Floating tech badges animation
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    function initializeTypedJS() {
        const typedElement = document.getElementById('typed');
        if (!typedElement) return;
        
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
        if (typeof particlesJS !== 'undefined') {
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
        
        // Animate stats on scroll
        const statItems = document.querySelectorAll('.stat-item');
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        statItems.forEach(item => observer.observe(item));
        
        // Floating dots animation
        const floatingDots = document.querySelectorAll('.floating-dots span');
        floatingDots.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // ==========================================================================
    // Skills Section Functions
    // ==========================================================================
    
    function initializeSkillsSection() {
        // Animate skill bars on scroll
        const skillItems = document.querySelectorAll('.skill-item');
        const progressBars = document.querySelectorAll('.skill-progress .progress-bar');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const progressBar = skillItem.querySelector('.progress-bar');
                    const percent = skillItem.querySelector('.skill-percent').textContent;
                    
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
        if (!chartCanvas) {
            console.warn('لم يتم العثور على عنصر skillChart');
            return;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js is not loaded. Skipping skills chart.');
            // Try to load Chart.js dynamically
            setTimeout(initializeSkillsChart, 500);
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
            
            console.log('تم تهيئة المخطط بنجاح');
        } catch (error) {
            console.error('حدث خطأ في إنشاء المخطط:', error);
            // Show fallback content
            showChartFallback();
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
    
    function showChartFallback() {
        const chartContainer = document.querySelector('.skill-chart');
        if (chartContainer) {
            chartContainer.innerHTML = `
                <div class="fallback-chart">
                    <div class="fallback-skills">
                        <div class="fallback-skill">
                            <span class="skill-name">${config.isArabic ? 'تطوير الويب' : 'Web Development'}</span>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: 35%; background: #6a11cb;"></div>
                            </div>
                            <span class="skill-percent">35%</span>
                        </div>
                        <div class="fallback-skill">
                            <span class="skill-name">${config.isArabic ? 'قواعد البيانات' : 'Databases'}</span>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: 25%; background: #2575fc;"></div>
                            </div>
                            <span class="skill-percent">25%</span>
                        </div>
                        <div class="fallback-skill">
                            <span class="skill-name">${config.isArabic ? 'البرمجة' : 'Programming'}</span>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: 20%; background: #ff0080;"></div>
                            </div>
                            <span class="skill-percent">20%</span>
                        </div>
                        <div class="fallback-skill">
                            <span class="skill-name">${config.isArabic ? 'الأدوات' : 'Tools'}</span>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: 15%; background: #ff8c00;"></div>
                            </div>
                            <span class="skill-percent">15%</span>
                        </div>
                        <div class="fallback-skill">
                            <span class="skill-name">${config.isArabic ? 'المهارات الشخصية' : 'Soft Skills'}</span>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: 5%; background: #40e0d0;"></div>
                            </div>
                            <span class="skill-percent">5%</span>
                        </div>
                    </div>
                </div>
            `;
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
        
        // Project hover effects
        projectItems.forEach(item => {
            const image = item.querySelector('.project-image img');
            const overlay = item.querySelector('.project-overlay');
            
            item.addEventListener('mouseenter', function() {
                if (image) image.style.transform = 'scale(1.1)';
                if (overlay) overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                if (image) image.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
            });
        });
        
        // Download buttons
        const downloadButtons = document.querySelectorAll('.btn-download');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const fileName = this.getAttribute('href').split('/').pop();
                const projectName = this.closest('.project-card-item').querySelector('h3').textContent;
                
                // Show download confirmation
                showDownloadModal(fileName, projectName);
            });
        });
    }
    
    function showDownloadModal(fileName, projectName) {
        const modalHTML = `
            <div class="modal-overlay" id="downloadModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${config.isArabic ? 'تحميل المشروع' : 'Download Project'}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="download-info">
                            <i class="fas fa-download fa-3x"></i>
                            <h4>${projectName}</h4>
                            <p>${config.isArabic ? 
                                'جاري تحميل ملف المشروع...' : 
                                'Downloading project file...'}</p>
                            <div class="download-progress">
                                <div class="progress-bar"></div>
                            </div>
                            <p class="file-size">${config.isArabic ? 'الحجم: ' : 'Size: '}~5 MB</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary cancel-btn">${config.isArabic ? 'إلغاء' : 'Cancel'}</button>
                        <button class="btn btn-primary confirm-btn">${config.isArabic ? 'متابعة التحميل' : 'Continue Download'}</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('downloadModal');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const progressBar = modal.querySelector('.download-progress .progress-bar');
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
        
        // Simulate download progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    closeDownloadModal();
                    showDownloadCompleteToast(projectName);
                }, 500);
            }
        }, 100);
        
        // Close modal functions
        function closeDownloadModal() {
            clearInterval(progressInterval);
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeDownloadModal);
        cancelBtn.addEventListener('click', closeDownloadModal);
        
        confirmBtn.addEventListener('click', function() {
            // In a real scenario, this would trigger the actual download
            // For now, we'll just show completion
            progress = 100;
            progressBar.style.width = '100%';
            
            setTimeout(() => {
                closeDownloadModal();
                showDownloadCompleteToast(projectName);
            }, 500);
        });
        
        // Close modal on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeDownloadModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal) {
                closeDownloadModal();
            }
        });
    }
    
    function showDownloadCompleteToast(projectName) {
        const toastHTML = `
            <div class="toast-notification">
                <i class="fas fa-check-circle"></i>
                <div class="toast-content">
                    <h4>${config.isArabic ? 'تم التحميل بنجاح!' : 'Download Complete!'}</h4>
                    <p>${projectName} ${config.isArabic ? 'تم تحميله بنجاح' : 'has been downloaded successfully'}</p>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add toast to body
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = document.querySelector('.toast-notification');
        const closeBtn = toast.querySelector('.toast-close');
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
        
        // Close button
        closeBtn.addEventListener('click', hideToast);
        
        function hideToast() {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
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
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
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
    
    function showFormError(message) {
        const errorHTML = `
            <div class="toast-notification error-toast">
                <i class="fas fa-exclamation-circle"></i>
                <div class="toast-content">
                    <h4>${config.isArabic ? 'خطأ!' : 'Error!'}</h4>
                    <p>${message}</p>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add toast to body
        document.body.insertAdjacentHTML('beforeend', errorHTML);
        
        const toast = document.querySelector('.error-toast');
        const closeBtn = toast.querySelector('.toast-close');
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideErrorToast();
        }, 5000);
        
        // Close button
        closeBtn.addEventListener('click', hideErrorToast);
        
        function hideErrorToast() {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }
    
    function showFormSuccess() {
        const successHTML = `
            <div class="toast-notification success-toast">
                <i class="fas fa-check-circle"></i>
                <div class="toast-content">
                    <h4>${config.isArabic ? 'تم الإرسال بنجاح!' : 'Message Sent Successfully!'}</h4>
                    <p>${config.isArabic ? 
                        'شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.' :
                        'Thank you for your message. I will get back to you as soon as possible.'}
                    </p>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add toast to body
        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        const toast = document.querySelector('.success-toast');
        const closeBtn = toast.querySelector('.toast-close');
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideSuccessToast();
        }, 5000);
        
        // Close button
        closeBtn.addEventListener('click', hideSuccessToast);
        
        function hideSuccessToast() {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNewsletterSuccess() {
        // Create toast notification
        const toastHTML = `
            <div class="toast-notification newsletter-toast">
                <i class="fas fa-envelope-open-text"></i>
                <div class="toast-content">
                    <h4>${config.isArabic ? 'تم الاشتراك بنجاح!' : 'Subscribed Successfully!'}</h4>
                    <p>${config.isArabic ? 
                        'شكراً لاشتراكك في النشرة الإخبارية' :
                        'Thank you for subscribing to our newsletter'}
                    </p>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add toast to body
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = document.querySelector('.newsletter-toast');
        const closeBtn = toast.querySelector('.toast-close');
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNewsletterToast();
        }, 5000);
        
        // Close button
        closeBtn.addEventListener('click', hideNewsletterToast);
        
        function hideNewsletterToast() {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }
    
    // ==========================================================================
    // Download CV Functionality
    // ==========================================================================
    
    function initializeDownloadCV() {
        const downloadCVBtn = document.getElementById('downloadCV');
        
        if (downloadCVBtn) {
            downloadCVBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show download modal for CV
                showCVDownloadModal();
            });
        }
    }
    
    function showCVDownloadModal() {
        const modalHTML = `
            <div class="modal-overlay" id="cvModal">
                <div class="modal-content cv-modal">
                    <div class="modal-header">
                        <h3>${config.isArabic ? 'تحميل السيرة الذاتية' : 'Download CV'}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="cv-options">
                            <div class="cv-option" data-format="pdf">
                                <i class="fas fa-file-pdf"></i>
                                <h4>PDF</h4>
                                <p>${config.isArabic ? 'نسخة عالية الجودة' : 'High quality version'}</p>
                                <span class="file-size">~2 MB</span>
                            </div>
                            <div class="cv-option" data-format="docx">
                                <i class="fas fa-file-word"></i>
                                <h4>Word</h4>
                                <p>${config.isArabic ? 'قابلة للتعديل' : 'Editable version'}</p>
                                <span class="file-size">~3 MB</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary cancel-btn">${config.isArabic ? 'إلغاء' : 'Cancel'}</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('cvModal');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const cvOptions = modal.querySelectorAll('.cv-option');
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
        
        // Handle CV option selection
        cvOptions.forEach(option => {
            option.addEventListener('click', function() {
                const format = this.getAttribute('data-format');
                downloadCV(format);
                closeCVModal();
            });
        });
        
        // Close modal functions
        function closeCVModal() {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeCVModal);
        cancelBtn.addEventListener('click', closeCVModal);
        
        // Close modal on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCVModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal) {
                closeCVModal();
            }
        });
    }
    
    function downloadCV(format) {
        // In a real application, this would trigger the actual file download
        // For now, we'll simulate it with a toast notification
        
        const fileName = `Ghamdan_Abdu_CV.${format}`;
        
        const toastHTML = `
            <div class="toast-notification cv-toast">
                <i class="fas fa-download"></i>
                <div class="toast-content">
                    <h4>${config.isArabic ? 'جاري التحميل...' : 'Downloading...'}</h4>
                    <p>${fileName}</p>
                    <div class="download-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add toast to body
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = document.querySelector('.cv-toast');
        const progressBar = toast.querySelector('.progress-bar');
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Simulate download progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Update toast to show completion
                setTimeout(() => {
                    toast.querySelector('h4').textContent = config.isArabic ? 'تم التحميل!' : 'Download Complete!';
                    toast.querySelector('i').className = 'fas fa-check-circle';
                    
                    // Remove toast after 3 seconds
                    setTimeout(() => {
                        toast.style.transform = 'translateX(100%)';
                        toast.style.opacity = '0';
                        
                        setTimeout(() => {
                            toast.remove();
                        }, 300);
                    }, 3000);
                }, 500);
            }
        }, 50);
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
    // Footer Functions
    // ==========================================================================
    
    function initializeFooter() {
        // Current year in copyright
        const copyrightElements = document.querySelectorAll('.copyright');
        copyrightElements.forEach(element => {
            const yearSpan = element.querySelector('span');
            if (yearSpan) {
                const currentYear = new Date().getFullYear();
                element.innerHTML = element.innerHTML.replace('2024', currentYear);
            }
        });
        
        // Smooth scroll for footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
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
        
        // Initialize footer
        initializeFooter();
        
        // Initialize download CV
        initializeDownloadCV();
        
        // Initialize additional animations
        initializeAdditionalAnimations();
    }
    
    // ==========================================================================
    // Additional Animations
    // ==========================================================================
    
    function initializeAdditionalAnimations() {
        // Logo animation
        const logo = document.querySelector('.animated-logo');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.animation = 'logoPulse 0.5s ease-in-out';
            });
            
            logo.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        }
        
        // Scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '0.7';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            });
        }
        
        // Skill items hover effect
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Service cards hover effect
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ==========================================================================
    // Error Handling
    // ==========================================================================
    
    function initializeErrorHandling() {
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
            
            // Show user-friendly error message
            if (e.error && e.error.message && e.error.message.includes('particles')) {
                console.warn('Particles.js failed to load. Disabling particles.');
                config.particlesEnabled = false;
                document.getElementById('particles-js').style.display = 'none';
            }
        });
        
        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // ==========================================================================
    // Initialize Everything
    // ==========================================================================
    
    // Initialize error handling
    initializeErrorHandling();
    
    // Start with preloader
    initializePreloader();
    
});

// ==========================================================================
// CSS Variables for Theme Support
// ==========================================================================

document.documentElement.style.setProperty('--primary-color', '#6a11cb');
document.documentElement.style.setProperty('--secondary-color', '#2575fc');
document.documentElement.style.setProperty('--accent-color', '#ff0080');
document.documentElement.style.setProperty('--success-color', '#00b09b');
document.documentElement.style.setProperty('--warning-color', '#ff8c00');
document.documentElement.style.setProperty('--info-color', '#40e0d0');