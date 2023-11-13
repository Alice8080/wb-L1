/**
 * Функция, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено
 * 
 * @param {string} url 
 * @return {Promise} 
 */


async function solution (url) {
    return await fetch(url)
        .then((result) => result.json())
        .catch((error) => error);
};

// Пример:

const url = 'https://random.dog/woof.json'
let response = await solution(url);
console.log(response);