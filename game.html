<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Warrior | Игра</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/game.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .game-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0c29, #302b63);
            padding: 20px;
        }
        
        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .game-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .mode-badge {
            padding: 8px 15px;
            background: #6c63ff;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .difficulty-badge {
            padding: 5px 10px;
            background: rgba(255, 101, 132, 0.2);
            border-radius: 10px;
            font-size: 0.8rem;
            border: 1px solid #ff6584;
        }
        
        .stats-display {
            display: flex;
            gap: 20px;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item i {
            color: #6c63ff;
        }
        
        .game-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        @media (max-width: 768px) {
            .game-content {
                grid-template-columns: 1fr;
            }
        }
        
        .problem-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .problem-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .problem-number {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .problem-display {
            font-size: 3rem;
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            border: 2px solid rgba(108, 99, 255, 0.3);
            font-family: 'Orbitron', monospace;
        }
        
        .problem-expression {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .number {
            padding: 10px 20px;
            background: rgba(108, 99, 255, 0.2);
            border-radius: 10px;
            min-width: 100px;
            text-align: center;
        }
        
        .operator {
            font-size: 2.5rem;
            color: #ff6584;
        }
        
        .equals {
            font-size: 2.5rem;
            color: #00d4aa;
        }
        
        .answer-input {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .answer-input input {
            flex: 1;
            font-size: 2rem;
            text-align: center;
            font-family: 'Orbitron', monospace;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #6c63ff;
            border-radius: 10px;
            color: white;
        }
        
        .answer-input input:focus {
            outline: none;
            border-color: #ff6584;
            box-shadow: 0 0 20px rgba(255, 101, 132, 0.3);
        }
        
        .controls {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        
        .controls button {
            flex: 1;
            min-width: 120px;
        }
        
        .hint-section {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 183, 77, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 183, 77, 0.3);
            display: none;
        }
        
        .hint-section.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }
        
        .hint-section i {
            color: #ffb74d;
            margin-right: 10px;
        }
        
        .timer-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .timer-display {
            font-size: 4rem;
            text-align: center;
            font-family: 'Orbitron', monospace;
            margin: 20px 0;
            color: #00d4aa;
        }
        
        .game-stats {
            margin-top: 30px;
        }
        
        .stats-list {
            list-style: none;
        }
        
        .stats-list li {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .powerups {
            margin-top: 30px;
        }
        
        .powerup-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .powerup-btn {
            flex: 1;
            min-width: 120px;
            padding: 10px;
            background: rgba(108, 99, 255, 0.2);
            border: 1px solid rgba(108, 99, 255, 0.5);
            border-radius: 8px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .powerup-btn:hover:not(:disabled) {
            background: rgba(108, 99, 255, 0.4);
            transform: translateY(-2px);
        }
        
        .powerup-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .game-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @keyframes correctAnswer {
            0% { background: rgba(0, 212, 170, 0.1); }
            50% { background: rgba(0, 212, 170, 0.3); }
            100% { background: rgba(0, 212, 170, 0.1); }
        }
        
        @keyframes wrongAnswer {
            0% { background: rgba(255, 82, 82, 0.1); }
            50% { background: rgba(255, 82, 82, 0.3); }
            100% { background: rgba(255, 82, 82, 0.1); }
        }
        
        .correct {
            animation: correctAnswer 0.5s ease;
        }
        
        .wrong {
            animation: wrongAnswer 0.5s ease;
        }
        
        #fireworks-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        }
        
        .firework {
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff6584;
            animation: fireworkExplode 1s ease-out forwards;
        }
        
        @keyframes fireworkExplode {
            0% {
                transform: translateY(100vh) scale(1);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(0) scale(20);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="game-header">
            <div class="game-info">
                <a href="lobby.html" class="btn-secondary">
                    <i class="fas fa-arrow-left"></i> Назад
                </a>
                <div class="mode-badge" id="game-mode">Тренировка</div>
                <div class="difficulty-badge" id="game-difficulty">Уровень 1</div>
            </div>
            
            <div class="stats-display">
                <div class="stat-item">
                    <i class="fas fa-coins"></i>
                    <span id="game-coins">500</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-lightbulb"></i>
                    <span id="game-hints">3</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span id="game-score">0</span>
                </div>
            </div>
        </div>
        
        <div class="game-content">
            <div class="problem-section">
                <div class="problem-header">
                    <div class="problem-number">Пример <span id="current-problem">1</span></div>
                    <div class="problem-timer" id="problem-timer"></div>
                </div>
                
                <div class="problem-display" id="problem-display">
                    <div class="problem-expression">
                        <span class="number" id="number1">15</span>
                        <span class="operator" id="operator">+</span>
                        <span class="number" id="number2">27</span>
                        <span class="equals">=</span>
                        <span class="number">?</span>
                    </div>
                </div>
                
                <div class="answer-input">
                    <input type="text" id="answer-input" placeholder="Введите ответ" maxlength="10" autofocus>
                    <button class="btn-primary" id="submit-answer">
                        <i class="fas fa-check"></i> Проверить
                    </button>
                </div>
                
                <div class="controls">
                    <button class="btn-warning" id="use-hint">
                        <i class="fas fa-lightbulb"></i> Подсказка
                    </button>
                    <button class="btn-secondary" id="skip-problem">
                        <i class="fas fa-forward"></i> Пропустить
                    </button>
                    <button class="btn-danger" id="pause-game">
                        <i class="fas fa-pause"></i> Пауза
                    </button>
                </div>
                
                <div class="hint-section" id="hint-section">
                    <i class="fas fa-info-circle"></i>
                    <span id="hint-text">Подсказка будет здесь</span>
                </div>
            </div>
            
            <div class="timer-section">
                <h3><i class="fas fa-clock"></i> Таймер</h3>
                <div class="timer-display" id="game-timer">02:00</div>
                
                <div class="game-stats">
                    <h4><i class="fas fa-chart-bar"></i> Статистика</h4>
                    <ul class="stats-list">
                        <li>Правильно: <span id="stats-correct">0</span></li>
                        <li>Неправильно: <span id="stats-wrong">0</span></li>
                        <li>Точность: <span id="stats-accuracy">0%</span></li>
                        <li>Монеты: <span id="stats-earned">0</span></li>
                    </ul>
                </div>
                
                <div class="powerups">
                    <h4><i class="fas fa-magic"></i> Усиления</h4>
                    <div class="powerup-buttons">
                        <button class="powerup-btn" id="double-coins" data-cost="50">
                            <i class="fas fa-coins"></i> ×2 Монеты
                        </button>
                        <button class="powerup-btn" id="extra-time" data-cost="100">
                            <i class="fas fa-clock"></i> +30 сек
                        </button>
                        <button class="powerup-btn" id="firework" data-cost="50">
                            <i class="fas fa-fire"></i> Фейерверк
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="game-footer">
            <div class="streak-display">
                <i class="fas fa-fire"></i> Серия: <span id="streak-count">0</span>
            </div>
            <button class="btn-success" id="finish-game">
                <i class="fas fa-flag-checkered"></i> Завершить игру
            </button>
        </div>
    </div>
    
    <div id="fireworks-container"></div>
    
    <script src="js/game.js"></script>
    <script>
        // Инициализация игры
        class MathGame {
            constructor() {
                this.mode = localStorage.getItem('gameMode') || 'easy';
                this.difficulty = 1;
                this.score = 0;
                this.coins = 0;
                this.streak = 0;
                this.correct = 0;
                this.wrong = 0;
                this.currentProblem = 1;
                this.totalTime = 120; // 2 минуты в секундах
                this.timeLeft = this.totalTime;
                this.timer = null;
                this.isPaused = false;
                this.hintsUsed = 0;
                
                this.init();
            }
            
            init() {
                this.setupGame();
                this.setupEventListeners();
                this.startTimer();
                this.generateProblem();
            }
            
            setupGame() {
                const modeNames = {
                    easy: 'Тренировка',
                    medium: 'На время', 
                    hard: 'Прогрессия'
                };
                
                document.getElementById('game-mode').textContent = modeNames[this.mode] || 'Тренировка';
                
                // Загружаем данные пользователя
                const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
                if (user) {
                    document.getElementById('game-coins').textContent = user.coins || 0;
                    document.getElementById('game-hints').textContent = user.hints || 0;
                }
            }
            
            setupEventListeners() {
                // Проверка ответа
                document.getElementById('submit-answer').addEventListener('click', () => this.checkAnswer());
                document.getElementById('answer-input').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.checkAnswer();
                });
                
                // Подсказка
                document.getElementById('use-hint').addEventListener('click', () => this.useHint());
                
                // Пропуск
                document.getElementById('skip-problem').addEventListener('click', () => this.skipProblem());
                
                // Пауза
                document.getElementById('pause-game').addEventListener('click', () => this.togglePause());
                
                // Усиления
                document.getElementById('double-coins').addEventListener('click', () => this.activatePowerup('double-coins'));
                document.getElementById('extra-time').addEventListener('click', () => this.activatePowerup('extra-time'));
                document.getElementById('firework').addEventListener('click', () => this.activatePowerup('firework'));
                
                // Завершение
                document.getElementById('finish-game').addEventListener('click', () => this.finishGame());
            }
            
            startTimer() {
                this.updateTimerDisplay();
                this.timer = setInterval(() => {
                    if (!this.isPaused) {
                        this.timeLeft--;
                        this.updateTimerDisplay();
                        
                        if (this.timeLeft <= 0) {
                            this.finishGame();
                        }
                    }
                }, 1000);
            }
            
            updateTimerDisplay() {
                const minutes = Math.floor(this.timeLeft / 60);
                const seconds = this.timeLeft % 60;
                document.getElementById('game-timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    
                // Меняем цвет при малом времени
                if (this.timeLeft < 30) {
                    document.getElementById('game-timer').style.color = '#ff5252';
                }
            }
            
            generateProblem() {
                let problem;
                
                switch(this.mode) {
                    case 'easy':
                        problem = this.generateEasyProblem();
                        break;
                    case 'medium':
                        problem = this.generateMediumProblem();
                        break;
                    case 'hard':
                        problem = this.generateHardProblem();
                        break;
                    default:
                        problem = this.generateEasyProblem();
                }
                
                document.getElementById('number1').textContent = problem.a;
                document.getElementById('operator').textContent = problem.op;
                document.getElementById('number2').textContent = problem.b;
                document.getElementById('current-problem').textContent = this.currentProblem;
                document.getElementById('answer-input').value = '';
                
                this.currentAnswer = problem.answer;
                this.currentHint = problem.hint;
                
                // Сбрасываем анимацию
                document.getElementById('problem-display').classList.remove('correct', 'wrong');
            }
            
            generateEasyProblem() {
                const ops = ['+', '-', '×'];
                const op = ops[Math.floor(Math.random() * ops.length)];
                
                let a, b;
                if (op === '×') {
                    a = Math.floor(Math.random() * 10) + 1;
                    b = Math.floor(Math.random() * 10) + 1;
                } else {
                    a = Math.floor(Math.random() * 50) + 1;
                    b = Math.floor(Math.random() * 50) + 1;
                }
                
                const answer = this.calculate(a, b, op);
                const hint = `Ответ: ${answer.toString().length} цифры`;
                
                return { a, b, op, answer, hint };
            }
            
            generateMediumProblem() {
                const ops = ['+', '-', '×'];
                const op = ops[Math.floor(Math.random() * ops.length)];
                
                let a, b;
                if (op === '×') {
                    a = Math.floor(Math.random() * 15) + 1;
                    b = Math.floor(Math.random() * 15) + 1;
                } else {
                    a = Math.floor(Math.random() * 100) + 10;
                    b = Math.floor(Math.random() * 100) + 10;
                }
                
                const answer = this.calculate(a, b, op);
                const hint = `Первая цифра: ${answer.toString()[0]}`;
                
                return { a, b, op, answer, hint };
            }
            
            generateHardProblem() {
                // Прогрессивная сложность
                const complexity = Math.min(10, this.difficulty);
                const ops = ['+', '-', '×', '÷'];
                const op = ops[Math.floor(Math.random() * ops.length)];
                
                let a, b;
                if (op === '×') {
                    a = Math.floor(Math.random() * 20 * complexity) + 10;
                    b = Math.floor(Math.random() * 10 * complexity) + 5;
                } else if (op === '÷') {
                    b = Math.floor(Math.random() * 10) + 2;
                    a = b * (Math.floor(Math.random() * 15) + 2);
                } else {
                    a = Math.floor(Math.random() * 100 * complexity) + 50;
                    b = Math.floor(Math.random() * 100 * complexity) + 50;
                }
                
                const answer = this.calculate(a, b, op);
                const hint = this.generateSmartHint(answer);
                
                return { a, b, op, answer, hint };
            }
            
            calculate(a, b, op) {
                switch(op) {
                    case '+': return a + b;
                    case '-': return a - b;
                    case '×': return a * b;
                    case '÷': return Math.round(a / b);
                    default: return 0;
                }
            }
            
            generateSmartHint(answer) {
                const str = answer.toString();
                if (str.length <= 2) {
                    return `Ответ: ${str.length} цифры`;
                } else if (str.length <= 4) {
                    const mid = Math.floor(str.length / 2);
                    return `Цифра ${mid + 1}: ${str[mid]}`;
                } else {
                    return `Первая цифра: ${str[0]}, последняя: ${str[str.length - 1]}`;
                }
            }
            
            checkAnswer() {
                const input = document.getElementById('answer-input');
                const userAnswer = parseInt(input.value);
                
                if (isNaN(userAnswer)) {
                    this.showMessage('Введите число!', 'warning');
                    return;
                }
                
                const isCorrect = userAnswer === this.currentAnswer;
                const display = document.getElementById('problem-display');
                
                if (isCorrect) {
                    // Правильный ответ
                    display.classList.add('correct');
                    this.correct++;
                    this.streak++;
                    this.score += 10 * this.difficulty;
                    this.coins += this.calculateCoins();
                    
                    // Бонус за серию
                    if (this.streak >= 5) {
                        this.coins += 10;
                        this.showMessage(`Серия ${this.streak}! +10 монет`, 'success');
                    }
                    
                    this.showMessage('Правильно! +' + this.calculateCoins() + ' монет', 'success');
                } else {
                    // Неправильный ответ
                    display.classList.add('wrong');
                    this.wrong++;
                    this.streak = 0;
                    this.showMessage(`Неправильно. Ответ: ${this.currentAnswer}`, 'error');
                }
                
                // Обновляем статистику
                this.updateStats();
                
                // Следующий вопрос
                setTimeout(() => {
                    this.currentProblem++;
                    if (this.mode === 'hard' && this.currentProblem % 5 === 0) {
                        this.difficulty++;
                        document.getElementById('game-difficulty').textContent = `Уровень ${this.difficulty}`;
                        this.showMessage('Сложность повышена!', 'info');
                    }
                    this.generateProblem();
                }, 1000);
            }
            
            calculateCoins() {
                const base = this.mode === 'easy' ? 10 : this.mode === 'medium' ? 25 : 50;
                return base * this.difficulty;
            }
            
            updateStats() {
                document.getElementById('game-score').textContent = this.score;
                document.getElementById('game-coins').textContent = 
                    parseInt(document.getElementById('game-coins').textContent) + this.calculateCoins();
                document.getElementById('stats-correct').textContent = this.correct;
                document.getElementById('stats-wrong').textContent = this.wrong;
                document.getElementById('streak-count').textContent = this.streak;
                document.getElementById('stats-earned').textContent = this.coins;
                
                const accuracy = this.correct + this.wrong > 0 ? 
                    Math.round((this.correct / (this.correct + this.wrong)) * 100) : 0;
                document.getElementById('stats-accuracy').textContent = accuracy + '%';
            }
            
            useHint() {
                const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
                if (!user || user.hints <= 0) {
                    this.showMessage('Нет подсказок!', 'warning');
                    return;
                }
                
                user.hints--;
                localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
                document.getElementById('game-hints').textContent = user.hints;
                
                const hintSection = document.getElementById('hint-section');
                document.getElementById('hint-text').textContent = this.currentHint;
                hintSection.classList.add('active');
                this.hintsUsed++;
                
                setTimeout(() => {
                    hintSection.classList.remove('active');
                }, 3000);
            }
            
            skipProblem() {
                this.wrong++;
                this.streak = 0;
                this.updateStats();
                this.currentProblem++;
                this.generateProblem();
                this.showMessage('Пример пропущен', 'warning');
            }
            
            togglePause() {
                this.isPaused = !this.isPaused;
                const btn = document.getElementById('pause-game');
                const icon = btn.querySelector('i');
                
                if (this.isPaused) {
                    btn.classList.remove('btn-danger');
                    btn.classList.add('btn-success');
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    this.showMessage('Игра на паузе', 'info');
                } else {
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-danger');
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                }
            }
            
            activatePowerup(type) {
                const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
                const btn = document.getElementById(type);
                const cost = parseInt(btn.dataset.cost);
                
                if (!user || user.coins < cost) {
                    this.showMessage('Недостаточно монет!', 'error');
                    return;
                }
                
                user.coins -= cost;
                localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
                document.getElementById('game-coins').textContent = user.coins;
                
                switch(type) {
                    case 'double-coins':
                        this.coins *= 2;
                        this.showMessage('×2 монеты активировано!', 'success');
                        break;
                    case 'extra-time':
                        this.timeLeft += 30;
                        this.updateTimerDisplay();
                        this.showMessage('+30 секунд!', 'success');
                        break;
                    case 'firework':
                        this.createFirework();
                        break;
                }
                
                btn.disabled = true;
                setTimeout(() => {
                    btn.disabled = false;
                }, 10000);
            }
            
            createFirework() {
                const container = document.getElementById('fireworks-container');
                const colors = ['#ff6584', '#6c63ff', '#00d4aa', '#ffb74d'];
                
                for (let i = 0; i < 50; i++) {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    firework.style.cssText = `
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        animation-delay: ${Math.random() * 0.5}s;
                    `;
                    
                    container.appendChild(firework);
                    
                    setTimeout(() => {
                        firework.remove();
                    }, 1000);
                }
                
                // Шанс 10% получить подсказку
                if (Math.random() < 0.1) {
                    const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
                    if (user) {
                        user.hints = (user.hints || 0) + 1;
                        localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
                        document.getElementById('game-hints').textContent = user.hints;
                        this.showMessage('Победа! +1 подсказка!', 'success');
                    }
                }
            }
            
            finishGame() {
                clearInterval(this.timer);
                
                // Сохраняем результаты
                const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
                if (user) {
                    user.coins = (user.coins || 0) + this.coins;
                    user.totalScore = (user.totalScore || 0) + this.score;
                    user.hints = (user.hints || 0) - this.hintsUsed;
                    
                    // Обновляем ежедневный прогресс
                    const today = new Date().toDateString();
                    const daily = user.dailyProgress || { date: today, solved: 0 };
                    if (daily.date === today) {
                        daily.solved += this.correct;
                    } else {
                        daily.date = today;
                        daily.solved = this.correct;
                    }
                    user.dailyProgress = daily;
                    
                    localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
                    
                    // Обновляем всех пользователей
                    const allUsers = JSON.parse(localStorage.getItem('codeWarriorUsers') || '[]');
                    const index = allUsers.findIndex(u => u.id === user.id);
                    if (index !== -1) {
                        allUsers[index] = user;
                        localStorage.setItem('codeWarriorUsers', JSON.stringify(allUsers));
                    }
                }
                
                // Показываем результаты
                const message = `Игра завершена!\n\n` +
                               `Примеров решено: ${this.correct}\n` +
                               `Заработано очков: ${this.score}\n` +
                               `Заработано монет: ${this.coins}\n` +
                               `Точность: ${Math.round((this.correct / (this.correct + this.wrong)) * 100)}%`;
                
                alert(message);
                window.location.href = 'lobby.html';
            }
            
            showMessage(text, type) {
                // Простое сообщение для игры
                console.log(`[${type}] ${text}`);
            }
        }
        
        // Запуск игры
        window.addEventListener('DOMContentLoaded', () => {
            window.currentGame = new MathGame();
        });
    </script>
</body>
</html>
