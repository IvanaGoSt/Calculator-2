let display = document.getElementById("display");
let point = document.getElementById("point");
let oprts = document.getElementsByClassName("operator");
function disableOperators(boolean) {
  for(let i = 0; i < oprts.length; i++) {
      oprts[i].disabled = boolean;
    }
}
let arrOfNum = [];
let arrOfOprs = [];
let newNumber = true;

function operate(a, b, operator) {
  if(operator === "+") {
    return a + b;
  }else if(operator === "-") {
    return a - b;
  }else if(operator === "*") {
    return a * b;
  }else {
    return a / b;
  }
}

let digits = document.querySelectorAll(".number");

digits.forEach(function(digit) {
  digit.addEventListener("click", populateDisplay);
});

function populateDisplay() {
  if(newNumber === false) {
    display.value = "";
    newNumber = true;
  }
  display.value += this.value;
  disableOperators(false);
}

function noOperatorsBegin() {
   if(display.value === "") {
  disableOperators(true);
  }
}

noOperatorsBegin();

let operators = document.querySelectorAll(".operator");

operators.forEach(function(operator) {
  operator.addEventListener("click", addNumToArr);
});

function addNumToArr() {   arrOfNum.push(parseFloat(display.value));
  arrOfOprs.push(this.value);
  newNumber = false;
  disableOperators(true);
  let x = arrOfNum[0];
  let y = arrOfNum[1];
  let result = operate(x, y, arrOfOprs[arrOfOprs.length - 2]);
  //result.toPrecision(16);

  if(arrOfOprs.length > 1) {
  display.value = result;
  arrOfNum.splice(0,2,result); //exchange first two elements (numbers) of the array with their result
  }
     point.disabled = false;
}

point.addEventListener("click", disablePoint);
function disablePoint() {
  point.disabled = true;
}

document.getElementById("equal").addEventListener("click", getResult);
function getResult() {
  addNumToArr();
  disableOperators(false);
  arrOfOprs = [];
  arrOfNum = [];
}

document.getElementById("c").addEventListener("click", clearDisplay);
function clearDisplay() {
  arrOfNum = [];
  arrOfOprs = [];
  display.value = "";
  noOperatorsBegin();
}

document.getElementById("ce").addEventListener("click", ce);
function ce() {
  display.value = display.value.slice(0, -1);
}

document.addEventListener("keypress", function(e) {
  function clickKey(id){
    e.preventDefault();
    document.getElementById(id).click();
  }
 switch(e.key){
   case "1": clickKey("one");
     break;
   case "2": clickKey("two");
     break;
   case "3": clickKey("three");
     break;
   case "4": clickKey("four");
     break;
   case "5": clickKey("five");
     break;
   case "6": clickKey("six");
     break;
   case "7": clickKey("seven");
     break;
   case "8": clickKey("eight");
     break;
   case "9": clickKey("nine");
     break;
   case "0": clickKey("zero");
     break;
   case ",": clickKey("point");
   case ".": clickKey("point");
     break;
   case "Delete": clickKey("c");
     break;
   case "Backspace": clickKey("ce");
     break;
   case "Enter": clickKey("equal");
     break;
   case "+": clickKey("add");
     break;
   case "-": clickKey("subtract");
     break;
   case "*": clickKey("multiply");
     break;
   case "/": clickKey("divide");
     break;
 }

});
