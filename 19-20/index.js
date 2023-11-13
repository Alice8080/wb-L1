import { main, storageInfo } from "./functions.js";

const widget = document.querySelector('.widget'); // Элемент виджета
const postsList = document.querySelector('.posts'); // Список всех постов
window.addEventListener('storage', storageInfo);
widget.addEventListener('scroll', () => {
    if (postsList.clientHeight <= widget.scrollTop + widget.clientHeight) {
        main(); // Загрузить новые посты, если загруженные прокручены до конца
    }
});
main(); // Загрузка постов