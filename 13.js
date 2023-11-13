class Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() { // Метод для расчета площади
        return this.width * this.height;
    }

    perimeter() { // Метод для расчета периметра
        return (this.height + this.width) * 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super(width, height);
    }
}

class Circle extends Shape {15
    constructor(radius) {
        this.radius = radius;
    }

    area() { // Метод для расчета площади
        return Math.PI * this.radius ** 2;
    }

    perimeter() { // Метод для расчета периметра
        return 2 * Math.PI * this.radius;
    }
}

class Triangle extends Shape {
    constructor(lengthA, lengthB, lengthC, height) {
        super(lengthA, height);
        this.lengthA = lengthA;
        this.lengthB = lengthB;
        this.lengthC = lengthC;
    }

    area() { // Метод для расчета площади
        return this.lengthA * this.height * 0.5;
    }

    perimeter() { // Метод для расчета периметра
        return this.lengthA + this.lengthB + this.lengthC;
    }
}
