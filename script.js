const numbersBtn = document.querySelectorAll('.number');
const operatorsBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');

const outputDisplay = document.querySelector('.output');
const historyDisplay = document.querySelector('.history');

let operand1 = '', operand2 = '';
let operation = null;
isSecondOperand = false;

numbersBtn.forEach((numberBtn) => {
    numberBtn.addEventListener('click', appendNumber);
});

function appendNumber(e){
    if(checkPoint(outputDisplay.textContent) && e.target.textContent == '.') return;
    if(outputDisplay.textContent == '0'){
        if(e.target.textContent == '.'){
            outputDisplay.textContent += e.target.textContent;
        }
        else{
            outputDisplay.textContent = e.target.textContent;
        }
    }
    else outputDisplay.textContent += e.target.textContent;
}

function clearDisplay(){
    outputDisplay.textContent = '0';
    historyDisplay.textContent = '0';
    isSecondOperand = false;
    operand1 = '';
    operand2 = '';
    operation = null; 
}

function setOperand(){
    if(!isSecondOperand){
        operand1 = outputDisplay.textContent;
    }
    else if(isSecondOperand){
        operand2 = outputDisplay.textContent;
    }
}

operatorsBtn.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', (e) => {
        setOperand();   
        historyDisplay.textContent = evaluate(operand1, operand2, operation) + ' ' + e.target.textContent;
        operand1 = evaluate(operand1, operand2, operation);
        outputDisplay.textContent = '0';
        isSecondOperand = true;
        operation = e.target.textContent;
    })
})

function evaluate(op1, op2, opn){
    if(op2 == '' || opn == null) return op1;
    switch (opn){
        case '+':
            return add(op1, op2);
        case '-':
            return subtract(op1, op2);
        case '×':
            return multiply(op1, op2);
        case '÷':
            return divide(op1, op2);
        case '^':
            return exponent(op1, op2);
        default:
            return;
    }
}

function maxPrecision(a, b){
    let a_arr = a.toString().split('.');
    let b_arr = b.toString().split('.');

    let decimal_a, decimal_b;

    if(a_arr.length == 1){
        decimal_a = 0;
    }
    else{
        let c = a_arr[1].toString().split('');
        decimal_a = c.length;
    }

    if(b_arr.length == 1){
        decimal_b = 0;
    }
    else{
        let d = b_arr[1].toString().split('');
        decimal_b = d.length;
    }

    return decimal_a > decimal_b ? decimal_a : decimal_b;
}

function add(a, b){
    let c = parseFloat(a) + parseFloat(b)
    if(maxPrecision(a, b)){
        return c.toFixed(maxPrecision(a, b));
    }
    else return c;
}

function subtract(a, b){
    let c = parseFloat(a) - parseFloat(b);
    if(maxPrecision(a, b)){
        return c.toFixed(maxPrecision(a, b));
    }
    else return c;
}

function multiply(a, b){
    let c = parseFloat(a) * parseFloat(b);
    if(maxPrecision(a, b)){
        return c.toFixed(maxPrecision(a, b));
    }
    else return c;
}

function divide(a, b){
    if(b == '0'){
        alert('Division by 0 is not possible!');
        return;
    }
    let c = parseFloat(a) / parseFloat(b);
    if(maxPrecision(a, b)){
        return c.toFixed(maxPrecision(a, b));
    }
    else return c.toFixed(3);
}

function exponent(a, b){
    let c = a ** b;
    if(maxPrecision(a, b)){
        return c.toFixed(maxPrecision(a, b));
    }
    else return c;
}

function equals(){
    setOperand();
    historyDisplay.textContent = `${operand1} ${operation} ${operand2}`;
    outputDisplay.textContent = evaluate(operand1, operand2, operation);
    isSecondOperand = false;
    operand1 = '';
    operand2 = '';
    operation = null; 
}

equalsBtn.addEventListener('click', equals);

clearBtn.addEventListener('click', clearDisplay);

deleteBtn.addEventListener('click', del);

function del(){
    let str = outputDisplay.textContent.toString().slice(0, -1);
    if(str === '') outputDisplay.textContent = '0';
    else outputDisplay.textContent = str;
}

function checkPoint(str){
    if(str.includes('.')) return true;
    else return false;
}