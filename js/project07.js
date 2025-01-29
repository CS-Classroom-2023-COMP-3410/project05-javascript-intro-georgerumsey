// This file contains the JavaScript code for the virtual calculator, managing arithmetic operations, advanced functions, and error handling.

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let memory = 0;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                setOperator(value);
            } else if (value === '√') {
                squareRoot();
            } else if (value === '%') {
                percentage();
            } else if (value === 'M+') {
                memoryAdd();
            } else if (value === 'MR') {
                memoryRecall();
            } else {
                appendToInput(value);
            }
        });
    });

    function appendToInput(value) {
        currentInput += value;
        display.value = currentInput;
    }

    function setOperator(value) {
        if (currentInput === '') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            calculate();
        }
        operator = value;
        currentInput = '';
    }

    function calculate() {
        if (firstOperand === null || currentInput === '') return;
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    display.value = 'Error';
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        display.value = result;
        resetCalculator(result);
    }

    function squareRoot() {
        if (currentInput === '') return;
        const value = parseFloat(currentInput);
        if (value < 0) {
            display.value = 'Error';
            return;
        }
        const result = Math.sqrt(value);
        display.value = result;
        resetCalculator(result);
    }

    function percentage() {
        if (currentInput === '') return;
        const value = parseFloat(currentInput);
        const result = value / 100;
        display.value = result;
        resetCalculator(result);
    }

    function memoryAdd() {
        if (currentInput === '') return;
        memory += parseFloat(currentInput);
        clear();
    }

    function memoryRecall() {
        display.value = memory;
        currentInput = memory.toString();
    }

    function clear() {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.value = '';
    }

    function resetCalculator(result) {
        currentInput = '';
        operator = '';
        firstOperand = result;
    }
});