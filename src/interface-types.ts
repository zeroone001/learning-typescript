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


export {};
interface Post {
    title: string;
    content: string;
    subtitle?: string; // 可选
    readonly summary: string;
}


function PostThe (params: Post) {
    
}

const obj: Post = {
    title: 'eqw',
    content: 'eqwewq',
    summary: 'eqwe'
}

// 动态成员
interface Cache {
    [propName: string]: any;
}
let cache: Cache = {};
// cache.foo = 'eqw';

function CacheThe (params: Cache) {
    params.id = '123'
}
