// Функція реєстрації користувача
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const bio = document.getElementById('bio').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        alert('Цей логін вже зайнятий!');
        return;
    }

    const user = { name, age, gender, bio, password, username, iqScore: 0, interests: [] };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Реєстрація успішна!');
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('iqTest').style.display = 'block';
});

// Функція для проходження тесту IQ
document.getElementById('iqForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let iqScore = 0;

    // Перевірка на питання IQ
    if (document.getElementById('iqQuestion1').value.trim() === '8') iqScore++;
    if (document.getElementById('iqQuestion2').value.trim() === 'Миша') iqScore++;
    if (document.getElementById('iqQuestion3').value.trim() === '9') iqScore++;
    if (document.getElementById('iqQuestion4').value.trim().toLowerCase() === 'так') iqScore++;
    if (document.getElementById('iqQuestion5').value.trim().toLowerCase() === 'в') iqScore++;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[users.length - 1]; // Останній зареєстрований користувач
    currentUser.iqScore = iqScore;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Тест IQ пройдено! Ваш бал: ' + iqScore);
    document.getElementById('iqTest').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
});

// Функція для обчислення сумісності
function calculateCompatibility(user1, user2) {
    const ageDifference = Math.abs(user1.age - user2.age);
    const iqDifference = Math.abs(user1.iqScore - user2.iqScore);
    const commonInterests = user1.interests.filter(interest => user2.interests.includes(interest)).length;

    let compatibility = 0;
    if (ageDifference <= 3) compatibility += 30;
    if (iqDifference <= 2) compatibility += 40;
    if (commonInterests >= 3) compatibility += 30;

    return compatibility;
}
