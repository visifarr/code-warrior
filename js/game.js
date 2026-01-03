// Дополнительные функции игры

// Генерация сложных примеров
function generateColumnProblem(operation) {
    let num1, num2;
    
    switch(operation) {
        case 'addition':
            num1 = Math.floor(Math.random() * 1000) + 100;
            num2 = Math.floor(Math.random() * 1000) + 100;
            return {
                type: 'column',
                num1,
                num2,
                operator: '+',
                answer: num1 + num2,
                display: `${num1}\n+ ${num2}\n______`
            };
            
        case 'subtraction':
            num1 = Math.floor(Math.random() * 1000) + 500;
            num2 = Math.floor(Math.random() * 500) + 100;
            if (num1 < num2) [num1, num2] = [num2, num1];
            return {
                type: 'column',
                num1,
                num2,
                operator: '-',
                answer: num1 - num2,
                display: `${num1}\n- ${num2}\n______`
            };
            
        case 'multiplication':
            num1 = Math.floor(Math.random() * 100) + 10;
            num2 = Math.floor(Math.random() * 10) + 2;
            return {
                type: 'column',
                num1,
                num2,
                operator: '×',
                answer: num1 * num2,
                display: `${num1}\n× ${num2}\n______`
            };
            
        case 'division':
            num2 = Math.floor(Math.random() * 10) + 2;
            num1 = num2 * (Math.floor(Math.random() * 20) + 5);
            return {
                type: 'division',
                num1,
                num2,
                operator: '÷',
                answer: num1 / num2,
                display: `${num1} ÷ ${num2} = ?`
            };
    }
}

// Система достижений
const achievements = {
    firstGame: {
        id: 'firstGame',
        name: 'Первая игра',
        description: 'Сыграйте первую игру',
        reward: 100,
        condition: (user) => user.gamesPlayed >= 1
    },
    mathMaster: {
        id: 'mathMaster',
        name: 'Мастер математики',
        description: 'Решите 100 примеров',
        reward: 500,
        condition: (user) => user.totalSolved >= 100
    },
    streakKing: {
        id: 'streakKing',
        name: 'Король серий',
        description: 'Серия из 10 правильных ответов',
        reward: 250,
        condition: (user) => user.bestStreak >= 10
    },
    dailyPlayer: {
        id: 'dailyPlayer',
        name: 'Ежедневный игрок',
        description: 'Играйте 7 дней подряд',
        reward: 300,
        condition: (user) => user.streak >= 7
    },
    coinCollector: {
        id: 'coinCollector',
        name: 'Коллекционер монет',
        description: 'Соберите 5000 монет',
        reward: 1000,
        condition: (user) => user.totalCoins >= 5000
    }
};

// Проверка достижений
function checkAchievements(user) {
    const unlocked = [];
    
    for (const [key, achievement] of Object.entries(achievements)) {
        if (!user.achievements?.includes(key) && achievement.condition(user)) {
            unlocked.push({
                ...achievement,
                coins: user.coins || 0
            });
            
            user.achievements = [...(user.achievements || []), key];
            user.coins = (user.coins || 0) + achievement.reward;
        }
    }
    
    return unlocked;
}

// Система подсказок
class HintSystem {
    constructor() {
        this.hints = {
            firstDigit: {
                name: 'Первая цифра',
                cost: 50,
                apply: (answer) => {
                    const str = answer.toString();
                    return `Первая цифра: ${str[0]}`;
                }
            },
            middleDigit: {
                name: 'Цифра в середине',
                cost: 100,
                apply: (answer) => {
                    const str = answer.toString();
                    const mid = Math.floor(str.length / 2);
                    return `Цифра в середине: ${str[mid]}`;
                }
            },
            lastDigit: {
                name: 'Последняя цифра',
                cost: 75,
                apply: (answer) => {
                    const str = answer.toString();
                    return `Последняя цифра: ${str[str.length - 1]}`;
                }
            },
            lengthHint: {
                name: 'Длина ответа',
                cost: 25,
                apply: (answer) => {
                    const str = answer.toString();
                    return `Ответ состоит из ${str.length} цифр`;
                }
            },
            fiftyFifty: {
                name: '50/50',
                cost: 150,
                apply: (answer, wrongAnswers) => {
                    // Убираем два неверных варианта
                    const remaining = [answer, ...wrongAnswers]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 2);
                    return `Варианты: ${remaining.join(' или ')}`;
                }
            }
        };
    }
    
    getHint(type, answer, wrongAnswers = []) {
        const hint = this.hints[type];
        if (!hint) return null;
        
        return {
            text: hint.apply(answer, wrongAnswers),
            cost: hint.cost
        };
    }
    
    canAfford(user, hintType) {
        const hint = this.hints[hintType];
        return user.coins >= hint.cost;
    }
}

// Экспорт систем
window.hintSystem = new HintSystem();
window.gameAchievements = achievements;

// Вспомогательные функции
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateAccuracy(correct, total) {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function getRandomOperation(includeDivision = false) {
    const operations = ['+', '-', '×'];
    if (includeDivision) operations.push('÷');
    return operations[Math.floor(Math.random() * operations.length)];
}

// Сохранение результатов игры
function saveGameResults(results) {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    gameHistory.push({
        ...results,
        date: new Date().toISOString(),
        timestamp: Date.now()
    });
    
    // Сохраняем только последние 100 игр
    if (gameHistory.length > 100) {
        gameHistory.shift();
    }
    
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    
    // Обновляем статистику пользователя
    const user = JSON.parse(localStorage.getItem('codeWarriorCurrentUser'));
    if (user) {
        user.gamesPlayed = (user.gamesPlayed || 0) + 1;
        user.totalSolved = (user.totalSolved || 0) + results.correct;
        user.totalCoins = (user.totalCoins || 0) + results.coins;
        user.bestStreak = Math.max(user.bestStreak || 0, results.streak);
        
        // Проверяем ежедневную серию
        const today = new Date().toDateString();
        const lastPlayed = user.lastPlayedDate;
        if (lastPlayed === today) {
            // Уже играл сегодня
        } else if (lastPlayed === getYesterday()) {
            user.streak = (user.streak || 0) + 1;
        } else {
            user.streak = 1;
        }
        user.lastPlayedDate = today;
        
        localStorage.setItem('codeWarriorCurrentUser', JSON.stringify(user));
    }
}

function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    const user = localStorage.getItem('codeWarriorCurrentUser');
    if (!user && window.location.pathname.includes('game')) {
        window.location.href = 'index.html';
    }
    
    // Инициализация звуков
    initSounds();
});

function initSounds() {
    // Инициализация звуковой системы
    window.gameSounds = {
        correct: new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ='),
        wrong: new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ='),
        click: new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=')
    };
    
    // Заглушки для звуков
    Object.values(window.gameSounds).forEach(sound => {
        sound.volume = 0.5;
    });
}
