## 背景

GitHub上看到一个LeetCode的面试题，因为涉及TS的考察的面挺广的，所以记下来, 加深自己的理解。

原题链接， [https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md)

## 题目

EffectModule 定义如下:

```js
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

```

connect之后

```js
type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}
const effectModule = new EffectModule()
const connected: Connected = connect(effectModule)

```
有一个 `type Connect = (module: EffectModule) => any`，将 `any` 替换成题目的解答

## 分析并且解答

1. 首先我们先写一下EffectModule的类型


```js
interface EffectModuleType {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: Action<T>): Action<U>;
}
```

2. 接下来，我们的目的是把非函数的属性去掉, 换个思路，也就是说Pick出来，现在让我们获取是函数的类型名

```js
// 取出是函数类型的props
type removeNoFunction<T> = {
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]
```

3. Pick一下，就只剩下带函数属性了

```js
type onlyFuncType<T> = Pick<T, removeNoFunction<T>>;
```

4. 接下来需要按照题目要求，把函数变换一下, 这里用到了infer这个知识点

```js
asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
asyncMethod<T, U>(input: T): Action<U> 

// 2

syncMethod<T, U>(action: Action<T>): Action<U>  变成了
syncMethod<T, U>(action: T): Action<U>
```

下面就是对应上面的两个转换

```js
type transformAsyncMethod<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : never;
// 2
type transformSyncMethod<T> = T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;

// 最后再汇总一下, 把第一个never替换成transformSyncMethod

type transformMethods<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;
```

5. 我们转换函数的方法准备好了，下面开始写一个类型来转换一下

```js
type prevConnect<T> = {
  [P in keyof T]: transformMethods<T[P]>
}
```

6. 最后写一下Connect

```js
type Connect<T> = prevConnect<onlyFuncType<T>>;
```





### 参考资料

[https://juejin.cn/post/6844904147167215624](https://juejin.cn/post/6844904147167215624)