// Вариант решения № 1: 
// title, author, year - приватные свойства, доступ к которым осуществялется через геттеры/сеттеры
const book = {
    get title() {
        return this._title;
    },

    set title(title) {
        this._title = title;
    },


    get author() {
        return this._author;
    },

    set author(author) {
        this._author = author;
    },


    get year() {
        return this._year;
    },

    set year(year) {
        this._year = year;
    },
};


// Вариант решения № 2: 
// title, author, year - свойства, которые можно получать как через геттеры, так и напрямую,
// и изменять как через сеттеры, так и напрямую
const book2 = {
    title: 'Title',
    author: 'Author',
    year: 2023,
    
    get getTitle() {
        return this.title;
    },

    set setTitle(title) {
        this.title = title;
    },


    get getuthor() {
        return this.author;
    },

    set setAuthor(author) {
        this.author = author;
    },


    get getYear() {
        return this.year;
    },

    set setYear(year) {
        this.year = year;
    },
};
