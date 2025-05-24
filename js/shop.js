// Проверка авторизации
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Пожалуйста, войдите в аккаунт!');
    window.location.href = 'index.html';
} else {
    // Обновляем данные на странице
    updateShop();
}

// Обновление магазина
function updateShop() {
    document.getElementById('coins').textContent = user.coins || 0;
    document.getElementById('buy-hint').disabled = user.coins < 20;
    document.getElementById('buy-firework').disabled = user.coins < 15;
}

// Покупка подсказки
function buyHint() {
    if (user.coins >= 20) {
        user.coins -= 20;
        user.hints = (user.hints || 0) + 1;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateShop();
        alert('Подсказка куплена!');
    }
}

// Покупка фейерверка
function buyFirework() {
    if (user.coins >= 15) {
        user.coins -= 15;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateShop();
        launchFirework();
        
        // 5% шанс получить подсказку
        if (Math.random() < 0.05) {
            user.hints = (user.hints || 0) + 1;
            localStorage.setItem('currentUser', JSON.stringify(user));
            setTimeout(() => {
                alert('Вам повезло! Фейерверк подарил вам подсказку!');
            }, 1500);
        }
    }
}

// Эффект фейерверка
function launchFirework() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        
        // Случайное направление
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        firework.style.setProperty('--tx', `${tx}px`);
        firework.style.setProperty('--ty', `${ty}px`);
        firework.style.animation = `firework ${0.5 + Math.random()}s forwards`;
        
        document.body.appendChild(firework);
        
        // Удаление после анимации
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}
