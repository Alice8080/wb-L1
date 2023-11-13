/**
 * Функция, которая вызовет каждую функцию в массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции
 * 
 * @param {function[]} array Массив синхронных или асинхронных функций
 * @return {void} 
 */

const solution = (array) => {
    Promise.all(array.map((f, i) => {
        console.log(i);
        return f();
    }));
};

// Пример:

const array = [
    function () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000, 0);
        });
    },
    function () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 200, 1);
        });
    },
    function () {
        return 2;
    },
]

solution(array);

