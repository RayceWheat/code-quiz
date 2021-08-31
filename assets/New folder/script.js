var startBtn = document.getElementById('start');
var timerNum = document.getElementById('timer-numbers');
var bigText = document.getElementById('big-text');

// Arry which will hold my questions 
var questionArr = [
    {q: "Is the sky blue", a: "t"}
]

function test() {
    console.log('test')
}

console.log(bigText);

console.log(bigText.textContent);

function displayQuestions() {
    bigText.textContent = questionArr[0].q;
}

// Timer that counts down from 180 seconds 
function countdown() {
    var timeLeft = 180;

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



startBtn.onclick = countdown;