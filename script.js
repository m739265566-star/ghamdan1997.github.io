// ===== DOM Elements =====
const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const langButtons = document.querySelectorAll('.lang-btn');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const downloadCVBtn = document.getElementById('downloadCVBtn');
const viewFullCV = document.getElementById('viewFullCV');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const viewProjectButtons = document.querySelectorAll('.view-project');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const scrollIndicator = document.querySelector('.scroll-indicator');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sectionHeaders = document.querySelectorAll('.section-header');
const statNumbers = document.querySelectorAll('.stat-number');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const progressFills = document.querySelectorAll('.progress-fill');

// ===== Theme Management =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>الوضع المضيء</span>';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>الوضع الداكن</span>';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // إشعار
        this.showNotification(
            `تم تفعيل الوضع ${this.theme === 'dark' ? 'الداكن' : 'المضيء'}`,
            'success'
        );
    }

    setupEventListeners() {
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                z-index: 9999;
                transform: translateX(-100%);
                animation: slideIn 0.3s ease forwards;
                max-width: 400px;
            }
            
            body.dark-mode .notification {
                background: #1e1e1e;
                color: white;
            }
            
            .notification.success {
                border-right: 4px solid #10b981;
            }
            
            .notification.info {
                border-right: 4px solid #6c63ff;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #718096;
                cursor: pointer;
                font-size: 14px;
                padding: 5px;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: rgba(0,0,0,0.1);
                color: #2d3748;
            }
            
            body.dark-mode .notification-close:hover {
                background: rgba(255,255,255,0.1);
                color: white;
            }
            
            @keyframes slideIn {
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        
        // إغلاق الإشعار
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // إغلاق تلقائي بعد 5 ثواني
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// ===== Language Management =====
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.translations = {
            ar: {
                // Navigation
                'home': 'الرئيسية',
                'about': 'عني',
                'education': 'التعليم',
                'skills': 'المهارات',
                'projects': 'المشاريع',
                'experience': 'الخبرات',
                'games': 'الألعاب',
                'contact': 'التواصل',
                
                // Hero
                'greeting': 'مرحباً بك، أنا',
                'title': 'مبرمج ومحلل نظم محترف',
                'description': 'خريج تكنولوجيا المعلومات وعلوم الحاسوب بجامعة إقليم سبا. متخصص في تطوير الأنظمة الإلكترونية وإدارة قواعد البيانات وتصميم حلول الأرشفة الرقمية.',
                'contact_me': 'تواصل معي',
                'view_projects': 'تصفح المشاريع',
                'download_cv': 'تحميل السيرة الذاتية',
                
                // Stats
                'programming_languages': 'لغات برمجة',
                'completed_projects': 'مشروع مكتمل',
                'years_experience': 'سنوات خبرة',
                'satisfied_clients': 'عميل راضٍ',
                
                // About
                'about_me': 'عن غمدان عبده',
                'about_title': 'تعرف على مسيرتي المهنية والإنجازات',
                'personal_info': 'المعلومات الشخصية',
                'full_name': 'الاسم الكامل',
                'birth_date': 'تاريخ الميلاد',
                'city': 'المدينة',
                'marital_status': 'الحالة الاجتماعية',
                'email': 'البريد الإلكتروني',
                'phone': 'رقم الهاتف',
                'bio_title': 'نبذة عني',
                'bio_text': 'مبرمج ومحلل نظم بخلفية إدارية، أجيد استخدام لغات البرمجة. أمتلك خبرة في إدارة الأنظمة وتصميم النماذج والتقارير الإدارية.',
                'quote': '"التكنولوجيا ليست مجرد أدوات، بل هي حلول تخلق مستقبلاً أفضل"',
                'view_full_cv': 'عرض السيرة الكاملة',
                'lets_collaborate': 'لنتعاون معاً',
                
                // Education
                'education_title': 'التعليم والمؤهلات',
                'education_subtitle': 'الشهادات العلمية والدورات التدريبية',
                'bachelor_degree': 'بكالوريوس علوم الحاسوب',
                'university': 'جامعة إقليم سبا',
                'graduation_year': '2021 - 2025',
                'grade': 'التقدير: جيد جداً',
                'degree_description': 'تخصص في تكنولوجيا المعلومات وعلوم الحاسوب بكلية الحاسوب وتكنولوجيا المعلومات.',
                'high_school': 'الثانوية العامة',
                'school_name': 'مدرسة الثورة - الريعة',
                'year_2016': '2016',
                'scientific_section': 'الفرع: علمي',
                'courses_title': 'الدورات التدريبية',
                'courses_subtitle': 'شهادات متخصصة',
                'cyber_security': 'الأمن السيبراني',
                'icdl_certificate': 'الرخصة الدولية لقيادة الحاسوب',
                'device_protection': 'حماية الطرفيات والأجهزة',
                'english_language': 'اللغة الإنجليزية',
                'intermediate_level': 'المستوى: متوسط',
                
                // Skills
                'skills_title': 'المهارات التقنية',
                'skills_subtitle': 'التقنيات والأدوات التي أتقنها',
                'programming_languages_title': 'لغات البرمجة',
                'web_development_title': 'تطوير الويب',
                'databases_title': 'قواعد البيانات',
                'tools_technologies_title': 'الأدوات والتقنيات',
                
                // Projects
                'projects_title': 'المشاريع والأعمال',
                'projects_subtitle': 'أبرز المشاريع التي قمت بتطويرها وتنفيذها',
                'all_projects': 'الكل',
                'web_apps': 'تطبيقات ويب',
                'management_systems': 'أنظمة إدارية',
                'games_section': 'ألعاب',
                'digital_archive': 'أرشفة رقمية',
                'student_portal': 'بوابة الطالب الإلكترونية',
                'student_portal_desc': 'نظام متكامل لإدارة وتسجيل الطلاب في الكلية',
                'balloon_game': 'لعبة رمي البالون',
                'balloon_game_desc': 'لعبة تفاعلية تم تطويرها بلغة C#',
                'digital_archive_system': 'نظام الأرشيف الرقمي',
                'digital_archive_desc': 'نظام متكامل لإدارة وأرشفة الوثائق الرقمية',
                'personal_website': 'موقع شخصي تفاعلي',
                'personal_website_desc': 'تصميم وتطوير موقع شخصي متكامل بتقنيات حديثة',
                'view_details': 'عرض التفاصيل',
                'download_game': 'تحميل اللعبة',
                
                // Experience
                'experience_title': 'الخبرات التطبيقية',
                'experience_subtitle': 'المشاريع والتجارب العملية',
                'system_analyst': 'محلل ومبرمج نظام بوابة الطالب',
                'college_computer': 'كلية الحاسوب - جامعة إقليم سبا',
                'experience_desc': 'قمت بتحليل وتصميم وبرمجة النظام الإلكتروني للبوابة الطلابية',
                'goal': 'الهدف',
                'goal_text': 'أتمتة الخدمات الأكاديمية',
                'tools': 'الأدوات',
                'tools_text': 'XAMPP, Composer, Git, VS Code',
                'technologies': 'التقنيات',
                'technologies_text': 'SQL, PHP, CSS, JavaScript, Bootstrap',
                'key_features': 'المميزات الرئيسية',
                'system_analysis': 'تحليل النظم',
                'project_management': 'إدارة المشاريع',
                'teamwork': 'العمل الجماعي',
                'effective_communication': 'التواصل الفعال',
                'additional_skills': 'مهارات إضافية',
                'computer_skills': 'استخدام الحاسوب بكفاءة',
                'fast_typing': 'الطباعة السريعة',
                'office_suite': 'إجادة حزمة Office',
                'records_management': 'إدارة السجلات والأرشفة',
                'team_work': 'العمل ضمن فريق',
                'fast_learning': 'التعلم السريع',
                'arabic_language': 'العربية (لغة أم)',
                'english_language_skill': 'الإنجليزية (متوسط)',
                
                // Games
                'games_title': 'الألعاب التفاعلية',
                'games_subtitle': 'استمتع بألعاب برمجية صممتها خصيصاً',
                'coding_game': 'لعبة البرمجة السريعة',
                'game_instructions': 'تعليمات اللعبة',
                'game_task': 'اكتب رمز JavaScript الصحيح لإكمال المهمة',
                'task_description': 'المهمة: أضف الأرقام من 1 إلى 5',
                'write_solution': 'اكتب حلك هنا...',
                'run_code': 'تشغيل الكود',
                'reset_code': 'إعادة تعيين',
                'points': 'النقاط',
                'time': 'الوقت',
                'seconds': 'ث',
                'game_features': 'مميزات اللعبة',
                'advanced_graphics': 'جرافيكس متقدم',
                'sound_effects': 'مؤثرات صوتية',
                'points_system': 'نظام نقاط',
                'multiple_levels': 'مستويات متعددة',
                'operating_system': 'نظام التشغيل',
                'size': 'الحجم',
                'download_now': 'تحميل اللعبة الآن',
                
                // Contact
                'contact_title': 'تواصل معي',
                'contact_subtitle': 'لنتعاون معاً لتحقيق أفكارك',
                'contact_info': 'معلومات التواصل',
                'contact_welcome': 'أرحب بأي استفسار أو فرصة عمل',
                'address': 'العنوان',
                'phone_number': 'الهاتف',
                'email_address': 'البريد الإلكتروني',
                'social_media': 'وسائل التواصل الاجتماعي',
                'send_message': 'أرسل رسالة',
                'reply_time': 'سأرد عليك في أقرب وقت ممكن',
                'full_name_field': 'الاسم الكامل',
                'enter_name': 'أدخل اسمك',
                'email_field': 'البريد الإلكتروني',
                'enter_email': 'أدخل بريدك الإلكتروني',
                'message_subject': 'موضوع الرسالة',
                'enter_subject': 'موضوع الرسالة',
                'message_field': 'الرسالة',
                'write_message': 'اكتب رسالتك هنا...',
                'send_message_button': 'إرسال الرسالة',
                
                // Footer
                'quick_links': 'روابط سريعة',
                'services': 'الخدمات',
                'web_development': 'تطوير الويب',
                'system_analysis': 'تحليل النظم',
                'database_management': 'قواعد البيانات',
                'digital_archiving': 'الأرشفة الرقمية',
                'game_development': 'تطوير الألعاب',
                'newsletter': 'النشرة البريدية',
                'newsletter_text': 'اشترك للحصول على آخر التحديثات',
                'enter_email_newsletter': 'بريدك الإلكتروني',
                'copyright': 'جميع الحقوق محفوظة',
                'developed_by': 'تم التصميم والتطوير بواسطة غمدان عبده'
            },
            en: {
                // Navigation
                'home': 'Home',
                'about': 'About',
                'education': 'Education',
                'skills': 'Skills',
                'projects': 'Projects',
                'experience': 'Experience',
                'games': 'Games',
                'contact': 'Contact',
                
                // Hero
                'greeting': 'Hello, I am',
                'title': 'Professional Programmer & Systems Analyst',
                'description': 'Graduate in Information Technology and Computer Science from Saba Region University. Specialized in developing electronic systems, database management, and designing digital archiving solutions.',
                'contact_me': 'Contact Me',
                'view_projects': 'View Projects',
                'download_cv': 'Download CV',
                
                // Stats
                'programming_languages': 'Programming Languages',
                'completed_projects': 'Completed Projects',
                'years_experience': 'Years Experience',
                'satisfied_clients': 'Satisfied Clients',
                
                // About
                'about_me': 'About Gamdan Abdu',
                'about_title': 'Learn about my career journey and achievements',
                'personal_info': 'Personal Information',
                'full_name': 'Full Name',
                'birth_date': 'Date of Birth',
                'city': 'City',
                'marital_status': 'Marital Status',
                'email': 'Email Address',
                'phone': 'Phone Number',
                'bio_title': 'About Me',
                'bio_text': 'Programmer and systems analyst with administrative background. Proficient in programming languages. Experienced in system management, form design, and administrative reports.',
                'quote': '"Technology is not just tools, but solutions that create a better future"',
                'view_full_cv': 'View Full CV',
                'lets_collaborate': "Let's Collaborate",
                
                // Education
                'education_title': 'Education & Qualifications',
                'education_subtitle': 'Academic certificates and training courses',
                'bachelor_degree': 'Bachelor of Computer Science',
                'university': 'Saba Region University',
                'graduation_year': '2021 - 2025',
                'grade': 'Grade: Very Good',
                'degree_description': 'Specialized in Information Technology and Computer Science at the Faculty of Computer and Information Technology.',
                'high_school': 'High School',
                'school_name': 'Al-Thawra School - Riya',
                'year_2016': '2016',
                'scientific_section': 'Section: Scientific',
                'courses_title': 'Training Courses',
                'courses_subtitle': 'Professional Certificates',
                'cyber_security': 'Cyber Security',
                'icdl_certificate': 'International Computer Driving License',
                'device_protection': 'Endpoint & Device Protection',
                'english_language': 'English Language',
                'intermediate_level': 'Level: Intermediate',
                
                // Skills
                'skills_title': 'Technical Skills',
                'skills_subtitle': 'Technologies and tools I master',
                'programming_languages_title': 'Programming Languages',
                'web_development_title': 'Web Development',
                'databases_title': 'Databases',
                'tools_technologies_title': 'Tools & Technologies',
                
                // Projects
                'projects_title': 'Projects & Works',
                'projects_subtitle': 'Most notable projects I have developed and implemented',
                'all_projects': 'All',
                'web_apps': 'Web Applications',
                'management_systems': 'Management Systems',
                'games_section': 'Games',
                'digital_archive': 'Digital Archive',
                'student_portal': 'Electronic Student Portal',
                'student_portal_desc': 'Integrated system for managing and registering college students',
                'balloon_game': 'Balloon Throw Game',
                'balloon_game_desc': 'Interactive game developed with C#',
                'digital_archive_system': 'Digital Archive System',
                'digital_archive_desc': 'Integrated system for managing and archiving digital documents',
                'personal_website': 'Interactive Personal Website',
                'personal_website_desc': 'Design and development of a comprehensive personal website with modern technologies',
                'view_details': 'View Details',
                'download_game': 'Download Game',
                
                // Experience
                'experience_title': 'Practical Experience',
                'experience_subtitle': 'Projects and practical experiences',
                'system_analyst': 'System Analyst & Programmer - Student Portal',
                'college_computer': 'Computer College - Saba Region University',
                'experience_desc': 'I analyzed, designed, and programmed the electronic student portal system',
                'goal': 'Goal',
                'goal_text': 'Automating academic services',
                'tools': 'Tools',
                'tools_text': 'XAMPP, Composer, Git, VS Code',
                'technologies': 'Technologies',
                'technologies_text': 'SQL, PHP, CSS, JavaScript, Bootstrap',
                'key_features': 'Key Features',
                'system_analysis': 'System Analysis',
                'project_management': 'Project Management',
                'teamwork': 'Teamwork',
                'effective_communication': 'Effective Communication',
                'additional_skills': 'Additional Skills',
                'computer_skills': 'Efficient computer use',
                'fast_typing': 'Fast typing',
                'office_suite': 'Proficient in Office suite',
                'records_management': 'Records management & archiving',
                'team_work': 'Team work',
                'fast_learning': 'Fast learning',
                'arabic_language': 'Arabic (Native)',
                'english_language_skill': 'English (Intermediate)',
                
                // Games
                'games_title': 'Interactive Games',
                'games_subtitle': 'Enjoy programming games I designed specially',
                'coding_game': 'Fast Coding Game',
                'game_instructions': 'Game Instructions',
                'game_task': 'Write the correct JavaScript code to complete the task',
                'task_description': 'Task: Add numbers from 1 to 5',
                'write_solution': 'Write your solution here...',
                'run_code': 'Run Code',
                'reset_code': 'Reset',
                'points': 'Points',
                'time': 'Time',
                'seconds': 's',
                'game_features': 'Game Features',
                'advanced_graphics': 'Advanced graphics',
                'sound_effects': 'Sound effects',
                'points_system': 'Points system',
                'multiple_levels': 'Multiple levels',
                'operating_system': 'Operating System',
                'size': 'Size',
                'download_now': 'Download Now',
                
                // Contact
                'contact_title': 'Contact Me',
                'contact_subtitle': "Let's collaborate to achieve your ideas",
                'contact_info': 'Contact Information',
                'contact_welcome': 'I welcome any inquiry or job opportunity',
                'address': 'Address',
                'phone_number': 'Phone',
                'email_address': 'Email Address',
                'social_media': 'Social Media',
                'send_message': 'Send Message',
                'reply_time': 'I will reply to you as soon as possible',
                'full_name_field': 'Full Name',
                'enter_name': 'Enter your name',
                'email_field': 'Email Address',
                'enter_email': 'Enter your email',
                'message_subject': 'Message Subject',
                'enter_subject': 'Message subject',
                'message_field': 'Message',
                'write_message': 'Write your message here...',
                'send_message_button': 'Send Message',
                
                // Footer
                'quick_links': 'Quick Links',
                'services': 'Services',
                'web_development': 'Web Development',
                'system_analysis': 'System Analysis',
                'database_management': 'Database Management',
                'digital_archiving': 'Digital Archiving',
                'game_development': 'Game Development',
                'newsletter': 'Newsletter',
                'newsletter_text': 'Subscribe to get the latest updates',
                'enter_email_newsletter': 'Your email',
                'copyright': 'All rights reserved',
                'developed_by': 'Designed & Developed by Gamdan Abdu'
            }
        };
        this.init();
    }

    init() {
        this.applyLanguage();
        this.setupEventListeners();
    }

    applyLanguage() {
        // تغيير اتجاه الصفحة
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.body.className = this.currentLang === 'ar' ? 'ar-mode' : 'en-mode';
        
        // تحديث النصوص
        this.updateTexts();
        
        // تحديث الأزرار النشطة
        langButtons.forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // حفظ اللغة
        localStorage.setItem('language', this.currentLang);
    }

    updateTexts() {
        const texts = this.translations[this.currentLang];
        
        // تحديث النصوص
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (texts[key]) {
                element.textContent = texts[key];
            }
        });
        
        // تحديث النصوص في العناصر الخاصة
        this.updateDynamicTexts(texts);
    }

    updateDynamicTexts(texts) {
        // تحديث النصوص الديناميكية
        const elementsToUpdate = {
            '.greeting .hello': texts.greeting,
            '.hero-title': texts.title,
            '.hero-description': texts.description,
            '.section-header .section-title': texts.about_me,
            '.section-subtitle': texts.about_title,
            // أضف المزيد حسب الحاجة
        };
        
        Object.entries(elementsToUpdate).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = text;
            }
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        this.applyLanguage();
        
        // إشعار
        themeManager.showNotification(
            `Language switched to ${lang === 'ar' ? 'Arabic' : 'English'}`,
            'success'
        );
    }

    setupEventListeners() {
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.dataset.lang);
            });
        });
    }
}

