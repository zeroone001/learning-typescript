"use strict";
/*
    interface

    接口
    约定一个对象中有哪些成员
    重要
    只是类型约束
    实际运行阶段是没有的

    可选成员
    只读成员
    动态成员
*/
Object.defineProperty(exports, "__esModule", { value: true });
function PostThe(params) {
}
const obj = {
    title: 'eqw',
    content: 'eqwewq',
    summary: 'eqwe'
};
let cache = {};
// cache.foo = 'eqw';
function CacheThe(params) {
    params.id = '123';
}
