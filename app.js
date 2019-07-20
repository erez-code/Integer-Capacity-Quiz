var printButton = document.getElementById("buttonPrintNewRandomInt");
var displayResault = document.getElementById("displayResault1");
var scoreUpdatge = document.getElementById("score");
var buttonCheckAnswer = document.getElementById("buttonCheckAnswer");

var randomNumOfBytes;
var randomInteger;
var triedToAnswerFlag = 0;
var scoreCount = 0;
printNewRandomInt();

printButton.addEventListener("click", printNewRandomInt);

function printNewRandomInt() {
  var rangeOfByte = 256;
  randomNumOfBytes = getRndInteger(1, 4);

  var minInt =
    randomNumOfBytes != 1 ? Math.pow(rangeOfByte, randomNumOfBytes - 1) : 0;

  var maxInt = Math.pow(rangeOfByte, randomNumOfBytes) - 1;

  /*console.log(
    "randomNumOfBytes " +
      randomNumOfBytes +
      " minint:" +
      minInt +
      " maxint: " +
      maxInt
  );*/

  randomInteger = getRndInteger(minInt, maxInt);

  var displayPrintNewRandomInt = document.getElementById(
    "displayPrintNewRandomInt"
  );

  displayPrintNewRandomInt.innerHTML = Number(randomInteger).toLocaleString();
  displayResault.innerHTML = "";
  triedToAnswerFlag = 0;
  buttonCheckAnswer.disabled = false;
}

buttonCheckAnswer.addEventListener("click", function() {
  var answerInBytes = document.getElementById("answerInBytes").value;

  if (triedToAnswerFlag == 0) {
    if (answerInBytes === "") {
      displayResault.innerHTML = "Not enough input.";
    } else if (answerInBytes > 4 || answerInBytes < 1) {
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

      if (answerInBytes == randomNumOfBytes) {
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
