//global variables //quiz object
var quiz = [{
        question: "Question one",
        choices: ["a option ", "correct ", "c option ", "d option "],
        answer: "correct "
    },
    {
        question: "Question two",
        choices: ["a option ", "b option ", "c option ", "correct "],
        answer: "correct "
    },
    {
        question: "Question three",
        choices: ["a option ", "b option ", "correct ", "d option "],
        answer: "correct "
    },
    {
        question: "Question four",
        choices: ["correct ", "b option ", "c option ", "d option "],
        answer: "correct "
    },
    {
        question: "Question five",
        choices: ["a option ", "correct ", "c option ", "d option "],
        answer: "correct "
    },
];

var score = 0; //start score at 0
var questionIndex = 0; //start with question in position 1
var choicesIndex = 0 //start with choices in position 1
var answerIndex = 0; //start with answer in postion 1

var startBtn = document.querySelector('#start_btn');
var timerTextEl = document.querySelector('#timer_text')
var timer = document.querySelector('#timer_sec');
var questionEl = document.querySelector('#questions');
var choicesEl = document.querySelector('#choice_list');
var userChoiceBtn = document.querySelector('#choice_item');

var timerInterval;
var seconds = 61;


timerTextEl.textContent = "Time Left"
timer.textContent = "60"

function startTimer() { //define startTimer function
    timer.innerHTML = '';
    timerInterval = setInterval(function() {
        seconds--;
        timer.textContent = seconds;
        if (seconds < 1) {
            timerTextEl.textContent = "Time's Up!";
        }
    }, 1000);
    
}