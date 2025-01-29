// This file contains the JavaScript code for the dynamic quiz app, handling question presentation, scoring, and result summaries.

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map((option, index) => `
            <button class="option" onclick="checkAnswer('${option}')">${option}</button>
        `).join('')}
    `;
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    userAnswers.push({ question: question.question, selected: selectedOption, correct: question.answer });
    if (selectedOption === question.answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong! The correct answer was: " + question.answer);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const questionContainer = document.getElementById("question-container");
    let resultHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
    resultHTML += `<h3>Review your answers:</h3>`;
    userAnswers.forEach((answer, index) => {
        resultHTML += `
            <div>
                <p><strong>Q${index + 1}: ${answer.question}</strong></p>
                <p>Your answer: ${answer.selected}</p>
                <p>Correct answer: ${answer.correct}</p>
            </div>
        `;
    });
    resultHTML += `<button onclick="restartQuiz()">Restart Quiz</button>`;
    questionContainer.innerHTML = resultHTML;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
}

// Initialize the quiz
document.addEventListener("DOMContentLoaded", loadQuestion);