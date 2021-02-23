//global 
var quiz = [{ //quiz object
    number: 1,
    question: "question 1",
    choices: ["a option ", "correct ", "c option ", "d option "],
    answer: "correct "
    },
    {
    number: 2,
    question: "question 2",
    choices: ["a option ", "b option ", "c option ", "correct "],
    answer: "correct "
    },
    {
    number: 3,
    question: "question 3",
    choices: ["a option ", "b option ", "correct ", "d option "],
    answer: "correct "
    },
    {
    number: 4,
    question: "question 4",
    choices: ["correct ", "b option ", "c option ", "d option "],
    answer: "correct "
    },
    {
    number: 5,
    question: "question 5",
    choices: ["a option ", "correct ", "c option ", "d option "],
    answer: "correct "
    },
];

const startBtn = document.querySelector('#start_btn');
const exitBtn = document.querySelector('#quit_btn');
const continueBtn = document.querySelector('#restart_btn');
const nextBtn = document.querySelector('#nxt_btn');

const infoBox = document.querySelector('#info_box');
const quizBox = document.querySelector('#quiz_box');

const questionEl = document.querySelector('#questions');
const choiceList = document.querySelector('#choice_list');

const secondsLeft = quiz_box.querySelector('#timer_sec');
const timerTextEl = quizBox.querySelector('#timer_text')


//if start button clicked
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo"); //show info box
}

//if exit button clicked
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); //hide info box
}

//if continue button clicked
continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.add("activeQuiz"); //show quiz box
    renderQuestion(0); //question in position 1
    questionCounter(1); //start question count at 1
    startTimer(10);
}

let questionCount = 0;//start with question in position 1
let questionNumber = 1; //start with question 1
let timerInterval; //start with undefined timer count
let seconds = 60; //start timer with 60 sec

nxt_btn.onclick = () => { //if next button is clicked
    if (questionCount < quiz.length - 1) {
        questionCount++; //increase question count
        questionNumber++; //increase number count
        renderQuestion(questionCount); //call following funtions simultaneously
        questionCounter(questionNumber);
    } else { // if the question count is not less than the quiz length
        console.log("You've completed the Quiz!");
    }    
}

// getting questions and choices from array
function renderQuestion(index) { //define renderQuestion function
    questionEl.innerHTML = ''; //clear questions div = allows content of div to be replaced with each new question and it's contents
    let questionText = '<span>' + quiz[index].number + ". " + quiz[index].question + '</span>'; // specify where question text and question number will display - pulling from quiz object index
    let choicesText = // specify where choices text will display - pulling from quiz object index
          '<div class="choice_item"><span>' + quiz[index].choices[0] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[1] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[2] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[3] + '</span></div>';
    
    questionEl.innerHTML = questionText; //set question text to display in DOM
    choiceList.innerHTML = choicesText; //set choices text to display in each choice element in 

    //set new constant variable choice to link to each choice item in DOM
    const choice = choiceList.querySelectorAll(".choice_item");
    for (let i = 0; i < choice.length; i++) { //when a choice is clicked - set choice user clicks to 'choice selected' 
        choice[i].setAttribute("onclick", "choiceSelected(this)");
    }
}

function choiceSelected(answer) { //define 'choice selected' function, and compare with correct answer
    let userAnswer = answer.textContent;
    let correctAnswer = quiz[questionCount].answer;
    let allChoices = choiceList.children.length; //assign 'all choices' variable to length of choice items (which are children of 'choice list')
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct"); //add css selector to show green if correct answer is selected
        console.log("Answer is Correct"); 
    } else {
        answer.classList.add("incorrect"); //add css selector to show red if wrong selection is made
        console.log("Answer is Wrong");

        //if answer is incorrect, automatically show correct answer
        for (let i = 0; i < allChoices; i++){
            if (choiceList.children[i].textContent == correctAnswer) {
                choiceList.children[i].setAttribute("class", "choice_item correct");
            }
        }
    }
    
    for (let i = 0; i < allChoices; i++) {// once user selects, disable all options
        choiceList.children[i].classList.add("disabled"); //disable pointer events when a selection is made
    }
}

function startTimer(seconds) { //define startTimer function
    count = setInterval(timer, 1000);
    timerTextEl.innerHTML = "Time Left"
    function timer() {
        secondsLeft.textContent = seconds;
        seconds--;
        if (seconds < 1) {
            clearInterval(count);
            secondsLeft.textContent = "00";
            timerTextEl.innerHTML = "Time's Up!";
        }
    }        
}


function questionCounter(index) { //define questionCounter function using quiz object index
    const bottomQuestionCounter = quizBox.querySelector(".total_questions"); //link bottomQuestionCounter variable to total_questions div
    let totalQuesCountText = '<span><p>' + questionCount + '</p>of<p>' + quiz.length + '</p>Questions</span>'; // specify where question count will appear
    bottomQuestionCounter.innerHTML = totalQuesCountText; 
}
    // choicesEl.addEventListener('click', (event) => { // add click event to all choices
    //     alert('you clicked the ' + (event.target.dataset.correct === 'true' ? 'correct' : 'wrong!') + ' button') // true false statement to evaluate if button the user clicked is correct
    // });
