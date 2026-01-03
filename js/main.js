// Основной модуль управления игрой

class GameManager {
    constructor() {
        this.currentUser = null;
        this.gameSettings = {};
        this.init();
    }
    
    init() {
        this.loadUser();
        this.loadSettings();
        this.setupGlobalListeners();
    }
    
    loadUser() {
        try {
            const userData = localStorage.getItem('codeWarriorCurrentUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
            }
        } catch (e) {
            console.error('Ошибка загрузки пользователя:', e);
            this.currentUser = null;
        }
    }
    
    loadSettings() {
        try {
            const settings = localStorage.getItem('gameSettings');
            this.gameSettings = settings ? JSON.parse(settings) : {
                sound: true,
                music: true,
                notifications: true,
                vibration: false,
                theme: 'dark'
            };
        } catch (e) {
            console.error('Ошибка загрузки настроек:', e);
            this.gameSettings = {};
        }
    }
    
    saveSettings() {
        localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
    }
    
    setupGlobalListeners() {
        // Глобальная обработка выхода
        document.addEventListener('click', (e) => {
            if (e.target.closest('#global-logout')) {
                e.preventDefault();
                this.logout();
            }
        });
        
        // Обработка промокодов
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'promo-form') {
                e.preventDefault();
                this.activatePromoCode();
            }
        });
    }
    
    updateUserStats(stats) {
        if (!this.currentUser) return;
        
        // Обновляем статистику
        this.currentUser.coins = (this.currentUser.coins || 0) + (stats.coins || 0);
        this.currentUser.totalScore = (this.currentUser.totalScore || 0) + (stats.score || 0);
        this.currentUser.hints = (this.currentUser.hints || 0) + (stats.hints || 0);
        
        // Проверяем повышение уровня
        this.checkLevelUp();
        
        // Обновляем в localStorage
        this.saveUser();
        
        // Обновляем всех пользователей
        this.updateAllUsers();
    }
    
    checkLevelUp() {
        const scoreNeeded = this.currentUser.level * 1000;
        if (this.currentUser.totalScore >= scoreNeeded) {
            this.currentUser.level++;
            this.currentUser.coins += 500; // Бонус за уровень
            
            this.showNotification(`Уровень повышен!`, `Теперь ты ${this.currentUser.level} уровня! +500 монет`);
            
            // Проверяем звание
            this.checkRank();
        }
    }
    
    checkRank() {
        const ranks = [
            { level: 1, name: 'Новичок' },
            { level: 5, name: 'Ученик' },
            { level: 10, name: 'Математик' },
            { level: 20, name: 'Эксперт' },
            { level: 30, name: 'Мастер' },
            { level: 40, name: 'Гений' },
            { level: 50, name: 'Легенда' }
        ];
        
        for (let i = ranks.length - 1; i >= 0; i--) {
            if (this.currentUser.level >= ranks[i].level) {
                if (this.currentUser.rank !== ranks[i].name) {
                    const oldRank = this.currentUser.rank;
                    this.currentUser.rank = ranks[i].name;
                    
                    this.showNotification(`Новое звание!`, `Поздравляем! Ты теперь ${ranks[i].name} (было ${oldRank})`);
                }
                break;
            }
        }
    }
    
    saveUser() {
        if (this.currentUser) {
            this.currentUser.lastLogin = new Date().toISOString();
            localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(this.currentUser));
        }
    }
    
    updateAllUsers() {
        if (!this.currentUser) return;
        
        try {
            const allUsers = JSON.parse(localStorage.getItem('codeWarriorUsers') || '[]');
            const index = allUsers.findIndex(u => u.id === this.currentUser.id);
            
            if (index !== -1) {
                allUsers[index] = this.currentUser;
                localStorage.setItem('codeWarriorUsers', JSON.stringify(allUsers));
            }
        } catch (e) {
            console.error('Ошибка обновления всех пользователей:', e);
        }
    }
    
    activatePromoCode() {
        const input = document.getElementById('promo-input');
        if (!input) return;
        
        const code = input.value.trim().toUpperCase();
        const promo = this.getPromoCode(code);
        
        if (!promo) {
            this.showMessage('Неверный промокод', 'error');
            return;
        }
        
        if (promo.used) {
            this.showMessage('Этот промокод уже использован', 'warning');
            return;
        }
        
        // Активация промокода
        this.applyPromoReward(promo);
        promo.used = true;
        this.saveUsedPromoCodes();
        
        input.value = '';
        this.showMessage(`Промокод активирован! ${promo.rewardText}`, 'success');
    }
    
    getPromoCode(code) {
        const promoList = this.getPromoCodes();
        return promoList.find(p => p.code === code);
    }
    
    getPromoCodes() {
        const used = JSON.parse(localStorage.getItem('usedPromoCodes') || '[]');
        
        const allPromos = [
            {
                code: 'WELCOME2024',
                type: 'coins',
                amount: 500,
                hints: 5,
                rewardText: '+500 монет и +5 подсказок',
                used: used.includes('WELCOME2024')
            },
            {
                code: 'MATHKING',
                type: 'coins',
                amount: 1000,
                rewardText: '+1000 монет',
                used: used.includes('MATHKING')
            },
            {
                code: 'BRAINBOOST',
                type: 'hints',
                amount: 10,
                rewardText: '+10 подсказок',
                used: used.includes('BRAINBOOST')
            },
            {
                code: 'FIRESTARTER',
                type: 'fireworks',
                amount: 5,
                rewardText: '+5 фейерверков',
                used: used.includes('FIRESTARTER')
            },
            {
                code: 'STUDENT100',
                type: 'coins',
                amount: 1000,
                rewardText: '+1000 монет (для студентов)',
                used: used.includes('STUDENT100')
            }
        ];
        
        return allPromos;
    }
    
    applyPromoReward(promo) {
        if (!this.currentUser) return;
        
        switch(promo.type) {
            case 'coins':
                this.currentUser.coins += promo.amount;
                break;
            case 'hints':
                this.currentUser.hints += promo.amount;
                break;
            case 'fireworks':
                this.currentUser.fireworks = (this.currentUser.fireworks || 0) + promo.amount;
                break;
        }
        
        this.saveUser();
        this.updateAllUsers();
    }
    
    saveUsedPromoCodes() {
        const promos = this.getPromoCodes();
        const used = promos.filter(p => p.used).map(p => p.code);
        localStorage.setItem('usedPromoCodes', JSON.stringify(used));
    }
    
    logout() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            this.currentUser = null;
            localStorage.removeItem('codeWarriorCurrentUser');
            window.location.href = 'index.html';
        }
    }
    
    showMessage(text, type = 'info') {
        // Создаем сообщение
        const message = document.createElement('div');
        message.className = `game-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 
                               type === 'success' ? 'check-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Стили
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff5252' :
                          type === 'success' ? '#00d4aa' :
                          type === 'warning' ? '#ffb74d' : '#6c63ff'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(message);
        
        // Автоудаление
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    showNotification(title, text) {
        if (!this.gameSettings.notifications) return;
        
        // В реальном приложении здесь были бы системные уведомления
        console.log(`[Уведомление] ${title}: ${text}`);
        this.showMessage(`${title}: ${text}`, 'info');
    }
}

// Инициализация глобального менеджера
window.gameManager = new GameManager();

// Добавляем глобальные стили для анимаций
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .game-message {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
`;
document.head.appendChild(globalStyles);
