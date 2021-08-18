"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr = [1, 2, 3];
let arr2 = [2, 3, 4];
let tuple = [321, '213'];
let value = 'qweqweq';
let n = value.length;
let n2 = value.length;
function inputBgChange() {
    let oInput;
    if (document.querySelector('.oInput')) {
        oInput = document.querySelector('#oInput');
        oInput.style.background = 'red';
    }
    else {
        oInput = document.createElement('input');
        oInput.id = 'oInput';
        oInput.style.background = 'red';
        document.body.appendChild(oInput);
    }
}
let jack;
jack = {
    age: 17,
    name: 'jack Ma',
    sex: 'male'
};
let fun = function (params, pp) {
    return 1;
};
// 将 unknow 替换成更准确的类型
let users = [
    {
        name: 'Jack Ma',
        age: 17,
        sex: 'male',
    },
    {
        name: 'Tony Ma',
        age: 18,
    },
];
let str1 = '123';
let ustr = 12312;
let str4 = {
    name: '12',
    age: 123,
};
let str3 = {
    name: '12',
    age: 123,
    walk: true
};
function getPersonKey(obj, key) {
    return obj[key];
}
getPersonKey(str4, 'ne');
