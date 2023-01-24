//Designating variables to be used
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

//Array of objects that will be used to display information as well as to compare user input to correct answers
var objArray = [{
    question: "Inside which HTML element do we put the Javascript?",
    choices: ["<javascript", "<js>", "<script>", "<scripting>"],
    correctChoice: "<script>"
},{
    question: "Where is the correct place to put a Javascript?",
    choices: ["<header>", "<body>", "<footer>", "both <header> and <body>"],
    correctChoice: "both <header> and <body>"
},{
    question: "How would you write a function in Javascript?",
    choices: ["function:myFunction()", "function=myFunction()", "function.myFunction()", "function myFunction()"],
    correctChoice: "function=myFunction"
},{
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onchange", "onmouseclick", "onleftclick"],
    correctChoice: "onclick" 
},{
    question: "How would you write an IF statement in Javascript?",
    choices: ["if (i==5)", "if i = 5", "if i = 5 then", "if i is 5 then"],
    correctChoice: "if (i==5)"  
}]


//Setting base values for variables that are numerical
var score = 0
var timeLeft = 100
var currentQuestion = 0



function startGame() {
    //Console.log startGame to check if button works
    console.log('Game Start');
    //Call startClock to begin timer
    startClock();
    //Call loadQuestion to load the first question and its associated choices
    loadQuestion();
    //Once the first set of questions are loaded and the first answer is selected, eventListeners for the choice buttons will continue the cycle of questions.


    //Update display of header to the first question number
    currentQuestion++;
    quizHeader.textContent = "YOU ONLY GOT 100 SECONDS SO MAKE IT COUNTS!"
    
    //Displays the quiz content section by removing the 'is-hidden' class
    quizSection.classList.remove('is-hidden');
    //Displays the choices users can select by removing the 'is-hidden' class
    choiceSection.classList.remove('is-hidden');
    //TODO: display placeholder for correct/incorrect answer by removing is-hidden class
    scoreEl.classList.remove('is-hidden');
    //TODO: hide the click to start button by adding the is-hidden class
    startButton.classList.add('is-hidden');
}

//Function that starts timer countdown and will be called on eventListener for startButton 
function startClock(){    
var gameClock = setInterval(function(){
    timeLeft--;
    timer.textContent = 'Time: ' + timeLeft;
     if(timeLeft <= 0) {
        clearInterval(gameClock);
        endGame();
        // displayScores();
     }
},1000);
}

//Function that is called on startGame and will load next question, function is also called on checkFinalQuestion function
function loadQuestion() {
        //Grabs the question and answers and displays question and answers
    questionText.textContent = objArray[currentQuestion].question;
    choiceOne.textContent = objArray[currentQuestion].choices[0]
    choiceTwo.textContent = objArray[currentQuestion].choices[1]
    choiceThree.textContent = objArray[currentQuestion].choices[2]
    choiceFour.textContent = objArray[currentQuestion].choices[3]
}
//Function that is called when when user selects an answer
function checkAnswer(event) {
    //Check which button user selected and call function answerCompare to compare user input to the correct answer
    var userChoice = event.target;
    answerCompare(userChoice.textContent, objArray[currentQuestion].correctChoice);
    //Function called to increment currentQuestion and to check if it is the final question
    checkFinalQuestion();
    console.log(score)
}

//Function that is used to compare user selected answewr to the correctIndex in objArray 
function answerCompare(userSelected, correctSelect) {
    if (userSelected != correctSelect){
        //Questions are worth 20 points if correct, if user has less than 20 points, the score will remain 0
        //If user selected incorrect, deduct points and update text to display incorrect
        if (score != 0) {
            score = score - 20;
        } else {
            score = score;
        }
        timeLeft = timeLeft - 10;
        scoreText.textContent = 'That is incorrect!';
    }
    //if user selected correct -- update text at bottom to display correct
    //if wanting to track correct number - score++
    else{
        score = score + 20;
        scoreText.textContent = 'That is correct!';
    }
}
//Function to increment currentQuestion and check if final question, if it is the last question, run the endGame function, if not call loadQuestion();
function checkFinalQuestion(){
    currentQuestion++;
    if (currentQuestion === 5){
        clearInterval(gameClock);
        endGame();
        // displayScores();
    }
    else {
        loadQuestion();
    }
}

//Function is still in progress
function endGame() {
    //Hide all unnecessary areas to make space for scoreboard
    var quizContainer = document.getElementById('quiz-container')
    quizContainer.classList.add('is-hidden');
    quizSection.classList.add('is-hidden');
    choiceSection.classList.add('is-hidden');
    scoreEl.classList.add('is-hidden');
    startButton.classList.add('is-hidden');

    //Display submission page and scoreboard
    var submissionContainer = document.getElementById('submissionContainer')
    var submissionForm = document.getElementById('submissionForm')
    
    //TODO: stop timer if still running
    clearInterval(gameClock);

    //TODO: display input for user Initials

}

// function displayScores() {
    //TODO: display score after submission of Initials
    //TODO: check local storage for pre-existing
        //if none, create new array
    //TODO: add new score to local storage
    //TODO: compare scores in local storage
// }

//Event listener for start button
startButton.addEventListener('click', startGame)
//Event listeners when user selects an answer - will checkAnswer and run through checkpoints
choiceOne.addEventListener('click', checkAnswer)
choiceTwo.addEventListener('click',checkAnswer)
choiceThree.addEventListener('click', checkAnswer)
choiceFour.addEventListener('click', checkAnswer)
//Event listener for showing highscores, skipping quiz
showHighScore.addEventListener('click',displayScores)