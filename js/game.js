// Проверка авторизации
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Пожалуйста, войдите в аккаунт!');
    window.location.href = 'index.html';
} else {
    // Обновляем данные на странице
    document.getElementById('coins').textContent = user.coins || 0;
    document.getElementById('hints').textContent = user.hints || 0;
}

// Переменные для режима на время
let timeLeft = 0;
let timerInterval = null;
let currentMode = 'normal';
let correctAnswer = generateProblem();

// Генерация математического примера
function generateProblem() {
    const operations = [
        { symbol: '+', func: (a, b) => a + b, time: 10 },
        { symbol: '-', func: (a, b) => a - b, time: 15 },
        { symbol: '*', func: (a, b) => a * b, time: 25 }
    ];
    
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    
    document.getElementById('task').textContent = `${a} ${op.symbol} ${b} = ?`;
    
    // Устанавливаем время для режима на время
    if (currentMode === 'timed') {
        timeLeft = op.time;
        document.getElementById('time-left').textContent = timeLeft;
    }
    
    return op.func(a, b);
}

// Установка режима игры
function setGameMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(mode === 'normal' ? 'Обычный' : 'На время'));
    });
    document.getElementById('timer').style.display = mode === 'timed' ? 'block' : 'none';
    
    if (mode === 'timed') {
        startTimer();
    } else {
        clearInterval(timerInterval);
        generateProblem();
    }
}

// Таймер для режима на время
function startTimer() {
    clearInterval(timerInterval);
    correctAnswer = generateProblem();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Время вышло! Правильный ответ: ${correctAnswer}`);
            startTimer();
        }
    }, 1000);
}

// Проверка ответа
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    
    if (isNaN(userAnswer)) {
        alert('Пожалуйста, введите число!');
        return;
    }

    if (userAnswer === correctAnswer) {
        // Начисляем монеты
        user.coins += currentMode === 'timed' ? 15 : 10; // Бонус за режим на время
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coins').textContent = user.coins;
        
        // Показываем результат
        alert(`Правильно! +${currentMode === 'timed' ? 15 : 10} монет`);
        
        // Генерируем новый пример
        correctAnswer = generateProblem();
        document.getElementById('answer').value = '';
        
        // Перезапускаем таймер (если режим на время)
        if (currentMode === 'timed') {
            startTimer();
        }
    } else {
        alert('Неправильно! Попробуйте ещё раз.');
    }
}

// Использование подсказки
function useHint() {
    if (user.hints > 0) {
        user.hints--;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('hints').textContent = user.hints;
        
        // Показываем часть ответа
        const answerStr = String(correctAnswer);
        const partialAnswer = answerStr.substring(0, Math.ceil(answerStr.length / 2)) + '...';
        alert(`Подсказка: ответ начинается с "${partialAnswer}"`);
    } else {
        alert('У вас нет подсказок! Купите их в магазине.');
    }
}
