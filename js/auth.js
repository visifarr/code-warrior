// Система аутентификации Code Warrior

class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.init();
    }
    
    loadUsers() {
        const users = localStorage.getItem('codeWarriorUsers');
        return users ? JSON.parse(users) : [];
    }
    
    saveUsers() {
        localStorage.setItem('codeWarriorUsers', JSON.stringify(this.users));
    }
    
    init() {
        this.setupEventListeners();
        this.checkAutoLogin();
    }
    
    setupEventListeners() {
        // Форма входа
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }
        
        // Форма регистрации
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.register();
            });
        }
        
        // Демо вход
        const demoBtn = document.getElementById('demo-login');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.demoLogin();
            });
        }
        
        // Восстановление пароля
        const forgotLink = document.querySelector('.forgot-link');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPasswordReset();
            });
        }
    }
    
    checkAutoLogin() {
        const savedUser = localStorage.getItem('codeWarriorCurrentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                const remember = localStorage.getItem('rememberLogin') === 'true';
                if (remember && this.currentUser) {
                    this.redirectToLobby();
                }
            } catch (e) {
                console.error('Ошибка загрузки пользователя:', e);
            }
        }
    }
    
    login() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember')?.checked;
        
        if (!email || !password) {
            this.showMessage('Заполните все поля', 'error');
            return;
        }
        
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            this.showMessage('Пользователь не найден', 'error');
            return;
        }
        
        if (user.password !== this.hashPassword(password)) {
            this.showMessage('Неверный пароль', 'error');
            return;
        }
        
        this.currentUser = user;
        
        // Сохраняем данные сессии
        localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
        if (remember) {
            localStorage.setItem('rememberLogin', 'true');
        }
        
        this.showMessage('Успешный вход!', 'success');
        setTimeout(() => {
            this.redirectToLobby();
        }, 1000);
    }
    
    register() {
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        const terms = document.getElementById('terms').checked;
        
        // Валидация
        if (!username || !email || !password || !confirmPassword) {
            this.showMessage('Заполните все поля', 'error');
            return;
        }
        
        if (!terms) {
            this.showMessage('Примите условия использования', 'error');
            return;
        }
        
        if (username.length < 3 || username.length > 20) {
            this.showMessage('Имя должно быть от 3 до 20 символов', 'error');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showMessage('Введите корректный email', 'error');
            return;
        }
        
        if (password.length < 8) {
            this.showMessage('Пароль должен быть не менее 8 символов', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('Пароли не совпадают', 'error');
            return;
        }
        
        // Проверка на существующего пользователя
        if (this.users.some(u => u.email === email)) {
            this.showMessage('Пользователь с таким email уже существует', 'error');
            return;
        }
        
        if (this.users.some(u => u.username === username)) {
            this.showMessage('Такое имя пользователя уже занято', 'error');
            return;
        }
        
        // Создание нового пользователя
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: this.hashPassword(password),
            coins: 500, // Стартовый бонус
            hints: 3, // Стартовые подсказки
            level: 1,
            rank: 'Новичок',
            totalScore: 0,
            streak: 0,
            registrationDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            achievements: [],
            inventory: [],
            settings: {
                sound: true,
                music: true,
                notifications: true
            }
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        this.currentUser = newUser;
        localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(newUser));
        
        this.showMessage('Регистрация успешна! Добро пожаловать!', 'success');
        setTimeout(() => {
            this.redirectToLobby();
        }, 1500);
    }
    
    demoLogin() {
        // Создаем демо-пользователя если его нет
        const demoUser = {
            id: 'demo',
            username: 'Демо-Игрок',
            email: 'demo@codewarrior.com',
            password: this.hashPassword('demo123'),
            coins: 1000,
            hints: 5,
            level: 1,
            rank: 'Демо',
            totalScore: 0,
            streak: 0,
            registrationDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            achievements: [],
            inventory: [],
            settings: {
                sound: true,
                music: true,
                notifications: true
            }
        };
        
        // Добавляем демо-пользователя если его нет в системе
        const existingDemo = this.users.find(u => u.id === 'demo');
        if (!existingDemo) {
            this.users.push(demoUser);
            this.saveUsers();
        }
        
        this.currentUser = demoUser;
        localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(demoUser));
        
        this.showMessage('Демо-режим активирован', 'info');
        setTimeout(() => {
            this.redirectToLobby();
        }, 1000);
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('codeWarriorCurrentUser');
        localStorage.removeItem('rememberLogin');
        window.location.href = 'index.html';
    }
    
    redirectToLobby() {
        window.location.href = 'lobby.html';
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    hashPassword(password) {
        // Простое хеширование для демо-версии
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    showMessage(text, type = 'info') {
        // Удаляем предыдущие сообщения
        const existingMessages = document.querySelectorAll('.auth-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Создаем новое сообщение
        const message = document.createElement('div');
        message.className = `auth-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 
                               type === 'success' ? 'check-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Стили сообщения
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'rgba(255, 82, 82, 0.9)' :
                          type === 'success' ? 'rgba(0, 212, 170, 0.9)' :
                          type === 'warning' ? 'rgba(255, 183, 77, 0.9)' : 'rgba(108, 99, 255, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(message);
        
        // Автоматическое скрытие
        setTimeout(() => {
            message.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    showPasswordReset() {
        const email = prompt('Введите ваш email для восстановления пароля:');
        if (email) {
            const user = this.users.find(u => u.email === email);
            if (user) {
                alert('Инструкции по восстановлению отправлены на ' + email);
                // В реальном приложении здесь была бы отправка email
            } else {
                alert('Пользователь с таким email не найден');
            }
        }
    }
}

// Инициализация системы аутентификации
window.authSystem = new AuthSystem();

// Добавляем стили для сообщений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .auth-message {
        font-family: 'Roboto', sans-serif;
    }
    
    .auth-message i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);
