// Promise.resolve().then(() => console.log(1));

// queueMicrotask(() => console.log(2));

// setTimeout(() => console.log(3), 0);

// console.log(4);

// new Promise(() => console.log(5));

// (async () => console.log(6))();

// const outerFunc = () => {
//     let count = 0;
//     // return () => ++count;
//     return () => count++;
// }

// const counter = outerFunc();
// console.log(counter())
// console.log(counter())

// function createUserManager() {
//   let user = null;

//   return function (name) {
//     'use strict';
//     user = { name, createdAt: Date.now() };
//     console.log(user);
//     return user;
//   };
// }

// const createUser = createUserManager();
// console.log(createUser('John Doe') === createUser('John Doe'));

function createCounter(initialCount) {
  let count = initialCount;

  return function () {
    'use strict';
    count += 1;
    return count;
  };
}

// const counter = createCounter(10);
// counter()
// counter()
// console.log(counter())

console.log(createCounter(10)());
console.log(createCounter(10)());
console.log(createCounter(10)());
