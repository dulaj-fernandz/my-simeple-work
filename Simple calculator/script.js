class Calculator {
    constructor() {
        this.display = document.getElementById('output');
        this.currentValue = '0';
        this.firstOperand = null;
        this.operation = null;
        this.newNumber = true;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => this.handleNumber(button.textContent));
        });

        // Operator buttons
        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => this.handleOperation(button.dataset.operation));
        });

        // Equals button
        document.getElementById('equals').addEventListener('click', () => this.calculate());

        // Clear button
        document.getElementById('clear').addEventListener('click', () => this.clear());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleNumber(num) {
        if (this.newNumber) {
            this.currentValue = num;
            this.newNumber = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }
        this.updateDisplay();
    }

    handleOperation(op) {
        this.operation = op;
        this.firstOperand = parseFloat(this.currentValue);
        this.newNumber = true;
    }

    calculate() {
        if (this.firstOperand === null || this.operation === null) return;

        const secondOperand = parseFloat(this.currentValue);
        let result;

        switch (this.operation) {
            case '+':
                result = this.firstOperand + secondOperand;
                break;
            case '-':
                result = this.firstOperand - secondOperand;
                break;
            case '*':
                result = this.firstOperand * secondOperand;
                break;
            case '/':
                result = this.firstOperand / secondOperand;
                break;
            case '^':
                result = Math.pow(this.firstOperand, secondOperand);
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.firstOperand = null;
        this.operation = null;
        this.newNumber = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.firstOperand = null;
        this.operation = null;
        this.newNumber = true;
        this.updateDisplay();
    }

    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            this.handleNumber(e.key);
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            this.handleOperation(e.key);
        } else if (e.key === '^') {
            this.handleOperation('^');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.calculate();
        } else if (e.key === 'Escape') {
            this.clear();
        }
    }

    updateDisplay() {
        this.display.textContent = this.currentValue;
    }
}

// Initialize calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});