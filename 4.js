/**
 * @param {n} number Число предметов
 * @param {forms} [] кортеж из трех форм слова в порядке:
 *      1. Именительный падеж единственного числа.
 *      2. Родительный падеж единственного числа.
 *      3. Родительный падеж множественного числа.
 * @return {string}  Слово в правильной форме.
 */

function validateEnding(n, cases) {
    n = Math.abs(n) % 100; // Находим остаток от деления на 100
    var units = n % 10; // Находим остаток от деления на 10
    // В зависимости от числа возвращаем правильный падеж
    if (n > 10 && n < 20) return cases[2];
    if (units > 1 && units < 5) return cases[1];
    if (units == 1) return cases[0];
    return cases[2];
}

// Примеры

let n = 5;
console.log(n, validateEnding(n, ['сообщение', 'сообщения', 'сообщений'])); // 5 сообщений
n = 1;
console.log(n, validateEnding(n, ['сообщение', 'сообщения', 'сообщений'])); // 1 сообщение
