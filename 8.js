/**
 * Функция, которая будет принимает массив функций и возвращает новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции
 * 
 * @param {function[]} array Массив синхронных или асинхронных функций
 * @return {[]} 
 */

const solution = (array) => {
    return function () {
        Promise.all(array.map((func) => func())).then((results) =>
            console.log(results)
        );
    }
}

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

const func = solution(array);
func();