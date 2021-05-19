---
title: 'Modern Javascript and Typescript :: KWEB FE Bootcamp'
categories:
    - Frontend
last_modified_at: 2021-05-19T22:25:00
toc: true
path: '/Frontend/Upgrade-Blog'

---

# KWEB 2021 FE Bootcamp

## #1 Modern Javascript and Typescript

### Modern Javascript (ES6+)

ES6(ECMAScript 6, ES2015)로 버전이 올라가면서 여러 유용한 기능들이 추가되었고, 현재 많은 코드들이 ES6를 사용하고 있습니다. 또한, 여러 회사들에서도 물론 legacy javascript 지식들을 요구하기도 하지만, 특히 이 모던 자바스크립트의 feature를 사용할 수 있는가를 중점으로 지원자들을 테스트하고 있습니다.

그럼 ES6와 그 이후로 추가된 기능들을 살펴보면서, 코드를 좀 더 아름다운 방법으로 짤 수 있게끔 한번 지식을 넓혀보도록 하겠습니다.

#### ES6 (ES2015)

- `let`, `const` keyword

  이전에 사용되던 `var`를 대체할 `let`, `const`가 추가되었습니다. `var`은 값을 바꿀 수 있고 hoisting이 가능하다는 특징이 있었는데, 값을 바꿀 수 없다는 부분에서는 선택권이 존재하지 않았고, hoisting은 코드가 수행되는 방법이 예상가능하지 않도록 한다는 단점이 존재했었습니다. 따라서, 값을 바꿀 수 있는 `let`과 바꿀 수 없는 `const`가 추가되었습니다.

  ```javascript
  let variableName = 3;
  const constantName = 3;
  ```

- Arrow function

  함수를 선언하는 방법이 추가되었습니다. 기존에 사용하던 문법으로 선언한 함수와 다른 점은 this keyword에 대한 정보를 새로이 주입하지 않는다는 점이고, 기존처럼 this를 사용하기 위해서는 bind 함수를 통해 별도의 연결이 필요합니다.

  ```javascript
  // legacy way to declare function
  function functionName() {
  }
  
  // new way (arrow function) to declare function
  const functionName = () => {
  };
  ```

- for/of loop

  for를 사용하는 방법이 새롭게 추가되었는데, iterable한 객체일 경우에 of 키워드를 이용해서 별도의 인덱스 없이도 객체를 loop 돌릴 수 있는 방법입니다. 동작도 예상과 다른 것을 알 수 있는데, 기존의 for은 처음 선언한 변수에 대입시키는 반면 for-of loop에서는 계속해서 새로운 변수가 내려옵니다. 따라서 const를 사용해도 문제가 없습니다.

  ```javascript
  const array = [1, 2, 3, 4, 5];
  
  // legacy way to iterate array
  for (let index = 0; index < array.length; ++index) {
      console.log(array[index]);
  }
  
  // new way (for-of loop) to iterate array
  for (const item of array) {
      console.log(item);
  }
  ```

- class의 추가

  기존 자바스크립트에서는 prototype을 이용해 OOP를 모방할 수 있었는데, class 기능이 직접 추가되어 이제는 그런 트릭 없이도 OOP를 할 수 있게 되었습니다. 그래도 자바스크립트 내에는 prototype이 존재하기 때문에, 궁금하시다면 prototype에 대한 추가적인 정보를 찾아보시는 것을 추천드립니다.

- Promise의 추가

  Promise라는 Javascript Object가 추가되었고, resolve와 reject라는 상태가 존재한다는 점이 특징입니다. 기존 자바스크립트에서는 비동기 프로그래밍을 할 때 callback이라는 방법을 사용했는데, Promise가 추가됨으로써 비동기 프로그래밍을 비교적 우아하게 처리할 수 있게 되었다는 큰 특징이 존재합니다.

  ```javascript
  // legacy way for async programming
  function whenDoneCallDone(onDone) {
      setTimeout(function () {
          onDone();
      }, 1000);
  }
  whenDoneCallDone(function () {
      whenDoneCallDone(function () {
          whenDoneCallDone(function () {
              console.log('finally done!');
          })
      })
  })
  
  // new way for async programming
  function whenDoneCallDone() {
      return new Promise((resolve) => {
          setTimeout(resolve, 1000);
      });
  }
  whenDoneCallDone().then(() => {
      return whenDoneCallDone();
  }).then(() => {
      return whenDoneCallDone();
  }).then(() => {
      console.log('finally done!');
  })
  ```

