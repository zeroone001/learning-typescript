"use strict";
/*
    Class
    描述一类具体事物的抽象特征


*/
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.gender = name + age;
        this.color = name + '_' + age;
    }
    sayHi(msg) {
    }
}
class Student extends Person {
    // 私有的
    constructor(name, age) {
        super(name, age);
    }
    static create(name, age) {
        return new Student(name, age);
    }
}
const jack = Student.create('jack', 19);
/*


*/ 
