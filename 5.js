/**
 * Функция преобразования JSON в связный список
 * 
 * @param {string} json JSON, содержащий массив объектов
 * @return {object} Объект, представляющий из себя односвязный список.
 */

const solution = (json) => {
    const array = JSON.parse(json);
    const result = {};
    const end = array.splice(array.length - 1, 1)[0];
    let nextValue = { // Шаблон для каждого следующего значения связного списка
        val: end,
        next: null
    };
    while (array.length > 0) { // Пока массив не пуст, удаляем объекты из него и добавляем в связный список
        result['val'] = array.splice(array.length - 1, 1)[0];
        result['next'] = nextValue;
        nextValue = JSON.parse(JSON.stringify(result)); // Копируем объект с помощью JSON (т.к. необходимо глубокое копирование)
    }
    return result;
}

// Пример:

let json = [
    { index: 0 },
    { index: 1 },
    { index: 2 },
    { index: 3 },
];
json = JSON.stringify(json);
console.log(solution(json)); // {"val":{"index":0},"next":{"val":{"index":1},"next":{"val":{"index":2},"next":{"val":{"index":3},"next":null}}}}