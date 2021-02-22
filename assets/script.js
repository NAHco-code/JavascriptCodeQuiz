//global variables 
var quiz = [{ //quiz object
    question: 1,
    choices: ["a option ", "correct ", "c option ", "d option "],
    answer: "correct "
    },
    {
    question: 2,
    choices: ["a option ", "b option ", "c option ", "correct "],
    answer: "correct "
    },
    {
    question: 3,
    choices: ["a option ", "b option ", "correct ", "d option "],
    answer: "correct "
    },
    {
    question: 4,
    choices: ["correct ", "b option ", "c option ", "d option "],
    answer: "correct "
    },
    {
    question: 5,
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
const choicesEl = document.querySelector('#choice_list');


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
    renderQuestion(0);
}

let questionCount = 0;//start with question in position 1
//if next button is clicked

nxt_btn.onclick = () => {
    if (questionCount < quiz.length - 1) {
        questionCount++;
        renderQuestion(questionCount);
    } else {
        console.log("You've completed the Quiz!");
    }    
}

function renderQuestion(index) { //define renderQuestion function
    questionEl.innerHTML = ''; //clear questions div = allows content of div to be replaced with each new question and it's contents
    let questionText = '<span>' + quiz[index].question + '</span>';
    let choicesText =
        '<div class="choice_item"><span>' + quiz[index].choices[0] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[1] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[2] + '</span></div>'
        + '<div class="choice_item"><span>' + quiz[index].choices[3] + '</span></div>';
    
    questionEl.innerHTML = questionText;
    choicesEl.innerHTML = choicesText;
    // questionEl.appendChild(questionTextEl, choicesEl); //attach text content of current question index to questions div
}
    // choicesEl.addEventListener('click', (event) => { // add click event to all choices
    //     alert('you clicked the ' + (event.target.dataset.correct === 'true' ? 'correct' : 'wrong!') + ' button') // true false statement to evaluate if button the user clicked is correct
    // });
