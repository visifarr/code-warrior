// Промокоды (код: [монеты, подсказки])
const PROMO_CODES = {
    "777": [500, 0],
    "noob": [0, 5]
};

function applyPromoCode() {
    const code = document.getElementById('promo-code').value.trim();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user.usedPromos?.includes(code)) {
        alert("Промокод уже использован!");
        return;
    }

    if (PROMO_CODES[code]) {
        user.coins += PROMO_CODES[code][0];
        user.hints += PROMO_CODES[code][1];
        user.usedPromos = user.usedPromos || [];
        user.usedPromos.push(code);
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Промокод активирован! Получено: ${PROMO_CODES[code][0]} монет и ${PROMO_CODES[code][1]} подсказок`);
    } else {
        alert("Неверный промокод!");
    }
}

function closeModal() {
    document.getElementById('settings-modal').style.display = 'none';
}
