const MathX = (function () {
    const cacheFib = []; // Кеш чисел Фибоначчи
    let cache = []; // Булевый массив: индексы, которые являются простыми числами, содержат true, иначе false
    let cacheNumbers = []; // Кеш простых чисел

    return {
        fib(n) { // Вычисление N-го числа в ряду Фибоначчи
            if (cacheFib[n] === undefined) { // Если искомое число еще не в кеше, рекурсивно заполняем кеш числами до него:
                if (n <= 1) {
                    cacheFib[n] = n; // Если n === 0 || n === 1, то записываем в кеш под индексом, равным n
                } else {
                    cacheFib[n] = this.fib(n - 2) + this.fib(n - 1); // Следующее число в кеше вычисляем как сумму 2-х предыдущих
                }
            }
            return cacheFib[n]; 
        },
        fibNumbers(n) { // Вычисление всех чисел в ряду Фибоначчи до числа N
            let p = 1;
            if (cacheFib[cacheFib.length - 1] < n || cacheFib.length === 0) { // Если последнее число меньше n или в кеше нет чисел:
                while (this.fib(p) < n) { // Пока последнее число в кеше меньше n, продолжаем заполнять кеш
                    p++;
                };
            }
            return cacheFib.filter((i) => i <= n); // Возвращаем все числа не больше n
        },
        primeNumber(n) { // Вычисление N-го простого числа
            if (cacheNumbers.length < n - 1) { // Если в кеше нет необходимого значения:
                let numsLength;
                let prime;
                let start = !cacheNumbers.length ? 2 : cacheNumbers[cacheNumbers.length - 1];

                NUMBER:
                for (let i = start; (numsLength = cacheNumbers.length) < n; i++) { // Продолжать цикл, пока в кеше меньше n чисел
                    for (let j = 0; j < numsLength; j++) {
                        prime = cacheNumbers[j]; // Записать текущее значение в prime, чтобы проверить, является ли оно простым
                        if (prime > 1 && i % prime == 0) { // Если число i не простое:
                            continue NUMBER; // Прервать текущий цикл, продолжить цикл NUMBER
                        }
                    };
                    cacheNumbers.push(i); // Добавить простое число в кеш
                };
            }
            return cacheNumbers[n - 1]; 
        },
        primeNumbers(n) { // Вычисление всех простых чисел до числа N
            function formatNumbers(array) { // Функция для формирования списка индексов простых чисел из булевого массива
                return array.map((i, index) => {
                    if (i) return index; 
                }).filter((i) => i > 1);
            };
            const lastMax = !cache.length ? 0 : cache.length - 1;
            if (lastMax >= n) { // Если последнее вычисленное максимальное значение не меньше n:
                return cacheNumbers.filter((i) => i <= n); // Возвращаем все числа не больше n
            } else {
                const length = (n + 1) - cache.length; // Вычисляем длину массива добавляемых в кеш значений
                const newItems = new Array(length).fill(true); // Кеш - булевый массив, изначально заполненный значениями true
                cache = cache.concat(newItems); // Если кеш пустой, добавляем все новые значения в него, иначе добавляем к старым новые значения

                // С помощью алгоритма Решето Эратосфена проходимся по кешу
                // Начинаем с i = 2, первого простого числа
                for (let i = 2; i ** 2 <= n; i++) {
                    if (cache[i]) { // Если это число отмечено, как простое:
                        // Определяем коэффициент, на который надо умножить i: 
                        // Если общий делитель i и lastMax (Math.floor(lastMax / i)) больше i, то i умножается на него
                        // Иначе начинаем с i в квадрате
                        // Числа меньше индекса start и при этом кратные i имеют простой делитель меньше текущего i, 
                        // поэтому уже отмечены как не простые
                        const multiplier = Math.max(i, Math.floor(lastMax / i));
                        let start = multiplier * i;
                        // Если последнее сохраненное значение больше начального индекса, к нему можно прибавить i и начать проверку с этого индекса,
                        // т.к. индекс, который равен multiplier * i, уже проверен в прошлом вызове функции
                        if (lastMax >= start) start += i;
                        for (let j = start; j <= n; j += i) {  // Проходимся по индексам, кратным i, т.е. не простым числам
                            cache[j] = false; // Отмечаем значение по каждому не простому индексу как false
                        }
                    }
                } // Останавливаем цикл, когда i в квадрате становится больше n, т.е. все значения проверены
                cacheNumbers = formatNumbers(cache); // Из кеша формируем массив индексов простых чисел
                return cacheNumbers; // Возвращаем индексы простых чисел
            }
        }
    }
})();

// Пример:

let n = 10 ** 2; 
console.log(`${n}-е число Фибоначчи:`, MathX.fib(n));
console.log(`Числа Фибоначчи до ${n}:`, MathX.fibNumbers(n));
console.log(`${n}-е простое число:`, MathX.primeNumber(n));
console.log(`Простые числа до ${n}:`, MathX.primeNumbers(n));

// Оптимизация: алгоритмы работают быстро для больших данных и используют кеширование благодаря замыканиям:
n = 10 ** 7;
console.log(`Числа Фибоначчи до ${n}:`, MathX.fibNumbers(n));
console.log(`Простые числа до ${n}:`, MathX.primeNumbers(n));