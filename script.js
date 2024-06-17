const questions = [
    {
        question: 'Which is Largest animal in the world ?',
        answers: [
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Blu Whale", correct: true},
        ]
       
    },
    {
        question: 'Which is the coldest location in the earth?',
        answers: [
            {text: "India", correct: false},
            {text: "US", correct: false},
            {text: "East Antarctica", correct: true},
            {text: "West Antarctica", correct: false},
        ]
       
    },
    {
        question: 'Which is the continent with the most number of countries?',
        answers: [
            {text: "Africa", correct: true},
            {text: "US", correct: false},
            {text: "East Antarctica", correct: false},
            {text: "West Antarctica", correct: false},
        ]
       
    },
    {
        question: 'Which is the country with the most people?',
        answers: [
            {text: "Africa", correct: false},
            {text: "US", correct: false},
            {text: "India", correct: false},
            {text: "China", correct: true},
        ]
       
    },
    {
        question: 'Which is the largest state of India?',
        answers: [
            {text: "Karnataka", correct: false},
            {text: "Bihar", correct: false},
            {text: "Rajasthan", correct: true},
            {text: "Delhi", correct: false},
        ]
       
    },
];

const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('ans-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){

    resetState();

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{

        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answersButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    } 
}


function selectAnswer(param){
    const selectBtn = param.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score ++;
    }
    else{
        selectBtn.classList.add('incorrect');
    }

    Array.from(answersButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
            
        }
        button.disabled =  true;

    });
    nextButton.style.display = 'block' 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
