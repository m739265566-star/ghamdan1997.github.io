const GAME_CONFIG = {
    totalQuestions: 15,
    timePerQuestion: 30,
    points: {
        correct: 100000,
        bonus: 50000,
        timeBonus: 1000
    },
    lifelines: {
        fiftyFifty: 1,
        audience: 1,
        phoneFriend: 1
    },
    sounds: {
        correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
        wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
        timer: 'https://assets.mixkit.co/sfx/preview/mixkit-clock-ticking-close-up-1002.mp3',
        lifeline: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkles-300.mp3',
        win: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
        lose: 'https://assets.mixkit.co/sfx/preview/mixkit-sad-game-over-trombone-471.mp3',
        click: 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
        hover: 'https://assets.mixkit.co/sfx/preview/mixkit-hover-notification-959.mp3',
        background: 'https://assets.mixkit.co/music/preview/mixkit-game-show-suspense-waiting-667.mp3'
    },
    api: {
        openai: 'https://api.openai.com/v1/chat/completions',
        trivia: 'https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple',
        questions: 'https://api.jsonbin.io/v3/b/6589a7e2266cfc3fde8c3b4b'
    }
};

// ===== Game Manager Class =====
class GameManager {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = GAME_CONFIG.timePerQuestion;
        this.timer = null;
        this.isPlaying = false;
        this.lifelines = { ...GAME_CONFIG.lifelines };
        this.questions = [];
        this.userAnswers = [];
        this.audioElements = {};
        this.isMuted = false;
        this.init();
    }

    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
        this.setupAudio();
        this.setupAnimations();
        this.setupKeyBindings();
    }

    // ===== API Integration =====
    async loadQuestions() {
        try {
            // محاولة جلب الأسئلة من OpenTriviaDB API
            const response = await fetch(GAME_CONFIG.api.trivia);
            const data = await response.json();
            
            if (data.response_code === 0 && data.results.length > 0) {
                this.questions = this.transformTriviaQuestions(data.results);
            } else {
                // إذا فشل API، استخدم الأسئلة المحلية
                this.questions = this.getLocalQuestions();
            }
            
            // إضافة أسئلة الذكاء الاصطناعي من مجموعة محلية
            this.questions = [...this.questions, ...this.getAIQuestions()].slice(0, GAME_CONFIG.totalQuestions);
            
            // خلط الأسئلة
            this.shuffleQuestions();
            
        } catch (error) {
            console.error('Error loading questions:', error);
            this.questions = this.getLocalQuestions();
        }
    }

    transformTriviaQuestions(triviaQuestions) {
        return triviaQuestions.map((q, index) => ({
            id: index + 1,
            question: this.decodeHTML(q.question),
            options: this.shuffleArray([...q.incorrect_answers.map(this.decodeHTML), this.decodeHTML(q.correct_answer)]),
            correct: 3, // سيتم تحديثه بعد الخلط
            explanation: `تصنيف: ${q.category} | صعوبة: ${q.difficulty}`,
            difficulty: this.mapDifficulty(q.difficulty),
            category: 'علوم الحاسوب',
            points: this.calculatePoints(q.difficulty),
            correct_answer: this.decodeHTML(q.correct_answer)
        })).map(q => {
            // تحديث الإجابة الصحيحة بعد الخلط
            q.correct = q.options.indexOf(q.correct_answer);
            return q;
        });
    }

    decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    mapDifficulty(difficulty) {
        const map = {
            'easy': 'سهل',
            'medium': 'متوسط',
            'hard': 'صعب'
        };
        return map[difficulty] || 'متوسط';
    }

    calculatePoints(difficulty) {
        const points = {
            'easy': 100000,
            'medium': 200000,
            'hard': 300000
        };
        return points[difficulty] || 150000;
    }

    getLocalQuestions() {
        return [
            {
                id: 1,
                question: 'ما هو الذكاء الاصطناعي؟',
                options: [
                    'برنامج يقلد الذكاء البشري',
                    'روبوتات ذكية فقط',
                    'ألعاب الفيديو',
                    'شبكات التواصل الاجتماعي'
                ],
                correct: 0,
                explanation: 'الذكاء الاصطناعي هو مجال في علوم الحاسوب يهدف لإنشاء آلات ذكية',
                difficulty: 'سهل',
                category: 'الذكاء الاصطناعي',
                points: 100000
            },
            {
                id: 2,
                question: 'ما هي لغة البرمجة الأكثر استخداماً في الذكاء الاصطناعي؟',
                options: ['Python', 'Java', 'C++', 'JavaScript'],
                correct: 0,
                explanation: 'بايثون هي اللغة الأكثر شيوعاً في الذكاء الاصطناعي بسبب مكتباتها الغنية',
                difficulty: 'سهل',
                category: 'برمجة',
                points: 100000
            },
            {
                id: 3,
                question: 'ما هي الشبكات العصبية الاصطناعية؟',
                options: [
                    'أنظمة تحاكي عمل الدماغ البشري',
                    'شبكات اتصال بين الحواسيب',
                    'قواعد بيانات متقدمة',
                    'أنظمة تشغيل ذكية'
                ],
                correct: 0,
                explanation: 'الشبكات العصبية الاصطناعية هي أنظمة حسابية مستوحاة من الدماغ البشري',
                difficulty: 'متوسط',
                category: 'الشبكات العصبية',
                points: 200000
            }
        ];
    }

    getAIQuestions() {
        return [
            {
                id: 100,
                question: 'ما هو ChatGPT؟',
                options: [
                    'نموذج لغوي كبير من OpenAI',
                    'لعبة فيديو تعليمية',
                    'نظام تشغيل مفتوح المصدر',
                    'مكتبة برمجة للذكاء الاصطناعي'
                ],
                correct: 0,
                explanation: 'ChatGPT هو نموذج لغوي كبير تم تطويره بواسطة OpenAI',
                difficulty: 'سهل',
                category: 'الذكاء الاصطناعي',
                points: 100000
            },
            {
                id: 101,
                question: 'ما هو TensorFlow؟',
                options: [
                    'مكتبة مفتوحة المصدر للتعلم الآلي',
                    'لغة برمجة',
                    'نظام تشغيل',
                    'محرك بحث'
                ],
                correct: 0,
                explanation: 'TensorFlow هي مكتبة مفتوحة المصدر طورتها Google للتعلم الآلي',
                difficulty: 'متوسط',
                category: 'أدوات',
                points: 200000
            }
        ];
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // ===== Audio Management =====
    setupAudio() {
        // إنشاء عناصر صوتية
        Object.entries(GAME_CONFIG.sounds).forEach(([key, url]) => {
            const audio = new Audio();
            audio.src = url;
            audio.preload = 'auto';
            this.audioElements[key] = audio;
        });

        // إعداد التحكم في الصوت
        this.setupAudioControls();
    }

    setupAudioControls() {
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        audioControls.innerHTML = `
            <button id="muteToggle" class="audio-btn">
                <i class="fas fa-volume-up"></i>
            </button>
            <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.7">
        `;

        document.querySelector('.quiz-game-screen').appendChild(audioControls);

        document.getElementById('muteToggle').addEventListener('click', () => {
            this.toggleMute();
        });

        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });
    }

    playSound(soundName) {
        if (this.isMuted || !this.audioElements[soundName]) return;
        
        try {
            const audio = this.audioElements[soundName].cloneNode();
            audio.volume = this.getVolume();
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (error) {
            console.log('Sound error:', error);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const icon = document.querySelector('#muteToggle i');
        icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        
        if (this.isMuted) {
            Object.values(this.audioElements).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }

    setVolume(volume) {
        Object.values(this.audioElements).forEach(audio => {
            audio.volume = volume;
        });
    }

    getVolume() {
        return document.getElementById('volumeSlider')?.value || 0.7;
    }

    // ===== Game Logic =====
    startGame() {
        this.isPlaying = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = GAME_CONFIG.timePerQuestion;
        this.lifelines = { ...GAME_CONFIG.lifelines };
        this.userAnswers = [];
        
        document.getElementById('quizStartScreen').style.display = 'none';
        document.getElementById('quizGameScreen').style.display = 'block';
        document.getElementById('quizEndScreen').style.display = 'none';
        
        this.updateScore();
        this.loadQuestion();
        this.startTimer();
        this.updateLifelines();
        
        this.playSound('background');
        this.audioElements.background.loop = true;
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        // تحديث الواجهة
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
        document.getElementById('questionLevel').textContent = question.difficulty;
        document.getElementById('questionCategory').textContent = question.category;
        
        // إعداد الخيارات
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        const letters = ['أ', 'ب', 'ج', 'د'];
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.dataset.index = index;
            optionElement.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span class="option-text">${option}</span>
            `;
            
            // إضافة تأثيرات
            optionElement.addEventListener('mouseenter', () => {
                if (!optionElement.classList.contains('disabled')) {
                    optionElement.style.transform = 'translateY(-5px)';
                    this.playSound('hover');
                }
            });
            
            optionElement.addEventListener('mouseleave', () => {
                optionElement.style.transform = '';
            });
            
            optionElement.addEventListener('click', () => {
                if (!optionElement.classList.contains('disabled')) {
                    this.selectAnswer(index);
                }
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // تحديث حالة المساعدات
        this.updateHelpButtons();
        
        // إضافة تأثير ظهور السؤال
        optionsContainer.style.opacity = '0';
        optionsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            optionsContainer.style.transition = 'all 0.5s ease';
            optionsContainer.style.opacity = '1';
            optionsContainer.style.transform = 'translateY(0)';
        }, 300);
    }

    selectAnswer(selectedIndex) {
        this.playSound('click');
        
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const selectedOption = options[selectedIndex];
        
        // تعطيل جميع الخيارات
        options.forEach(opt => {
            opt.classList.add('disabled');
            opt.style.pointerEvents = 'none';
        });
        
        // تسجيل إجابة المستخدم
        this.userAnswers.push({
            question: question.question,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: selectedIndex === question.correct
        });
        
        // إظهار الإجابة الصحيحة
        setTimeout(() => {
            options.forEach((opt, index) => {
                if (index === question.correct) {
                    opt.classList.add('correct');
                    this.showCorrectAnimation(opt);
                } else if (index === selectedIndex && index !== question.correct) {
                    opt.classList.add('wrong');
                    this.showWrongAnimation(opt);
                }
            });
            
            // حساب النقاط
            if (selectedIndex === question.correct) {
                this.score += question.points;
                this.score += Math.floor(this.timeLeft * 10); // مكافأة الوقت
                this.playSound('correct');
                this.showPointsAnimation(question.points);
            } else {
                this.playSound('wrong');
                this.showWrongAnswerAnimation();
            }
            
            this.updateScore();
            
            // الانتقال للسؤال التالي
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
            
        }, 500);
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.timeLeft = GAME_CONFIG.timePerQuestion;
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
            
            if (this.timeLeft <= 10) {
                this.playSound('timer');
                document.getElementById('quizTimer').classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeOut();
            }
        }, 1000);
    }

    handleTimeOut() {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        // إظهار الإجابة الصحيحة
        options.forEach((opt, index) => {
            if (index === question.correct) {
                opt.classList.add('correct');
            }
            opt.classList.add('disabled');
        });
        
        this.playSound('wrong');
        
        // تسجيل إجابة خاطئة
        this.userAnswers.push({
            question: question.question,
            selected: null,
            correct: question.correct,
            isCorrect: false
        });
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    updateTimer() {
        const timerElement = document.getElementById('quizTimer');
        if (timerElement) {
            timerElement.textContent = this.timeLeft;
            
            // تأثيرات التوقيت
            if (this.timeLeft <= 5) {
                timerElement.style.animation = 'pulse 0.5s infinite';
            } else {
                timerElement.style.animation = '';
            }
        }
    }

    updateScore() {
        const scoreElement = document.getElementById('quizScore');
        if (scoreElement) {
            // تأثير عد النقاط
            const targetScore = this.score;
            const currentScore = parseInt(scoreElement.textContent.replace(/,/g, '')) || 0;
            const duration = 500;
            const startTime = Date.now();
            
            const animateScore = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // استخدام easeOutExpo لعد سلس
                const easeOutExpo = (x) => {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                };
                
                const current = Math.floor(easeOutExpo(progress) * (targetScore - currentScore) + currentScore);
                scoreElement.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animateScore);
                } else {
                    scoreElement.textContent = targetScore.toLocaleString();
                }
            };
            
            animateScore();
        }
    }

    // ===== Lifelines =====
    updateLifelines() {
        Object.keys(this.lifelines).forEach(lifeline => {
            const button = document.getElementById(lifeline);
            if (button) {
                button.disabled = this.lifelines[lifeline] <= 0;
                button.style.opacity = this.lifelines[lifeline] > 0 ? '1' : '0.5';
                
                // تحديث العداد
                const countElement = button.querySelector('.lifeline-count');
                if (countElement) {
                    countElement.textContent = this.lifelines[lifeline];
                }
            }
        });
    }

    useLifeline(type) {
        if (this.lifelines[type] <= 0) return;
        
        this.lifelines[type]--;
        this.playSound('lifeline');
        this.updateLifelines();
        
        switch(type) {
            case 'fiftyFifty':
                this.useFiftyFifty();
                break;
            case 'audienceHelp':
                this.useAudienceHelp();
                break;
            case 'phoneFriend':
                this.usePhoneFriend();
                break;
        }
    }

    useFiftyFifty() {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        let wrongOptions = [];
        
        // جمع الخيارات الخاطئة
        options.forEach((option, index) => {
            if (index !== question.correct) {
                wrongOptions.push(option);
            }
        });
        
        // اختيار خيارين خاطئين عشوائياً
        wrongOptions.sort(() => Math.random() - 0.5);
        wrongOptions.slice(0, 2).forEach(option => {
            option.style.opacity = '0.3';
            option.classList.add('disabled');
            option.style.pointerEvents = 'none';
        });
        
        // تأثير الرسوم المتحركة
        this.showLifelineAnimation('50:50');
    }

    async useAudienceHelp() {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        // توليد نسب عشوائية تميل للإجابة الصحيحة
        const percentages = this.generateAudiencePercentages(question.correct);
        
        options.forEach((option, index) => {
            const percentage = percentages[index];
            const percentageElement = document.createElement('div');
            percentageElement.className = 'audience-percentage';
            
            // شريط التقدم
            const bar = document.createElement('div');
            bar.className = 'percentage-bar';
            bar.style.width = `${percentage}%`;
            bar.style.background = `linear-gradient(90deg, 
                ${index === question.correct ? '#4ecdc4' : '#ff6b6b'}, 
                ${index === question.correct ? '#118ab2' : '#ef476f'})`;
            
            // النسبة المئوية
            const text = document.createElement('span');
            text.className = 'percentage-text';
            text.textContent = `${percentage}%`;
            
            percentageElement.appendChild(bar);
            percentageElement.appendChild(text);
            option.appendChild(percentageElement);
            
            // تأثير الرسوم المتحركة
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease';
            }, 100 * index);
        });
        
        this.showLifelineAnimation('مساعدة الجمهور');
    }

    generateAudiencePercentages(correctIndex) {
        const percentages = [0, 0, 0, 0];
        
        // الإجابة الصحيحة تحصل على نسبة عالية
        percentages[correctIndex] = 60 + Math.floor(Math.random() * 20);
        
        // توزيع النسبة المتبقية على الإجابات الخاطئة
        let remaining = 100 - percentages[correctIndex];
        for (let i = 0; i < 4; i++) {
            if (i !== correctIndex) {
                const max = Math.min(remaining, 30);
                percentages[i] = Math.floor(Math.random() * max);
                remaining -= percentages[i];
            }
        }
        
        // إذا بقي شيء، أضفه للإجابة الصحيحة
        if (remaining > 0) {
            percentages[correctIndex] += remaining;
        }
        
        return percentages;
    }

    async usePhoneFriend() {
        const question = this.questions[this.currentQuestion];
        const correctAnswer = question.options[question.correct];
        
        // محاكاة اتصال بصديق
        this.showPhoneCallAnimation();
        
        // انتظر قليلاً لمحاكاة الاتصال
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // عرض إجابة الصديق
        const friendResponse = this.generateFriendResponse(question, correctAnswer);
        
        const modal = this.createFriendModal(friendResponse);
        document.body.appendChild(modal);
        
        // إظهار النافذة
        setTimeout(() => {
            modal.classList.add('active');
        }, 100);
    }

    generateFriendResponse(question, correctAnswer) {
        const responses = [
            `أعتقد أن الإجابة هي "${correctAnswer}"، أنا متأكد بنسبة 80%`,
            `صديقي يقول: "${correctAnswer}" هي الإجابة الصحيحة`,
            `بناءً على معرفتي، أختار "${correctAnswer}"`,
            `تذكرت أن هذا السؤال سبق وأن رأيته، الإجابة "${correctAnswer}"`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    createFriendModal(message) {
        const modal = document.createElement('div');
        modal.className = 'phone-friend-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h4><i class="fas fa-phone"></i> اتصال بصديق</h4>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="friend-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="friend-message">
                        <p>${message}</p>
                    </div>
                    <div class="call-status">
                        <i class="fas fa-phone-alt"></i>
                        <span>متصل...</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal">شكراً!</button>
                </div>
            </div>
        `;
        
        // إضافة الأنماط
        if (!document.getElementById('friend-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'friend-modal-styles';
            style.textContent = `
                .phone-friend-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .phone-friend-modal.active {
                    opacity: 1;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 400px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    transform: translateY(-50px);
                    transition: transform 0.3s ease;
                }
                
                .phone-friend-modal.active .modal-content {
                    transform: translateY(0);
                }
                
                body.dark-mode .modal-content {
                    background: #1e1e1e;
                    color: white;
                }
                
                .modal-header {
                    padding: 1.5rem;
                    background: linear-gradient(135deg, #6c63ff, #36d1dc);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h4 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }
                
                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .modal-body {
                    padding: 2rem;
                    text-align: center;
                }
                
                .friend-avatar {
                    font-size: 4rem;
                    color: #6c63ff;
                    margin-bottom: 1rem;
                }
                
                .friend-message {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    border-right: 4px solid #6c63ff;
                }
                
                body.dark-mode .friend-message {
                    background: #2d2d2d;
                }
                
                .call-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    color: #4ecdc4;
                    font-weight: bold;
                }
                
                .modal-footer {
                    padding: 1rem;
                    text-align: center;
                    border-top: 1px solid #eee;
                }
                
                body.dark-mode .modal-footer {
                    border-top: 1px solid #444;
                }
            `;
            document.head.appendChild(style);
        }
        
        // إضافة معالجات الأحداث
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        return modal;
    }

    // ===== Animations =====
    showCorrectAnimation(element) {
        const animation = document.createElement('div');
        animation.className = 'correct-animation';
        animation.innerHTML = '<i class="fas fa-check-circle"></i>';
        
        element.appendChild(animation);
        
        setTimeout(() => {
            animation.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            animation.remove();
        }, 1000);
    }

    showWrongAnimation(element) {
        const animation = document.createElement('div');
        animation.className = 'wrong-animation';
        animation.innerHTML = '<i class="fas fa-times-circle"></i>';
        
        element.appendChild(animation);
        
        setTimeout(() => {
            animation.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            animation.remove();
        }, 1000);
    }

    showPointsAnimation(points) {
        const animation = document.createElement('div');
        animation.className = 'points-animation';
        animation.textContent = `+${points.toLocaleString()}`;
        animation.style.color = '#4ecdc4';
        animation.style.fontWeight = 'bold';
        animation.style.fontSize = '1.5rem';
        
        document.querySelector('.quiz-question').appendChild(animation);
        
        setTimeout(() => {
            animation.style.transition = 'all 1s ease';
            animation.style.transform = 'translateY(-50px)';
            animation.style.opacity = '0';
        }, 500);
        
        setTimeout(() => {
            animation.remove();
        }, 1500);
    }

    showWrongAnswerAnimation() {
        const animation = document.createElement('div');
        animation.className = 'wrong-answer-animation';
        animation.innerHTML = '<i class="fas fa-times"></i>';
        
        document.querySelector('.quiz-question').appendChild(animation);
        
        setTimeout(() => {
            animation.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            animation.remove();
        }, 1000);
    }

    showLifelineAnimation(type) {
        const animation = document.createElement('div');
        animation.className = 'lifeline-animation';
        animation.innerHTML = `
            <i class="fas fa-magic"></i>
            <span>${type}</span>
        `;
        
        document.querySelector('.quiz-helpers').appendChild(animation);
        
        setTimeout(() => {
            animation.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            animation.remove();
        }, 2000);
    }

    showPhoneCallAnimation() {
        const animation = document.createElement('div');
        animation.className = 'phone-call-animation';
        animation.innerHTML = '<i class="fas fa-phone"></i>';
        
        document.body.appendChild(animation);
        
        setTimeout(() => {
            animation.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            animation.remove();
        }, 2000);
    }

    // ===== End Game =====
    endGame() {
        clearInterval(this.timer);
        this.isPlaying = false;
        
        // إيقاف صوت الخلفية
        this.audioElements.background.pause();
        this.audioElements.background.currentTime = 0;
        
        // حساب النتيجة النهائية
        const correctAnswers = this.userAnswers.filter(a => a.isCorrect).length;
        const totalQuestions = this.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const timeUsed = (GAME_CONFIG.timePerQuestion * totalQuestions) - this.timeLeft;
        
        // تحديث واجهة النهاية
        document.getElementById('quizGameScreen').style.display = 'none';
        document.getElementById('quizEndScreen').style.display = 'block';
        
        document.getElementById('finalScore').textContent = this.score.toLocaleString();
        document.getElementById('correctAnswers').textContent = correctAnswers;
        document.getElementById('wrongAnswers').textContent = totalQuestions - correctAnswers;
        document.getElementById('totalTime').textContent = timeUsed;
        
        // عرض الرسالة المناسبة
        let message = '';
        let trophy = '';
        
        if (percentage >= 90) {
            message = 'مذهل! أنت خبير في الذكاء الاصطناعي! 🏆';
            trophy = '🏆';
            this.playSound('win');
        } else if (percentage >= 70) {
            message = 'أحسنت! لديك معرفة ممتازة! 👍';
            trophy = '🥇';
            this.playSound('win');
        } else if (percentage >= 50) {
            message = 'جيد! يمكنك تحسين معرفتك! 💪';
            trophy = '🥈';
        } else {
            message = 'حاول مرة أخرى! التعلم مستمر! 📚';
            trophy = '📚';
            this.playSound('lose');
        }
        
        document.getElementById('resultMessage').textContent = message;
        
        // تحديث الرمز
        const trophyElement = document.querySelector('.trophy');
        if (trophyElement) {
            trophyElement.textContent = trophy;
        }
        
        // عرض تفاصيل الإجابات
        this.showAnswerDetails();
        
        // توليد شهادة
        this.generateCertificate(correctAnswers, percentage);
        
        // حفظ النتيجة
        this.saveScore();
    }

    showAnswerDetails() {
        const detailsContainer = document.querySelector('.answer-details');
        if (!detailsContainer) {
            const container = document.createElement('div');
            container.className = 'answer-details';
            container.innerHTML = '<h4>تفاصيل الإجابات:</h4>';
            
            this.userAnswers.forEach((answer, index) => {
                const question = this.questions[index];
                const detail = document.createElement('div');
                detail.className = `answer-detail ${answer.isCorrect ? 'correct' : 'wrong'}`;
                detail.innerHTML = `
                    <div class="question-number">سؤال ${index + 1}</div>
                    <div class="question-text">${question.question}</div>
                    <div class="answer-info">
                        <span class="your-answer">إجابتك: ${answer.selected !== null ? question.options[answer.selected] : 'انتهى الوقت'}</span>
                        <span class="correct-answer">الإجابة الصحيحة: ${question.options[question.correct]}</span>
                    </div>
                `;
                container.appendChild(detail);
            });
            
            document.querySelector('.quiz-results').appendChild(container);
        }
    }

    generateCertificate(correctAnswers, percentage) {
        const certificate = document.createElement('div');
        certificate.className = 'certificate';
        certificate.innerHTML = `
            <div class="certificate-content">
                <h3>🎓 شهادة إنجاز</h3>
                <div class="certificate-details">
                    <p>تم منح هذه الشهادة تقديراً للمشاركة في</p>
                    <h4>"تحدي الذكاء الاصطناعي"</h4>
                    <div class="score-info">
                        <div class="score-item">
                            <span class="label">النتيجة:</span>
                            <span class="value">${this.score.toLocaleString()} نقطة</span>
                        </div>
                        <div class="score-item">
                            <span class="label">الإجابات الصحيحة:</span>
                            <span class="value">${correctAnswers}/${this.questions.length}</span>
                        </div>
                        <div class="score-item">
                            <span class="label">النسبة:</span>
                            <span class="value">${percentage}%</span>
                        </div>
                    </div>
                    <div class="date">${new Date().toLocaleDateString('ar-SA')}</div>
                </div>
                <button class="btn btn-primary download-certificate">
                    <i class="fas fa-download"></i> تحميل الشهادة
                </button>
            </div>
        `;
        
        document.querySelector('.quiz-results').appendChild(certificate);
        
        // إضافة حدث تحميل الشهادة
        certificate.querySelector('.download-certificate').addEventListener('click', () => {
            this.downloadCertificate();
        });
    }

    downloadCertificate() {
        const certificate = document.querySelector('.certificate-content');
        
        // استخدام html2canvas لالتقاط الشهادة
        if (typeof html2canvas !== 'undefined') {
            html2canvas(certificate).then(canvas => {
                const link = document.createElement('a');
                link.download = `شهادة_غمدان_عبده_${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            alert('جارٍ تحميل الشهادة...');
        }
    }

    saveScore() {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        scores.push({
            score: this.score,
            date: new Date().toISOString(),
            correctAnswers: this.userAnswers.filter(a => a.isCorrect).length,
            totalQuestions: this.questions.length
        });
        
        // حفظ أعلى 10 نتائج فقط
        scores.sort((a, b) => b.score - a.score);
        const topScores = scores.slice(0, 10);
        
        localStorage.setItem('quizScores', JSON.stringify(topScores));
    }

    // ===== Event Listeners =====
    setupEventListeners() {
        // زر البدء
        const startButton = document.querySelector('.btn-start-quiz');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame();
            });
        }

        // إعادة المحاولة
        const playAgainButton = document.querySelector('.btn-play-again');
        if (playAgainButton) {
            playAgainButton.addEventListener('click', () => {
                this.restartGame();
            });
        }

        // مشاركة النتيجة
        const shareButton = document.querySelector('.btn-share-score');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                this.shareScore();
            });
        }

        // المساعدات
        document.getElementById('fiftyFifty')?.addEventListener('click', () => {
            this.useLifeline('fiftyFifty');
        });
        
        document.getElementById('audienceHelp')?.addEventListener('click', () => {
            this.useLifeline('audienceHelp');
        });
        
        document.getElementById('phoneFriend')?.addEventListener('click', () => {
            this.useLifeline('phoneFriend');
        });

        // مفاتيح الاختصار
        this.setupKeyBindings();
    }

    setupKeyBindings() {
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            
            switch(e.key) {
                case '1':
                case 'أ':
                    this.selectAnswer(0);
                    break;
                case '2':
                case 'ب':
                    this.selectAnswer(1);
                    break;
                case '3':
                case 'ج':
                    this.selectAnswer(2);
                    break;
                case '4':
                case 'د':
                    this.selectAnswer(3);
                    break;
                case ' ':
                case 'Enter':
                    // تمرير للسؤال التالي إذا كان مؤقتاً
                    if (document.querySelector('.quiz-option.disabled')) {
                        this.nextQuestion();
                    }
                    break;
                case 'F':
                case 'f':
                    if (this.lifelines.fiftyFifty > 0) {
                        this.useLifeline('fiftyFifty');
                    }
                    break;
                case 'A':
                case 'a':
                    if (this.lifelines.audience > 0) {
                        this.useLifeline('audienceHelp');
                    }
                    break;
                case 'P':
                case 'p':
                    if (this.lifelines.phoneFriend > 0) {
                        this.useLifeline('phoneFriend');
                    }
                    break;
                case 'm':
                case 'M':
                    this.toggleMute();
                    break;
            }
        });
    }

    updateHelpButtons() {
        const helpButtons = document.querySelectorAll('.helper-btn');
        helpButtons.forEach(button => {
            const type = button.id;
            button.disabled = this.lifelines[type] <= 0;
            button.style.opacity = this.lifelines[type] > 0 ? '1' : '0.5';
            
            // تحديث العداد
            const countElement = button.querySelector('.lifeline-count') || document.createElement('span');
            if (!button.querySelector('.lifeline-count')) {
                countElement.className = 'lifeline-count';
                button.appendChild(countElement);
            }
            countElement.textContent = this.lifelines[type];
        });
    }

    restartGame() {
        document.getElementById('quizEndScreen').style.display = 'none';
        document.getElementById('quizStartScreen').style.display = 'block';
        
        // تنظيف التفاصيل القديمة
        const details = document.querySelector('.answer-details');
        if (details) details.remove();
        
        const certificate = document.querySelector('.certificate');
        if (certificate) certificate.remove();
    }

    shareScore() {
        const shareText = `🎯 حصلت على ${this.score.toLocaleString()} نقطة في تحدي الذكاء الاصطناعي!\nجرب التحدي الآن: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'نتيجتي في تحدي الذكاء الاصطناعي',
                text: shareText,
                url: window.location.href
            });
        } else {
            // نسخ للنصوص
            navigator.clipboard.writeText(shareText).then(() => {
                alert('تم نسخ النتيجة! يمكنك مشاركتها الآن.');
            });
        }
    }

    // ===== Animations Setup =====
    setupAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animations */
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px rgba(108, 99, 255, 0.5); }
                50% { box-shadow: 0 0 20px rgba(108, 99, 255, 0.8); }
            }
            
            /* Correct/Wrong Animations */
            .correct-animation, .wrong-animation {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                font-size: 3rem;
                z-index: 10;
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            
            .correct-animation.active {
                transform: translate(-50%, -50%) scale(1);
                color: #4ecdc4;
            }
            
            .wrong-animation.active {
                transform: translate(-50%, -50%) scale(1);
                color: #ef476f;
            }
            
            .points-animation {
                position: absolute;
                top: 50%;
                right: 20px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10;
            }
            
            /* Lifeline Animations */
            .lifeline-animation {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: rgba(108, 99, 255, 0.9);
                color: white;
                padding: 1rem 2rem;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1.2rem;
                font-weight: bold;
                z-index: 9999;
                transition: all 0.5s ease;
            }
            
            .lifeline-animation.active {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .phone-call-animation {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                font-size: 4rem;
                color: #6c63ff;
                z-index: 9999;
                animation: bounce 1s infinite;
            }
            
            .phone-call-animation.active {
                transform: translate(-50%, -50%) scale(1);
            }
            
            /* Answer Details */
            .answer-details {
                margin-top: 2rem;
                max-height: 300px;
                overflow-y: auto;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1rem;
            }
            
            body.dark-mode .answer-details {
                background: rgba(255, 255, 255, 0.05);
            }
            
            .answer-detail {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 8px;
                border-right: 4px solid;
            }
            
            .answer-detail.correct {
                background: rgba(78, 205, 196, 0.1);
                border-right-color: #4ecdc4;
            }
            
            .answer-detail.wrong {
                background: rgba(239, 71, 111, 0.1);
                border-right-color: #ef476f;
            }
            
            .question-number {
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .answer-info {
                display: flex;
                justify-content: space-between;
                margin-top: 0.5rem;
                font-size: 0.9rem;
            }
            
            .your-answer {
                color: #666;
            }
            
            body.dark-mode .your-answer {
                color: #aaa;
            }
            
            .correct-answer {
                color: #4ecdc4;
                font-weight: bold;
            }
            
            /* Certificate */
            .certificate {
                margin-top: 2rem;
                padding: 2rem;
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                border-radius: 20px;
                border: 2px solid #6c63ff;
                position: relative;
                overflow: hidden;
            }
            
            body.dark-mode .certificate {
                background: linear-gradient(135deg, #2d2d2d, #1e1e1e);
            }
            
            .certificate::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" opacity="0.1"><text x="50" y="50" font-size="20" text-anchor="middle" fill="%236c63ff">🎓</text></svg>');
                background-size: 100px;
            }
            
            .certificate-content {
                position: relative;
                z-index: 2;
                text-align: center;
            }
            
            .score-info {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin: 2rem 0;
            }
            
            .score-item {
                background: white;
                padding: 1rem;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            body.dark-mode .score-item {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .score-item .label {
                font-size: 0.9rem;
                color: #666;
            }
            
            .score-item .value {
                font-size: 1.2rem;
                font-weight: bold;
                color: #6c63ff;
            }
            
            .date {
                margin-top: 1rem;
                color: #666;
                font-style: italic;
            }
            
            /* Audio Controls */
            .audio-controls {
                position: absolute;
                top: 20px;
                left: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 100;
            }
            
            .audio-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(108, 99, 255, 0.2);
                border: 2px solid rgba(108, 99, 255, 0.3);
                color: #6c63ff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .audio-btn:hover {
                background: rgba(108, 99, 255, 0.3);
                transform: scale(1.1);
            }
            
            #volumeSlider {
                width: 100px;
                height: 5px;
                -webkit-appearance: none;
                background: rgba(108, 99, 255, 0.2);
                border-radius: 5px;
                outline: none;
            }
            
            #volumeSlider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #6c63ff;
                cursor: pointer;
            }
            
            /* Audience Help */
            .audience-percentage {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1rem;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 0 0 12px 12px;
            }
            
            .percentage-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 100%;
                width: 0;
                border-radius: 0 0 12px 12px;
                z-index: -1;
                transition: width 1.5s ease;
            }
            
            .percentage-text {
                font-weight: bold;
                color: white;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Initialize Game =====
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء زر تشغيل اللعبة إذا لم يكن موجوداً
    if (!document.querySelector('.btn-start-quiz')) {
        const startButton = document.createElement('button');
        startButton.className = 'btn btn-primary btn-start-quiz';
        startButton.innerHTML = '<i class="fas fa-play"></i> ابدأ التحدي';
        document.querySelector('.quiz-welcome')?.appendChild(startButton);
    }
    
    // تهيئة اللعبة
    const game = new GameManager();
    
    // جعل الكائن متاحاً عالمياً للتصحيح
    window.gameManager = game;
    
    // إضافة تأثيرات إضافية
    setupGameEffects();
});

function setupGameEffects() {
    // تأثيرات للأزرار
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
    });
    
    // تأثيرات للخيارات
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.quiz-option') && !e.target.closest('.quiz-option.disabled')) {
            e.target.closest('.quiz-option').style.boxShadow = '0 5px 15px rgba(108, 99, 255, 0.3)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.quiz-option')) {
            e.target.closest('.quiz-option').style.boxShadow = '';
        }
    });
    
    // تأثيرات للعدادات
    const counters = ['quizTimer', 'quizScore', 'currentQuestion'];
    counters.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('DOMSubtreeModified', () => {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            });
        }
    });
    
    // تأثيرات للمساعدات
    document.querySelectorAll('.helper-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                btn.style.transform = 'rotate(5deg) scale(1.1)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // تأثيرات للنتيجة النهائية
    const scoreElements = ['finalScore', 'correctAnswers', 'wrongAnswers', 'totalTime'];
    scoreElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('DOMSubtreeModified', () => {
                element.classList.add('updated');
                setTimeout(() => {
                    element.classList.remove('updated');
                }, 1000);
            });
        }
    });
    
    // تأثيرات للشهادة
    document.addEventListener('click', (e) => {
        if (e.target.closest('.download-certificate')) {
            e.target.closest('.download-certificate').innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            setTimeout(() => {
                e.target.closest('.download-certificate').innerHTML = '<i class="fas fa-download"></i> تحميل الشهادة';
            }, 2000);
        }
    });
    
    // تأثيرات المشاركة
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-share-score')) {
            e.target.closest('.btn-share-score').innerHTML = '<i class="fas fa-share-alt"></i> شارك نتيجتك';
            setTimeout(() => {
                e.target.closest('.btn-share-score').innerHTML = '<i class="fas fa-share"></i> شارك نتيجتك';
            }, 1000);
        }
    });
}