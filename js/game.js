// Проверка авторизации
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Пожалуйста, зарегистрируйтесь!');
    window.location.href = 'index.html';
} else {
    document.getElementById('coins').textContent = user.coins;
}

// Логика игры
function generateProblem() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    document.getElementById('task').textContent = `${a} + ${b} = ?`;
    return a + b;
}

let correctAnswer = generateProblem();

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
        alert('Неправильно! Попробуйте ещё.');
    }
}
