const RANKS = {
    5: "Нуб",
    10: "Начинающий",
    15: "Ознакамливающийся",
    20: "Изучающий математику",
    25: "Обративший уравнения в усиления",
    30: "Убивающий время",
    40: "Профессионал в простых примерах",
    50: "Покоряющий новые знания",
    65: "Математический адепт",
    85: "Повелитель чисел",
    100: "Калькулятор в плоти",
    125: "Бог точных наук", 
    150: "Абсолютный математик"
};

function updateRankInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || { level: 1 };
    let currentRank = "Новичок";
    let nextRank = "";
    let progress = 0;

    // Находим текущий и следующий ранг
    for (const [level, rank] of Object.entries(RANKS)) {
        if (user.level >= parseInt(level)) {
            currentRank = rank;
        } else {
            nextRank = `${rank} (${level} уровень)`;
            progress = user.level / parseInt(level) * 100;
            break;
        }
    }

    document.getElementById('current-rank').textContent = `Текущий ранг: ${currentRank}`;
    document.getElementById('next-rank').textContent = nextRank 
        ? `До ${nextRank}: ${user.level}/${nextRank.match(/\d+/)[0]}` 
        : "Максимальный ранг достигнут!";
}
