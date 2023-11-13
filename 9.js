/**
 * Функция конвертации JSON в строку
 * 
 * @param {*} arg Аргумент любого типа, который надо конвертировать в JSON
 * @return {string} Строка JSON
 */

const toString = (arg) => {
    if (typeof arg === 'object' && arg !== null) {
        if (Array.isArray(arg)) {
            let result = '[';
            for (let item of arg) {
                if (typeof item === 'string') {
                    item = `"${item}"`;
                }
                result += `${typeof item === 'function' ? 'null' : toString(item)},`;
            }
            result = result.replace(/,$/, ']');
            return result;
        } else {
            let result = '{';
            for (let [key, value] of Object.entries(arg)) {
                if (typeof value !== 'function') {
                    if (typeof value === 'string') {
                        value = `"${value}"`;
                    }
                    result += `"${key}":${toString(value)},`;
                }
            }
            result = result.replace(/,$/, '}');
            return result;
        }
    } else if (typeof arg === 'function') {
        return 'undefined';
    } else {
        return String(arg);
    }
}

const test = [1, 'aaa', function() { }, {w: function() { }, a: null, b: 1,}]

// Сравнение работы функции toString и JSON.stringify: 
console.log(toString(test)) // [1,"aaa",null,{"a":null,"b":1}]
console.log(JSON.stringify(test)) // [1,"aaa",null,{"a":null,"b":1}]
