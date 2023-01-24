// set variables using getElementById to create functions
var startButton = document.getElementById('start-btn')
var quizHeader = document.querySelector('h1')
var quizSection = document.getElementById('quiz-box')
var questionText = document.getElementById('question-text')
var timer = document.getElementById('timer')
var scoreEl = document.getElementById('score')
var scoreText = document.getElementById('score-text')
var showHighScore = document.getElementById('viewHS')


var choiceSection = document.getElementById('choice-box')
var choiceOne = document.getElementById('choiceOne')
var choiceTwo = document.getElementById('choiceTwo')
var choiceThree = document.getElementById('choiceThree')
var choiceFour = document.getElementById('choiceFour')

//Array of questions and answers to compare user selection to correct answers
var objArray = [{
    question: "Inside which HTML element do we put the Javascript?",
    choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
    correctChoice: "<script>"
},{
    question: "Where is the correct place to put a Javascript?",
    choices: ["both <header> and <body>", "<body>", "<footer>", "<header>"],
    correctChoice: "both <header> and <body>"
},{
    question: "How would you write a function in Javascript?",
    choices: ["function:myFunction()", "function=myFunction()", "function.myFunction()", "function myFunction()"],
    correctChoice: "function=myFunction()"
},{
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onchange", "onmouseclick", "onleftclick"],
    correctChoice: "onclick" 
},{
    question: "How would you write an IF statement in Javascript?",
    choices: ["if (i==5)", "if i = 5", "if i = 5 then", "if i is 5 then"],
    correctChoice: "if (i==5)"  
}]


//setting variables for score time left and current question
var score = 0
var timeLeft = 100
var currentQuestion = 0

showHighScore.onclick=()=>
console.log("High Score");
    quizSection.classList.remove("is-hidden");



function startGame() {
    //Console.log startGame to check if button works. tested in console and button works
    console.log('Game Start');
    startClock()
    loadQuestion();


    //Update display of header after clicking start
    currentQuestion++;
    quizHeader.textContent = "YOU ONLY GOT 100 SECONDS SO MAKE IT COUNTS!"
    
    //Displays the quiz content section
    quizSection.classList.remove('is-hidden');
    //Displays the choices users can select 
    choiceSection.classList.remove('is-hidden');
    // display placeholder for correct/incorrect answer
    scoreEl.classList.remove('is-hidden');
    // hide the click to start button
    startButton.classList.add('is-hidden');
}

//Function that starts timer countdown and will be called on eventListener for startButton 
function startClock(){    
var gameClock = setInterval(function(){
    timeLeft--;
    timer.textContent = 'Time: ' + timeLeft;
     if(timeLeft <= 0) {
        clearInterval(gameClock);
     }
},1000);
}

//Function that is called on startGame and will load next question
function loadQuestion() {
    questionText.textContent = objArray[currentQuestion].question;
    choiceOne.textContent = objArray[currentQuestion].choices[0]
    choiceTwo.textContent = objArray[currentQuestion].choices[1]
    choiceThree.textContent = objArray[currentQuestion].choices[2]
    choiceFour.textContent = objArray[currentQuestion].choices[3]
}
//check users selections
function checkAnswer(event) {
    let correctChoice= ["<script>","both <header> and <footer>","function=myFunction()","onclick","if (i===5)"]
    var userChoice = event.target;
    answerCompare(userChoice.textContent, objArray[currentQuestion].correctChoice);
    checkFinalQuestion();
    console.log(score)
}

//Function that is used to compare user selections 
function answerCompare(userChoice, correctChoice) {
    if (userChoice === correctChoice){
            score = score + 20;
            scoreText.textContent = 'That is correct!';
        } else {
        (score >= 0)
        score = score;
        timeLeft = timeLeft - 10;
    if (userChoice != correctChoice){
        scoreText.textContent = 'That is incorrect!';
    }
    } 
}
function checkFinalQuestion(){
    currentQuestion++;
    if (currentQuestion === 5){
        return;
        // displayScores();
    }
    else {
        loadQuestion();
    }
}

    //Display submission page and scoreboard
    var submissionContainer = document.getElementById('submissionContainer')
    var submissionForm = document.getElementById('submissionForm')


//Event listener for start button
startButton.addEventListener('click', startGame)
choiceOne.addEventListener('click', checkAnswer)
choiceTwo.addEventListener('click',checkAnswer)
choiceThree.addEventListener('click', checkAnswer)
choiceFour.addEventListener('click', checkAnswer)
