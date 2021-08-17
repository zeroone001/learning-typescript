1. 为 numCompare 函数添加类型注解。


```js
function numCompare(first, second) {
  return first >= second ? first : second;
}

```
答： 

```js
function numCompare(first: number, second: number): number {
  return first >= second ? first : second;
}
```

2. 基础类型


```js
let arr: number[] = [1,2,3];

let arr2: Array<number> = [2,3,4];

// 元组类型， 表示一个已知元素类型和数量的数组

let tuple: [number, string] = ['123',123, 321]; 

// 类型断言

let value: any = 'qweqweq';

let n = (value as string).length;
let n2 = (<string>value).length;
```

问：解决 inputBgChange 函数报错，使函数能正常运行

```js
function inputBgChange(): void {
    let oInput: HTMLInputElement;
    if (document.querySelector('.oInput')) {
        oInput = document.querySelector('#oInput');
        oInput.style.background = 'red';
    } else {
        oInput = document.createElement('input');
        oInput.id = 'oInput';
        oInput.style.background = 'red';
        document.body.appendChild(oInput);
    }
}
```

答： 

使用类型断言解决问题

```js
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
```





