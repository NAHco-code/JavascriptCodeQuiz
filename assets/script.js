//global 
var quiz = [{ //quiz object
    number: 1,
    question: "Which one of these HTML tags can you write the JavaScript Code?",
    choices:
        ["&lt; javascript &gt;",
            "&lt; scripted &gt;",
            "&lt; script >",
            "&lt; js &gt;"], //why is the right answer showing up wrong?
    answer: "&lt; script >",
    explanation: "If you want to write inline JavaScript code, or link a Javascript file to your HTML file, you must use the `&lt;script&gt;` tag."
    },
    {
    number: 2,
    question: "What's the correct JavaScript syntax to change the content of the following HTML code?  `&lt;p> id=`geek`>GeeksforGeeks&lt;/p&gt;`",
    choices:
        ["document.getElement(“geek”).innerHTML=”I am a Geek”;",
            "document.getElementById(“geek”).innerHTML=”I am a Geek”;",
            "document.getId(“geek”)=”I am a Geek”;",
            "document.getElementById(“geek”).innerHTML=I am a Geek;"],
    answer: "document.getElementById(“geek”).innerHTML=”I am a Geek”;",
    explanation: "The correct syntax to access the element is document.getElementById(“geek”). Here we want to access the content written under that id, so we used .innerHTML to specify that and finally we replaced the content with whatever is written inside the quotes."
    },
    
{
    number: 3,
    question: "Which of the following is the correct syntax to display “NerdsforNerds” in an alert box using JavaScript?",
    choices:
        ["alertbox(“NerdsforNerds”);",
            "msg(“NerdsforNerds”);",
            "msgbox(“NerdsforNerds”);",
            "alert(“NerdsforNerds”);"],
    answer: "alert(“NerdsforNerds”);",
    explanation: "To display any text in the alert box, you need to write it as alert(“NerdsforNerds”);."
    },
    {
    number: 4,
    question: "What is the correct syntax for referring to an external script file called “allnighter.js”?",
    choices:
            ["&lt;script src=”allnighter.js”&gt;",
                "&lt;script href=”allnighter.js”&gt;",
                "&lt;script ref=”allnighter.js”&gt;",
                "&lt;script name=”allnighter.js”&gt;"],
    answer: "&lt;script src=”allnighter.js”&gt;",
    explaination: "The “src” term is used to refer to any JavaScript file."
    },
    {
    number: 5,
    question: "The external JavaScript file must contain  &lt;script&gt; tag. True or False?",
    choices: ["True", "False", "Maybe", "Null"],
    answer: "False",
    explanation: "It is not necessary for any external javascript file to have &lt;script&gt; tag."
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
const choice = choiceList.querySelectorAll(".choice_item");

var secondsLeft = quiz_box.querySelector('#timer_sec');
var timerTextEl = quizBox.querySelector('#timer_text')

var score = 0;
var penalty = 5;
var newList = document.createElement("ul"); //create element for compare function
let quizIndex = 0;
let questionCount = 0;//start with question in position 1
let questionNumber = 1; //start with question 1
var timerInterval; //start with undefined timer count
var seconds = 61; //start timer with 60 sec

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
    startTimer(seconds);
    renderQuestion(0); //question in position 1
    questionCounter(1); //start question count at 1
    
}

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

function startTimer(seconds) { //define startTimer function
    timerInterval = setInterval(function () {
        timerTextEl.innerHTML = "Time Left"
        seconds--;
        secondsLeft.textContent = seconds;
        
        if (seconds < 1) {
            secondsLeft.textContent = "00";
            timerTextEl.innerHTML = "Time's Up!";
        }
    }, 1000);      
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
    choiceList.innerHTML = choicesText; //set choices text to display in each choice element in DOM

    //set new constant variable choice to link to each choice item in DOM
    const choice = choiceList.querySelectorAll(".choice_item");
    for (let i = 0; i < choice.length; i++) { //when a choice is clicked - set choice user clicks to 'choice selected' 
        choice[i].setAttribute("onclick", "choiceSelected(this)");
        // choice[i].addEventListener("click", (compare));
    }
    // 
    choice.forEach(function(choiceSelected) {
        choiceSelected.addEventListener("click", (compare));
    })
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

function compare(event) {
    var userChoice = event.target;

    //correct condition
    if (userChoice == quiz[quizIndex].answer) {
        score = score++; 
        
    } else {//incorrect condition
        //deduct -5 seconds off secondsLeft for wrong answers
        seconds = seconds - penalty;
    }
}

function questionCounter(index) { //define questionCounter function using quiz object index
    const questionNumEl = quizBox.querySelector("#question_num");
    const questionTotalEl = quizBox.querySelector("#question_total")
    let questionNumber = questionCount + 1;
    questionNumEl.innerHTML = questionNumber; 
    questionTotalEl.innerHTML = quiz.length; 
}
    // choicesEl.addEventListener('click', (event) => { // add click event to all choices
    //     alert('you clicked the ' + (event.target.dataset.correct === 'true' ? 'correct' : 'wrong!') + ' button') // true false statement to evaluate if button the user clicked is correct
    // });
