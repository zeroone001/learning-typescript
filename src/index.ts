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
type MyRecord<T extends keyof any, U> = {
    [P in T]: U
}

type T4 = MyRecord<string, number>;

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

/* const tuple34 = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type TupleToObject<T extends readonly any[]> = {
    [Property in T[number]]: Property
};

const result1: TupleToObject<typeof tuple34> = {
    'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'
} */
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

/* function identity <T, U>(value: T, message: U) : T {
    console.log(message);
    return value;
  } */
 /*  interface Length {
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
  } */

// 去除所有never成员

/* type OmitNever<T> = Pick<T, {
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

type L2 = OmitNeverHalf<T123> */
/* type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type First<T extends any[]> = T[0] extends T[number] ? T[0] : never; 

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
 */
/* type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<T extends any[]> = T['length'];

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5 */

/* type TTuple = [string, number];

type ElementOf<T> = T extends (infer R)[] ? R : never;

type Union = ElementOf<TTuple>; // Union 类型为 string | number */

/* type If1<C extends boolean, T, F> = C extends true ? T: F;
type A = If1<true, 'a', 'b'>  // expected to be 'a'
type B = If1<false, 'a', 'b'> // expected to be 'b' */
/* type Concat<T extends any[], U extends any[]> = [...T, ...U];
type Result = Concat<[1], [2]> // expected to be [1, 2] */

/* type Includes1<T extends any[], U> = {
    [K in T[number]]: true
}[U] extends true ? true : false;

type isPillarMen = Includes1<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Sanana'> // expected to be `false` */

/* const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;  
  
  type a = MyReturnType<typeof fn> // 应推导出 "1 | 2" */
  
  /* interface Todo {
    title: string
    description: string
    completed: boolean
  }


  type MyOmit<T, K> = {
      [P in Exclude<keyof T, K>]: T[P]
  };
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>;
  
  const todo1233: TodoPreview = {
    completed: false,
  } */

 /*  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [P in K]: T[P]
  } & T;
  
  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK */

  /* type deepReadonly<T> = {
      readonly [K in keyof T]: T[K] extends any[] | number | string | boolean | Function ? T[K] : deepReadonly<T[K]>
  } */

  /* type Arr = ['1', '2', '3']
  type TupleToUnion<T extends any[]> = T[number];
const aq2e: TupleToUnion<Arr> = '1' // expected to be '1' | '2' | '3' */
 /*  type Human = {    name: string;    occupation: string;  }  
type Duck = {    name: string; occupation: string; occupation1: string; }  
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'no' */

// 假设有一个这样的类型：
/* interface initInterface {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: Action<T>): Action<U>;
  }
  // 在经过 Connect 函数之后，返回值类型为
  
  type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
  } */
  // 其中 Action<T> 的定义为：
 /*  interface Action<T> {
    payload?: T
    type: string
  }
  // 现在要求写出Connect的函数类型定义。

  type RemoveFunctionTypes<T> = {
      [K in keyof T]: T[K] extends Function ? K : never; 
  }[keyof T]

  type FunctionProps = RemoveFunctionTypes<initInterface>;

  type PickFunction<T> = Pick<T, RemoveFunctionTypes<T>>;

  type FunctionInterface = PickFunction<initInterface>;

  type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
// type transformAsyncMethod<T,U> = (input: T) => Action<U>;

  type transformAsyncMethod<T> = T extends (input: Promise<infer U>) => Promise<Action<infer S>> ? (input: U) => Action<S> : never;
  
  type TransformMethod<T> = T extends (
    input: Promise<infer U>
  ) => Promise<Action<infer S>>
    ? (input: U) => Action<S>
    : T extends (action: Action<infer U>) => Action<infer S>
    ? (action: U) => Action<S>
    : never; */

   /*  interface Action<T> {
        payload?: T;
        type: string;
      }
  
    interface EffectModuleType {
        count: number;
        message: string;
        asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
        syncMethod<T, U>(action: Action<T>): Action<U>;
    }

    type removeNoFunction<T> = {
        [P in keyof T]: T[P] extends Function ? P : never
    }[keyof T]

    type PPPP = removeNoFunction<EffectModuleType>;

    type onlyFuncType<T> = Pick<T, removeNoFunction<T>>;

    // type asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>> 
    // type asyncMethod<T, U>(input: T): Action<U> 

    type transformAsyncMethod<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : never;

    // syncMethod<T, U>(action: Action<T>): Action<U>  变成了
    // syncMethod<T, U>(action: T): Action<U>

    type transformSyncMethod<T> = T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;

    type transformMethods<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;
 */

// let arr1: Array<string | number> = ['q23',123, 32];

// let objjjj: A = {
//     name: '312'
// }

// // abcd = 123;

// function greet(greeting: number):void {
//     console.log(greeting);
// }
// greet('qwe');

// myLib.numberName = 123;


function double<T extends number | string>(x: T): T extends string ? string : number;
function double(x: any) {
  return x + x;
}

// const num: 10
const num = double(10);
// const str: "ts"
const str = double('ts');
console.log(str);

interface Point1 {
  x: number;
  y: number;
}
const pt = {} as Point1;
pt.x = 3;
pt.y = 4;

enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
let dir: Direction = Direction.NORTH;