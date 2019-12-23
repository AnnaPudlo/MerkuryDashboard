console.log('test');

let test = (x) => x * 2;

class User {

    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      alert(this.name);
    }
  
  }
  
  let user = new User("Вася");
  // user.sayHi(); // Вася