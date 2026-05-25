const quizData = {

    semester1: {

        hindi: [

            {
                question: "Hindi hamari kya hai?",
                answers: [
                    { text: "Rashtrabhasha", correct: true },
                    { text: "Game", correct: false },
                    { text: "Software", correct: false },
                    { text: "Machine", correct: false }
                ]
            },

            {
                question: "Ka se kya hota hai?",
                answers: [
                    { text: "Kabutar", correct: true },
                    { text: "Apple", correct: false },
                    { text: "Ball", correct: false },
                    { text: "Cat", correct: false }
                ]
            }

        ],

        english: [

            {
                question: "A for ?",
                answers: [
                    { text: "Apple", correct: true },
                    { text: "Ball", correct: false },
                    { text: "Cat", correct: false },
                    { text: "Dog", correct: false }
                ]
            },

            {
                question: "B for ?",
                answers: [
                    { text: "Ball", correct: true },
                    { text: "Apple", correct: false },
                    { text: "Cat", correct: false },
                    { text: "Dog", correct: false }
                ]
            }

        ],

        maths: [

            {
                question: "2 + 2 = ?",
                answers: [
                    { text: "4", correct: true },
                    { text: "5", correct: false },
                    { text: "6", correct: false },
                    { text: "7", correct: false }
                ]
            }

        ]

    },

    semester2: {

        hindi: [

            {
                question: "भारत की राजधानी क्या है?",
                answers: [
                    { text: "दिल्ली", correct: true },
                    { text: "मुंबई", correct: false },
                    { text: "भोपाल", correct: false },
                    { text: "इंदौर", correct: false }
                ]
            }

        ],

        english: [

            {
                question: "What is the capital of India?",
                answers: [
                    { text: "Delhi", correct: true },
                    { text: "Mumbai", correct: false },
                    { text: "Bhopal", correct: false },
                    { text: "Indore", correct: false }
                ]
            }

        ],

        maths: [

            {
                question: "10 + 5 = ?",
                answers: [
                    { text: "15", correct: true },
                    { text: "12", correct: false },
                    { text: "14", correct: false },
                    { text: "16", correct: false }
                ]
            }

        ]

    }

};

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

let timer;
let timeLeft = 30;

const semesterSelection =
document.getElementById("semester-selection");

const semesterOptions =
document.getElementById("semester-options");

const selectSemesterBtn =
document.getElementById("select-semester-btn");

const subjectSelection =
document.getElementById("subject-selection");

const subjectButtons =
document.getElementById("subject-buttons");

const quizScreen =
document.getElementById("quiz-screen");

const resultScreen =
document.getElementById("result-screen");

const semester1Btn =
document.getElementById("semester1-btn");

const semester2Btn =
document.getElementById("semester2-btn");

const questionElement =
document.getElementById("question");

const answerButtons =
document.getElementById("answer-buttons");

const questionNumber =
document.getElementById("question-number");

const timerElement =
document.getElementById("timer");

const nextBtn =
document.getElementById("next-btn");

const restartBtn =
document.getElementById("restart-btn");

const scoreElement =
document.getElementById("score");

selectSemesterBtn.addEventListener("click", () => {

    semesterOptions.classList.remove("hide");

    selectSemesterBtn.classList.add("hide");

});

semester1Btn.addEventListener("click", () => {

    showSubjects("semester1");

});

semester2Btn.addEventListener("click", () => {

    showSubjects("semester2");

});

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", restartQuiz);

function showSubjects(semester){

    semesterSelection.classList.add("hide");

    subjectSelection.classList.remove("hide");

    subjectButtons.innerHTML = "";

    const subjects =
    Object.keys(quizData[semester]);

    subjects.forEach(subject => {

        const button =
        document.createElement("button");

        button.innerText = subject;

        button.classList.add("btn");

        button.addEventListener("click", () => {

            questions =
            quizData[semester][subject];

            currentQuestionIndex = 0;

            score = 0;

            subjectSelection.classList.add("hide");

            quizScreen.classList.remove("hide");

            showQuestion();

        });

        subjectButtons.appendChild(button);

    });
}

function showQuestion(){

    resetState();

    startTimer();

    let currentQuestion =
    questions[currentQuestionIndex];

    questionNumber.innerText =
    `${currentQuestionIndex + 1}/${questions.length}`;

    questionElement.innerText =
    currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button =
        document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("btn");

        if(answer.correct){

            button.dataset.correct =
            answer.correct;
        }

        button.addEventListener(
            "click",
            selectAnswer
        );

        answerButtons.appendChild(button);

    });
}

function startTimer(){

    clearInterval(timer);

    timeLeft = 30;

    timerElement.innerText =
    `${timeLeft}s`;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText =
        `${timeLeft}s`;

        if(timeLeft <= 0){

            clearInterval(timer);

            Array.from(answerButtons.children)
            .forEach(button => {

                button.disabled = true;

                if(button.dataset.correct === "true"){

                    button.classList.add("correct");
                }

            });

            nextBtn.classList.remove("hide");
        }

    },1000);
}

function resetState(){

    nextBtn.classList.add("hide");

    while(answerButtons.firstChild){

        answerButtons.removeChild(
            answerButtons.firstChild
        );
    }
}

function selectAnswer(e){

    clearInterval(timer);

    const selectedBtn = e.target;

    const correct =
    selectedBtn.dataset.correct === "true";

    if(correct){

        selectedBtn.classList.add("correct");

        score++;

    }else{

        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children)
    .forEach(button => {

        if(button.dataset.correct === "true"){

            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextBtn.classList.remove("hide");
}

function nextQuestion(){

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){

        showQuestion();

    }else{

        showResult();
    }
}

function showResult(){

    clearInterval(timer);

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");

    scoreElement.innerText =
    `Your Score: ${score}/${questions.length}`;
}

function restartQuiz(){

    clearInterval(timer);

    resultScreen.classList.add("hide");

    semesterSelection.classList.remove("hide");

    semesterOptions.classList.add("hide");

    selectSemesterBtn.classList.remove("hide");

    subjectSelection.classList.add("hide");

    currentQuestionIndex = 0;

    score = 0;
}