export {};
let arr: number[] = [1,2,3];

let arr2: Array<number> = [2,3,4];

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
  
