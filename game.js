// ===== Balloon Game =====
class BalloonGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.balloons = [];
        this.score = 0;
        this.timeLeft = 60;
        this.gameActive = false;
        this.gameTimer = null;
        this.particles = [];
        this.explosions = [];
        this.init();
    }

    init() {
        this.createGameCanvas();
        this.setupEventListeners();
        this.createStartScreen();
    }

    createGameCanvas() {
        // إنشاء عنصر اللعبة
        const gameContainer = document.getElementById('codingGame');
        if (!gameContainer) return;

        gameContainer.innerHTML = `
            <div class="balloon-game-container">
                <div class="game-canvas-container">
                    <canvas id="balloonCanvas"></canvas>
                    <div class="game-overlay" id="gameOverlay">
                        <div class="game-start-screen">
                            <h3>🎈 لعبة رمي البالون 🎈</h3>
                            <p>اضغط على البالونات لكسب النقاط!</p>
                            <div class="game-instructions">
                                <div class="instruction">
                                    <i class="fas fa-mouse-pointer"></i>
                                    <span>انقر على البالونات لتفجيرها</span>
                                </div>
                                <div class="instruction">
                                    <i class="fas fa-clock"></i>
                                    <span>لديك 60 ثانية</span>
                                </div>
                                <div class="instruction">
                                    <i class="fas fa-star"></i>
                                    <span>كل بالونة = 10 نقاط</span>
                                </div>
                                <div class="instruction">
                                    <i class="fas fa-bolt"></i>
                                    <span>البالونات الذهبية = 50 نقطة</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-start-game">
                                <i class="fas fa-play"></i> ابدأ اللعب
                            </button>
                        </div>
                    </div>
                </div>
                <div class="game-controls">
                    <div class="game-stats">
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <span>النقاط: <span id="balloonScore">0</span></span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-clock"></i>
                            <span>الوقت: <span id="balloonTime">60</span>ث</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-bolt"></i>
                            <span>البالونات: <span id="balloonCount">0</span></span>
                        </div>
                    </div>
                    <div class="game-buttons">
                        <button class="btn btn-outline btn-restart">
                            <i class="fas fa-redo"></i> إعادة
                        </button>
                        <button class="btn btn-secondary btn-pause">
                            <i class="fas fa-pause"></i> توقف
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('balloonCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // إضافة الأنماط
        this.addGameStyles();
    }

    addGameStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .balloon-game-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                padding: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            
            .game-canvas-container {
                position: relative;
                width: 100%;
                height: 400px;
                border-radius: 15px;
                overflow: hidden;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
            }
            
            #balloonCanvas {
                width: 100%;
                height: 100%;
                display: block;
            }
            
            .game-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }
            
            .game-start-screen {
                text-align: center;
                color: white;
                padding: 40px;
                max-width: 500px;
            }
            
            .game-start-screen h3 {
                font-size: 32px;
                margin-bottom: 20px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .game-start-screen p {
                font-size: 18px;
                margin-bottom: 30px;
                opacity: 0.9;
            }
            
            .game-instructions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 30px 0;
            }
            
            .instruction {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                backdrop-filter: blur(5px);
            }
            
            .instruction i {
                color: #4ecdc4;
                font-size: 20px;
            }
            
            .instruction span {
                font-size: 14px;
                font-weight: 500;
            }
            
            .btn-start-game {
                margin-top: 20px;
                padding: 15px 40px;
                font-size: 18px;
            }
            
            .game-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding: 15px;
                background: rgba(255,255,255,0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
            }
            
            .game-stats {
                display: flex;
                gap: 30px;
            }
            
            .game-stats .stat {
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                font-size: 16px;
                font-weight: 600;
            }
            
            .game-stats .stat i {
                font-size: 20px;
                color: #4ecdc4;
            }
            
            .game-buttons {
                display: flex;
                gap: 10px;
            }
            
            .btn-restart, .btn-pause {
                padding: 10px 25px;
            }
            
            @media (max-width: 768px) {
                .game-instructions {
                    grid-template-columns: 1fr;
                }
                
                .game-controls {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .game-stats {
                    justify-content: center;
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(style);
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    setupEventListeners() {
        // إعادة الحجم
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        // بدء اللعبة
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-start-game')) {
                this.startGame();
            }
            
            if (e.target.closest('.btn-restart')) {
                this.restartGame();
            }
            
            if (e.target.closest('.btn-pause')) {
                this.togglePause();
            }
        });

        // التحكم باللمس والنقر
        this.canvas.addEventListener('click', (e) => {
            if (!this.gameActive) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.handleClick(x, y);
        });

        this.canvas.addEventListener('touchstart', (e) => {
            if (!this.gameActive) return;
            
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            this.handleClick(x, y);
        });
    }

    createStartScreen() {
        const overlay = document.getElementById('gameOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    startGame() {
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 60;
        this.balloons = [];
        this.particles = [];
        this.explosions = [];
        
        document.getElementById('gameOverlay').style.display = 'none';
        document.getElementById('balloonScore').textContent = this.score;
        document.getElementById('balloonTime').textContent = this.timeLeft;
        
        // بدء الموقت
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('balloonTime').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // إنشاء البالونات
        this.createBalloons();
        
        // بدء اللعبة
        this.animate();
        
        // إشعار البدء
        this.showGameNotification('ابدأ! اضغط على البالونات لكسب النقاط!', 'success');
    }

    createBalloons() {
        // إنشاء البالونات
        const balloonCount = 15;
        for (let i = 0; i < balloonCount; i++) {
            this.createBalloon();
        }
    }

    createBalloon() {
        const types = ['red', 'blue', 'green', 'yellow', 'gold'];
        const type = Math.random() < 0.1 ? 'gold' : types[Math.floor(Math.random() * 4)];
        
        const balloon = {
            x: Math.random() * (this.canvas.width - 100) + 50,
            y: this.canvas.height + 100,
            radius: Math.random() * 30 + 20,
            speed: Math.random() * 2 + 1,
            color: this.getBalloonColor(type),
            type: type,
            popRadius: 0,
            popping: false,
            popped: false,
            opacity: 1
        };
        
        this.balloons.push(balloon);
    }

    getBalloonColor(type) {
        const colors = {
            'red': '#ff6b6b',
            'blue': '#4ecdc4',
            'green': '#51cf66',
            'yellow': '#ffd43b',
            'gold': '#ffd700'
        };
        return colors[type] || '#ff6b6b';
    }

    handleClick(x, y) {
        // التحقق من النقر على البالونات
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const balloon = this.balloons[i];
            
            if (balloon.popping || balloon.popped) continue;
            
            const distance = Math.sqrt((x - balloon.x) ** 2 + (y - balloon.y) ** 2);
            
            if (distance < balloon.radius) {
                this.popBalloon(i);
                break;
            }
        }
    }

    popBalloon(index) {
        const balloon = this.balloons[index];
        balloon.popping = true;
        
        // حساب النقاط
        let points = 10;
        if (balloon.type === 'gold') {
            points = 50;
        }
        
        this.score += points;
        document.getElementById('balloonScore').textContent = this.score;
        
        // إنشاء تأثير الانفجار
        this.createExplosion(balloon.x, balloon.y, balloon.color);
        
        // إنشاء جسيمات
        this.createParticles(balloon.x, balloon.y, balloon.color);
        
        // إزالة البالونة بعد التأثير
        setTimeout(() => {
            balloon.popped = true;
            
            // استبدال البالونة
            setTimeout(() => {
                this.createBalloon();
            }, 500);
        }, 300);
        
        // إشعار النقاط
        this.showScorePopup(balloon.x, balloon.y, `+${points}`);
        
        // صوت الانفجار (محاكاة)
        this.playPopSound();
    }

    createExplosion(x, y, color) {
        const explosion = {
            x: x,
            y: y,
            radius: 5,
            maxRadius: 50,
            color: color,
            alpha: 1,
            growing: true
        };
        
        this.explosions.push(explosion);
    }

    createParticles(x, y, color) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: x,
                y: y,
                size: Math.random() * 5 + 2,
                speedX: Math.random() * 6 - 3,
                speedY: Math.random() * 6 - 3,
                color: color,
                alpha: 1,
                life: 1
            };
            
            this.particles.push(particle);
        }
    }

    showScorePopup(x, y, text) {
        const popup = {
            x: x,
            y: y,
            text: text,
            alpha: 1,
            vy: -2
        };
        
        // رسم النص العائم
        const drawPopup = () => {
            if (popup.alpha <= 0) return;
            
            this.ctx.save();
            this.ctx.globalAlpha = popup.alpha;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 24px Tajawal';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
            this.ctx.shadowBlur = 5;
            this.ctx.fillText(popup.text, popup.x, popup.y);
            this.ctx.restore();
            
            popup.y += popup.vy;
            popup.alpha -= 0.02;
            
            requestAnimationFrame(drawPopup);
        };
        
        drawPopup();
    }

    playPopSound() {
        // محاكاة صوت الانفجار
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    updateBalloons() {
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const balloon = this.balloons[i];
            
            if (balloon.popped) {
                this.balloons.splice(i, 1);
                continue;
            }
            
            if (balloon.popping) {
                balloon.popRadius += 5;
                balloon.opacity -= 0.05;
                
                if (balloon.popRadius > balloon.radius * 2) {
                    balloon.popped = true;
                }
                continue;
            }
            
            // حركة البالون
            balloon.y -= balloon.speed;
            
            // تمايل البالون
            balloon.x += Math.sin(Date.now() / 1000 + i) * 0.5;
            
            // إذا وصل البالون للأعلى
            if (balloon.y < -100) {
                this.balloons.splice(i, 1);
                this.createBalloon();
            }
        }
        
        // تحديث عدد البالونات
        document.getElementById('balloonCount').textContent = this.balloons.length;
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 0.02;
            particle.alpha = particle.life;
            particle.speedY += 0.1; // الجاذبية
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    updateExplosions() {
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            
            if (explosion.growing) {
                explosion.radius += 3;
                if (explosion.radius >= explosion.maxRadius) {
                    explosion.growing = false;
                }
            } else {
                explosion.alpha -= 0.05;
                if (explosion.alpha <= 0) {
                    this.explosions.splice(i, 1);
                }
            }
        }
    }

    drawBalloons() {
        this.balloons.forEach(balloon => {
            this.ctx.save();
            
            if (balloon.popping) {
                // رسم تأثير الانفجار
                this.ctx.globalAlpha = balloon.opacity;
                this.ctx.fillStyle = balloon.color;
                this.ctx.beginPath();
                this.ctx.arc(balloon.x, balloon.y, balloon.popRadius, 0, Math.PI * 2);
                this.ctx.fill();
                
                // النقاط المتوهجة
                this.ctx.shadowColor = balloon.color;
                this.ctx.shadowBlur = 20;
                this.ctx.fillStyle = 'white';
                this.ctx.beginPath();
                this.ctx.arc(balloon.x, balloon.y, balloon.popRadius / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // رسم البالون
                this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowOffsetY = 5;
                
                // الجسم الرئيسي
                this.ctx.fillStyle = balloon.color;
                this.ctx.beginPath();
                this.ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
                this.ctx.fill();
                
                // التوهج
                this.ctx.shadowColor = balloon.color;
                this.ctx.shadowBlur = 20;
                this.ctx.beginPath();
                this.ctx.arc(balloon.x, balloon.y, balloon.radius * 0.8, 0, Math.PI * 2);
                this.ctx.fill();
                
                // النقطة اللامعة
                this.ctx.shadowBlur = 0;
                this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
                this.ctx.beginPath();
                this.ctx.arc(balloon.x - balloon.radius * 0.3, balloon.y - balloon.radius * 0.3, balloon.radius * 0.2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // الذيل
                this.ctx.strokeStyle = balloon.color;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(balloon.x, balloon.y + balloon.radius);
                this.ctx.lineTo(balloon.x, balloon.y + balloon.radius + 30);
                this.ctx.stroke();
                
                // إذا كانت بالونة ذهبية
                if (balloon.type === 'gold') {
                    this.ctx.strokeStyle = '#ffd700';
                    this.ctx.lineWidth = 3;
                    this.ctx.setLineDash([5, 5]);
                    this.ctx.beginPath();
                    this.ctx.arc(balloon.x, balloon.y, balloon.radius + 5, 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.setLineDash([]);
                    
                    // تاج
                    this.ctx.fillStyle = '#ffd700';
                    this.ctx.beginPath();
                    this.ctx.moveTo(balloon.x - 15, balloon.y - balloon.radius - 10);
                    this.ctx.lineTo(balloon.x, balloon.y - balloon.radius - 25);
                    this.ctx.lineTo(balloon.x + 15, balloon.y - balloon.radius - 10);
                    this.ctx.closePath();
                    this.ctx.fill();
                }
            }
            
            this.ctx.restore();
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawExplosions() {
        this.explosions.forEach(explosion => {
            this.ctx.save();
            this.ctx.globalAlpha = explosion.alpha;
            this.ctx.fillStyle = explosion.color;
            this.ctx.shadowColor = explosion.color;
            this.ctx.shadowBlur = 20;
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawBackground() {
        // خلفية متدرجة
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // السحاب
        this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i < 5; i++) {
            const x = (Date.now() / 5000 + i * 0.5) % (this.canvas.width + 200) - 100;
            const y = 50 + i * 40;
            const size = 30 + i * 10;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.arc(x + size * 0.8, y, size * 0.8, 0, Math.PI * 2);
            this.ctx.arc(x - size * 0.8, y, size * 0.8, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    draw() {
        // مسح الشاشة
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // رسم الخلفية
        this.drawBackground();
        
        // رسم العناصر
        this.drawExplosions();
        this.drawParticles();
        this.drawBalloons();
        
        // رسم معلومات اللعبة
        this.drawGameInfo();
    }

    drawGameInfo() {
        this.ctx.save();
        
        // خلفية معلومات اللعبة
        this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.ctx.fillRect(20, 20, 200, 80);
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(20, 20, 200, 80);
        
        // النص
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 18px Tajawal';
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'top';
        
        this.ctx.fillText(`النقاط: ${this.score}`, 200, 30);
        this.ctx.fillText(`الوقت: ${this.timeLeft}ث`, 200, 55);
        this.ctx.fillText(`البالونات: ${this.balloons.length}`, 200, 80);
        
        // شريط الوقت
        const timeWidth = (this.timeLeft / 60) * 180;
        this.ctx.fillStyle = this.timeLeft > 20 ? '#4ecdc4' : this.timeLeft > 10 ? '#ffd43b' : '#ff6b6b';
        this.ctx.fillRect(30, 110, timeWidth, 8);
        
        this.ctx.restore();
    }

    animate() {
        if (!this.gameActive) return;
        
        this.updateBalloons();
        this.updateParticles();
        this.updateExplosions();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        
        // حساب النتيجة النهائية
        let message = '';
        let emoji = '🎯';
        
        if (this.score >= 500) {
            message = 'مذهل! أنت بطل البالونات! 🏆';
            emoji = '🏆';
        } else if (this.score >= 300) {
            message = 'رائع! مهاراتك ممتازة! ⭐';
            emoji = '⭐';
        } else if (this.score >= 150) {
            message = 'جيد جداً! استمر في التمرين! 👍';
            emoji = '👍';
        } else {
            message = 'حاول مرة أخرى! التدريب يصنع المحترفين 💪';
            emoji = '💪';
        }
        
        // عرض شاشة النهاية
        const overlay = document.getElementById('gameOverlay');
        overlay.innerHTML = `
            <div class="game-end-screen">
                <h3>${emoji} انتهت اللعبة! ${emoji}</h3>
                <div class="final-score">
                    <div class="score-circle">
                        <span class="score-number">${this.score}</span>
                        <span class="score-label">نقطة</span>
                    </div>
                </div>
                <p class="result-message">${message}</p>
                <div class="game-stats-summary">
                    <div class="stat-summary">
                        <i class="fas fa-star"></i>
                        <span>${this.score} نقطة</span>
                    </div>
                    <div class="stat-summary">
                        <i class="fas fa-clock"></i>
                        <span>60 ثانية</span>
                    </div>
                    <div class="stat-summary">
                        <i class="fas fa-bolt"></i>
                        <span>${Math.floor(this.score / 10)} بالونة</span>
                    </div>
                </div>
                <div class="end-game-buttons">
                    <button class="btn btn-primary btn-play-again">
                        <i class="fas fa-redo"></i> العب مرة أخرى
                    </button>
                    <button class="btn btn-outline btn-main-menu">
                        <i class="fas fa-home"></i> القائمة الرئيسية
                    </button>
                </div>
            </div>
        `;
        
        overlay.style.display = 'flex';
        
        // إضافة أحداث للأزرار
        document.querySelector('.btn-play-again').addEventListener('click', () => {
            this.startGame();
        });
        
        document.querySelector('.btn-main-menu').addEventListener('click', () => {
            this.showMainMenu();
        });
        
        // إشعار النتيجة
        this.showGameNotification(`اللعبة انتهت! النقاط: ${this.score}`, 'success');
    }

    showMainMenu() {
        const overlay = document.getElementById('gameOverlay');
        overlay.innerHTML = `
            <div class="game-start-screen">
                <h3>🎈 لعبة رمي البالون 🎈</h3>
                <p>اضغط على البالونات لكسب النقاط!</p>
                <div class="game-instructions">
                    <div class="instruction">
                        <i class="fas fa-mouse-pointer"></i>
                        <span>انقر على البالونات لتفجيرها</span>
                    </div>
                    <div class="instruction">
                        <i class="fas fa-clock"></i>
                        <span>لديك 60 ثانية</span>
                    </div>
                    <div class="instruction">
                        <i class="fas fa-star"></i>
                        <span>كل بالونة = 10 نقاط</span>
                    </div>
                    <div class="instruction">
                        <i class="fas fa-bolt"></i>
                        <span>البالونات الذهبية = 50 نقطة</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-start-game">
                    <i class="fas fa-play"></i> ابدأ اللعب
                </button>
            </div>
        `;
        
        overlay.style.display = 'flex';
        
        // إعادة إضافة حدث البدء
        document.querySelector('.btn-start-game').addEventListener('click', () => {
            this.startGame();
        });
    }

    restartGame() {
        if (this.gameActive) {
            clearInterval(this.gameTimer);
        }
        this.startGame();
    }

    togglePause() {
        if (!this.gameActive) return;
        
        const pauseBtn = document.querySelector('.btn-pause');
        
        if (this.gameTimer) {
            // توقف
            clearInterval(this.gameTimer);
            this.gameTimer = null;
            this.gameActive = false;
            pauseBtn.innerHTML = '<i class="fas fa-play"></i> استمر';
            pauseBtn.classList.add('btn-success');
            
            // عرض شاشة التوقف
            const overlay = document.getElementById('gameOverlay');
            if (overlay.style.display !== 'flex') {
                overlay.innerHTML = `
                    <div class="game-pause-screen">
                        <h3>⏸️ اللعبة متوقفة</h3>
                        <p>النقاط الحالية: ${this.score}</p>
                        <p>الوقت المتبقي: ${this.timeLeft}ث</p>
                        <button class="btn btn-primary btn-resume">
                            <i class="fas fa-play"></i> استمر في اللعب
                        </button>
                    </div>
                `;
                overlay.style.display = 'flex';
                
                document.querySelector('.btn-resume').addEventListener('click', () => {
                    this.resumeGame();
                });
            }
        } else {
            // استمرار
            this.resumeGame();
        }
    }

    resumeGame() {
        this.gameActive = true;
        const pauseBtn = document.querySelector('.btn-pause');
        
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> توقف';
        pauseBtn.classList.remove('btn-success');
        
        document.getElementById('gameOverlay').style.display = 'none';
        
        // إعادة الموقت
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('balloonTime').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // إعادة الرسوم المتحركة
        this.animate();
    }

    showGameNotification(message, type = 'info') {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .game-notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px 30px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideUpIn 0.3s ease forwards, fadeOut 0.3s ease 2.7s forwards;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .game-notification.success {
                border-color: #4ecdc4;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            @keyframes slideUpIn {
                to { transform: translateX(-50%) translateY(0); }
            }
            
            @keyframes fadeOut {
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة الإشعار
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// ===== Initialize Game =====
document.addEventListener('DOMContentLoaded', () => {
    // انتظر تحميل الصفحة بالكامل
    setTimeout(() => {
        const game = new BalloonGame();
        
        // جعل اللعبة متاحة عالمياً للتصحيح
        window.balloonGame = game;
        
        console.log('🎮 تم تحميل لعبة البالونات بنجاح!');
    }, 1000);
});

// ===== Keyboard Controls =====
document.addEventListener('keydown', (e) => {
    if (!window.balloonGame) return;
    
    const game = window.balloonGame;
    
    switch(e.key) {
        case ' ':
        case 'Spacebar':
            // بدء/إيقاف اللعبة
            if (!game.gameActive) {
                game.startGame();
            } else {
                game.togglePause();
            }
            break;
            
        case 'r':
        case 'R':
            // إعادة اللعبة
            game.restartGame();
            break;
            
        case 'Escape':
            // العودة للقائمة الرئيسية
            if (game.gameActive) {
                game.showMainMenu();
            }
            break;
    }
});

// ===== Performance Optimizations =====
class GamePerformance {
    static init() {
        // التحقق من أداء الجهاز
        this.checkPerformance();
        
        // تحسين الذاكرة
        this.setupMemoryOptimization();
        
        // تحسين الرسوم المتحركة
        this.optimizeAnimations();
    }
    
    static checkPerformance() {
        // التحقق من دعم الويب جل
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.warn('WebGL not supported, using 2D canvas');
        }
        
        // التحقق من أداء الرسوم المتحركة
        let fps = 60;
        let lastFrameTime = performance.now();
        
        const checkFPS = () => {
            const now = performance.now();
            const delta = now - lastFrameTime;
            lastFrameTime = now;
            fps = Math.round(1000 / delta);
            
            // ضبط أداء اللعبة بناءً على الـ FPS
            if (fps < 30 && window.balloonGame) {
                window.balloonGame.adjustPerformance(true);
            } else if (window.balloonGame) {
                window.balloonGame.adjustPerformance(false);
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        checkFPS();
    }
    
    static setupMemoryOptimization() {
        // تنظيف الذاكرة بانتظام
        setInterval(() => {
            if (window.gc) {
                window.gc();
            }
        }, 30000);
    }
    
    static optimizeAnimations() {
        // استخدام requestAnimationFrame الأمثل
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;
        
        const optimizedAnimation = (callback) => {
            return (timestamp) => {
                const delta = timestamp - lastTime;
                
                if (delta > interval) {
                    lastTime = timestamp - (delta % interval);
                    callback();
                }
                
                requestAnimationFrame(optimizedAnimation(callback));
            };
        };
        
        return optimizedAnimation;
    }
}

// تهيئة تحسينات الأداء
GamePerformance.init();