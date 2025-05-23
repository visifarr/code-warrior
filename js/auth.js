function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Введите почту и пароль!');
    return; // Не даём продолжить, если поля пустые
  }

  // Проверяем, есть ли аккаунт
  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  if (accounts.some(acc => acc.email === email)) {
    alert('Аккаунт уже существует!');
    return;
  }

  // Сохраняем аккаунт
  accounts.push({ email, password, coins: 0, hints: 0 });
  localStorage.setItem('accounts', JSON.stringify(accounts));
  
  // Сохраняем текущего пользователя
  localStorage.setItem('currentUser', JSON.stringify({ email, coins: 0, hints: 0 }));
  
  // Перенаправляем в игру
  window.location.href = 'game.html'; // Теперь переход только после успешной регистрации
}
