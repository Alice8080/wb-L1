/**
 * Функция, которая сортирует массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name
 * 
 * @param {string} json JSON, содержащий массив объектов
 * @return {object} Объект, представляющий из себя односвязный список.
 */

const solution = (array) => {
    // Если a.age - b.age !== 0, то элементы сортируются по параметру age, иначе по параметру name
    array.sort((a, b) => a.age - b.age ? a.age - b.age : a.name.localeCompare(b.name));
    return array;
}

// Пример:

const arr = [
    { name: 'A', age: 50 },
    { name: 'B', age: 10 },
    { name: 'C', age: 25 },
    { name: 'A', age: 25 },
];
console.log(solution(arr));
// [
//     { name: 'B', age: 10 },
//     { name: 'A', age: 25 },
//     { name: 'C', age: 25 },
//     { name: 'A', age: 50 }
//   ]
