let currentQuestion = 0;

const questions = [
    {
        question: "What is the output of 2 + 2?",
        options: ["3", "4", "5", "6"]
    },
    {
        question: "Which language is mainly used for web page structure?",
        options: ["Python", "HTML", "C++", "Java"]
    },
    {
        question: "Which data type is used to store True or False?",
        options: ["String", "Boolean", "Integer", "Float"]
    }
];

function selectDifficulty(level) {
    document.getElementById("selected-level").textContent =
        "You selected: " + level;
}

function selectAnswer(answer) {
    document.getElementById("selected-answer").textContent =
        "You selected: " + answer;
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }

    document.getElementById("question").textContent =
        questions[currentQuestion].question;

    const optionButtons = document.querySelectorAll(".options button");

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent =
            questions[currentQuestion].options[i];
    }

    document.getElementById("selected-answer").textContent = "";
}