// ===== Navigation Management =====
class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // التنقل السلس
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                    
                    // التمرير السلس
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // تحديث الرابط النشط
                    this.updateActiveNav(anchor);
                }
            });
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    this.updateActiveNavBySection();
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNav(clickedLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }

    updateActiveNavBySection() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${this.currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// ===== Projects Management =====
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: 'بوابة الطالب الإلكترونية',
                category: 'system',
                description: 'نظام متكامل لإدارة شؤون الطلاب في الكلية، يتضمن نظام الحضور والغياب، النتائج، الجداول الدراسية، والخدمات الأكاديمية المختلفة.',
                longDescription: 'تم تطوير هذا النظام باستخدام PHP وMySQL وJavaScript مع واجهة مستخدم متطورة باستخدام Bootstrap. النظام يتضمن:<br><br>• إدارة بيانات الطلاب<br>• نظام الحضور والغياب الإلكتروني<br>• رصد النتائج وإصدار التقارير<br>• جداول الدروس والامتحانات<br>• خدمات إلكترونية متنوعة للطلاب<br>• لوحة تحكم للمدرسين والإدارة<br>• نظام صلاحيات متكامل',
                technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX'],
                features: ['إدارة الطلاب', 'نتائج الامتحانات', 'جداول الدروس', 'نظام الحضور', 'خدمات إلكترونية'],
                images: ['project1-1.jpg', 'project1-2.jpg', 'project1-3.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            },
            {
                id: 2,
                title: 'لعبة رمي البالون',
                category: 'game',
                description: 'لعبة تفاعلية تم تطويرها بلغة C# باستخدام .NET Framework، تحتوي على مؤثرات بصرية وصوتية متقدمة، ونظام نقاط ومستويات متدرجة الصعوبة.',
                longDescription: 'لعبة ثلاثية الأبعاد تم تطويرها باستخدام C# و.NET Framework مع مكتبات جرافيكس متقدمة. المميزات:<br><br>• جرافيكس ثلاثي الأبعاد<br>• نظام فيزياء واقعي<br>• مؤثرات صوتية متعددة<br>• 10 مستويات متدرجة الصعوبة<br>• نظام نقاط وترتيب عالمي<br>• دعم اللغة العربية والإنجليزية<br>• واجهة مستبدلة سهلة الاستخدام',
                technologies: ['C#', '.NET Framework', 'Windows Forms', 'DirectX'],
                features: ['مؤثرات بصرية', 'نظام النقاط', 'مستويات متعددة', 'جرافيكس ثلاثي الأبعاد'],
                images: ['project2-1.jpg', 'project2-2.jpg', 'project2-3.jpg'],
                demoUrl: '#',
                downloadUrl: 'BalloonGame.exe'
            },
            {
                id: 3,
                title: 'نظام الأرشيف الرقمي',
                category: 'other',
                description: 'نظام متكامل لإدارة وأرشفة الوثائق الرقمية، يدعم تصنيف المستندات، البحث المتقدم، النسخ الاحتياطي، وإدارة الصلاحيات للمستخدمين.',
                longDescription: 'نظام أرشفة متكامل تم تطويره لتلبية احتياجات المؤسسات الحكومية والخاصة. المميزات:<br><br>• رفع وتصنيف المستندات<br>• نظام بحث متقدم (نص كامل)<br>• إدارة الصلاحيات والصلاحيات<br>• نسخ احتياطي تلقائي<br>• سجل التعديلات والمراجعات<br>• تصدير التقارير (PDF, Excel)<br>• دعم تعدد اللغات<br>• واجهة مستبدلة متجاوبة',
                technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'PDF Library', 'Search Engine'],
                features: ['تصنيف المستندات', 'بحث متقدم', 'إدارة الصلاحيات', 'نسخ احتياطي'],
                images: ['project3-1.jpg', 'project3-2.jpg', 'project3-3.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            },
            {
                id: 4,
                title: 'موقع شخصي تفاعلي',
                category: 'web',
                description: 'تصميم وتطوير موقع شخصي متكامل بتقنيات حديثة، يدعم العرض على جميع الأجهزة، ويحتوي على تأثيرات بصرية متقدمة وواجهة مستخدم تفاعلية.',
                longDescription: 'موقع شخصي احترافي تم تطويره باستخدام أحدث تقنيات الويب. المميزات:<br><br>• تصميم متجاوب مع جميع الشاشات<br>• تأثيرات بصرية متقدمة (CSS3, JavaScript)<br>• نظام إدارة محتوى مخصص<br>• معرض صور تفاعلي<br>• نموذج تواصل آمن<br>• تحسين لمحركات البحث (SEO)<br>• دعم التطبيق التقدمي (PWA)<br>• نظام الترجمة (العربية/الإنجليزية)',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'jQuery', 'AJAX'],
                features: ['تصميم متجاوب', 'تأثيرات متقدمة', 'واجهة تفاعلية', 'SEO محسن'],
                images: ['project4-1.jpg', 'project4-2.jpg', 'project4-3.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            }
        ];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProjectModal();
        this.filterProjects();
    }

    setupEventListeners() {
        // تصفية المشاريع
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // إزالة النشاط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة النشاط للزر المحدد
                button.classList.add('active');
                // تطبيق التصفية
                this.currentFilter = button.dataset.filter;
                this.filterProjects();
            });
        });

        // تحميل ملف السيرة الذاتية
        downloadCVBtn?.addEventListener('click', () => {
            this.downloadFile('graduation.pdf', 'سيرة_ذاتية_غمدان_عبده.pdf');
        });

        viewFullCV?.addEventListener('click', () => {
            window.open('graduation.pdf', '_blank');
        });
    }

    filterProjects() {
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (this.currentFilter === 'all' || category === this.currentFilter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    }

    setupProjectModal() {
        // فتح المشروع
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.dataset.project;
                const project = this.projects.find(p => p.id == projectId);
                if (project) {
                    this.openProjectModal(project);
                }
            });
        });

        // إغلاق المشروع
        modalClose?.addEventListener('click', () => this.closeProjectModal());
        modalOverlay?.addEventListener('click', () => this.closeProjectModal());

        // إغلاق بالزر ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.style.display === 'block') {
                this.closeProjectModal();
            }
        });
    }

    openProjectModal(project) {
        const modalBody = projectModal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-images">
                    <div class="main-image">
                        <img src="images/projects/${project.images[0]}" alt="${project.title}" 
                             onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'">
                    </div>
                    <div class="thumbnail-images">
                        ${project.images.map((img, index) => `
                            <img src="images/projects/${img}" alt="${project.title} ${index + 1}"
                                 onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'">
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-modal-details">
                    <h3>${project.title}</h3>
                    <div class="project-category">
                        <span class="category-tag">${this.getCategoryName(project.category)}</span>
                    </div>
                    
                    <div class="project-description">
                        <h4>وصف المشروع</h4>
                        <p>${project.longDescription}</p>
                    </div>
                    
                    <div class="project-technologies">
                        <h4>التقنيات المستخدمة</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-features">
                        <h4>المميزات الرئيسية</h4>
                        <ul>
                            ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-links">
                        ${project.demoUrl !== '#' ? `
                            <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-external-link-alt"></i> عرض العرض الحي
                            </a>
                        ` : ''}
                        
                        ${project.githubUrl !== '#' ? `
                            <a href="${project.githubUrl}" class="btn btn-outline" target="_blank">
                                <i class="fab fa-github"></i> عرض الكود المصدري
                            </a>
                        ` : ''}
                        
                        ${project.downloadUrl ? `
                            <a href="${project.downloadUrl}" class="btn btn-secondary" download>
                                <i class="fas fa-download"></i> تحميل المشروع
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // إضافة أحداث للصور المصغرة
        const thumbnails = modalBody.querySelectorAll('.thumbnail-images img');
        const mainImage = modalBody.querySelector('.main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
            });
        });
        
        // إظهار المودال
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    getCategoryName(category) {
        const categories = {
            'web': 'تطبيق ويب',
            'system': 'نظام إداري',
            'game': 'لعبة',
            'other': 'أرشفة رقمية'
        };
        return categories[category] || category;
    }

    downloadFile(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        themeManager.showNotification('جاري تحميل السيرة الذاتية...', 'success');
    }
}

