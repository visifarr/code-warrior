// Проверка авторизации
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Пожалуйста, зарегистрируйтесь!');
    window.location.href = 'index.html';
} else {
    document.getElementById('coins').textContent = user.coins;
}

// Логика магазина
function buyHint() {
    if (user.coins >= 20) {
        user.coins -= 20;
        user.hints += 1;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coins').textContent = user.coins;
        alert(`Куплено! Теперь у вас ${user.hints} подсказок.`);
    } else {
        alert('Недостаточно монет!');
    }
}
