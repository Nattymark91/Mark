
let display = document.querySelector(".disp"), 
numbutton = document.querySelectorAll('.numbtn'),
operbutton = document.querySelectorAll('.operbtn'),
firstValue = 0;
secondValue = 0;
operator = "";
operator_flug = 0;

numbutton.forEach(button => {
    button.addEventListener("click", (el) => {
        (display.innerText == "0" || operator_flug != 0) ? display.innerText = el.target.innerText
        : display.innerText += el.target.innerText;
        operator_flug = 0;
    });
});

operbutton.forEach(button => {
    button.addEventListener("click", (el) => {
        operator = el.target.innerText;
        firstValue = Number(display.innerText);
        operator_flug = 1;
    });
});


  function result() {
    if (operator != "" && operator_flug != 2) {
      secondValue = Number(display.innerText);
      arithmetic();
      firstValue = Number(display.innerText);
      operator_flug = 2;
    }
    else {
      arithmetic();
      firstValue = Number(display.innerText);}
  }

  function arithmetic() {
    switch (operator) {
      case '÷':
        display.innerText = firstValue / secondValue;
        break;
      case '×':
        display.innerText = firstValue * secondValue;
        break;
      case '-':
        display.innerText = firstValue - secondValue;
        break; 
      case '+':
        display.innerText = firstValue + secondValue;
        break;
    }
  }

  function revers() {
    display.innerText = - display.innerText;
    }

  function procent() {
    const procValue = Number (display.innerText);
    firstValue = Number (firstValue) ;
    const secondValue = firstValue * (procValue / 100);
    display.innerText = secondValue;
    }
  
  function partof() {
    display.innerText = 1 / Number (display.innerText);
    }

  function squaring() {
    display.innerText = Math.pow(Number(display.innerText), 2);
    }

  function squareroot() {
    display.innerText = Math.sqrt(display.innerText);
    }

  function clearButton() {
    display.innerText = "0";
    firstValue = 0;
    secondValue = 0;
    operator = "";
    operator_flug = 0;
    }

  function backspace() {
    if (display.innerText != 0) display.innerText = display.innerText.substring(0, display.innerText.length - 1);
    if (display.innerText == '') display.innerText = 0;
    }

  function comma() {
    if (display.innerText.indexOf(".") < 1) display.innerText += ".";
    }

