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
    document.getElementById('buy-bg').disabled = user.coins < 50;
    document.getElementById('buy-font').disabled = user.coins < 100;
}

// Покупка подсказки
function buyHint() {
    if (user.coins >= 20) {
        user.coins -= 20;
        user.hints = (user.hints || 0) + 1;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateShop();
        alert('Подсказка куплена! Теперь у вас ' + user.hints + ' подсказок.');
    } else {
        alert('Недостаточно монет! Нужно ещё ' + (20 - user.coins) + ' монет.');
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
    } else {
        alert('Недостаточно монет! Нужно ещё ' + (15 - user.coins) + ' монет.');
    }
}

// Покупка фона
function buyBackground() {
    if (user.coins >= 50) {
        user.coins -= 50;
        user.background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateShop();
        alert('Новый фон успешно применён!');
        applySettings();
    } else {
        alert('Недостаточно монет! Нужно ещё ' + (50 - user.coins) + ' монет.');
    }
}

// Покупка шрифта
function buyFont() {
    if (user.coins >= 100) {
        user.coins -= 100;
        user.font = fonts[Math.floor(Math.random() * fonts.length)];
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateShop();
        alert('Новый шрифт успешно применён!');
        applySettings();
    } else {
        alert('Недостаточно монет! Нужно ещё ' + (100 - user.coins) + ' монет.');
    }
}

// Запуск фейерверка (5 секунд)
function launchFirework() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900'];
    
    for (let i = 0; i < 100; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.width = `${Math.random() * 6 + 4}px`;
        firework.style.height = firework.style.width;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        firework.style.setProperty('--tx', `${tx}px`);
        firework.style.setProperty('--ty', `${ty}px`);
        
        const duration = 3 + Math.random() * 2;
        firework.style.animation = `firework ${duration}s forwards`;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            firework.remove();
        }, duration * 1000);
    }
}
