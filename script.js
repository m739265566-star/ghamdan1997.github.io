/* ===================================================
   ملف JavaScript الرئيسي - موقع غمدان عبده
   إجمالي الأسطر: 2000+ سطر
   تصميم متجاوب مع أناقة واحترافية
   =================================================== */

// ===== Configuration =====
const CONFIG = {
    // Animation Delays
    animationDelay: 100,
    scrollThreshold: 100,
    
    // Colors
    primaryColor: '#6c63ff',
    secondaryColor: '#36d1dc',
    accentColor: '#ff6b6b',
    
    // API Endpoints
    api: {
        contact: '/api/contact',
        newsletter: '/api/newsletter'
    },
    
    // Game Settings
    game: {
        maxPoints: 1000000,
        timePerQuestion: 30,
        helpCount: 3
    }
};

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
            document.querySelector('#themeToggle').innerHTML = '<i class="fas fa-sun"></i><span>الوضع المضيء</span>';
            this.applyDarkModeStyles();
        } else {
            document.body.classList.remove('dark-mode');
            document.querySelector('#themeToggle').innerHTML = '<i class="fas fa-moon"></i><span>الوضع الداكن</span>';
            this.applyLightModeStyles();
        }
        
        this.updateThemeColors();
    }

    applyDarkModeStyles() {
        document.documentElement.style.setProperty('--primary-color', '#a29bfe');
        document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
        document.documentElement.style.setProperty('--accent-color', '#ff8e8e');
        
        const style = document.createElement('style');
        style.id = 'dark-mode-styles';
        style.textContent = `
            body.dark-mode {
                --gradient-1: linear-gradient(135deg, #6c63ff, #36d1dc);
                --gradient-2: linear-gradient(135deg, #ff6b6b, #ffd166);
                --gradient-3: linear-gradient(135deg, #4ecdc4, #44a08d);
            }
            
            body.dark-mode .floating-code .code-tag {
                color: rgba(162, 155, 254, 0.3);
                text-shadow: 0 0 10px rgba(162, 155, 254, 0.5);
            }
            
            body.dark-mode .particles-bg {
                opacity: 0.2;
            }
            
            body.dark-mode .stat-card {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            body.dark-mode .skill-bar {
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            }
        `;
        
        const oldStyles = document.getElementById('dark-mode-styles');
        if (oldStyles) oldStyles.remove();
        
        document.head.appendChild(style);
    }

    applyLightModeStyles() {
        document.documentElement.style.setProperty('--primary-color', CONFIG.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', CONFIG.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', CONFIG.accentColor);
        
        const darkStyles = document.getElementById('dark-mode-styles');
        if (darkStyles) darkStyles.remove();
    }

    updateThemeColors() {
        const hour = new Date().getHours();
        let gradient;
        
        if (hour >= 6 && hour < 12) {
            gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else if (hour >= 12 && hour < 18) {
            gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        } else if (hour >= 18 && hour < 21) {
            gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        } else {
            gradient = 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
        }
        
        document.documentElement.style.setProperty('--dynamic-gradient', gradient);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        
        document.body.style.transition = 'all 0.5s ease';
        this.applyTheme();
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
        
        this.showNotification(
            `تم تفعيل الوضع ${this.theme === 'dark' ? 'الداكن ✨' : 'المضيء ☀️'}`,
            'success'
        );
        
        if (window.particlesJS) {
            this.updateParticles();
        }
    }

    updateParticles() {
        if (this.theme === 'dark') {
            particlesJS('heroParticles', {
                particles: {
                    color: {
                        value: ['#a29bfe', '#4ecdc4', '#ff8e8e']
                    }
                }
            });
        } else {
            particlesJS('heroParticles', {
                particles: {
                    color: {
                        value: ['#6c63ff', '#36d1dc', '#ff6b6b']
                    }
                }
            });
        }
    }

    showNotification(message, type = 'info') {
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    background: white;
                    padding: 16px 24px;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    z-index: 9999;
                    transform: translateY(-100px);
                    animation: slideDown 0.5s ease forwards;
                    max-width: 400px;
                    border-right: 4px solid;
                }
                
                body.dark-mode .notification {
                    background: rgba(30, 30, 30, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                }
                
                .notification.success {
                    border-right-color: #4ecdc4;
                }
                
                .notification.info {
                    border-right-color: #6c63ff;
                }
                
                .notification.warning {
                    border-right-color: #ffd166;
                }
                
                .notification.error {
                    border-right-color: #ef476f;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                }
                
                .notification-content i {
                    font-size: 20px;
                }
                
                .notification.success .notification-content i { color: #4ecdc4; }
                .notification.info .notification-content i { color: #6c63ff; }
                .notification.warning .notification-content i { color: #ffd166; }
                .notification.error .notification-content i { color: #ef476f; }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #718096;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 8px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .notification-close:hover {
                    background: rgba(0,0,0,0.1);
                }
                
                body.dark-mode .notification-close:hover {
                    background: rgba(255,255,255,0.1);
                }
                
                @keyframes slideDown {
                    to { transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(-100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 
                                  type === 'error' ? 'times-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideUp 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    setupEventListeners() {
        document.querySelector('#themeToggle').addEventListener('click', () => this.toggleTheme());
        
        setInterval(() => {
            this.updateThemeColors();
        }, 3600000);
    }
}

// ===== Language Management =====
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.translations = {
            ar: {
                'home': 'الرئيسية',
                'about': 'عني',
                'education': 'التعليم',
                'skills': 'المهارات',
                'projects': 'المشاريع',
                'gallery': 'معرض الصور',
                'experience': 'الخبرات',
                'games': 'التحدي التقني',
                'contact': 'التواصل',
                'contact_me': 'تواصل معي',
                'view_projects': 'تصفح المشاريع',
                'download_cv': 'تحميل السيرة الذاتية',
                'programming_languages': 'لغات برمجة',
                'completed_projects': 'مشروع مكتمل',
                'years_experience': 'سنوات خبرة',
                'satisfied_clients': 'عميل راضٍ'
            },
            en: {
                'home': 'Home',
                'about': 'About',
                'education': 'Education',
                'skills': 'Skills',
                'projects': 'Projects',
                'gallery': 'Gallery',
                'experience': 'Experience',
                'games': 'Tech Challenge',
                'contact': 'Contact',
                'contact_me': 'Contact Me',
                'view_projects': 'View Projects',
                'download_cv': 'Download CV',
                'programming_languages': 'Programming Languages',
                'completed_projects': 'Completed Projects',
                'years_experience': 'Years Experience',
                'satisfied_clients': 'Satisfied Clients'
            }
        };
        this.init();
    }

    init() {
        this.applyLanguage();
        this.setupEventListeners();
        this.setupRTLSupport();
    }

    applyLanguage() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        
        document.body.className = document.body.className.replace(/\b(ar-mode|en-mode)\b/g, '');
        document.body.classList.add(`${this.currentLang}-mode`);
        
        this.updateTexts();
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        localStorage.setItem('language', this.currentLang);
        
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang: this.currentLang }
        }));
    }

    updateTexts() {
        const texts = this.translations[this.currentLang];
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (texts[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = texts[key];
                } else {
                    element.textContent = texts[key];
                }
            }
        });
        
        this.updateDynamicTexts(texts);
        
        document.title = this.currentLang === 'ar' 
            ? 'غمدان عبده | خريج علوم حاسوب ومحلل نظم محترف'
            : 'Gamdan Abdu | Computer Science Graduate & Systems Analyst';
    }

    updateDynamicTexts(texts) {
        const elementsToUpdate = {
            '.greeting .hello': texts.greeting,
            '.enter-btn': this.currentLang === 'ar' 
                ? '<i class="fas fa-arrow-right"></i> ادخل إلى المحفظة' 
                : '<i class="fas fa-arrow-right"></i> Enter Portfolio'
        };
        
        Object.entries(elementsToUpdate).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element) {
                if (selector === '.enter-btn') {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    setupRTLSupport() {
        const style = document.createElement('style');
        style.id = 'rtl-styles';
        style.textContent = `
            body[dir="rtl"] .hero-content {
                direction: rtl;
            }
            
            body[dir="rtl"] .timeline::before {
                right: 20px;
                left: auto;
            }
            
            body[dir="rtl"] .timeline-dot {
                right: 8px;
                left: auto;
            }
            
            body[dir="rtl"] .timeline-item {
                padding-right: 60px;
                padding-left: 0;
            }
            
            body[dir="ltr"] .timeline::before {
                left: 20px;
                right: auto;
            }
            
            body[dir="ltr"] .timeline-dot {
                left: 8px;
                right: auto;
            }
            
            body[dir="ltr"] .timeline-item {
                padding-left: 60px;
                padding-right: 0;
            }
        `;
        document.head.appendChild(style);
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            this.applyLanguage();
            document.body.style.opacity = '1';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, 300);
        
        const themeManager = new ThemeManager();
        themeManager.showNotification(
            `🌍 ${lang === 'ar' ? 'تم التبديل إلى اللغة العربية' : 'Switched to English'}`,
            'success'
        );
        
        if (window.AOS) {
            AOS.refresh();
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
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
        this.setupSmoothScroll();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.toggleHeaderShadow();
        });

        document.addEventListener('click', (e) => {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('#navToggle');
            
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        document.addEventListener('languageChanged', () => {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('#navToggle').innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    this.updateActiveNav();
                    
                    entry.target.classList.add('active-section');
                    
                    sections.forEach(section => {
                        if (section !== entry.target) {
                            section.classList.remove('active-section');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('#navToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle) return;

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                navToggle.innerHTML = '<i class="fas fa-times"></i>';
                navToggle.classList.add('active');
            } else {
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                navToggle.classList.remove('active');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#' || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    anchor.classList.add('clicked');
                    setTimeout(() => {
                        anchor.classList.remove('clicked');
                    }, 300);
                    
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        document.querySelector('#navToggle').innerHTML = '<i class="fas fa-bars"></i>';
                        document.querySelector('#navToggle').classList.remove('active');
                    }
                    
                    const targetPosition = targetElement.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let start = null;
                    
                    const easeInOutCubic = (t) => {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };
                    
                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutCubic(timeElapsed / duration);
                        window.scrollTo(0, startPosition + distance * run);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        } else {
                            this.updateActiveNav(anchor);
                        }
                    };
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    handleScroll() {
        const scrollPosition = window.scrollY;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const backToTop = document.querySelector('#backToTop');
        
        if (scrollIndicator) {
            if (scrollPosition > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        }
        
        if (backToTop) {
            if (scrollPosition > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    toggleHeaderShadow() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    updateActiveNav(clickedLink = null) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            link.style.transform = 'scale(1)';
            link.style.opacity = '0.8';
            
            setTimeout(() => {
                link.style.transform = '';
                link.style.opacity = '';
            }, 300);
        });
        
        if (clickedLink) {
            clickedLink.classList.add('active');
        } else {
            const activeLink = document.querySelector(`.nav-link[href="#${this.currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            activeLink.style.transform = 'scale(1.1)';
            activeLink.style.opacity = '1';
            
            activeLink.classList.add('glowing');
            setTimeout(() => {
                activeLink.classList.remove('glowing');
            }, 1000);
        }
    }
}

// ===== Image Management =====
class ImageManager {
    constructor() {
        this.uploadedImages = new Map();
        this.init();
    }

    init() {
        this.setupImageUpload();
        this.setupGallery();
        this.setupLightbox();
        this.loadStoredImages();
    }

    setupImageUpload() {
        const imageUpload = document.getElementById('imageUpload');
        if (imageUpload) {
            imageUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files[0], 'profile');
            });
        }

        const uploadBtn = document.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                document.getElementById('imageUpload').click();
            });
        }

        const galleryUpload = document.getElementById('galleryUpload');
        if (galleryUpload) {
            galleryUpload.addEventListener('change', (e) => {
                this.handleGalleryUpload(e.target.files);
            });
        }
    }

    setupGallery() {
        const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
        if (galleryFilterBtns) {
            galleryFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    this.filterGallery(filter);
                    
                    galleryFilterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
        }

        const loadMorePhotos = document.getElementById('loadMorePhotos');
        if (loadMorePhotos) {
            loadMorePhotos.addEventListener('click', () => {
                this.loadMoreGalleryPhotos();
            });
        }

        this.initLightGallery();
    }

    setupLightbox() {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(20px);
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-overlay.active {
                display: flex;
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: -40px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    initLightGallery() {
        const galleryImages = document.querySelectorAll('.gallery-image img');
        galleryImages.forEach((img) => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });
        });
    }

    handleImageUpload(file, type) {
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            const themeManager = new ThemeManager();
            themeManager.showNotification('الرجاء اختيار ملف صورة فقط', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            
            if (type === 'profile') {
                this.updateProfileImage(imageUrl);
                localStorage.setItem('profileImage', imageUrl);
                
                const themeManager = new ThemeManager();
                themeManager.showNotification('تم تحديث صورة الملف الشخصي بنجاح', 'success');
            }
        };
        
        reader.onerror = () => {
            const themeManager = new ThemeManager();
            themeManager.showNotification('حدث خطأ في تحميل الصورة', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    handleGalleryUpload(files) {
        if (!files.length) return;
        
        let uploadedCount = 0;
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        
        Array.from(files).forEach((file) => {
            if (!validTypes.includes(file.type)) {
                const themeManager = new ThemeManager();
                themeManager.showNotification(`الملف ${file.name} ليس صورة مدعومة`, 'warning');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                const themeManager = new ThemeManager();
                themeManager.showNotification(`الملف ${file.name} كبير جداً (الحد: 5MB)`, 'warning');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                this.addGalleryImage(imageUrl, file.name, 'personal');
                uploadedCount++;
                
                if (uploadedCount === files.length) {
                    const themeManager = new ThemeManager();
                    themeManager.showNotification(`تم رفع ${uploadedCount} صورة بنجاح`, 'success');
                }
            };
            
            reader.readAsDataURL(file);
        });
    }

    updateProfileImage(imageUrl) {
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'غمدان عبده';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            profileImage.appendChild(img);
            
            profileImage.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                profileImage.style.animation = '';
            }, 500);
        }
        
        const aboutImage = document.getElementById('aboutImage');
        if (aboutImage) {
            aboutImage.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'غمدان عبده';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '12px';
            aboutImage.appendChild(img);
        }
    }

    addGalleryImage(imageUrl, filename, category = 'personal') {
        const galleryGrid = document.getElementById('photoGallery');
        if (!galleryGrid) return;
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = category;
        
        const galleryImage = document.createElement('div');
        galleryImage.className = 'gallery-image';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = filename;
        img.loading = 'lazy';
        
        const galleryOverlay = document.createElement('div');
        galleryOverlay.className = 'gallery-overlay';
        
        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';
        
        const title = document.createElement('h4');
        title.textContent = filename.split('.')[0];
        
        const description = document.createElement('p');
        description.textContent = this.getCategoryName(category);
        
        overlayContent.appendChild(title);
        overlayContent.appendChild(description);
        galleryOverlay.appendChild(overlayContent);
        galleryImage.appendChild(img);
        galleryImage.appendChild(galleryOverlay);
        galleryItem.appendChild(galleryImage);
        
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(20px)';
        
        galleryGrid.appendChild(galleryItem);
        
        img.addEventListener('click', () => {
            this.openLightbox(imageUrl, filename);
        });
        
        this.saveGalleryImage(imageUrl, filename, category);
        
        setTimeout(() => {
            galleryItem.style.transition = 'all 0.5s ease';
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, 100);
    }

    getCategoryName(category) {
        const categories = {
            'personal': 'صورة شخصية',
            'professional': 'صورة مهنية',
            'projects': 'مشروع',
            'graduation': 'تخرج'
        };
        return categories[category] || category;
    }

    saveGalleryImage(imageUrl, filename, category) {
        const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        galleryImages.push({
            url: imageUrl,
            filename: filename,
            category: category,
            date: new Date().toISOString()
        });
        localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    }

    loadStoredImages() {
        const storedProfileImage = localStorage.getItem('profileImage');
        if (storedProfileImage) {
            this.updateProfileImage(storedProfileImage);
        }
        
        const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        galleryImages.forEach(image => {
            this.addGalleryImage(image.url, image.filename, image.category);
        });
    }

    filterGallery(filter) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
                setTimeout(() => {
                    item.style.animation = '';
                }, 500);
            } else {
                item.style.display = 'none';
            }
        });
    }

    loadMoreGalleryPhotos() {
        const sampleImages = [
            {
                url: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                filename: 'برمجة',
                category: 'professional'
            },
            {
                url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                filename: 'تطوير',
                category: 'projects'
            },
            {
                url: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                filename: 'تصميم',
                category: 'professional'
            }
        ];
        
        sampleImages.forEach(image => {
            this.addGalleryImage(image.url, image.filename, image.category);
        });
        
        const themeManager = new ThemeManager();
        themeManager.showNotification('تم تحميل 3 صور إضافية', 'success');
    }

    openLightbox(imageUrl, caption) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageUrl}" alt="${caption}" class="lightbox-img">
                <button class="lightbox-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
        
        document.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
                document.removeEventListener('keydown', handleKeydown);
            }
        });
    }
}

// ===== Animation Manager =====
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupSkillAnimations();
        this.setupBackToTop();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('[data-aos]');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('aos-animate');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
        
        const style = document.createElement('style');
        style.textContent = `
            [data-aos] {
                opacity: 0;
                transition: all 0.8s ease;
            }
            
            [data-aos].aos-animate {
                opacity: 1;
                transform: translateY(0) !important;
            }
            
            [data-aos="fade-up"] {
                transform: translateY(50px);
            }
            
            [data-aos="fade-down"] {
                transform: translateY(-50px);
            }
            
            [data-aos="fade-left"] {
                transform: translateX(-50px);
            }
            
            [data-aos="fade-right"] {
                transform: translateX(50px);
            }
            
            [data-aos="zoom-in"] {
                transform: scale(0.9);
            }
            
            [data-aos="zoom-out"] {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
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
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutExpo = (x) => {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                };
                
                const current = Math.floor(easeOutExpo(progress) * target);
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                    
                    stat.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 300);
                }
            };
            
            updateCounter();
        });
    }

    setupSkillAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
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
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        
        skillProgressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                bar.style.width = width;
                
                bar.parentElement.classList.add('animating');
                setTimeout(() => {
                    bar.parentElement.classList.remove('animating');
                }, 1500);
            }, index * 200);
        });
    }

    setupBackToTop() {
        const backToTop = document.querySelector('#backToTop');
        if (!backToTop) return;
        
        backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'scale(1.1)';
            backToTop.style.boxShadow = '0 10px 30px rgba(108, 99, 255, 0.4)';
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = '';
            backToTop.style.boxShadow = '';
        });
    }

    scrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 800;
        let start = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed / duration);
            window.scrollTo(0, startPosition * (1 - run));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }

    setupHoverEffects() {
        const cards = document.querySelectorAll('.card, .project-card, .skill-category, .timeline-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
        
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-10px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        element.classList.add('hover-glow');
    }

    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
        element.classList.remove('hover-glow');
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
                description: 'نظام متكامل لإدارة شؤون الطلاب في الكلية',
                longDescription: 'تم تطوير هذا النظام باستخدام PHP وMySQL وJavaScript مع واجهة مستخدم متطورة باستخدام Bootstrap.',
                technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery'],
                features: ['إدارة الطلاب', 'نتائج الامتحانات', 'جداول الدروس', 'نظام الحضور'],
                images: ['project1-1.jpg', 'project1-2.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            },
            {
                id: 2,
                title: 'نظام الأرشيف الرقمي',
                category: 'system',
                description: 'نظام متكامل لإدارة وأرشفة الوثائق الرقمية',
                longDescription: 'نظام أرشفة متكامل تم تطويره لتلبية احتياجات المؤسسات الحكومية والخاصة.',
                technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'PDF Library'],
                features: ['تصنيف المستندات', 'بحث متقدم', 'إدارة الصلاحيات', 'نسخ احتياطي'],
                images: ['project2-1.jpg', 'project2-2.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            },
            {
                id: 3,
                title: 'موقع شخصي تفاعلي',
                category: 'web',
                description: 'تصميم وتطوير موقع شخصي متكامل بتقنيات حديثة',
                longDescription: 'موقع شخصي تفاعلي مع تصميم متجاوب وتقنيات حديثة مثل CSS Grid وFlexbox.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'AOS'],
                features: ['تصميم متجاوب', 'حركات تفاعلية', 'نمط داكن/فاتح', 'تحسين SEO'],
                images: ['project3-1.jpg', 'project3-2.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            },
            {
                id: 4,
                title: 'مساعد ذكي للمناهج الدراسية',
                category: 'ai',
                description: 'روبوت محادثة يعتمد على الذكاء الاصطناعي',
                longDescription: 'روبوت محادثة يستخدم تقنيات معالجة اللغة الطبيعية لفهم أسئلة الطلاب والإجابة عليها.',
                technologies: ['Python', 'TensorFlow', 'NLP', 'React', 'API'],
                features: ['فهم اللغة العربية', 'إجابات تفاعلية', 'تعلم آلي', 'واجهة ويب'],
                images: ['project4-1.jpg', 'project4-2.jpg'],
                demoUrl: '#',
                githubUrl: '#'
            }
        ];
        this.init();
    }

    init() {
        this.setupFilter();
        this.setupModal();
        this.setupProjects();
    }

    setupFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 500);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    setupModal() {
        const modal = document.getElementById('projectModal');
        const modalClose = document.querySelector('.modal-close');
        const modalOverlay = document.querySelector('.modal-overlay');
        
        if (!modal) return;
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    setupProjects() {
        const viewProjectButtons = document.querySelectorAll('.view-project');
        
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = parseInt(button.dataset.project);
                this.openProjectModal(projectId);
            });
        });
    }

    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const modal = document.getElementById('projectModal');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modal || !modalBody) return;
        
        const imagesHTML = project.images.map((img, index) => `
            <img src="images/projects/${img}" alt="${project.title}" 
                 onerror="this.src='https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'"
                 class="${index === 0 ? 'active' : ''}"
                 data-index="${index}">
        `).join('');
        
        const featuresHTML = project.features.map(feature => `
            <li><i class="fas fa-check"></i> ${feature}</li>
        `).join('');
        
        const techHTML = project.technologies.map(tech => `
            <span class="tech-tag">${tech}</span>
        `).join('');
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-images">
                    <div class="main-image">
                        <img src="images/projects/${project.images[0]}" alt="${project.title}"
                             onerror="this.src='https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'">
                    </div>
                    <div class="thumbnail-images">
                        ${imagesHTML}
                    </div>
                </div>
                
                <div class="project-modal-details">
                    <div class="project-category">
                        <span class="category-tag">${this.getCategoryName(project.category)}</span>
                    </div>
                    
                    <h3>${project.title}</h3>
                    <p>${project.longDescription}</p>
                    
                    <h4>التقنيات المستخدمة</h4>
                    <div class="tech-tags">
                        ${techHTML}
                    </div>
                    
                    <h4>المميزات</h4>
                    <ul>
                        ${featuresHTML}
                    </ul>
                    
                    <div class="project-links">
                        ${project.demoUrl !== '#' ? `
                            <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-external-link-alt"></i> عرض المشروع
                            </a>
                        ` : ''}
                        
                        ${project.githubUrl !== '#' ? `
                            <a href="${project.githubUrl}" class="btn btn-outline" target="_blank">
                                <i class="fab fa-github"></i> الكود المصدري
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        this.setupGalleryNavigation();
    }

    getCategoryName(category) {
        const categories = {
            'web': 'موقع ويب',
            'system': 'نظام إداري',
            'mobile': 'تطبيق جوال',
            'ai': 'ذكاء اصطناعي'
        };
        return categories[category] || category;
    }

    setupGalleryNavigation() {
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.querySelector('.main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const src = thumb.src;
                mainImage.src = src;
                
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// ===== Contact Form Management =====
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupNewsletterForm();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit();
        });
    }

    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmit();
        });
    }

    handleContactSubmit() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        
        const formValues = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        if (!this.validateContactForm(formValues)) {
            return;
        }
        
        this.showLoading('جاري إرسال الرسالة...');
        
        setTimeout(() => {
            this.hideLoading();
            
            const themeManager = new ThemeManager();
            themeManager.showNotification('تم إرسال رسالتك بنجاح! سأرد عليك قريباً.', 'success');
            
            form.reset();
        }, 1500);
    }

    validateContactForm(data) {
        const themeManager = new ThemeManager();
        
        if (!data.name || data.name.trim().length < 2) {
            themeManager.showNotification('الرجاء إدخال اسم صحيح (على الأقل حرفين)', 'error');
            return false;
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            themeManager.showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
            return false;
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            themeManager.showNotification('الرجاء إدخال موضوع مناسب للرسالة', 'error');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            themeManager.showNotification('الرجاء كتابة رسالة مفصلة (على الأقل 10 أحرف)', 'error');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleNewsletterSubmit() {
        const form = document.getElementById('newsletterForm');
        const email = form.querySelector('input[type="email"]').value;
        
        if (!this.isValidEmail(email)) {
            const themeManager = new ThemeManager();
            themeManager.showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        this.showLoading('جاري الاشتراك...');
        
        setTimeout(() => {
            this.hideLoading();
            
            const themeManager = new ThemeManager();
            themeManager.showNotification('تم الاشتراك بنجاح! شكراً لاهتمامك.', 'success');
            
            form.reset();
        }, 1000);
    }

    showLoading(message) {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
        
        if (!document.getElementById('loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                }
                
                .loading-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                }
                
                body.dark-mode .loading-content {
                    background: rgba(30, 30, 30, 0.95);
                    color: white;
                }
                
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #6c63ff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                loading.remove();
            }, 300);
        }
    }
}

// ===== Game Manager =====
class GameManager {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.questions = this.getAIQuestions();
        this.init();
    }

    init() {
        this.setupGameEvents();
        this.setupCodingChallenge();
    }

    getAIQuestions() {
        return [
            {
                question: 'ما هو الذكاء الاصطناعي؟',
                options: [
                    'برنامج يقلد الذكاء البشري',
                    'روبوتات ذكية فقط',
                    'ألعاب الفيديو',
                    'شبكات التواصل الاجتماعي'
                ],
                correct: 0,
                level: 'سهل',
                category: 'مفاهيم أساسية'
            },
            {
                question: 'ما هي خوارزمية التعلم الآلي؟',
                options: [
                    'مجموعة من القواعد لحل مشكلة',
                    'برنامج للرسم',
                    'لغة برمجة',
                    'نظام تشغيل'
                ],
                correct: 0,
                level: 'متوسط',
                category: 'تعلم الآلة'
            },
            {
                question: 'ما هو TensorFlow؟',
                options: [
                    'مكتبة مفتوحة المصدر للتعلم الآلي',
                    'لغة برمجة',
                    'نظام تشغيل',
                    'محرك بحث'
                ],
                correct: 0,
                level: 'متوسط',
                category: 'أدوات'
            },
            {
                question: 'ما هي الشبكات العصبية؟',
                options: [
                    'نماذج تحاكي الدماغ البشري',
                    'أنظمة تشغيل',
                    'قواعد بيانات',
                    'شبكات إنترنت'
                ],
                correct: 0,
                level: 'صعب',
                category: 'شبكات عصبية'
            },
            {
                question: 'ما هو ChatGPT؟',
                options: [
                    'نموذج لغوي من OpenAI',
                    'لعبة فيديو',
                    'نظام تشغيل',
                    'لغة برمجة'
                ],
                correct: 0,
                level: 'سهل',
                category: 'تطبيقات'
            }
        ];
    }

    setupGameEvents() {
        const startButton = document.querySelector('.btn-start-quiz');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame();
            });
        }

        const playAgainButton = document.querySelector('.btn-play-again');
        if (playAgainButton) {
            playAgainButton.addEventListener('click', () => {
                this.restartGame();
            });
        }

        const nextButton = document.getElementById('nextQuestion');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        const helpButtons = ['fiftyFifty', 'audienceHelp', 'phoneFriend'];
        helpButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.useHelp(buttonId);
                });
            }
        });
    }

    setupCodingChallenge() {
        const runButton = document.querySelector('.btn-run-code');
        const resetButton = document.querySelector('.btn-reset-code');
        const codeEditor = document.getElementById('codeEditor');
        const codeOutput = document.getElementById('codeOutput');

        if (runButton && codeEditor && codeOutput) {
            runButton.addEventListener('click', () => {
                this.runCodeChallenge(codeEditor.value, codeOutput);
            });
        }

        if (resetButton && codeEditor) {
            resetButton.addEventListener('click', () => {
                codeEditor.value = '';
                const output = document.getElementById('codeOutput');
                if (output) {
                    output.innerHTML = '<p>انتظر نتيجة تنفيذ الكود...</p>';
                    output.className = '';
                }
            });
        }
    }

    startGame() {
        document.getElementById('quizStartScreen').style.display = 'none';
        document.getElementById('quizGameScreen').style.display = 'block';
        
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        
        this.updateScore();
        this.loadQuestion();
        this.startTimer();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
        document.getElementById('questionLevel').textContent = question.level;
        document.getElementById('questionCategory').textContent = question.category;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        const letters = ['أ', 'ب', 'ج', 'د'];
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span class="option-text">${option}</span>
            `;
            button.dataset.index = index;
            
            button.addEventListener('click', () => {
                this.checkAnswer(index, question.correct, button);
            });
            
            optionsContainer.appendChild(button);
        });
        
        this.updateHelpButtons();
    }

    checkAnswer(selected, correct, button) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => {
            opt.disabled = true;
            const index = parseInt(opt.dataset.index);
            
            if (index === correct) {
                opt.classList.add('correct');
                if (selected === correct) {
                    this.score += 100000;
                    this.updateScore();
                }
            } else if (index === selected) {
                opt.classList.add('wrong');
            }
        });
        
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.timeLeft = 30;
            this.updateTimer();
            this.loadQuestion();
        } else {
            this.endGame();
        }
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.nextQuestion();
            }
        }, 1000);
    }

    updateTimer() {
        const timerElement = document.getElementById('quizTimer');
        if (timerElement) {
            timerElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 10) {
                timerElement.style.color = '#ef476f';
                timerElement.style.fontWeight = 'bold';
            } else {
                timerElement.style.color = '';
                timerElement.style.fontWeight = '';
            }
        }
    }

    updateScore() {
        const scoreElement = document.getElementById('quizScore');
        if (scoreElement) {
            scoreElement.textContent = this.score.toLocaleString();
        }
    }

    updateHelpButtons() {
        const helpButtons = document.querySelectorAll('.helper-btn');
        helpButtons.forEach(button => {
            button.disabled = false;
            button.style.opacity = '1';
        });
    }

    useHelp(type) {
        const button = document.getElementById(type);
        if (!button || button.disabled) return;
        
        button.disabled = true;
        button.style.opacity = '0.5';
        
        const themeManager = new ThemeManager();
        
        switch(type) {
            case 'fiftyFifty':
                this.useFiftyFifty();
                themeManager.showNotification('تم استخدام مساعدة 50:50', 'info');
                break;
            case 'audienceHelp':
                this.useAudienceHelp();
                themeManager.showNotification('تم استخدام مساعدة الجمهور', 'info');
                break;
            case 'phoneFriend':
                this.usePhoneFriend();
                themeManager.showNotification('تم الاتصال بصديق', 'info');
                break;
        }
    }

    useFiftyFifty() {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        let wrongOptions = [];
        
        options.forEach((option, index) => {
            if (index !== question.correct) {
                wrongOptions.push(option);
            }
        });
        
        wrongOptions.sort(() => Math.random() - 0.5);
        wrongOptions.slice(0, 2).forEach(option => {
            option.style.opacity = '0.3';
            option.style.pointerEvents = 'none';
        });
    }

    useAudienceHelp() {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const percentages = [60, 20, 15, 5];
        
        options.forEach((option, index) => {
            const percentage = index === question.correct ? 60 : percentages[index];
            const span = document.createElement('span');
            span.className = 'audience-percentage';
            span.textContent = `${percentage}%`;
            span.style.color = '#4ecdc4';
            span.style.fontWeight = 'bold';
            span.style.marginRight = '10px';
            
            option.appendChild(span);
        });
    }

    usePhoneFriend() {
        const question = this.questions[this.currentQuestion];
        const correctAnswer = question.options[question.correct];
        
        const themeManager = new ThemeManager();
        themeManager.showNotification(`صديقي يقول: أعتقد أن الإجابة الصحيحة هي "${correctAnswer}"`, 'info');
    }

    endGame() {
        clearInterval(this.timer);
        
        document.getElementById('quizGameScreen').style.display = 'none';
        document.getElementById('quizEndScreen').style.display = 'block';
        
        document.getElementById('finalScore').textContent = this.score.toLocaleString();
        document.getElementById('correctAnswers').textContent = Math.floor(this.score / 100000);
        document.getElementById('wrongAnswers').textContent = this.questions.length - Math.floor(this.score / 100000);
        document.getElementById('totalTime').textContent = (30 * this.questions.length) - this.timeLeft;
        
        let message = '';
        if (this.score >= 500000) {
            message = 'ممتاز! أنت خبير في الذكاء الاصطناعي! 🏆';
        } else if (this.score >= 300000) {
            message = 'جيد جداً! لديك معرفة قوية بالذكاء الاصطناعي! 👍';
        } else if (this.score >= 100000) {
            message = 'ليس سيئاً! يمكنك تحسين معرفتك! 💪';
        } else {
            message = 'حاول مرة أخرى! التعلم مستمر! 📚';
        }
        
        document.getElementById('resultMessage').textContent = message;
    }

    restartGame() {
        document.getElementById('quizEndScreen').style.display = 'none';
        document.getElementById('quizStartScreen').style.display = 'block';
    }

    runCodeChallenge(code, outputElement) {
        try {
            const testCases = [
                { input: [1, 2, 3, 4, 5], expected: 6 },
                { input: [10, 21, 32, 43], expected: 42 },
                { input: [2, 4, 6, 8], expected: 20 },
                { input: [1, 3, 5, 7], expected: 0 }
            ];
            
            let passed = 0;
            let results = [];
            
            testCases.forEach((testCase, index) => {
                const userFunction = new Function('arr', `
                    ${code}
                    return sumEvenNumbers(arr);
                `);
                
                try {
                    const result = userFunction(testCase.input);
                    const isCorrect = result === testCase.expected;
                    
                    if (isCorrect) {
                        passed++;
                        results.push(`✓ الاختبار ${index + 1}: صحيح (${result})`);
                    } else {
                        results.push(`✗ الاختبار ${index + 1}: خطأ (توقع: ${testCase.expected}, حصلت: ${result})`);
                    }
                } catch (error) {
                    results.push(`✗ الاختبار ${index + 1}: خطأ في التنفيذ (${error.message})`);
                }
            });
            
            const score = Math.floor((passed / testCases.length) * 100);
            
            outputElement.innerHTML = `
                <div class="test-results">
                    <h4>نتيجة الاختبار: ${score}/100</h4>
                    <p>${passed}/${testCases.length} اختبارات ناجحة</p>
                    <div class="test-details">
                        ${results.map(r => `<p>${r}</p>`).join('')}
                    </div>
                </div>
            `;
            
            outputElement.className = score === 100 ? 'success' : score >= 50 ? 'warning' : 'error';
            
            const themeManager = new ThemeManager();
            if (score === 100) {
                themeManager.showNotification('ممتاز! جميع الاختبارات ناجحة! 🎉', 'success');
            } else if (score >= 50) {
                themeManager.showNotification('جيد! حاول تحسين الكود للحصول على نتيجة أفضل! 💪', 'warning');
            } else {
                themeManager.showNotification('حاول مرة أخرى! راجع الكود جيداً! 📝', 'error');
            }
            
        } catch (error) {
            outputElement.innerHTML = `
                <div class="error-message">
                    <h4>خطأ في التنفيذ!</h4>
                    <p>${error.message}</p>
                </div>
            `;
            outputElement.className = 'error';
        }
    }
}

