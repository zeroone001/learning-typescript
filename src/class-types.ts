/* 
    Class
    描述一类具体事物的抽象特征


*/

export {};

class Person {
    name: string
    age: number

    private color: string // 私有属性
    protected gender: string // 不能外部访问，可以在子类里面访问

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.gender = name + age;
        this.color = name + '_' + age;
    }

    sayHi (msg: string):void {

    }
}

class Student extends Person {
    // 私有的
    private constructor(name: string, age: number) {
        super(name, age)

    }

    static create (name: string, age: number) {
        return new Student(name, age)
    }

}

const jack = Student.create('jack', 19);


/* 


*/