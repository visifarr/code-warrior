// Хранение аккаунтов
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (accounts.some(acc => acc.email === email)) {
    alert('Аккаунт уже существует!');
    return;
  }

  accounts.push({ email, password, coins: 0, hints: 0 });
  localStorage.setItem('accounts', JSON.stringify(accounts));
  alert('Регистрация успешна!');
  window.location.href = 'game.html';
}