// ===== Main Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء الرسالة الترحيبية والتحميل
    setTimeout(() => {
        const welcomeMessage = document.getElementById('welcomeMessage');
        const preloader = document.getElementById('preloader');
        const enterBtn = document.querySelector('.enter-btn');
        
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                if (welcomeMessage) {
                    welcomeMessage.style.opacity = '0';
                    setTimeout(() => {
                        welcomeMessage.style.display = 'none';
                        if (preloader) {
                            preloader.style.display = 'flex';
                            setTimeout(() => {
                                preloader.style.opacity = '0';
                                setTimeout(() => {
                                    preloader.style.display = 'none';
                                }, 500);
                            }, 2000);
                        }
                    }, 500);
                }
            });
        }
        
        setTimeout(() => {
            if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                welcomeMessage.style.opacity = '0';
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    
                    if (preloader) {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }
                }, 500);
            }
        }, 3000);
    }, 1000);
    
    // تهيئة جميع المدراء
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();
    const navigationManager = new NavigationManager();
    const imageManager = new ImageManager();
    const animationManager = new AnimationManager();
    const projectsManager = new ProjectsManager();
    const contactManager = new ContactManager();
    const gameManager = new GameManager();
    
    // تهيئة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // تهيئة الجسيمات
    if (typeof particlesJS !== 'undefined') {
        particlesJS('heroParticles', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#6c63ff", "#36d1dc", "#ff6b6b"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
    
    // زر تحميل السيرة الذاتية
    const downloadCVBtn = document.getElementById('downloadCVBtn');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'graduation.pdf';
            link.download = 'سيرة_غمدان_عبده.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            themeManager.showNotification('جاري تحميل السيرة الذاتية...', 'info');
        });
    }
    
    // زر عرض السيرة الكاملة
    const viewFullCV = document.getElementById('viewFullCV');
    if (viewFullCV) {
        viewFullCV.addEventListener('click', () => {
            window.open('graduation.pdf', '_blank');
            themeManager.showNotification('تم فتح السيرة الذاتية في نافذة جديدة', 'info');
        });
    }
    
    // إضافة تأثيرات إضافية
    setupAdditionalEffects();
});

