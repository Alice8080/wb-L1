const url = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';
const nextBtn = document.getElementById('next'); // Кнопка следующей страницы
const prevBtn = document.getElementById('prev'); // Кнопка предыдущей страницы

async function addData(url) { // Асинхронная функция получения данных с сервера
    let response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const page = [0, 49];
        manageElements(page, data); // Если данные получены успешно, они отображаются на странице
    } else {
        console.log(`Ошибка: ${response.status}`); // Иначе в консоль выводится ошибка
    }
}

function manageBtns(page) { // Скрыть/показать кнопку следующей/предыдущей страницы, когда достигнуты начало или конец списка
    if (page[0] === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    if (page[1] === 1000) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-block';
    }
}

function addRows(page, data) { // Отобразить в таблице данные текущей страницы 
    const table = document.querySelector('table'); 
    table.querySelectorAll('tr:has(td)').forEach((tr) => {
        table.removeChild(tr);
    });
    for (let i = page[0]; i <= page[1]; i++) {
        addRow(table, data[i], i);
    }
}

function addRow(table, item, i) { // Добавить строку в таблицу 
    const tr = document.createElement('tr');
    table.appendChild(tr);
    item.i = i;
    Object.values(item).forEach((value) => {
        const td = document.createElement('td');
        td.innerHTML = value;
        tr.appendChild(td);
    });
};


function sortColumns(page, data) { // Сортровка колонок
    const sortBtns = document.querySelectorAll('.sort-col');
    let activeColumn;
    sortBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => { 
            const field = btn.id;
            if (activeColumn === field) { // Если колонка является уже отсортированной, сортируем в обратном порядке
                data.sort((a, b) => `${b[field]}`.localeCompare(`${a[field]}`));
                activeColumn = '';
            } else { // Иначе устанавливаем текущую колонку как активную и сортируем в алфавитном/убывающем порядке
                data.sort((a, b) => `${a[field]}`.localeCompare(`${b[field]}`));
                activeColumn = field;
            }
            addRows(page, data); // Отображаем на странице отсортированную таблицу
        });
    });
}

function pagination(page, data) { // Пагинация 
    // При переключении на предыдущую/следующую страницу индексы отображаемых из data данных меняются, и отображаются от start до end
    nextBtn.addEventListener('click', () => {
        const start = page[0] + 50;
        const end = start + 50;
        page = [start, end];
        addRows(page, data);
        manageBtns(page);
    });
    prevBtn.addEventListener('click', () => {
        const start = page[0] - 50;
        const end = page[1] - 50;
        page = [start, end];
        addRows(page, data);
        manageBtns(page);
    });
}


function manageElements(page, data) { // Функция, которая загружает начальное состояние данных на первой странице
    addRows(page, data);
    pagination(page, data);
    manageBtns(page);
    sortColumns(page, data);
}

addData(url);