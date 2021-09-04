var startBtn = document.getElementById('start');
var timerNum = document.getElementById('timer-numbers');
var bigText = document.getElementById('big-text');
var questionsArea = document.getElementById('questions');
var highScore = document.getElementById('high-scores');
var mainArea = document.getElementById('main-area');
var scoreArea = document.getElementById('score-area')
var correctOrIncorrect = document.getElementById('check');

//Intalize the number of scores saved 
if (localStorage.getItem('scores') === null) {
  localStorage.setItem('scores', ' ');
}

console.log(localStorage.getItem('scores'))

// intalize the counter varible in the global scope
var x = 0; 

// intalize the timer counter variable in the global scope
var timeLeft = 180;

// Arry which will hold my questions 
var questionArr = [
    {q: "HTML can be considered the 'skeleton' of a website", c: ["Yes", "No"], a: "Yes"},
    {q: "jQuery and Bootstrap are examples of what?", c: ["Sandwiches", "API", "Programming languages", "Lunch"], a: "API"},
    {q: "Which of these is *NOT* an <img> attribute?", c: ["alt", "width", "src", "href"] , a: "href"},
    {q: "In the context of Javascript what does 'truthy' mean?", c: ["A value that is considered true when encounter in a Boolean context", "A universal human truth", "Something that is false"], a: "A value that is considered true when encounter in a Boolean context"},
    {q:  "How do you 'comment' in CSS?", c: ["!-", "//", "#", "/* */"], a: "/* */"}
]

// counter function which stops when counter reachers 5
function counter() {

    if (x < 5) {
        x++;    
        //console.log(x);
    } else if (x === 4) {
        displayHighScores();
    }
}

// Function to display questions 
function displayQuestions() {

    if (x === 5) {
        return;
    } else  {
   
   // Replaces the big text area with the questions 
   bigText.textContent = questionArr[x].q;

    for (var i = 0; i < questionArr[x].c.length; i++) {
        
         if (questionArr[x].c[i] === questionArr[x].a) {

            questionsArea.innerHTML += "<button class='correct'>" + questionArr[x].c[i] + "</button>";
       
        } else { 
            
            questionsArea.innerHTML += "<button class='incorrect'>" + questionArr[x].c[i] + "</button>"; 
    }
  }
 }
}


function displayHighScores() {
    var numPlayers = Number(localStorage.getItem('players'));

    console.log(numPlayers);

    // after the last question switches to the submitting initials and score
    if (x === 5) {
    bigText.textContent = "Please enter your initials";

    questionsArea.innerHTML += '<input type="text" id="name"/>';
    questionsArea.innerHTML += "<button type='submit' id='btn-name' name='Submit'>" + "Submit" + "</button>";

    correctOrIncorrect.textContent = "Score:" + timeLeft;

    } else {
        return;
    }
};


// Timer that counts down from 180 seconds 
function countdown() {

    // remove the start button 
    startBtn.remove();

    // runs the function which will display questions 
    displayQuestions();

    // setInterval()
    var timeInterval = setInterval(function() {
        if (x === 5) {
            clearInterval;
            }   else {
        if (timeLeft > 0) {
            timerNum.textContent = timeLeft;
            timeLeft--;
        }  else {
            timerNum.textContent = 'No more time left';
            clearInterval(timeInterval);
        }
       }
    }, 
    1000
    );
}

// function that selects and deletes class 'correct' and 'incorrect'
function deleteQuestions() {
    // Select the correct class and remove it
    toDeleteEl = document.querySelector(".correct");
    toDeleteEl.remove();

    // Select *all* incorrect class
    toDeleteAlsoEl = document.querySelectorAll(".incorrect");
    for (var i = 0; i <toDeleteAlsoEl.length; i++) {
        toDeleteAlsoEl[i].remove();
    }
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
    deleteQuestions();
    displayQuestions();
    displayHighScores();
  }

  // display incorrect
  // update the global question counter
  // display the next set of questions 
  // delete the previous choices
  else if (targetEl.matches('.incorrect')) {
    correctOrIncorrect.textContent = "Incorrect!";
    counter();
    timeLeft = timeLeft - 10;    
    deleteQuestions();
    displayQuestions();
    displayHighScores();
  }
}

var buttonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches('#btn-name')) {
        //var playerCount = Number(localStorage.getItem('players'));

       // playerCount++;

       // localStorage.setItem('players', String(playerCount));

        var userName = document.getElementById('name').value;

        userName += ' ' + String(timeLeft) + localStorage.getItem('scores') + ' ';

        localStorage.setItem('scores', userName);
        
        showHighScores();
    }

 
}

var showHighScores = function(event) {

    scoreArea.textContent += localStorage.getItem('scores');

}

// adding an on click listenr to the start button
startBtn.onclick = countdown;

highScore.onclick = showHighScores;

// listener to dynmically created html
mainArea.addEventListener('click', taskButtonHandler);
mainArea.addEventListener('click', buttonHandler);

// highScore.onclick = 