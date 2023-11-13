/**
 * Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя
 *
 * @param {number} n Число, которое надо проверить
 * @return {boolean}  Возвращается true, если n является странным числом, иначе false
 */

const solution = (n) => {
    let sum = 0;
    for (let i = 1; i <= n / 2; i++) { // Проверяем все потенциальные делители числа n
        if (n % i === 0) { // Если i является делителем числа n:
            sum += i; // Прибавляем к сумме делителей числа
        }
    }
    return sum === n && sum !== 0; // Проверяем, равно ли число n сумме своих делителей
}