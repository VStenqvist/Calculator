//Write smaller functions, breakdown big functions in to smaller ones. Write callbacks
//Function based programming for readability and ease of coding
//Most importantly, HAVE FUN!!!!


//Variable declarations
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalsBtn = document.getElementById('equals');
const pointBtn = document.getElementById('point');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.numbers');
const lastScreen = document.querySelector('.computedCalc');
const currentScreen = document.querySelector('.enteredVals');

let firstOperator;
let secondOperator;
let shouldReset = false;
let activeOperator = null;

//Spara operatorerna, och evaluera funktionen som är där


//add listener to target element
addClickListener = (element, action) => {
    element.addEventListener('click', action);
}
//display clicked number in evaluation screen
appendNumber = (e) => {
    if (currentScreen.textContent === '0' || shouldReset)
        resetScreen()
    currentScreen.textContent += e.target.textContent;
}

setOperation = (operator) => {
    if (activeOperator !== null)
        evaluate();

    firstOperator = currentScreen.textContent;
    activeOperator = operator;
    lastScreen.textContent = `${firstOperator} ${activeOperator}`;
    resetScreen();
}


numberBtns.forEach(element => {
    addClickListener(element, appendNumber);
});
operatorBtns.forEach(element => {
    addClickListener(element, () => {
        setOperation(element.textContent)
    });
});

clearBtn.addEventListener('click', () => {
    clear();
})
equalsBtn.addEventListener('click', () => {
    evaluate();
})
pointBtn.addEventListener('click', () => {
    insertPoint();
})
deleteBtn.addEventListener('click', () => {
    deleteInput(currentScreen.textContent);
})

//Operator functions ------
//clear screen and inputs
clear = () => {
    currentScreen.textContent = '0';
    lastScreen.textContent = '';
    firstOperator = '';
    secondOperator = '';
    activeOperator = null;
}

evaluate = () => {
    if (activeOperator === null || shouldReset) return
    // if statement for dividing by 0
    secondOperator = currentScreen.textContent;
    currentScreen.textContent = compute(activeOperator, firstOperator, secondOperator);
    lastScreen.textContent = `${firstOperator} ${activeOperator} ${secondOperator} =`;
    activeOperator = null;
    currentScreen.textContent.includes('.') && currentScreen.textContent.length >= 3 ? currentScreen.textContent = roundNum(currentScreen.textContent) : console.log("no need to roundup");

}

resetScreen = () => {
    currentScreen.textContent = '';
    shouldReset = false;
}

insertPoint = () => {
    currentScreen.textContent += '.';
}

//erase latest inputed value
deleteInput = (string) => {
    // Get the current values in current screen, save in string, remove the last value(see slice method).

    string = string.slice(0, string.length - 1);
    currentScreen.textContent = string;
}
add = (a, b) => {
    return a + b;
};

subtract = (a, b) => {
    return a - b;
};

multiply = (a, b) => {
    return a * b;
};

divide = (a, b) => {
    //Checks if the calculation is trying to divide by 0 which is not possible.
    if (b == 0) {
        return currentScreen.textContent = 'Cannot divide by 0!';
    } else
        return a / b;
};

compute = (operator, a, b) => {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
        default:
            return null
    }
}
//Rounds the number upwards and to a maximum of 3 decimals
roundNum = (num) => {
    let newNum = Number(num);
    return newNum.toFixed(2);
}