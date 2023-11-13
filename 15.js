/**
 * Асинхронная функция, которая использует ключевое слово await для ожидания выполнения других асинхронных операций, и возвращает результат выполнения
 * 
 * @param {function[]} array массив асинхронных функций
 * @return {[]} массив результатов выполнения асинхронных функций
 */

async function solution(array) {
    return await Promise.all(array).then((results) => results);
}

// Пример:

const array = [
    new Promise((resolve, reject) => {
        setTimeout(resolve, 200, 0);
    }),
    new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 1);
    }),
    new Promise((resolve, reject) => {
        setTimeout(resolve, 200, 2);
    })
]

let results = await solution(array);
console.log(results); // [ 0, 1, 2 ]