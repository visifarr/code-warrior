// inventory.js

class InventorySystem {
    constructor() {
        this.user = null;
        this.inventory = [];
        this.activeItems = [];
        this.init();
    }
    
    init() {
        this.loadUser();
        this.setupEventListeners();
        this.renderInventory();
    }
    
    loadUser() {
        const userData = localStorage.getItem('codeWarriorCurrentUser');
        if (userData) {
            this.user = JSON.parse(userData);
            this.inventory = this.user.inventory || [];
            this.activeItems = this.user.activeItems || [];
        }
    }
    
    saveUser() {
        if (this.user) {
            this.user.inventory = this.inventory;
            this.user.activeItems = this.activeItems;
            localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(this.user));
        }
    }
    
    setupEventListeners() {
        // Обновляем инвентарь при изменении в localStorage (например, из магазина)
        window.addEventListener('storage', (e) => {
            if (e.key === 'codeWarriorCurrentUser') {
                this.loadUser();
                this.renderInventory();
            }
        });
    }
    
    renderInventory() {
        this.updateStats();
        
        // Если инвентарь пуст, показываем сообщение
        if (this.inventory.length === 0) {
            this.showEmptyInventory();
            return;
        }
        
        // Рендерим все предметы
        this.renderCategory('all', this.inventory);
        
        // Рендерим по категориям
        const categories = {
            hints: this.inventory.filter(item => item.type === 'hint'),
            boosters: this.inventory.filter(item => item.type === 'booster'),
            cosmetics: this.inventory.filter(item => item.type === 'cosmetic'),
            fun: this.inventory.filter(item => item.type === 'fun')
        };
        
        for (const [category, items] of Object.entries(categories)) {
            this.renderCategory(category, items);
        }
        
        // Рендерим активные предметы
        this.renderActiveItems();
    }
    
    renderCategory(categoryId, items) {
        const container = document.getElementById(`${categoryId}-items`);
        if (!container) return;
        
        container.innerHTML = '';
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-category">
                    <i class="fas fa-box-open"></i>
                    <p>Здесь пока ничего нет</p>
                </div>
            `;
            return;
        }
        
        items.forEach(item => {
            const itemElement = this.createItemElement(item);
            container.appendChild(itemElement);
        });
    }
    
    createItemElement(item) {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.dataset.itemId = item.id;
        
        let actionButton = '';
        if (item.type === 'booster') {
            actionButton = `
                <button class="btn-primary btn-sm" onclick="inventorySystem.activateItem('${item.id}')">
                    <i class="fas fa-play"></i> Активировать
                </button>
            `;
        } else if (item.type === 'cosmetic') {
            const isEquipped = this.user.equippedCosmetic === item.id;
            actionButton = `
                <button class="${isEquipped ? 'btn-success' : 'btn-primary'} btn-sm" 
                        onclick="inventorySystem.equipItem('${item.id}')">
                    <i class="fas fa-${isEquipped ? 'check' : 'tshirt'}"></i>
                    ${isEquipped ? 'Надето' : 'Надеть'}
                </button>
            `;
        } else {
            actionButton = `
                <button class="btn-secondary btn-sm" onclick="inventorySystem.showItemInfo('${item.id}')">
                    <i class="fas fa-info"></i> Подробнее
                </button>
            `;
        }
        
        div.innerHTML = `
            <div class="item-icon" style="background: ${this.getItemColor(item.type)}">
                <i class="fas ${item.icon || 'fa-question'}"></i>
            </div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.description || ''}</p>
                <div class="item-meta">
                    <span class="item-quantity">Количество: ${item.quantity || 1}</span>
                    ${item.expires ? `<span class="item-expiry">Истекает: ${new Date(item.expires).toLocaleDateString()}</span>` : ''}
                </div>
            </div>
            <div class="item-actions">
                ${actionButton}
            </div>
        `;
        
        return div;
    }
    
    getItemColor(type) {
        const colors = {
            hint: 'linear-gradient(45deg, #00d4aa, #00b894)',
            booster: 'linear-gradient(45deg, #ffb74d, #ff9800)',
            cosmetic: 'linear-gradient(45deg, #ff6584, #ff4081)',
            fun: 'linear-gradient(45deg, #9c27b0, #673ab7)'
        };
        return colors[type] || 'linear-gradient(45deg, #6c63ff, #4a44c6)';
    }
    
    renderActiveItems() {
        const container = document.getElementById('active-items');
        if (!container) return;
        
        if (this.activeItems.length === 0) {
            container.innerHTML = '<p class="text-muted">Нет активных предметов</p>';
            return;
        }
        
        container.innerHTML = '';
        this.activeItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'active-item';
            
            // Рассчитываем оставшееся время/использования
            let remaining = '';
            if (item.durationType === 'time') {
                const endTime = new Date(item.activatedAt).getTime() + (item.duration * 60 * 1000);
                const now = Date.now();
                const minutesLeft = Math.max(0, Math.floor((endTime - now) / 60000));
                remaining = `Осталось: ${minutesLeft} мин`;
            } else {
                remaining = `Осталось: ${item.duration || 1} ${item.duration === 1 ? 'игра' : 'игр'}`;
            }
            
            div.innerHTML = `
                <i class="fas ${item.icon || 'fa-bolt'}" style="color: ${this.getItemIconColor(item.type)}"></i>
                <span>${item.name}</span>
                <small>${remaining}</small>
            `;
            container.appendChild(div);
        });
    }
    
    getItemIconColor(type) {
        const colors = {
            hint: '#00d4aa',
            booster: '#ffb74d',
            cosmetic: '#ff6584',
            fun: '#9c27b0'
        };
        return colors[type] || '#6c63ff';
    }
    
    updateStats() {
        const totalItems = this.inventory.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const statsElement = document.getElementById('total-items');
        if (statsElement) {
            statsElement.textContent = `${totalItems} предметов`;
        }
    }
    
    showEmptyInventory() {
        const emptyElement = document.getElementById('empty-inventory');
        if (emptyElement) {
            emptyElement.style.display = 'flex';
        }
        
        // Скрываем все контейнеры с предметами
        document.querySelectorAll('.items-container').forEach(container => {
            container.innerHTML = '';
            container.style.display = 'none';
        });
    }
    
    activateItem(itemId) {
        const itemIndex = this.inventory.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;
        
        const item = this.inventory[itemIndex];
        
        // Проверяем, можно ли активировать
        if (item.type !== 'booster') {
            this.showMessage('Этот предмет нельзя активировать', 'warning');
            return;
        }
        
        // Уменьшаем количество или удаляем
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            this.inventory.splice(itemIndex, 1);
        }
        
        // Добавляем в активные
        this.activeItems.push({
            ...item,
            duration: item.duration || 1,
            durationType: item.durationType || 'games',
            activatedAt: new Date().toISOString()
        });
        
        this.saveUser();
        this.renderInventory();
        
        this.showMessage(`Усиление "${item.name}" активировано!`, 'success');
    }
    
    equipItem(itemId) {
        const item = this.inventory.find(item => item.id === itemId);
        if (!item) return;
        
        if (item.type !== 'cosmetic') {
            this.showMessage('Этот предмет нельзя надеть', 'warning');
            return;
        }
        
        this.user.equippedCosmetic = itemId;
        this.saveUser();
        this.renderInventory();
        
        this.showMessage(`Косметика "${item.name}" надета!`, 'success');
    }
    
    showItemInfo(itemId) {
        const item = this.inventory.find(item => item.id === itemId);
        if (!item) return;
        
        const info = `
            <strong>${item.name}</strong><br>
            <p>${item.description || 'Нет описания'}</p>
            <hr>
            <small>
                Тип: ${this.getItemTypeName(item.type)}<br>
                Количество: ${item.quantity || 1}<br>
                ${item.obtainedAt ? `Получено: ${new Date(item.obtainedAt).toLocaleDateString()}` : ''}
            </small>
        `;
        
        this.showMessage(info, 'info', 5000);
    }
    
    getItemTypeName(type) {
        const names = {
            hint: 'Подсказка',
            booster: 'Усиление',
            cosmetic: 'Косметика',
            fun: 'Развлечение'
        };
        return names[type] || 'Предмет';
    }
    
    showMessage(text, type = 'info', duration = 3000) {
        // Создаем элемент сообщения
        const message = document.createElement('div');
        message.className = `inventory-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Стили
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00d4aa' :
                          type === 'error' ? '#ff5252' :
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
            max-width: 400px;
        `;
        
        document.body.appendChild(message);
        
        // Автоудаление
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, duration);
    }
    
    // Проверка срока действия предметов
    checkExpiredItems() {
        const now = Date.now();
        let changed = false;
        
        // Проверяем активные предметы
        this.activeItems = this.activeItems.filter(item => {
            if (item.durationType === 'time') {
                const endTime = new Date(item.activatedAt).getTime() + (item.duration * 60 * 1000);
                if (now > endTime) {
                    changed = true;
                    return false;
                }
            }
            return true;
        });
        
        // Проверяем предметы с датой истечения
        this.inventory = this.inventory.filter(item => {
            if (item.expires && new Date(item.expires).getTime() < now) {
                changed = true;
                return false;
            }
            return true;
        });
        
        if (changed) {
            this.saveUser();
            this.renderInventory();
        }
    }
}

// Инициализация системы инвентаря
window.inventorySystem = new InventorySystem();

// Проверяем просроченные предметы при загрузке
document.addEventListener('DOMContentLoaded', () => {
    inventorySystem.checkExpiredItems();
});

// Добавляем стили для анимаций
const inventoryStyles = document.createElement('style');
inventoryStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .inventory-message {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        line-height: 1.5;
    }
    
    .empty-category {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        color: rgba(255, 255, 255, 0.5);
    }
    
    .empty-category i {
        font-size: 3rem;
        margin-bottom: 15px;
        opacity: 0.5;
    }
    
    .item-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-top: 5px;
    }
    
    .item-expiry {
        color: #ffb74d;
    }
`;
document.head.appendChild(inventoryStyles);
