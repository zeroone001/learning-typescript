export {};

function logProperty(target: any, key: string) {
    delete target[key];
  
    const backingField = "_" + key;
  
    Object.defineProperty(target, backingField, {
      writable: true,
      enumerable: true,
      configurable: true
    });
  
    // property getter
    const getter = function (this: any) {
      const currVal = this[backingField];
      console.log(`Get: ${key} => ${currVal}`);
      return currVal;
    };
  
    // property setter
    const setter = function (this: any, newVal: any) {
      console.log(`Set: ${key} => ${newVal}`);
      this[backingField] = newVal;
    };
  
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
  
class Person { 
@logProperty
public name: string;

constructor(name : string) { 
    this.name = name;
}
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";