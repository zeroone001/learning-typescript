export { };
let arr: number[] = [1, 2, 3];

let arr2: Array<number> = [2, 3, 4];

let tuple: [number, string] = [321, '213'];

let value: any = 'qweqweq';

let n = (value as string).length;
let n2 = (<string>value).length;

function inputBgChange(): void {
    let oInput: HTMLInputElement;
    if (document.querySelector('.oInput')) {
        oInput = document.querySelector('#oInput') as HTMLInputElement;
        oInput.style.background = 'red';
    } else {
        oInput = document.createElement('input');
        oInput.id = 'oInput';
        oInput.style.background = 'red';
        document.body.appendChild(oInput);
    }
}

interface Person {
    age: number,
    name: string,
    [propName: string]: any,
}
let jack: Person;

jack = {
    age: 17,
    name: 'jack Ma',
    sex: 'male'
}
// success


// 接口来描述函数类型

interface CompareFun {
    (one: number, two: string): number
}

let fun: CompareFun = function (params: number, pp: string) {
    return 1;
}

interface User {
    // todo
    name: string,
    age: number,
    sex?: string
}

// 将 unknow 替换成更准确的类型
let users: Array<User> = [
    {
        name: 'Jack Ma',
        age: 17,
        sex: 'male',
    },
    {
        name: 'Tony Ma',
        age: 18,
    },
]

// 类型别名
/* 
    给一个类型起个别的名字
*/
type strType = string;

let str1: strType = '123';

// 联合类型

type UnionType = string | number;

let ustr: UnionType = 12312;


// 交叉类型
interface Person1 {
    name: string,
    age: number,
}

interface Animal {
    walk: boolean
}
let str4: Person1 = {
    'name':'12',
    'age': 123,
}
let str3: Person1 & Animal = {
    name:'12',
    age: 123,
    walk: true
}
// typeof 可以用来获取一个变量的声明类型
type Hello = typeof str3;

type Point = {x: number; y: number}
type P = keyof Animal;


function getPersonKey(obj: Person, key: keyof Person1): number | string {
    return obj[key];
}
getPersonKey(str4, 'name');

// in 操作符 实现枚举类型的遍历

type Keys = 'name' | 'age';

type Person2 = {
    [K in Keys]: any
}

/* 
    // 泛型
    是一个比较重要的概念，
    允许我们在编写代码的时候暂时不指定类型
    在实例化的时候，作为参数指定这些类型
    可以提升代码的可复用性
    让系统更加灵活

*/
function findFirst<T, P> (arr: T[]): T | P {
    let a = arr[0];
    return a;
  }
  
//   findFirst<number, string>([1,2,3]);
  // => 1
  
//   findFirst<string, number>(['hello', 'world']);
  // => 'hello'

  function contact<T, K> (arr: T[], msg: K): string {
    return `${arr[0]}-${msg}`;
  }
  contact([1,2,3], 'hello')
  // => '1-hello'

  // 泛型约束 extends 泛型的功能过于强大，我们进行约束，防止滥用
  interface LengthWise {
      length: number
  }

  function getLength<T extends LengthWise> (obj: T): number {
    return obj.length;
  }
  getLength({a: 1, length: 1});
  
  //

type Diff<T, U> = T extends U ? never : T;

type diff = Diff<string | boolean | number, string | number>;

// boolean
let aaa: diff = true;

// 实现一个工具泛型

type If<C extends boolean, T, F> = C extends true ? T : F; // todo

type T1 = If<true, boolean, number>;
// T1 为 boolean 类型

type T2 = If<false, boolean, number>;
// T2 为 number 类型


// 内置常用的工具泛型

// Partical 可以将类型中的所有属性变成可选属性

interface Person3 {
    name: string,
    age: number
}

type T3 = Partial<Person3>;


// Record 通常用来申明一个对象

type T4 = Record<string, number>;

let t4Text:T4 = {
    name: 312,
    age: 123
} 


