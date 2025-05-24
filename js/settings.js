// Список доступных фонов
const backgrounds = [
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(to right, #ff758c, #ff7eb3)',
    'linear-gradient(to right, #a1c4fd, #c2e9fb)',
    'linear-gradient(to right, #84fab0, #8fd3f4)',
    'linear-gradient(to right, #a6c1ee, #fbc2eb)',
    'linear-gradient(to right, #ffecd2, #fcb69f)',
    'radial-gradient(circle, #3a3a3a, #000000)',
    'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
];

// Список доступных шрифтов
const fonts = [
    '"Arial", sans-serif',
    '"Courier New", monospace',
    '"Georgia", serif',
    '"Comic Sans MS", cursive',
    '"Verdana", sans-serif',
    '"Trebuchet MS", sans-serif'
];

// Применение настроек из localStorage
function applySettings() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    // Применяем фон
    if (user.background) {
        document.documentElement.style.setProperty('--bg-color', user.background);
    }
    
    // Применяем шрифт
    if (user.font) {
        document.documentElement.style.setProperty('--font-family', user.font);
    }
}

// Применяем настройки при загрузке страницы
window.addEventListener('DOMContentLoaded', applySettings);
