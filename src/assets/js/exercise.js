


//map
const arr2 = [1, 2, 3, 4, 5];
const doubled = arr2.map((item) => {
    return item * 2;
});
 console.log(doubled);

//callback
 function hello (){
    console.log("Hello, world!");
 }

 function goodbye (){
    console.log("Good bye, world!");
 }

 function print(callback){
    callback();
 }
  print(hello);
  print(goodbye);

// custom hof that return another function
function multiplyBy(n){
    return function (x){
        return x * n;
    }
}

const double = multiplyBy(2);
console.log(double(5));

// custom hof that implement callbacks
function  repeat(n, action){
    for (let i = 0; i < n; 1++){
        action(i);
    }
}

function logNumber(n){
    console.log(`The number is ${n}`);
}

repeat(3, logNumber)