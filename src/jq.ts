import { jQuery, myLib } from 'jquery';
import { msg1, b, c } from 'connect';

let ccc = msg1;

b();

c.cd;

// abcd = '132'
// myLib.numberName = 123

enum Direction {
    Right = 1,
    Up,
    Left,
    Down,
}

console.log(Direction.Right);

enum E1 { X, Y, Z }

enum BooleanLikeHeterogeneousEnum {
    No = 0,
    No1,
    Yes = "YES",
}

enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
console.log(FileAccess.G);

const enum Enum {
    A = 1,
    B = A * 2
}
