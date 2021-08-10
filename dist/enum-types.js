"use strict";
/*
    枚举类型
    Enum
*/
Object.defineProperty(exports, "__esModule", { value: true });
var PostNum;
(function (PostNum) {
    PostNum[PostNum["Draft"] = 0] = "Draft";
    PostNum[PostNum["publish"] = 1] = "publish";
    PostNum[PostNum["TheNum"] = 2] = "TheNum";
})(PostNum || (PostNum = {}));
const post = {
    status: PostNum.Draft
};
