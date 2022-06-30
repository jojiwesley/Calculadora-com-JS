const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allclearButtons = document.querySelector("[data-all-clear]");
const previosOperandTextElement = document.querySelector(
  "[data-previos-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previosOperandTextElement, currentOperandTextElement) {
    this.previosOperandTextElement = previosOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formateDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDiplay;

    if (isNaN(integerDigits)) {
      integerDiplay = "";
    } else {
      integerDiplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDiplay}.${decimalDigits}`;
    } else {
      return integerDiplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      case "/":
        result = _previousOperand / _currentOperand;
        break;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperator(operation) {
    if (this.currentOperand === "") return;

    if (this.currentOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previosOperandTextElement.innerText = `${this.formateDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formateDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previosOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperator(operationButton.innerText);
    calculator.updateDisplay();
  });
}

//função que chama clear
allclearButtons.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
