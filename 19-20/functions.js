const preloader = document.querySelector('.preloader'); // Блок загрузки, который отображается, пока загружаются посты
const postsList = document.querySelector('.posts'); // Список всех постов
const MAX_LOCALSTORAGE_SIZE = 5 * 1024 ** 2; // Максимальный размер localStorage (в байтах)
const postsCount = 10; // По сколько постов загружать
let offset = 0; // Отступ от начального количества загрузки для загрузки следующего количества postsCount постов
const VK_API_KEY = ''; // Здесь указать API KEY
const GROUP_ID = '45909075'; // ID группы

export async function main() { // Получение и отображение постов на странице
    preloader.style.display = 'block'; // Показываем индикатор загрузки, пока делаем запрос на сервер
    let response = await fetch(`https://api.vk.com/method/wall.get?owner_id=-${GROUP_ID}&count=${postsCount}&offset=${offset}&access_token=${VK_API_KEY}&v=5.154`) // Получаем посты из ВК
    if (response.ok) {
        let data = await response.json();
        const posts = data.response.items;
        if (posts.length) { // Если количество постов больше 0
            posts.forEach((post) => {
                const postContent = document.createElement('div'); // Создание элемента поста
                postContent.className = 'post';
                postContent.innerHTML = post.text;
                if (post.attachments) {
                    post.attachments.forEach((attachment) => {
                        if (attachment.type === 'photo') { // Если к посту прикреплено фото
                            const attachmentPhoto = attachment.photo;
                            const img = document.createElement('img');
                            img.src = attachmentPhoto.sizes.at(-1).url;
                            postContent.appendChild(img);
                        }
                    });
                }
                if (post.hasOwnProperty('likes')) { // Если у поста есть лайки, отображаем количество лайков и комментариев
                    postContent.innerHTML += `
                    <div class="post-info">
                        <div class="post-likes">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10.5 6.5c.5-2.5 4.343-2.657 6-1c1.603 1.603 1.5 4.334 0 6l-6 6l-6-6a4.243 4.243 0 0 1 0-6c1.55-1.55 5.5-1.5 6 1z"/></svg>
                            ${post.likes.count}
                        </div>
                        <div class="post-comments">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11 16.517c4.418 0 8-3.026 8-6.758C19 6.026 15.418 3 11 3S3 6.026 3 9.759c0 1.457.546 2.807 1.475 3.91L3.5 18.25l3.916-2.447a9.181 9.181 0 0 0 3.584.714z"/><path fill="currentColor" d="M10.999 11c.5 0 1-.5 1-1s-.5-1-1-1S10 9.5 10 10s.499 1 .999 1zm-4 0c.5 0 1-.5 1-1s-.5-1-1-1S6 9.5 6 10s.499 1 .999 1zm8 0c.5 0 1.001-.5 1.001-1s-.5-1-1-1s-1 .5-1 1s.5 1 1 1z"/></g></svg>
                            ${post.comments.count}
                        </div>
                    </div>`;
                }
                postsList.appendChild(postContent); // Добавляем пост на страницу
                const value = JSON.stringify({
                    postAttachments: post.attachments,
                    postText: post.text,
                    postLikes: post.likes,
                });
                const key = String(Date.now());
                try {
                    localStorage.setItem(key, value); // Пытаемся сохранить данные в localStorage
                } catch (e) {
                    if (e.name === 'QuotaExceededError') { // Если localStorage переполнено, удаляем оттуда старые данные, пока не появится место под новые
                        while (MAX_LOCALSTORAGE_SIZE < (getStorageSize() + key.length + value.length)) {
                            clearLocalStorage();                            
                        }
                        localStorage.setItem(key, value); // После этого сохраняем данные в localStorage
                    }
                }
                storageInfo();
            });
            offset += postsCount;
        }
    } else { // Если происходит ошибка при загрузке данных, выводим ее в консоль
        console.log(response.status);
    }
    preloader.style.display = 'none'; // После получения данных скрываем preloader
}

export function storageInfo() { // Отображение информации о localStorage на странице
    document.getElementById('storage-data').textContent = getStorageSize();
    document.getElementById('storage-all').textContent = MAX_LOCALSTORAGE_SIZE;
}

function clearLocalStorage() { // Удаление старых данных из localStorage
    const keys = Object.keys(localStorage);
    if (keys.length > 0) localStorage.removeItem(keys[0]);
}

function getStorageSize() { // Получение размера данных в localStorage
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        size += (key.length + value.length);
    }
    return size;
}