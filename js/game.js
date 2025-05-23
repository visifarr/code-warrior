// Генерация примера
function generateProblem() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  document.getElementById('task').textContent = `${a} + ${b} = ?`;
  return a + b; // Возвращаем правильный ответ
}

let correctAnswer = generateProblem();

// Проверка ответа
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  if (userAnswer === correctAnswer) {
    alert('Правильно! +10 монет');
    // Обновляем монеты
    const coins = parseInt(document.getElementById('coins').textContent);
    document.getElementById('coins').textContent = coins + 10;
  } else {
    alert('Ошибка! Попробуйте ещё.');
  }
  correctAnswer = generateProblem(); // Новый пример
}
