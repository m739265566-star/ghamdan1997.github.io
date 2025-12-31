// ========== تهيئة الموقع والوظائف الرئيسية ==========
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // تهيئة جميع الوظائف
    initializeParticles();
    initializeAnimations();
    initializeNavigation();
    initializeThemeToggle();
    initializeSoundToggle();
    initializeCounters();
    initializeProjects();
    initializeSkillsCharts();
    initializeContactForm();
    initializeGames();
    initializeFloatingActions();
    initializeNotifications();
    
    // تهيئة AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// ========== خلفية الجسيمات المتحركة (مبسطة) ==========
function initializeParticles() {
    const canvas = document.getElementById('neural-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    
    // ضبط حجم الكانفاس
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // إنشاء الجسيمات
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#6C63FF' : '#36D1DC';
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // التحقق من حدود الشاشة
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    // رسم الخطوط بين الجسيمات القريبة
    function drawLines() {
        if (!ctx) return;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // حلقة التحرير
    function animate() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // تحديث ورسم الجسيمات
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // رسم الخطوط
        drawLines();
        
        requestAnimationFrame(animate);
    }
    
    // التهيئة
    resizeCanvas();
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
    
    // إعادة ضبط الحجم عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    });
}

// ========== التحكم في الرسوم المتحركة ==========
function initializeAnimations() {
    // إعدادات الرسوم المتحركة للتمرير
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // تطبيق الرسوم المتحركة الأولية
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // التحقق الأولي
    
    // الرسوم المتحركة للعناصر العائمة
    const floatingElements = document.querySelectorAll('.floating-elements .element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // الرسوم المتحركة للأضواء
    const lights = document.querySelectorAll('.light');
    lights.forEach((light, index) => {
        light.style.animationDelay = `${index * 3}s`;
    });
}

// ========== التنقل والروابط ==========
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // تتبع القسم النشط
    function setActiveSection() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // التمرير السلس للروابط
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة على الأجهزة المحمولة
                if (window.innerWidth <= 992 && navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // تبديل القائمة على الأجهزة المحمولة
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
    
    // إضافة تأثير التمرير للهيدر
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            setActiveSection();
        });
        
        // التهيئة الأولية
        setActiveSection();
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        }
    }
}

// ========== تبديل السمة (فاتح/داكن) ==========
function initializeThemeToggle() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle, #float-theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // تطبيق السمة المحفوظة
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // تبديل السمة
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // تشغيل صوت التبديل
            playSound('click');
        });
    });
    
    // تحديث أيقونة السمة
    function updateThemeIcon(theme) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
}

// ========== التحكم في الصوت ==========
let soundEnabled = true;
const audioElements = {};

function initializeSoundToggle() {
    const soundToggleBtns = document.querySelectorAll('.sound-toggle');
    
    // تهيئة عناصر الصوت
    audioElements.click = createAudio('click');
    audioElements.hover = createAudio('hover');
    audioElements.success = createAudio('success');
    audioElements.error = createAudio('error');
    
    // تبديل الصوت
    soundToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            updateSoundIcon();
            
            // تشغيل صوت التبديل
            if (soundEnabled) playSound('click');
        });
    });
    
    // تحديث أيقونة الصوت
    function updateSoundIcon() {
        soundToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (soundEnabled) {
                    icon.classList.remove('fa-volume-mute');
                    icon.classList.add('fa-volume-up');
                } else {
                    icon.classList.remove('fa-volume-up');
                    icon.classList.add('fa-volume-mute');
                }
            }
        });
    }
    
    // إنشاء عنصر صوتي
    function createAudio(soundName) {
        const audio = new Audio();
        audio.volume = 0.3;
        return audio;
    }
    
    // تشغيل الصوت عند التمرير على الأزرار
    const buttons = document.querySelectorAll('button, .btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (soundEnabled) playSound('hover');
        });
    });
}

