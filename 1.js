/**
 * 
 * Исходная строка в нижнем регистре сравнивается с этой же строкой, которую
 * преобразовали в массив (split('')), развернули (reverse()) и преобразовали обратно в строку (join(''))
 *
 * @param {string} str Строка, которую надо проверить на палиндром
 * @return {boolean}  Возвращается true, если строка равна своему развернутому варианту, иначе false
 */

const solution = (str) => { 
    str = str.toLowerCase(); // строка приводится к нижнему регистру 
    return str === str.split('').reverse().join('');
}