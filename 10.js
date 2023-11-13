/**
 * Функция парсинга строки JSON 
 * 
 * @param {string} arg Строка JSON 
 * @return {*} Результат любого типа, распарсенный из JSON
 */

const fromJSON = (arg) => {
    let index = 0; // Начальный индекс, который передвигается по строке arg, пока не достигнет конца
    function mainParse() {
        if (/"/.test(arg[index])) {  // Если аргумент является строкой
            return JSONtoString(); 
        } else if (/[0-9]|-/.test(arg[index])) { // Если аргумент является числом
            let numberStr = ''; 
            while (/[0-9\-\.]/.test(arg[index])) { 
                numberStr += arg[index]; 
                index++;
            }
            const number = parseFloat(numberStr); 
            if (!isNaN(number)) return number; 
        } else if (/{/.test(arg[index])) { // Если аргумент является объектом
            const obj = {}; 
            index++; 
            while (arg[index] !== '}') { 
                const key = JSONtoString(); 
                index++; 
                const value = mainParse(); 
                obj[key] = value; 
                if (arg[index] === ',') {
                    index++; 
                }
            }
            index++; 
            return obj; 
        } else if (/\[/.test(arg[index])) {  // Если аргумент является массивом
            const arr = []; 
            index++; 
            while (arg[index] !== ']') { 
                const value = mainParse(); 
                arr.push(value); 
                if (arg[index] === ',') {
                    index++; 
                }
            }
            index++; 
            return arr; 
        } else if (/t/.test(arg[index])) { // Если аргумент является true
            const trueStr = arg.substr(index, 4); 
            if (trueStr === 'true') {
                index += 4; 
                return true; 
            } 
        } else if (/f/.test(arg[index])) { // Если аргумент является false
            const falseStr = arg.substr(index, 5); 
            if (falseStr === 'false') {
                index += 5; 
                return false; 
            } 
        } else if (/n/.test(arg[index])) { // Если аргумент является null
            const nullStr = arg.substr(index, 4); 
            if (nullStr === 'null') {
                index += 4; 
                return null; 
            } 
        } 
    }

    function JSONtoString() {
        let value = ''; 
        index++; 
        while (!/"/.test(arg[index])) { 
            value += arg[index]; 
            index++;
        }
        index++; 
        return value; 
    }

    try {
        const value = mainParse(); 
        while (/[\s\n\t\r]/.test(arg[index])) { // Пропустить пустые места в строке
            index++; 
        }
        return value; 
    } catch (error) {
        throw new Error(`Ошибка: ${error.message}`); 
    }
}

// Пример:

const arg = '[1,"aaa",null,{"a":null,"b":-10000}]';
console.log(fromJSON(arg));