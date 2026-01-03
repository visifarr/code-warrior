// Система магазина Code Warrior

class ShopSystem {
    constructor() {
        this.products = this.loadProducts();
        this.inventory = this.loadInventory();
        this.cart = [];
        this.init();
    }
    
    loadProducts() {
        return {
            hints: [
                {
                    id: 'firstDigit',
                    name: 'Первая цифра',
                    description: 'Показывает первую цифру ответа',
                    price: 50,
                    type: 'hint',
                    icon: 'fa-eye'
                },
                {
                    id: 'middleDigit',
                    name: 'Цифра в середине',
                    description: 'Показывает среднюю цифру ответа',
                    price: 100,
                    type: 'hint',
                    icon: 'fa-bullseye'
                },
                {
                    id: 'fiftyFifty',
                    name: 'Подсказка 50/50',
                    description: 'Убирает два неверных варианта',
                    price: 150,
                    type: 'hint',
                    icon: 'fa-check-double'
                },
                {
                    id: 'starterPack',
                    name: 'Набор новичка',
                    description: '5 подсказок каждого типа',
                    price: 500,
                    type: 'hint',
                    icon: 'fa-box',
                    bundle: true
                }
            ],
            boosters: [
                {
                    id: 'doubleCoins',
                    name: '×2 Монеты',
                    description: 'Удваивает монеты за правильные ответы на 1 игру',
                    price: 200,
                    type: 'booster',
                    duration: 1, // в играх
                    icon: 'fa-coins'
                },
                {
                    id: 'extraTime',
                    name: 'Дополнительное время',
                    description: '+30 секунд к таймеру игры',
                    price: 100,
                    type: 'booster',
                    icon: 'fa-clock'
                }
            ],
            cosmetics: [
                {
                    id: 'themeDark',
                    name: 'Темная тема',
                    description: 'Стильная темная тема интерфейса',
                    price: 300,
                    type: 'cosmetic',
                    icon: 'fa-moon'
                },
                {
                    id: 'themeMatrix',
                    name: 'Матричная тема',
                    description: 'Тема в стиле матрицы',
                    price: 500,
                    type: 'cosmetic',
                    icon: 'fa-code'
                }
            ],
            fun: [
                {
                    id: 'firework',
                    name: 'Фейерверк',
                    description: 'Красивый фейерверк на весь экран',
                    price: 50,
                    type: 'fun',
                    icon: 'fa-fire',
                    effect: true
                },
                {
                    id: 'surpriseBox',
                    name: 'Сюрприз-бокс',
                    description: 'Случайная награда от 50 до 500 монет',
                    price: 100,
                    type: 'fun',
                    icon: 'fa-gift',
                    random: true
                }
            ]
        };
    }
    
    loadInventory() {
        const inventory = localStorage.getItem('userInventory');
        return inventory ? JSON.parse(inventory) : [];
    }
    
    saveInventory() {
        localStorage.setItem('userInventory', JSON.stringify(this.inventory));
    }
    
    init() {
        this.setupEventListeners();
        this
