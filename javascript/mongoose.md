# mongoose Issue

This post is not just about mongoose, reporting kind of incompatiblity with javascript.

I guess this is crucial things when someone use mongoose in their project because of its unpredictable result.

You may know about ES6 arrow function, but if you just believe it is exactly same with ES5 expression, that is not true.

For example, 

```
const f = () => { ... }

function g(){
  ...
}

f();
g();

```
These two functions can give different result to you even if they have same code inside of it, 
especially you use this keyword inside of function. 

