// Next time its simpler and more efficient to just take each equation (10x10) and splice each of these equations into a nested array
// with a parent array for each operation group execute all of the functions with PEMDAS
// then simply add the results together and display it

const screenElement = document.querySelector(".screen");
const clearElement = document.querySelector(".clear");
const equalsElement = document.querySelector(".equals");
const backSpaceElement = document.querySelector(".backspace");
const displayedButtons = document.querySelectorAll(".displayedButton");
const debugScreenElement = document.querySelector(".debug-1");
const buttons = Array.from(displayedButtons);

function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
function divide(operand1, operand2) {
  return operand1 / operand2;
}

function displayNumbers() {
  console.log(buttons);

  buttons.forEach((item) =>
    item.addEventListener("click", (event) => {
      screenElement.innerText += item.innerText;
      textArray = screenElement.innerText.split("");
      duplicateFinder();
    })
  );
  equalsElement.addEventListener("click", () => {
    operate();
  });
  backSpaceElement.addEventListener("click", () => {
    backSpace();
  });
  // let i = 0;
  // while (i < numbers.length) {
  //   numbers[i].addEventListener(
  //     "click",
  //     () => (screenElement.innerText += numbers[i].innerText)
  //   );
  //   i++;
  // }
}
function backSpace() {
  textArray.pop();
  screenElement.innerText = textArray.join("");
}
function duplicateFinder() {
  if (
    textArray[0] === "×" ||
    textArray[0] === "÷" ||
    textArray[0] === "+" ||
    textArray[0] === "−"
  ) {
    textArray.shift();
    screenElement.innerText = textArray.join("");
  }

  textArray.forEach((item, index) => {
    if (item === "×") {
      if (
        textArray[index - 1] === "." ||
        textArray[index - 1] === "×" ||
        textArray[index - 1] === "÷" ||
        textArray[index - 1] === "+" ||
        textArray[index - 1] === "−"
      ) {
        textArray.pop();
        screenElement.innerText = textArray.join("");
      }
    }
    if (item === "÷") {
      if (
        textArray[index - 1] === "×" ||
        textArray[index - 1] === "÷" ||
        textArray[index - 1] === "+" ||
        textArray[index - 1] === "−"
      ) {
        textArray.pop();
        screenElement.innerText = textArray.join("");
      }
    }
    if (item === "+") {
      if (
        textArray[index - 1] === "×" ||
        textArray[index - 1] === "÷" ||
        textArray[index - 1] === "+" ||
        textArray[index - 1] === "−"
      ) {
        textArray.pop();
        screenElement.innerText = textArray.join("");
      }
    }

    if (item === "−") {
      if (
        textArray[index - 1] === "×" ||
        textArray[index - 1] === "÷" ||
        textArray[index - 1] === "+" ||
        textArray[index - 1] === "−"
      ) {
        textArray.pop();
        screenElement.innerText = textArray.join("");
      }
    }
    if (item === ".") {
      if (textArray[index - 1] === ".") {
        textArray.pop();
        screenElement.innerText = textArray.join("");
      }
    }
    const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (item === ".") {
      if (
        (textArray[index - 1] === "×" &&
          !numberArray.includes(textArray[index + 1])) ||
        (textArray[index - 1] === "÷" &&
          !numberArray.includes(textArray[index + 1])) ||
        (textArray[index - 1] === "+" &&
          !numberArray.includes(textArray[index + 1])) ||
        (textArray[index - 1] === "−" &&
          !numberArray.includes(textArray[index + 1]))
      ) {
        textArray = textArray.slice(0, index);
        screenElement.innerText = textArray.join("");
      }
      if (
        (textArray[index + 1] === "×" &&
          !numberArray.includes(textArray[index - 1])) ||
        (textArray[index + 1] === "÷" &&
          !numberArray.includes(textArray[index - 1])) ||
        (textArray[index + 1] === "+" &&
          !numberArray.includes(textArray[index - 1])) ||
        (textArray[index + 1] === "−" &&
          !numberArray.includes(textArray[index - 1]))
      ) {
        textArray = textArray.slice(index, 0);
        screenElement.innerText = textArray.join("");
      }
    }

    if (item === "÷") {
      if (textArray[index - 1] === "0" && textArray[index + 1] === "0") {
        screenElement.innerText = "You can't divide by 0";
      }
    }
  });
}
// Testing functionality ↓

