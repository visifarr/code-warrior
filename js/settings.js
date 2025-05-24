const PROMO_CODES = {
    "777": { coins: 500, hints: 0, emoji: "💰" },
    "noob": { coins: 0, hints: 5, emoji: "🎓" }
};

function applyPromoCode() {
    const code = document.getElementById('promo-code').value.trim();
    const promo = PROMO_CODES[code];
    
    if (!promo) {
        alert("❌ Неверный промокод!");
        return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.coins += promo.coins;
    user.hints += promo.hints;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert(`${promo.emoji} Получено: ${promo.coins} монет и ${promo.hints} подсказок`);
}
