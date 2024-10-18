// Sum numbers

const calculateSumButtonElement = document.querySelector("#calculator button");

function calculateSum() {
  let num = document.getElementById("user-number").value;
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  const outputElement = document.getElementById("calculated-sum");
  outputElement.innerText = sum;
  outputElement.style.display = "block";
}

calculateSumButtonElement.addEventListener("click", calculateSum);

// Highlight Links
const highlightButtonElement = document.querySelector(
  "#highlight-links button"
);

function highlightLink() {
  const anchorElements = document.querySelectorAll("#highlight-links a");
  for (const anchorElement of anchorElements) {
    anchorElement.classList.add("highlight");
  }
}

highlightButtonElement.addEventListener("click", highlightLink);

// Display user data

const dummyUserData = {
  Name: "Max",
  Age: 25,
  Nationality: "Swiss",
};

const userDataButtonElement = document.querySelector("#user-data button");

function displayUserData() {
  const userDataElement = document.getElementById("output-user-data");

  userDataElement.innerHTML = ""; // empty the content;
  for (const key in dummyUserData) {
    const newUserDataElement = document.createElement("li");
    newUserDataElement.innerText = key + ": " + dummyUserData[key];
    userDataElement.append(newUserDataElement);
  }
}

userDataButtonElement.addEventListener("click", displayUserData);

// Statics

const rollDiceButton = document.querySelector("#statistics button");

function generateDiceNumber() {
  let diceNum = Math.floor(Math.random() * 6 + 1);
  return diceNum;
}

function rollDice() {
  const diceInputElement = document.getElementById("user-target-number");
  const diceInputNum = diceInputElement.value;
  const diceRollsListElement = document.getElementById("dice-rolls");

  diceRollsListElement.innerHTML = "";

  let rolledNum = 0;
  let i = 0;
  while (rolledNum != diceInputNum) {
    //
    rolledNum = generateDiceNumber();
    console.log(rolledNum);
    console.log(diceInputNum);
    const newDiceRollsList = document.createElement("li");
    newDiceRollsList.innerText = rolledNum;
    diceRollsListElement.append(newDiceRollsList);
    i++;
  }

  const totalRollElement = document.getElementById("output-total-rolls");
  const TargetNumElement = document.getElementById("output-target-number");
  totalRollElement.innerText = i;
  TargetNumElement.innerText = diceInputNum;
}

rollDiceButton.addEventListener("click", rollDice);
