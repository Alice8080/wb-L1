const input = document.getElementById('password');
const button = document.getElementById('password-check');
const errorMessages = document.querySelector('.input-errors');
const difficultyMessage = document.querySelector('.difficulty');

function passwordCheck(input) { // Функция, которая оценивает сложность введенного пользователем пароля
    let errorsCount = 0; // Текущее количество ошибок в пароле
    const show = (id, text) => { // Показать подсказку по ошибке и увеличить errorsCount
        if (!document.getElementById(id)) {
            const error = document.createElement('p');
            error.id = id;
            error.textContent = text;
            errorMessages.appendChild(error);
            errorsCount++;
        }
    };
    const hide = (id) => { // Скрыть подсказку по ошибке и уменьшить errorsCount
        const error = document.getElementById(id);
        errorMessages.removeChild(error);
        errorsCount--;
    };
    const checkDifficulty = (errorsCount) => { 
        // Сложность пароля зависит от количества ошибок: 
        // 0 ошибок = 100% сложность, 4 ошибки (максимум) = 0% сложность
        const difficulty = {
            '0': {
                backgroundColor: '#0d8a0b',
                percent: '100',
            },
            '1': {
                backgroundColor: '#ceab11',
                percent: '75',
            },
            '2': {
                backgroundColor: '#e55f00',
                percent: '50',
            },
            '3': {
                backgroundColor: '#e51700',
                percent: '25',
            },
            '4': {
                backgroundColor: '#c00000',
                percent: '0',
            }
        };
        const currentDifficulty = difficulty[errorsCount];
        difficultyMessage.style.backgroundColor = currentDifficulty.backgroundColor;
        difficultyMessage.textContent = `Сложность пароля: ${currentDifficulty.percent}%`;
    }
    // Массив ошибок, где для каждого типа указан id, текст ошибки и метод testPassed, который возвращает true, если пароль проходит тест на эту ошибку, иначе false
    const errors = [
        {
            id: 'length-error',
            text: 'Пароль должен быть минимум 8 символов',
            testPassed(value) {
                return value.length >= 8;
            },
        },
        {
            id: 'register-error',
            text: 'В пароле должны быть как заглавные, так и строчные латинские буквы',
            testPassed(value) {
                return /[A-Z]/.test(value) && /[a-z]/.test(value);
            }
        },
        {
            id: 'character-error',
            text: 'Пароль должен содержать один из символов ! " # $ % & ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~',
            testPassed(value) {
                return /[!"#$%&()*+,-./:;<=>?@\[\]^_`{|}\~\\]/.test(value);
            }
        },
        {
            id: 'number-error',
            text: 'Пароль должен содержать как минимум одну цифру',
            testPassed(value) {
                return /[0-9]/.test(value);
            }
        }
    ];
    input.addEventListener('input', (e) => { 
        // Устанавливаем слушатель событий на input, чтобы показывать и скрывать подсказки в соответствии со значением input
        const value = input.value;
        for (let error of errors) {
            if (error.testPassed(value) && document.getElementById(error.id)) {
                hide(error.id); // Если тест на ошибку пройден и подсказка по данной ошибке все еще отображается, скрыть подсказку 
            } else if (!error.testPassed(value)) {
                show(error.id, error.text); // Если тест не пройден, показать подсказку
            }
        }
        checkDifficulty(errorsCount); // Отобразить текущую сложность пароля
    });

    button.addEventListener('click', () => {
        const value = input.value;
        for (let error of errors) {
            if (!error.testPassed(value)) { // Для каждого типа ошибок проверяем, проходит ли пароль тест по нему 
                show(error.id, error.text); // Если не проходит, то показываем подсказку
            }
        }
        checkDifficulty(errorsCount);  // Отобразить текущую сложность пароля
    });
}

passwordCheck(input, button);