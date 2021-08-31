var startBtn = document.getElementById('start');
var timerNum = document.getElementById('timer-numbers');
var bigText = document.getElementById('big-text');
var questionsArea = document.getElementById('questions');
var highScore = document.getElementById('high-scores');
var mainArea = document.getElementById('main-area');

var correctOrIncorrect = document.getElementById('check');

// intalize the counter varible in the global scope
var x = 0; 

// intalize the timer counter variable in the global scope
var timeLeft = 180;

// Arry which will hold my questions 
var questionArr = [
    {q: "HTML can be considered the 'skeleton' of a website", c: ["Yes", "No"], a: "Yes"},
    {q: "This is a test question", c: ["Yes", "No"], a: "No"}
]

function test() {
    console.log('test')
}

function counter() {
    if (x < 5) {
        x++;
    }
}

// Function to display questions 
function displayQuestions() {
   

 // Replaces the big text area with the questions 
    bigText.textContent = questionArr[x].q;

    console.log(questionArr[x].c.length);

    for (var i = 0; i < questionArr[x].c.length; i++) {
        
        if (questionArr[x].c[i] === questionArr[x].a) {

            questionsArea.innerHTML += "<button class='correct'>" + questionArr[x].c[i] + "</button>";
       
        } else { 
            
            questionsArea.innerHTML += "<button class='incorrect'>" + questionArr[x].c[i] + "</button>"; 
        }
    }
}

function displayHighScores() {

};

// Timer that counts down from 180 seconds 
function countdown() {

    // remove the start button 
    startBtn.remove();

    displayQuestions();

    // setInterval()
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerNum.textContent = timeLeft;
            timeLeft--;
        } else {
            timerNum.textContent = 'No more time left';
            clearInterval(timeInterval);
        }
    }, 
    1000
    );
}

// function that selects and deletes class 'correct' and 'incorrect'
function deleteQuestions() {
    toDeleteEl = document.querySelector(".correct");
    toDeleteAlsoEl = document.querySelector(".incorrect");
    toDeleteEl.remove();
    toDeleteAlsoEl.remove();
};

// function to target dynmicaly generated html elements and give them the 'click' funcationallity
var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // correct button was clicked
  // display correct
  // update the global question counter
  // display the next set of questions
  // delete the previous choices 
  if (targetEl.matches('.correct')) {
    correctOrIncorrect.textContent = 'Correct!';
    counter();
    displayQuestions();
    deleteQuestions();
  }

  // display incorrect
  // update the global question counter
  // display the next set of questions 
  // delete the previous choices
  else if (targetEl.matches('.incorrect')) {
    correctOrIncorrect.textContent = "Incorrect!";
    counter();
    timeLeft = timeLeft - 10;
    displayQuestions();
    deleteQuestions();
  }
}

// adding an on click listenr to the start button
startBtn.onclick = countdown;

// listener to dynmically created html
mainArea.addEventListener('click', taskButtonHandler);

// highScore.onclick = 