let coins = 0;
let hints = 0;

function generateProblem() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    document.getElementById('task').textContent = `${a} + ${b} = ?`;
    return a + b;
}

let correctAnswer = generateProblem();

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        coins += 10;
        document.getElementById('coins').textContent = coins;
        alert('Правильно! +10 монет');
        correctAnswer = generateProblem();
    } else {
        alert('Ошибка!');
    }
}