- 함수에 default parameter value를 추가할 수 있게 되었습니다.

  이를 통해서 인자를 passing하지 않았을 때 기본값을 제공함으로써 좀 더 유연한 코딩이 가능해졌습니다.

  ```javascript
  // legacy way
  function NotRequired(message) {
      console.log(message);
  }
  NotRequired(); // undefined
  
  // new way
  function NotRequired(message = 'Default message') {
      console.log(message);
  }
  NotRequired();
  ```

- tagged template 추가

  인자를 문자열로 받을 수 있습니다. (예시, styled-components)

  ```javascript
  function myTag(literal, ...expressions) {
      return literal.map((substr, index) => {
          return substr + (index < expressions.length ? expressions[index] : '')}).join('');
  }
  myTag`
  	first expression: ${2};
  	second expression: ${3};
  `
  ```

- function rest parameter

  함수의 인자에 rest parameter을 넣음으로써 가변 인자를 받을 수 있는 방법이 생겼습니다.

  ```javascript
  function varArgs(...args) {
      return args;
  }
  varArgs(1, 2, 3, 4) // [1, 2, 3, 4]
  ```

- Array Matching

  ```javascript
  let array = [1, 2, 3];
  let [a, b, c] = array;
  console.log(a, b, c); // 1 2 3
  ```

- Object Matching

  ```javascript
  let object = {
      a: 1,
      b: 2,
      c: {
          d: 3,
      }
  }
  let {a, b, c: {d}} = object; // depth가 늘어도 상관 없습니다.
  console.log(a, b, d); // 1 2 3
  ```

- Spread operator 추가

  iterable한 객체의 원소들을 spread 할 수 있습니다.

  ```javascript
  let someObject = {
  	a: 1,
  	b: 2,
  	c: 3,
  };
  let {a, ...b} = someObject;
  console.log(a, b); // 1 {b: 2, c: 3}
  ```

- destructuring object

  object의 property만을 들고오기 위해서 더 이상 선언을 여러번 할 필요가 없습니다.

  ```javascript
  let someObject = {
      c: 3,
      d: 4,
  }
  let newObject = {a: 1, b: 2, ...someObject};
  console.log(newObject); // {a: 1, b: 2, c: 3, d: 4}
  ```

- Property shorthand

  object에 변수 이름 그대로 property를 추가하기 쉬워졌습니다.

  ```javascript
  // legacy way
  let x = 0; y = 0;
  let object = {x: x, y: y};
  
  // new way
  let x = 0; y = 0;
  let object = {x, y};
  ```

- Array method 추가

  - Array.find()
  - Array.findIndex()

- Math method 추가

  - Math.trunc()

    실수인 경우 실수부를 버려줍니다. 즉 정수로 만들어줍니다. 이것보다 짧게는 right shift 0 트릭으로 해결할 수 있습니다.

    ```javascript
    let f = 3.8;
    console.log(Math.trunc(f)); // 3
    console.log(f >> 0); // 3
    ```

  - Math.sign()

  - Math.cbrt() -> cube root

  - Math.log2()

  - Math.log10()

- Number properties 추가

  - EPSILON

  - MIN_SAFE_INTEGER

  - MAX_SAFE_INTEGER

    자바스크립트의 정수가 2^52의 비트까지만 정확하게 표시할 수 있기 때문에, Long을 쓰려면 외부 라이브러리 혹은 직접 구현해야만 합니다. safe_integer을 이용하여 정수로 표현할 수 있는지 확인하는 것이 편해졌습니다.

    물론 Long은 BigInt을 이용할 수 있긴 하지만, IE full unsupported.

- Number method 추가

  - Number.isInteger()
  - Number.isSafeInteger()

- Global method 추가

  - isFinite()
  - isNaN()

---

#### ES7 (ES2016)

- Array.prototype.includes()

  이전까지는 indexOf()를 이용했을 때 결과가 -1이면 없는 것, 유효한 인덱스가 나오면 있는 것으로 판단을 했는데, includes()가 나와서 그럴 일이 사라졌습니다.

  ```javascript
  let array = [1, 2, 3, 4];
  
  // legacy way to find element in array
  if (array.indexOf(5) !== 1) {
      console.log('found!');
  } else { console.log('not found ;-;'); }
  
  // new way to find element in array
  if (array.includes(5)) {
      console.log('found!');
  } else { console.log('not found ;-;'); }
  ```

