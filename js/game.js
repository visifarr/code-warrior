// NEW: Генерация задач по сложности
function generateProblem(difficulty) {
    let a, b, op, time;
    
    switch(difficulty) {
        case 'medium': // Уравнения
            a = Math.floor(Math.random() * 15) + 1;
            b = Math.floor(Math.random() * 15) + 1;
            op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            break;
            
        case 'hard': // С делением
            b = Math.floor(Math.random() * 10) + 1;
            a = b * (Math.floor(Math.random() * 10) + 1);
            op = ['*', '/'][Math.floor(Math.random() * 2)];
            break;
            
        case 'timed': // Для режима на время
            const ops = ['+', '-', '*', '/'];
            op = ops[Math.floor(Math.random() * ops.length)];
            // ... (генерация чисел в зависимости от операции)
            break;
            
        default: // Обычный режим
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            op = Math.random() > 0.7 ? '*' : '+';
    }
    
    // ... (остальная логика генерации)
}

// NEW: Проверка уровня для сложности
function checkDifficultyLock() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.querySelector('[data-diff="medium"]').classList.toggle('locked', user.level < 25);
    document.querySelector('[data-diff="hard"]').classList.toggle('locked', user.level < 50);
}