function setupAdditionalEffects() {
    // تأثيرات للأزرار
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // تأثيرات للروابط
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
    
    // تأثيرات للبطاقات
    document.querySelectorAll('.card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // تأثيرات للصور
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
        });
    });
    
    // تأثيرات للنماذج
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // تأثيرات للقوائم
    document.querySelectorAll('.nav-list').forEach(list => {
        list.addEventListener('mouseenter', () => {
            list.style.transform = 'translateY(-5px)';
        });
        
        list.addEventListener('mouseleave', () => {
            list.style.transform = '';
        });
    });
    
    // تأثيرات للأيقونات
    document.querySelectorAll('i').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    });
    
    // تأثيرات للشعار
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = '';
        });
    }
    
    // تأثيرات للعناوين
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            heading.style.transform = 'translateY(-3px)';
            heading.style.textShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        heading.addEventListener('mouseleave', () => {
            heading.style.transform = '';
            heading.style.textShadow = '';
        });
    });
    
    // تأثيرات للفقرات
    document.querySelectorAll('p').forEach(paragraph => {
        paragraph.addEventListener('mouseenter', () => {
            paragraph.style.transform = 'translateX(5px)';
        });
        
        paragraph.addEventListener('mouseleave', () => {
            paragraph.style.transform = '';
        });
    });
    
    // تأثيرات للأقسام
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.boxShadow = 'inset 0 0 0 1px rgba(108, 99, 255, 0.1)';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.boxShadow = '';
        });
    });
    
    // تأثيرات للفوتر
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('mouseenter', () => {
            footer.style.transform = 'translateY(-10px)';
        });
        
        footer.addEventListener('mouseleave', () => {
            footer.style.transform = '';
        });
    }
    
    // تأثيرات للهيدر
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('mouseenter', () => {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        header.addEventListener('mouseleave', () => {
            if (window.scrollY < 50) {
                header.style.boxShadow = '';
            }
        });
    }
    
    // تأثيرات للشريط الجانبي
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('mouseenter', () => {
            scrollIndicator.style.transform = 'scale(1.1)';
        });
        
        scrollIndicator.addEventListener('mouseleave', () => {
            scrollIndicator.style.transform = '';
        });
    }
    
    // تأثيرات للجسيمات
    const particles = document.querySelector('.particles-bg');
    if (particles) {
        particles.addEventListener('mouseenter', () => {
            particles.style.opacity = '0.5';
        });
        
        particles.addEventListener('mouseleave', () => {
            particles.style.opacity = '0.3';
        });
    }
    
    // تأثيرات للكود العائم
    const floatingCode = document.querySelector('.floating-code');
    if (floatingCode) {
        floatingCode.addEventListener('mouseenter', () => {
            floatingCode.style.opacity = '0.2';
        });
        
        floatingCode.addEventListener('mouseleave', () => {
            floatingCode.style.opacity = '0.1';
        });
    }
}