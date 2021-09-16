/* 
    数组类型
*/

const arr1: Array<number> = [123, 123];
const arr2: number[] = [1,1,1];

// ------------------

function sum (...args: number[]) {
    return args.reduce((prev, current) => prev + current, 0);
}

sum(1,2,3);