// دالة تشغيل الصوت
function playSound(soundName) {
    if (!soundEnabled || !audioElements[soundName]) return;
    
    try {
        audioElements[soundName].currentTime = 0;
        audioElements[soundName].play();
    } catch (error) {
        console.log('Error playing sound:', error);
    }
}

// ========== العدادات المتحركة ==========
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    function startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
    
    // تشغيل العدادات عند ظهورها
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // شريط تقدم المهارات
    const progressBars = document.querySelectorAll('.skill-progress, .level-progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || bar.getAttribute('data-level');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        }
    });
    
    // دوائر التقدم
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        if (percent) {
            circle.style.background = `conic-gradient(var(--primary-color) ${percent * 3.6}deg, var(--glass-bg) 0deg)`;
        }
    });
}

// ========== معرض المشاريع ==========
function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-projects');
    
    if (!projectsGrid) return;
    
    // بيانات المشاريع الافتراضية
    const projects = [
        {
            id: 1,
            title: "بوابة الطالب الإلكترونية",
            category: "web",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "نظام متكامل لإدارة الخدمات الأكاديمية للطلاب",
            tags: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
            demo: "#",
            code: "#"
        },
        {
            id: 2,
            title: "نظام إدارة المكتبات",
            category: "web",
            image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "نظام لإدارة الكتب والإعارة في المكتبات",
            tags: ["C#", ".NET", "SQL Server"],
            demo: "#",
            code: "#"
        },
        {
            id: 3,
            title: "تطبيق المهام اليومية",
            category: "mobile",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "تطبيق لإدارة المهام اليومية مع إشعارات",
            tags: ["React Native", "Firebase", "JavaScript"],
            demo: "#",
            code: "#"
        },
        {
            id: 4,
            title: "نظام الأرشيف الرقمي",
            category: "desktop",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "تحويل الأرشيف الورقي إلى نظام رقمي",
            tags: ["C#", "WPF", "SQLite", "OCR"],
            demo: "#",
            code: "#"
        },
        {
            id: 5,
            title: "قاعدة بيانات الموظفين",
            category: "database",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "نظام متكامل لإدارة بيانات الموظفين",
            tags: ["MySQL", "PHP", "Admin Panel"],
            demo: "#",
            code: "#"
        },
        {
            id: 6,
            title: "موقع شخصي تفاعلي",
            category: "web",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "موقع شخصي بتقنيات حديثة وتفاعلية",
            tags: ["HTML5", "CSS3", "JavaScript", "Animations"],
            demo: "#",
            code: "#"
        }
    ];
    
    let currentFilter = 'all';
    let displayedProjects = 3;
    
    // عرض المشاريع
    function displayProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects.slice(0, displayedProjects)
            : projects.filter(p => p.category === filter).slice(0, displayedProjects);
        
        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item glass-card';
            projectElement.setAttribute('data-category', project.category);
            
            projectElement.innerHTML = `
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <div class="overlay-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                <a href="${project.demo}" class="btn btn-primary btn-small">عرض تجريبي</a>
                                <a href="${project.code}" class="btn btn-outline btn-small">عرض الكود</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-category">${getCategoryName(project.category)}</div>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectElement);
        });
        
        // إضافة تأثير lightbox للصور
        const projectImages = projectsGrid.querySelectorAll('.project-image');
        projectImages.forEach(img => {
            img.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                modal.innerHTML = `
                    <img src="${this.src}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
                    <button style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">×</button>
                `;
                
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.tagName === 'BUTTON') {
                        document.body.removeChild(modal);
                    }
                });
            });
        });
    }
    
    // الحصول على اسم الفئة
    function getCategoryName(category) {
        const categories = {
            'web': 'تطبيق ويب',
            'mobile': 'تطبيق موبايل',
            'desktop': 'برنامج سطح مكتب',
            'database': 'قاعدة بيانات',
            'game': 'لعبة'
        };
        return categories[category] || category;
    }
    
    // تصفية المشاريع
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            displayedProjects = 3;
            displayProjects(currentFilter);
            playSound('click');
        });
    });
    
    // تحميل المزيد من المشاريع
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedProjects += 3;
            displayProjects(currentFilter);
            
            if (displayedProjects >= projects.length) {
                this.style.display = 'none';
            }
            playSound('click');
        });
    }
    
    // التهيئة الأولية
    displayProjects();
}

// ========== مخططات المهارات (مبسطة) ==========
function initializeSkillsCharts() {
    // شريط تقدم المهارات التقنية
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        }
    });
    
    // دوائر المهارات
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        if (percent) {
            setTimeout(() => {
                circle.style.background = `conic-gradient(var(--primary-color) ${percent * 3.6}deg, var(--glass-bg) 0deg)`;
            }, 500);
        }
    });
}

// ========== نموذج التواصل ==========
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع البيانات
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // التحقق من البيانات
        if (!validateForm(formData)) {
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
            return;
        }
        
        // إرسال البيانات (محاكاة)
        simulateSendEmail(formData);
    });
    
    // التحقق من صحة البيانات
    function validateForm(data) {
        if (!data.name || data.name.length < 3) return false;
        if (!data.email || !isValidEmail(data.email)) return false;
        if (!data.subject || data.subject.length < 5) return false;
        if (!data.message || data.message.length < 10) return false;
        return true;
    }
    
    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // محاكاة إرسال البريد
    function simulateSendEmail(data) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // محاكاة الانتظار
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
            playSound('success');
            
            contactForm.reset();
        }, 2000);
    }
}

// ========== الألعاب والتحديات ==========
function initializeGames() {
    // لعبة البالون
    const viewProjectDemo = document.getElementById('view-project-demo');
    if (viewProjectDemo) {
        viewProjectDemo.addEventListener('click', function() {
            showNotification('جاري تحميل العرض التجريبي...', 'success');
            playSound('click');
            
            setTimeout(() => {
                showNotification('يمكنك تحميل اللعبة والاستمتاع بها على جهازك', 'info');
            }, 1500);
        });
    }
    
    // تعليمات لعبة البالون
    const instructionsBtn = document.querySelector('.btn-instructions');
    if (instructionsBtn) {
        instructionsBtn.addEventListener('click', function() {
            showModal('تعليمات لعبة رمي البالون', `
                <div style="color: var(--dark-color);">
                    <h3 style="margin-bottom: 15px;">🎮 تعليمات اللعبة:</h3>
                    <ol style="padding-right: 20px; margin-bottom: 20px;">
                        <li style="margin-bottom: 10px;">اضغط على زر "رمي" لإطلاق السهم</li>
                        <li style="margin-bottom: 10px;">اضغط على البالونات لتفرقعها</li>
                        <li style="margin-bottom: 10px;">كل بالونة تمنحك 100 نقطة</li>
                        <li style="margin-bottom: 10px;">تجنب البالونات الحمراء (تنفجر)</li>
                        <li style="margin-bottom: 10px;">تقدم المستويات مع تقدمك في اللعبة</li>
                    </ol>
                    <p>🎯 <strong>الهدف:</strong> جمع أكبر عدد من النقاط قبل انتهاء الوقت!</p>
                </div>
            `);
            playSound('click');
        });
    }
    
    // لوحة المتصدرين لتحدي التقنية
    const leaderboardBtn = document.querySelector('.btn-leaderboard');
    if (leaderboardBtn) {
        leaderboardBtn.addEventListener('click', function() {
            showModal('لوحة المتصدرين', `
                <div style="color: var(--dark-color);">
                    <h3 style="margin-bottom: 20px; text-align: center;">🏆 أفضل 5 لاعبين</h3>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: var(--primary-color); color: white;">
                                    <th style="padding: 10px; text-align: center;">المركز</th>
                                    <th style="padding: 10px; text-align: center;">الاسم</th>
                                    <th style="padding: 10px; text-align: center;">النقاط</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px; text-align: center;">🥇 1</td>
                                    <td style="padding: 10px; text-align: center;">غمدان</td>
                                    <td style="padding: 10px; text-align: center; color: var(--success-color); font-weight: bold;">1,250,000</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px; text-align: center;">🥈 2</td>
                                    <td style="padding: 10px; text-align: center;">أحمد</td>
                                    <td style="padding: 10px; text-align: center;">1,000,000</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px; text-align: center;">🥉 3</td>
                                    <td style="padding: 10px; text-align: center;">محمد</td>
                                    <td style="padding: 10px; text-align: center;">750,000</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px; text-align: center;">4</td>
                                    <td style="padding: 10px; text-align: center;">سارة</td>
                                    <td style="padding: 10px; text-align: center;">500,000</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; text-align: center;">5</td>
                                    <td style="padding: 10px; text-align: center;">فاطمة</td>
                                    <td style="padding: 10px; text-align: center;">250,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="text-align: center; margin-top: 20px; color: var(--gray-color);">
                        يمكنك أن تكون الأول! ابدأ التحدي الآن 🚀
                    </p>
                </div>
            `);
            playSound('click');
        });
    }
}

// ========== الأزرار العائمة ==========
function initializeFloatingActions() {
    const scrollTopBtn = document.getElementById('scroll-top');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const messengerBtn = document.getElementById('messenger-btn');
    
    // زر العودة للأعلى
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playSound('click');
        });
        
        // إظهار/إخفاء الزر
        window.addEventListener('scroll', function() {
            if (!scrollTopBtn) return;
            
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // زر واتساب
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const phone = '+967777123456';
            const message = 'مرحباً، زرت موقعك وأرغب في التواصل معك';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            playSound('click');
        });
    }
    
    // زر ماسنجر
    if (messengerBtn) {
        messengerBtn.addEventListener('click', function() {
            showNotification('ميزة الماسنجر قريباً...', 'info');
            playSound('click');
        });
    }
}

// ========== نظام الإشعارات ==========
function initializeNotifications() {
    window.showNotification = function(message, type = 'success') {
        const container = document.querySelector('.notifications');
        if (!container) {
            // إنشاء حاوية الإشعارات إذا لم تكن موجودة
            const notificationsDiv = document.createElement('div');
            notificationsDiv.className = 'notifications';
            notificationsDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(notificationsDiv);
            container = notificationsDiv;
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s;
            min-width: 300px;
            color: white;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // إخفاء الإشعار بعد 5 ثوانٍ
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    };
}

// ========== النافذة المنبثقة ==========
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--light-color);
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(20px);
            transition: transform 0.3s;
        ">
            <div class="modal-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            ">
                <h3 style="margin: 0; color: var(--dark-color);">${title}</h3>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--dark-color);
                ">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إظهار النافذة
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // إغلاق النافذة
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// ========== تحسينات إضافية ==========
// تأثيرات التمرير السلس
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // تأثير التحرك البطيء للخلفية
    const background = document.querySelector('#particles-background');
    if (background) {
        background.style.transform = `translateY(${rate * 0.5}px)`;
    }
});

// تحسين أداء الرسوم المتحركة
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(scrollTop - lastScrollTop) > 50) {
        lastScrollTop = scrollTop;
    }
}, { passive: true });

// تهيئة الصفحة بعد التحميل
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // إضافة تأثير ظهور الصفحة
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 500);
    
    // تحميل الصور بشكل أفضل
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s';
            img.onload = function() {
                this.style.opacity = '1';
            };
        }
    });
});

// التحكم في حجم النافذة
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // إعادة تهيئة العناصر الحساسة للحجم
        const canvas = document.getElementById('neural-network');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, 250);
});