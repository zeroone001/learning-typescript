/* 
    decorators 装饰器

    



*/

function sealed(constructor:Function) {
    console.log('123');
}
// 装饰器
@sealed
class Greeter {
    greeting: string
    constructor(msg: string) {
        this.greeting = msg;
    }
}

new Greeter('12312');