// ===== Animations Manager =====
class AnimationsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupSkillAnimations();
        this.setupBackToTop();
        this.setupParticles();
    }

    setupScrollAnimations() {
        // إخفاء مؤشر التمرير عند التمرير
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator?.style.opacity = '0';
                scrollIndicator?.style.visibility = 'hidden';
            } else {
                scrollIndicator?.style.opacity = '1';
                scrollIndicator?.style.visibility = 'visible';
            }
        });

        // تأثير الشريط العلوي
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupCounterAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    setupSkillAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkills() {
        skillProgressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = width;
            }, index * 200);
        });
    }

    setupBackToTop() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        document.getElementById('particles-bg').appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 100 + 156)}, 255, ${Math.random() * 0.5 + 0.1})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                
                if (this.size > 0.2) this.size -= 0.001;
                if (this.size <= 0.2) this.reset();
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            requestAnimationFrame(animate);
        };
        
        initParticles();
        animate();
        
        // إعادة إنشاء الجسيمات عند تغيير الحجم
        window.addEventListener('resize', () => {
            setTimeout(initParticles, 100);
        });
    }
}

// ===== Form Management =====
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupNewsletterForm();
    }

    setupContactForm() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // التحقق من المدخلات
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                this.showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.showAlert('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // محاكاة إرسال الرسالة
            this.showLoading();
            
            setTimeout(() => {
                this.hideLoading();
                this.showAlert('تم إرسال رسالتك بنجاح! سأرد عليك في أقرب وقت ممكن.', 'success');
                contactForm.reset();
                
                // إرسال إشعار
                themeManager.showNotification('تم إرسال رسالتك بنجاح', 'success');
            }, 2000);
        });
    }

    setupNewsletterForm() {
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                this.showAlert('يرجى إدخال بريدك الإلكتروني', 'error');
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.showAlert('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // محاكاة الاشتراك
            this.showLoading();
            
            setTimeout(() => {
                this.hideLoading();
                this.showAlert('شكراً لك! تم اشتراكك بنجاح في النشرة البريدية.', 'success');
                emailInput.value = '';
                
                // إرسال إشعار
                themeManager.showNotification('تم الاشتراك في النشرة البريدية', 'success');
            }, 1500);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showAlert(message, type = 'info') {
        // إزالة أي إنذار سابق
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) existingAlert.remove();
        
        // إنشاء الإنذار الجديد
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="alert-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .form-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                z-index: 9999;
                animation: slideInRight 0.3s ease forwards;
                max-width: 400px;
            }
            
            body.dark-mode .form-alert {
                background: #1e1e1e;
                color: white;
            }
            
            .form-alert.success {
                border-right: 4px solid #10b981;
            }
            
            .form-alert.error {
                border-right: 4px solid #ef4444;
            }
            
            .alert-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .alert-close {
                background: none;
                border: none;
                color: #718096;
                cursor: pointer;
                font-size: 14px;
                padding: 5px;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            
            .alert-close:hover {
                background: rgba(0,0,0,0.1);
                color: #2d3748;
            }
            
            body.dark-mode .alert-close:hover {
                background: rgba(255,255,255,0.1);
                color: white;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة الإنذار
        document.body.appendChild(alert);
        
        // إغلاق الإنذار
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => alert.remove(), 300);
        });
        
        // إغلاق تلقائي بعد 5 ثواني
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }

    showLoading() {
        // إزالة أي تحميل سابق
        const existingLoader = document.querySelector('.form-loader');
        if (existingLoader) existingLoader.remove();
        
        // إنشاء مؤشر التحميل
        const loader = document.createElement('div');
        loader.className = 'form-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <span>جاري الإرسال...</span>
        `;
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .form-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 20px;
                z-index: 9999;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: #6c63ff;
                animation: spin 1s linear infinite;
            }
            
            .form-loader span {
                color: white;
                font-size: 16px;
                font-weight: 600;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(loader);
    }

    hideLoading() {
        const loader = document.querySelector('.form-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }
}

// ===== Game Management =====
class GameManager {
    constructor() {
        this.gameScore = 0;
        this.gameTime = 60;
        this.gameTimer = null;
        this.gameActive = false;
        this.init();
    }

    init() {
        this.setupGame();
    }

    setupGame() {
        const startBtn = document.getElementById('startMemoryGame');
        const checkCodeBtn = document.getElementById('checkCode');
        const resetCodeBtn = document.getElementById('resetCode');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startGame());
        }
        
        if (checkCodeBtn) {
            checkCodeBtn.addEventListener('click', () => this.checkCode());
        }
        
        if (resetCodeBtn) {
            resetCodeBtn.addEventListener('click', () => this.resetCode());
        }
    }

    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.gameScore = 0;
        this.gameTime = 60;
        
        document.getElementById('gameScore').textContent = this.gameScore;
        document.getElementById('gameTimer').textContent = this.gameTime;
        
        this.gameTimer = setInterval(() => {
            this.gameTime--;
            document.getElementById('gameTimer').textContent = this.gameTime;
            
            if (this.gameTime <= 0) {
                this.endGame();
            }
        }, 1000);
        
        themeManager.showNotification('بدأت اللعبة! لديك 60 ثانية', 'success');
    }

    checkCode() {
        if (!this.gameActive) {
            themeManager.showNotification('يجب بدء اللعبة أولاً!', 'error');
            return;
        }
        
        const codeInput = document.getElementById('codeInput');
        const userCode = codeInput.value.trim();
        
        // الحل الصحيح: جمع الأرقام من 1 إلى 5
        const correctCode = `for(let i = 1; i <= 5; i++) {
    sum += i;
}`;
        
        // تحقق مبسط (في تطبيق حقيقي سيكون هناك محرك تنفيذ كود)
        if (userCode.includes('for') && userCode.includes('sum') && 
            (userCode.includes('5') || userCode.includes('5'))) {
            
            this.gameScore += 10;
            document.getElementById('gameScore').textContent = this.gameScore;
            
            themeManager.showNotification('أحسنت! الإجابة صحيحة (+10 نقاط)', 'success');
            
            // توليد مهمة جديدة
            this.generateNewTask();
            
        } else {
            themeManager.showNotification('حاول مرة أخرى! تأكد من جمع الأرقام من 1 إلى 5', 'error');
        }
    }

    resetCode() {
        document.getElementById('codeInput').value = '';
    }

    generateNewTask() {
        const tasks = [
            {
                description: 'المهمة: اطبع الأرقام الزوجية من 1 إلى 10',
                hint: 'استخدم حلقة for وتحقق من الباقي بالقسمة على 2'
            },
            {
                description: 'المهمة: ابحث عن أكبر رقم في مصفوفة [5, 8, 2, 10, 3]',
                hint: 'استخدم Math.max أو حلقة للمقارنة'
            },
            {
                description: 'المهمة: اقلب النص "مرحبا"',
                hint: 'استخدم split و reverse و join'
            }
        ];
        
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        document.querySelector('.game-task p').textContent = randomTask.description;
        
        // تحديث التلميح
        const hintElement = document.querySelector('.game-task .hint');
        if (!hintElement) {
            const taskElement = document.querySelector('.game-task');
            const hint = document.createElement('div');
            hint.className = 'hint';
            hint.innerHTML = `<small><i class="fas fa-lightbulb"></i> تلميح: ${randomTask.hint}</small>`;
            taskElement.appendChild(hint);
        } else {
            hintElement.innerHTML = `<small><i class="fas fa-lightbulb"></i> تلميح: ${randomTask.hint}</small>`;
        }
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        
        let message = '';
        if (this.gameScore >= 30) {
            message = 'ممتاز! أنت مبرمج محترف!';
        } else if (this.gameScore >= 20) {
            message = 'جيد جداً! لديك مهارات برمجية جيدة';
        } else {
            message = 'حاول مرة أخرى! التدريب يصنع المحترفين';
        }
        
        themeManager.showNotification(`انتهت اللعبة! النقاط: ${this.gameScore}. ${message}`, 'success');
        
        // إعادة تعيين اللعبة
        this.gameScore = 0;
        this.gameTime = 60;
        document.getElementById('gameScore').textContent = this.gameScore;
        document.getElementById('gameTimer').textContent = this.gameTime;
        this.resetCode();
    }
}

// ===== Main Application =====
class PortfolioApp {
    constructor() {
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager();
        this.navigationManager = new NavigationManager();
        this.projectsManager = new ProjectsManager();
        this.animationsManager = new AnimationsManager();
        this.formManager = new FormManager();
        this.gameManager = new GameManager();
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupEventListeners();
        this.setupAnalytics();
        this.setupServiceWorker();
    }

    setupPreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1500);
        });
    }

    setupEventListeners() {
        // تحديث النصوص عند تغيير اللغة
        this.languageManager.translations = this.languageManager.translations;
        
        // تحديث المشاريع عند تغيير اللغة
        document.addEventListener('languageChanged', () => {
            this.projectsManager.filterProjects();
        });
        
        // تحديث النماذج عند تغيير اللغة
        document.addEventListener('languageChanged', () => {
            this.updateFormPlaceholders();
        });
    }

    updateFormPlaceholders() {
        const texts = this.languageManager.translations[this.languageManager.currentLang];
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        if (nameInput) nameInput.placeholder = texts.enter_name;
        if (emailInput) emailInput.placeholder = texts.enter_email;
        if (subjectInput) subjectInput.placeholder = texts.enter_subject;
        if (messageInput) messageInput.placeholder = texts.write_message;
    }

    setupAnalytics() {
        // تتبع الزيارات
        const visitCount = localStorage.getItem('visitCount') || 0;
        localStorage.setItem('visitCount', parseInt(visitCount) + 1);
        
        // تتبع وقت الزيارة
        const visitTime = new Date().toISOString();
        localStorage.setItem('lastVisit', visitTime);
        
        // إرسال إحصائيات (في تطبيق حقيقي سيتم إرسالها لخادم)
        console.log(`مرحباً بك! هذه الزيارة رقم: ${parseInt(visitCount) + 1}`);
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // جعل الكائنات متاحة عالمياً للتصحيح
    window.app = app;
    window.themeManager = app.themeManager;
    window.languageManager = app.languageManager;
    window.projectsManager = app.projectsManager;
    window.gameManager = app.gameManager;
    
    console.log('✅ تم تحميل تطبيق Portfolio بنجاح!');
});