function separateNumbersFromOperators(operator, array) {
  const operatorIndex = array.findIndex((value, index) => {
    if (value === operator) {
      console.log(`separateNumbersFromOperators Value: ${value}`);
      return index;
    }
  });

  console.log(`separateNumbersFromOperators Operator Index: ${operatorIndex}`);
  const portArray = array.filter(function (value, index) {
    if (index < operatorIndex) {
      return value;
    }
  });
  const portString = portArray.join("");
  console.log("port array", portArray);
  console.log("port string", portString);
  const starBoardArray = array.filter(function (value, index) {
    if (index > operatorIndex) {
      return value;
    }
  });
  const starBoardString = starBoardArray.join("");
  console.log("starboard array", starBoardArray);
  console.log("starboard string", starBoardString);
  const operand1 = Number(portString);
  const operand2 = Number(starBoardString);

  const operandArray = [operand1, operand2];

  return operandArray;
}

/*---------------------------------------------------------------------------------------------*/

function findLastEquation() {
  let operatorAmount = 0;
  textArray = screenElement.innerText.split("");
  let i = 0;
  while (i < textArray.length) {
    if (textArray[i + 1] === "×" || textArray[i + 1] === "÷") {
      operatorAmount++;
    }

    if (operatorAmount === 0 && typeof textArray[i + 1] === "undefined") {
      multiplicationDivisionPhaseFlag = false;
      additionSubtractionPhaseFlag = true;
      const flagArray = [
        multiplicationDivisionPhaseFlag,
        additionSubtractionPhaseFlag,
      ];
      return flagArray;
    }
    i++;
  }
}

