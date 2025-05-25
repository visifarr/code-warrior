// Список всех достижений
const achievements = [
    {
        id: "fast_learner",
        title: "Быстрый ученик",
        description: "Решите 10 примеров подряд без ошибок",
        reward: 30,
        condition: (user) => user.correctStreak >= 10,
        unlocked: false
    },
    {
        id: "rich",
        title: "Богач",
        description: "Накопите 200 монет",
        reward: 50,
        condition: (user) => user.coins >= 200,
        unlocked: false
    },
    {
        id: "hint_master",
        title: "Мастер подсказок",
        description: "Используйте 5 подсказок",
        reward: 20,
        condition: (user) => user.usedHints >= 5,
        unlocked: false
    },
    {
        id: "timed_challenge",
        title: "Скоростной режим",
        description: "Решите 20 примеров в режиме 'На время'",
        reward: 40,
        condition: (user) => user.timedSolved >= 20,
        unlocked: false
    }
];

// Проверка достижений при каждом действии
function checkAchievements() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    let achievementsUnlocked = 0;

    achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition(user)) {
            achievement.unlocked = true;
            user.coins += achievement.reward;
            showAchievementPopup(achievement);
            achievementsUnlocked++;
        }
    });

    if (achievementsUnlocked > 0) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coins').textContent = user.coins;
    }
}

// Показ уведомления о достижении
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <h3>Достижение разблокировано!</h3>
        <p><strong>${achievement.title}</strong></p>
        <p>${achievement.description}</p>
        <p>+${achievement.reward} монет</p>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('game.html')) {
        checkAchievements();
    }
});