- Exponential operator

  ```javascript
  // legacy way for exponentiation
  let a = Math.pow(2, 3);
  
  // new way for exponentiation
  let b = 2 ** 3;
  ```

---

#### ES8 (ES2017)

- String padding

  - String.prototype.padStart()
  - String.prototype.padEnd()

  간단하게 문자열의 앞뒤를 채울 수 있게 되었습니다.

  ```javascript
  // 예시: 시간을 표현해야 하는 경우 (00초, 03초 등)
  let date = new Date()
  let seconds = date.getSeconds().toString().padStart(2, '0');
  console.log(seconds);
  ```

- Object method 추가

  - Object.values()
  - Object.entries()

  ```javascript
  let fruit = {name: 'apple', color: 'red'};
  console.log(Object.values(fruit)); // ['apple', 'red']
  console.log(Object.entries(fruit)); // [['name', 'apple'], ['color', 'red']]
  ```

- Trailing commas

  인자 뒤에 추가적인 comma를 붙일 수 있게 되었습니다.

- async / await

  비동기 프로그래밍이 더 쉬워졌습니다.
  
  ```javascript
  // legacy way for async programming
  function whenDoneCallDone(onDone) {
      setTimeout(function () {
          onDone();
      }, 1000);
  }
  whenDoneCallDone(function () {
      whenDoneCallDone(function () {
          whenDoneCallDone(function () {
              console.log('finally done!');
          })
      })
  })
  
  // new way (Promise) for async programming
  function whenDoneCallDone() {
      return new Promise((resolve) => {
          setTimeout(resolve, 1000);
      });
  }
  whenDoneCallDone().then(() => {
      return whenDoneCallDone();
  }).then(() => {
      return whenDoneCallDone();
  }).then(() => {
      console.log('finally done!');
  })
  
  // newest way (async-await) for async programming
  let whenDoneCallDone = async () => {
      return new Promise((resolve) => {
          setTimeout(resolve, 1000);
      })
  }
  await whenDoneCallDone(); // top-level await은 현재 proposal로 존재합니다.
  await whenDoneCallDone();
  await whenDoneCallDone();
  console.log('finally done!');
  ```

---

#### ES9 (ES2018)

- Rest/Spread properties in Array!

  array destructuring과 동시에 남은 element들을 묶을 수 있습니다. 또한 spread도 가능합니다.
  
  ```javascript
  let array = [1, 2, 3, 4];
  let [head, ...tail] = array;
  console.log(head, tail); // 1 [2, 3, 4]
  ```

---

#### ES10 (ES2019)

- Array prototype에 method 추가
  - flat()
  - flatMap() -> map 이후에 나온 array flatten (depth 1)
  
  ```javascript
  let array = [[1, 2], [3, 4], [5, [6]]];
  console.log(array.flat()); // [1, 2, 3, 4, 5, Array(1)]
  console.log(array.flat(2)); // [1, 2, 3, 4, 5, 6]
  console.log(array.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
  
  console.log([1, 2, 3].flatMap(() => [1, 2])) // [1, 2, 1, 2, 1, 2]
  ```
  
- Object method 추가
  
  - fromEntries()
  
  ```javascript
  let object = {
      a: 1,
      b: 2,
      c: 3
  };
  console.log(Object.fromEntries(Object.entries(object))); // {a: 1, b: 2, c: 3}
  ```
  
- String trim
  - trimStart()
  - trimEnd()
  
  ```javascript
  let trimedFirst = '   hello';
  let trimedLast = 'hello   ';
  let trimedSide = '   hello   ';
  
  console.log(trimedFirst.trimStart()) // hello (without any trim)
  console.log(trimedLast.trimEnd()) // hello
  console.log(trimedSide.trimStart().trimEnd()) // hello
  ```
  
- BigInt

  2^52보다 큰 수를 담을 수 있는 객체이지만, IE에서는 모든 버전 미지원

- Dynamic import

  ```javascript
  (async () => {
    if (somethingIsTrue) {
      // import module for side effects
      await import('/modules/my-module.js');
    }
  })();
  ```

  



