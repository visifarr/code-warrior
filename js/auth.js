// Переключение между формами
function showForm(formType) {
    document.getElementById('login-form').style.display = formType === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = formType === 'register' ? 'block' : 'none';
}

// Регистрация нового пользователя
function register() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!email || !password) {
        alert('Заполните все поля!');
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    if (accounts.some(acc => acc.email === email)) {
        alert('Аккаунт с таким email уже существует!');
        return;
    }

    const newUser = {
        email,
        password,
        coins: 0,
        hints: 0
    };

    accounts.push(newUser);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    window.location.href = 'game.html';
}

// Вход в аккаунт
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = accounts.find(acc => acc.email === email && acc.password === password);

    if (!user) {
        alert('Неверный email или пароль!');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'game.html';
}

// При загрузке страницы показываем форму входа
showForm('login');
