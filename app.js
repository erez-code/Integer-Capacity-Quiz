var printButton = document.getElementById("buttonPrintNewRandomInt");
var displayResault = document.getElementById("displayResault1");
var scoreUpdatge = document.getElementById("score");
var buttonCheckAnswer = document.getElementById("buttonCheckAnswer");
var answerInBytes = document.getElementById("answerInBytes");

var randomNumOfBytes;
var randomInteger;
var triedToAnswerFlag = 0;
var scoreCount = 0;
printNewRandomInt();

printButton.addEventListener("click", printNewRandomInt);

function printNewRandomInt() {
  var rangeOfByte = Math.pow(2, 8);
  randomNumOfBytes = getRndInteger(1, 5);

  var minInt =
    randomNumOfBytes != 1 ? Math.pow(rangeOfByte, randomNumOfBytes - 1) : 0;

  var maxInt = Math.pow(rangeOfByte, randomNumOfBytes) - 1;

  randomInteger = getRndInteger(minInt, maxInt);

  var displayPrintNewRandomInt = document.getElementById(
    "displayPrintNewRandomInt"
  );

  displayPrintNewRandomInt.innerHTML = Number(randomInteger).toLocaleString();
  displayResault.innerHTML = "";
  triedToAnswerFlag = 0;
  buttonCheckAnswer.disabled = false;

  answerInBytes.value = "";
}

answerInBytes.addEventListener("keyup", function() {
  if (event.keyCode === 13) {
    buttonCheckAnswer.click();
  }
});

document.body.addEventListener("keyup", function() {
  if (event.keyCode === 78) {
    printButton.click();
  }
});

buttonCheckAnswer.addEventListener("click", function() {
  var answerInBytesValue = answerInBytes.value;

  if (triedToAnswerFlag == 0) {
    if (answerInBytesValue === "") {
      displayResault.innerHTML = "Not enough input.";
    } else if (answerInBytesValue > 4 || answerInBytesValue < 1) {
      displayResault.innerHTML = "Insert a number between 1 and 4.";
    } else {
      //CHECK ANSWER
      var bin = randomInteger.toString(2);
      //var bin_length = bin.length;
      bin = bin.padStart(32, "0");

      displayResault.innerHTML =
        " this value requires " +
        randomNumOfBytes +
        " byte(s)." +
        "<br />" +
        bin.substring(0, 8) +
        " " +
        bin.substring(8, 16) +
        " " +
        bin.substring(16, 24) +
        " " +
        bin.substring(24, 32);

      if (answerInBytesValue == randomNumOfBytes) {
        ++scoreCount;
        scoreUpdatge.innerHTML = scoreCount;
        displayResault.insertAdjacentHTML("afterbegin", "Correct!");
      } else {
        displayResault.insertAdjacentHTML("afterbegin", "Wrong!");
      }
      triedToAnswerFlag = 1;
      buttonCheckAnswer.disabled = true;
    }
  }
});

function randomInt() {
  return Math.floor(Math.random() * Math.pow(256, 4)) + 1;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