// Pick 提取形成新的类型
type T5 = Pick<Person3, 'name'>;

let T5Str: T5 = {
    name: 'ewqe',
}


import axios from 'axios';

interface API {
    '/user/add': {
        name: string,
        age: number,
        sex?: string
    }
}

function post<T extends keyof API>(url: T, params: API[T]) {
  return axios.post(url, params);
}

// post('/user/del', {name: 'jack Ma', age: 17});
// 报错, url 传参错误

// post('/user/add', {name: 'jack Ma'});
// 报错, 缺少请求参数 age 字段

post('/user/add', {name: 'jack Ma', age: 17});
// 请求成功

post('/user/add', {name: 'jack Ma', age: 17, sex: 'male'})
// 请求成功


/* 
实现一个 Includes<T, K> 工具泛型，T 为一个数组类型，
判断 K 是否存在于 T 中，若存在返回 true，否则返回 false
*/

type Includes<T extends any[], K> = K extends T[number] ? true : false;

type T8 = Includes<['name','age','sex'], 'name'>
// T1 的期望为 true

type T0 = Includes<['name','age','sex'], 'name'>
// T2 的期望为 false


/* 

*/


interface Person10 {
    name: string,
    age: number,
  }
    // 相同属性名的情况下，若其中一个类型属性设置为只读，交叉最终返回的这个属性类型也会是只读。
    // 给K传一个默认值为 keyof T
  type MyReadOnly<T, K extends keyof T = keyof T> = {
      readonly [P in K]: T[P]
  } & T;
  
  const Jack1: MyReadOnly<Person10, 'name'> = {
    name: 'jack',
    age: 17,
  }
  
//   Jack1.name = 'jack';
  // error
  
  Jack1.age = 18;
  // success


  // 工具泛型 太复杂了，没看明白
  type AppendArgX<Fn, X> = Fn extends (...args: infer P) => infer R ? (...args: [...P, X])=>R : never;
  
  type Fn = (a: number, b: string) => number

type NewFn = AppendArgX<Fn, boolean> 
// NewFn 期望是 (a: number, b: string, x: boolean) => number

type Required<T> = {

}

type GetRequired<T> = {
    [key in Required<T>]: T[key]
}

type T88 = GetRequired<{name: string, age: number, sex?: string}>
// T1 的期望是 {name: string, age: number}


/* interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type MyPick<T, K extends keyof T> = {
      [P in K]: T[K]
  };
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  } */

  /* interface Todo {
    title: string
    description: string
  }

  type MyReadonly<T> = {
      readonly [P in keyof T]: T[P]
  };
  
  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
   */

  const tuple34 = ['tesla', 'model 3', 'model X', 'model Y'] as const;
  
  type TupleToObject<T> = {
      [P in keyof T]: T[P]
  };
const result1: TupleToObject<typeof tuple34> = {
    'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'
}
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

/* function identity <T, U>(value: T, message: U) : T {
    console.log(message);
    return value;
  } */
  interface Length {
      length: number
  }
  function identity<T extends Length>(arg: T): T {
    console.log(arg.length); // Error, 这个地方需要给泛型约束
    return arg;
  }
  function identity2<T>(arg: T[]): T[] {
    console.log(arg.length); // Error, 这个地方需要给泛型约束
    return arg;
  }

  function getProperty<T, K extends keyof T> (obj: T, key: K): T[K] {
    return obj[key];
  }

// 去除所有never成员

type OmitNever<T> = Pick<T, {
    [K in keyof T]: T[K] extends never ? never : K
}[keyof T]>

type T123 = {
    a: string,
    b: never,
    c: string,
}

// 这样可以做一个联合类型 |， 再使用Pick
type OmitNeverHalf<T> = {[P in keyof T]: T[P] extends never ? never : P}[keyof T]

type L = OmitNever<T123>;

type L2 = OmitNeverHalf<T123>