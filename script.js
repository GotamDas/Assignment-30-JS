const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Machine Language",
            "Hypertext Marking Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "1997"],
        answer: "1995"
    },
    {
        question: "Which of these is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        answer: "Django"
    }
];

const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options-container');
const nextButton = document.querySelector('.next-btn');
const questionCountElement = document.querySelector('.question-count');
const scoreElement = document.querySelector('.score');
const progressBar = document.querySelector('.progress');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let quizCompleted = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizCompleted = false;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    
    questionElement.textContent = currentQuestion.question;
    questionCountElement.textContent = `Question: ${questionNo}/${quizQuestions.length}`;
    scoreElement.textContent = `Score: ${score}`;
    
    const progressPercent = (questionNo / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('div');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });
    
    nextButton.disabled = true;
}

function resetState() {
    selectedOption = null;
    nextButton.disabled = true;
    nextButton.textContent = "Next Question";
    
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedButton, selectedAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.cursor = 'not-allowed';
        option.removeEventListener('click', selectOption);
    });
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        options.forEach(option => {
            if (option.textContent === currentQuestion.answer) {
                option.classList.add('correct');
            }
        });
    }
    
    if (isCorrect) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
    
    nextButton.disabled = false;
    selectedOption = selectedAnswer;
}

function handleNextButton() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    resetState();
    quizCompleted = true;
    
    questionElement.textContent = `Quiz Completed! Your score is ${score} out of ${quizQuestions.length}`;
    questionCountElement.textContent = '';
    
    progressBar.style.width = '100%';
    
    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    if (quizCompleted) {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();