function textExtract() {
  let skipFlag = false;
  let multiplicationDivisionPhaseFlag = true;
  let additionSubtractionPhaseFlag = false;
  let textArray = screenElement.innerText.split("");
  let resultArray = [];
  let firstOperatorFlag = true;
  let equationStart = 0;
  let equationEnd = 0;
  let multipleNumberCounter = -1;
  let operator;
  let returnArray = [];

  let flagArray = findLastEquation();
  if (typeof flagArray !== "undefined") {
    [multiplicationDivisionPhaseFlag, additionSubtractionPhaseFlag] = flagArray;
  }

  for (let i = 0; i < textArray.length; i++) {
    multipleNumberCounter++;
    if (
      textArray[i + 1] === "÷" &&
      firstOperatorFlag === true &&
      multiplicationDivisionPhaseFlag === true
    ) {
      equationStart = i - multipleNumberCounter;

      multipleNumberCounter = 0;
      firstOperatorFlag = false;
      operator = "÷";
      continue;
    }
    if (
      textArray[i + 1] === "−" &&
      firstOperatorFlag === true &&
      additionSubtractionPhaseFlag === true
    ) {
      equationStart = i - multipleNumberCounter;

      multipleNumberCounter = 0;
      firstOperatorFlag = false;
      operator = "−";
      continue;
    }
    if (
      textArray[i + 1] === "+" &&
      firstOperatorFlag === true &&
      additionSubtractionPhaseFlag === true
    ) {
      equationStart = i - multipleNumberCounter;

      multipleNumberCounter = 0;
      firstOperatorFlag = false;
      operator = "+";
      continue;
    }
    if (
      textArray[i + 1] === "×" &&
      firstOperatorFlag === true &&
      multiplicationDivisionPhaseFlag === true
    ) {
      equationStart = i - multipleNumberCounter;

      multipleNumberCounter = 0;
      firstOperatorFlag = false;
      operator = "×";
      continue;
    }

    if (firstOperatorFlag === false) {
      if (
        textArray[i + 1] === "÷" ||
        textArray[i + 1] === "−" ||
        textArray[i + 1] === "+" ||
        textArray[i + 1] === "×" ||
        typeof textArray[i + 1] === "undefined"
      ) {
        equationEnd = i + 1;

        if (operator === "×" || operator === "÷") {
          if (
            textArray.slice(equationStart, equationEnd).includes("+") ||
            textArray.slice(equationStart, equationEnd).includes("−")
          ) {
            const temporaryTextArray = textArray.slice(
              equationStart,
              equationEnd
            );
            const subtractAddArray = temporaryTextArray.filter(
              (value, index) => value === "−" || value === "+"
            );

            console.log(subtractAddArray);

            let subtractAddAmount = subtractAddArray.length;
            for (let k = 0; k < textArray.length; k++) {
              if (
                (textArray[k + 1] === "−" && subtractAddAmount >= 2) ||
                (textArray[k + 1] === "+" && subtractAddAmount >= 2)
              ) {
                subtractAddAmount--;
                continue;
              }
              if (
                (textArray[k + 1] === "−" && subtractAddAmount < 2) ||
                (textArray[k + 1] === "+" && subtractAddAmount < 2)
              ) {
                equationStart = k + 2;
                skipFlag = true;
                break;
              }
            }
          }
        }

        if (skipFlag === false) {
          resultArray = textArray.splice(equationStart, equationEnd);
          console.log(resultArray);
        } else if (skipFlag === true) {
          let phase1 = true;
          for (let v = equationStart; v < textArray.length; v++) {
            if (
              (textArray[v + 1] === "÷" && phase1 === true) ||
              (textArray[v + 1] === "−" && phase1 === true) ||
              (textArray[v + 1] === "+" && phase1 === true) ||
              (textArray[v + 1] === "×" && phase1 === true)
            ) {
              phase1 = false;
              continue;
            } else if (
              (textArray[v + 1] === "÷" && phase1 === false) ||
              (textArray[v + 1] === "−" && phase1 === false) ||
              (textArray[v + 1] === "+" && phase1 === false) ||
              (textArray[v + 1] === "×" && phase1 === false) ||
              (textArray[v + 1] === "undefined" && phase1 === false)
            ) {
              equationEnd = v + 1 - equationStart;
              break;
            }
          }
          resultArray = textArray.splice(equationStart, equationEnd);
        }
        firstOperatorFlag = true;
        returnArray = [separateNumbersFromOperators(operator, resultArray)];
        returnArray.unshift(operator);
        console.log(returnArray);
        returnArray.push(equationStart, equationEnd);

        return returnArray;
      }
    } else {
      continue;
    }
  }
}

function operate() {
  let operandArray = textExtract();
  let result;

  console.log(operandArray);
  const [operator, [operand1, operand2], equationStart, equationEnd] =
    operandArray;

  console.log(operator);
  console.log(operand1);
  console.log(operand2);
  console.log("equation start", equationStart);
  console.log("equation end", equationEnd);

  if (operator === "÷") {
    result = divide(operand1, operand2);
    console.log(result);
  }
  if (operator === "−") {
    result = subtract(operand1, operand2);
    console.log(result);
  }
  if (operator === "+") {
    result = add(operand1, operand2);
    console.log(result);
  }
  if (operator === "×") {
    result = multiply(operand1, operand2);
    console.log(result);
  }
  let displayResult = result.toString();
  const temporaryArray = screenElement.innerText.split("");

  // console.log(displayResult);
  // console.log(temporaryArray);
  // console.log(equationEnd);

  temporaryArray.splice(equationStart, equationEnd, displayResult);

  const temporaryString = temporaryArray.join("");

  screenElement.innerText = temporaryString;
  if (screenElement.innerText.length > displayResult.length) {
    operate();
  }
}

function clear() {
  clearElement.addEventListener("click", () => {
    screenElement.innerText = "";
  });
}
function display() {
  screenElement.innerText = "";
  screenElement.style.cssText = "word-break: break-all; overflow: auto;";
  let screenTextArray = screenElement.innerText.split("");
  loop: for (const i of screenTextArray) {
    if (screenTextArray.length > 200) {
      screenTextArray.pop();
    } else {
      const screenNumbers = screenTextArray.join("");
      screenElement.innerText = screenNumbers;
      break loop;
    }
  }
}

clear();
display();
displayNumbers();
