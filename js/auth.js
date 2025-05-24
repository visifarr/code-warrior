// Хранение пользователей
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Заполните все поля!');
        return;
    }

    if (accounts.some(acc => acc.email === email)) {
        alert('Аккаунт уже существует!');
        return;
    }

    // Создаем нового пользователя
    const newUser = {
        email,
        password,
        coins: 0,
        hints: 0
    };

    accounts.push(newUser);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Переход в игру
    window.location.href = 'game.html';
}
