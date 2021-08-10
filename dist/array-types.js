"use strict";
/*
    数组类型
*/
const arr1 = [123, 123];
const arr2 = [1, 1, 1];
// ------------------
function sum(...args) {
    return args.reduce((prev, current) => prev + current, 0);
}
sum(1, 2, 3);
