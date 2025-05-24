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

// Генерация математического примера
function generateProblem() {
    const operations = [
        { symbol: '+', func: (a, b) => a + b },
        { symbol: '-', func: (a, b) => a - b },
        { symbol: '*', func: (a, b) => a * b }
    ];
    
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    
    document.getElementById('task').textContent = `${a} ${op.symbol} ${b} = ?`;
    return op.func(a, b);
}

let correctAnswer = generateProblem();

// Проверка ответа
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    
    if (isNaN(userAnswer)) {
        alert('Введите число!');
        return;
    }

    if (userAnswer === correctAnswer) {
        user.coins += 10;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coins').textContent = user.coins;
        alert('Правильно! +10 монет');
        correctAnswer = generateProblem();
        document.getElementById('answer').value = '';
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
        
        // Показываем часть ответа (первые 2 символа)
        const answerStr = String(correctAnswer);
        const partialAnswer = answerStr.substring(0, 2) + '...';
        alert(`Подсказка: ответ начинается с "${partialAnswer}"`);
    } else {
        alert('У вас нет подсказок!');
    }
}
