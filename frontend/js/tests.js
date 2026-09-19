let selectedDifficulty = "";

let questionCount = 10;

let currentQuestion = 0;

let selectedAnswers = [];

let testQuestions = [];

let timeLeft = 300;

let timer;
let mistakeNotebook = [];


// ------------------------------------
// Temporary Question Bank
// ------------------------------------

const questionBank = [];


// Create 30 temporary questions
for (let i = 1; i <= 30; i++) {

    questionBank.push({
        id: "easy-" + i,
        difficulty: "Easy",
        question: "Question " + i,
        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correctAnswer: "Option 2"
    });


    questionBank.push({
        id: "medium-" + i,
        difficulty: "Medium",
        question: "Question " + i,
        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correctAnswer: "Option 3"
    });


    questionBank.push({
        id: "hard-" + i,
        difficulty: "Hard",
        question: "Question " + i,
        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        correctAnswer: "Option 4"
    });

}


// ------------------------------------
// Keep track of used questions
// ------------------------------------

let usedQuestions = {
    Easy: [],
    Medium: [],
    Hard: []
};


// ------------------------------------
// Select Difficulty
// ------------------------------------

function selectDifficulty(level) {

    selectedDifficulty = level;

    document.getElementById("selected-level").textContent =
        "You selected: " + level;

    document.getElementById("question-count-section").style.display =
        "block";

    document.getElementById("test-area").style.display =
        "none";

    document.getElementById("result-section").style.display =
        "none";
}


// ------------------------------------
// Select Number of Questions
// ------------------------------------

function selectQuestionCount(count) {

    questionCount = count;

    currentQuestion = 0;

    selectedAnswers = [];

    document.getElementById("result-section").style.display =
        "none";

    document.getElementById("test-area").style.display =
        "block";

    document.getElementById("question-count-section").style.display =
        "none";

    createNewTest();

    displayQuestion();

    startTimer();
}


// ------------------------------------
// Create a New Test
// ------------------------------------

function createNewTest() {

    let availableQuestions =
        questionBank.filter(function (question) {

            return question.difficulty === selectedDifficulty;

        });


    // Remove questions already used
    let unusedQuestions =
        availableQuestions.filter(function (question) {

            return !usedQuestions[selectedDifficulty].includes(
                question.id
            );

        });


    // If all questions have been used,
    // allow the question bank again

    if (unusedQuestions.length < questionCount) {

        usedQuestions[selectedDifficulty] = [];

        unusedQuestions = availableQuestions;

    }


    // Shuffle questions

    unusedQuestions.sort(function () {

        return Math.random() - 0.5;

    });


    // Select required number of questions

    testQuestions =
        unusedQuestions.slice(0, questionCount);


    // Remember used questions

    testQuestions.forEach(function (question) {

        usedQuestions[selectedDifficulty].push(
            question.id
        );

    });

}


// ------------------------------------
// Display Current Question
// ------------------------------------

function displayQuestion() {

    const question =
        testQuestions[currentQuestion];


    document.getElementById("question-number").textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        testQuestions.length;


    document.getElementById("question").textContent =
        question.question;


    const optionButtons =
        document.querySelectorAll(".option-button");


    for (let i = 0; i < optionButtons.length; i++) {

        optionButtons[i].textContent =
            question.options[i];

        optionButtons[i].style.backgroundColor =
            "#ffffff";

        optionButtons[i].style.color =
            "#244394";

    }


    document.getElementById("selected-answer").textContent =
        "";


    // Show Submit only on last question

    if (currentQuestion === testQuestions.length - 1) {

        document.getElementById("next-button").style.display =
            "none";

        document.getElementById("submit-button").style.display =
            "inline-block";

    }
    else {

        document.getElementById("next-button").style.display =
            "inline-block";

        document.getElementById("submit-button").style.display =
            "none";

    }

}


// ------------------------------------
// Select Answer
// ------------------------------------

function selectAnswer(button) {

    const buttons =
        document.querySelectorAll(".option-button");


    buttons.forEach(function (option) {

        option.style.backgroundColor =
            "#ffffff";

        option.style.color =
            "#244394";

    });


    button.style.backgroundColor =
        "#2d63d8";

    button.style.color =
        "#ffffff";


    selectedAnswers[currentQuestion] =
        button.textContent;


    document.getElementById("selected-answer").textContent =
        "You selected: " +
        button.textContent;

}


// ------------------------------------
// Next Question
// ------------------------------------

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= testQuestions.length) {

        currentQuestion =
            testQuestions.length - 1;

        return;

    }


    displayQuestion();

}


// ------------------------------------
// Timer
// ------------------------------------

function startTimer() {

    clearInterval(timer);


    if (questionCount === 10) {

        timeLeft = 5 * 60;

    }
    else if (questionCount === 20) {

        timeLeft = 10 * 60;

    }
    else {

        timeLeft = 15 * 60;

    }


    updateTimer();


    timer = setInterval(function () {

        timeLeft--;

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("Time's up!");

            submitTest();

        }

    }, 1000);

}


// ------------------------------------
// Update Timer
// ------------------------------------

function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    document.getElementById("time").textContent =
        minutes +
        ":" +
        String(seconds).padStart(2, "0");

}


// ------------------------------------
// Submit Test
// ------------------------------------

function submitTest() {

    clearInterval(timer);

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    mistakeNotebook = [];

    for (let i = 0; i < testQuestions.length; i++) {

        if (!selectedAnswers[i]) {

            unanswered++;

        }
        else if (
            selectedAnswers[i] ===
            testQuestions[i].correctAnswer
        ) {

            correct++;

        }
        else {

            wrong++;

            mistakeNotebook.push({
                question: testQuestions[i].question,
                studentAnswer: selectedAnswers[i],
                correctAnswer: testQuestions[i].correctAnswer
            });
        }
    }


    // Calculate percentage

    let percentage = 0;

if (testQuestions.length > 0) {
    percentage =
        Math.round((correct / testQuestions.length) * 100);
}

    // Display statistics

    document.getElementById("total-questions").textContent =
        testQuestions.length;

    document.getElementById("score").textContent =
        correct + " / " + testQuestions.length;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("correct-count").textContent =
        correct;

    document.getElementById("wrong-count").textContent =
        wrong;

    document.getElementById("unanswered-count").textContent =
        unanswered;


    // Hide test

    document.getElementById("test-area").style.display =
        "none";


    // Show result

    document.getElementById("result-section").style.display =
        "block";

    document.getElementById("mistake-section").style.display =
        "none";
}
function showMistakeNotebook() {

    // Hide result
    document.getElementById("result-section").style.display = "none";

    // Show mistake notebook
    document.getElementById("mistake-section").style.display = "block";

    // Display mistakes
    const mistakeList = document.getElementById("mistake-list");

    mistakeList.innerHTML = "";

    if (mistakeNotebook.length === 0) {

        mistakeList.innerHTML =
            "<p>No mistakes in this test. Great job!</p>";

        return;
    }

    mistakeNotebook.forEach(function (mistake, index) {

        const mistakeCard = document.createElement("div");

        mistakeCard.className = "mistake-card";

        mistakeCard.innerHTML = `
            <h3>Mistake ${index + 1}</h3>

            <p>
                <strong>Question:</strong>
                ${mistake.question}
            </p>

            <p>
                <strong>Your Answer:</strong>
                ${mistake.studentAnswer}
            </p>

            <p class="correct-answer">
                <strong>Correct Answer:</strong>
                ${mistake.correctAnswer}
            </p>
        `;

        mistakeList.appendChild(mistakeCard);
    });
}
function startAnotherTest() {

    clearInterval(timer);

    // Reset test data
    currentQuestion = 0;
    selectedAnswers = [];
    testQuestions = [];
    mistakeNotebook = [];

    // Hide result and mistake notebook
    document.getElementById("result-section").style.display = "none";
    document.getElementById("mistake-section").style.display = "none";

    // Hide question count and test area
    document.getElementById("question-count-section").style.display = "none";
    document.getElementById("test-area").style.display = "none";

    // Clear selected level
    document.getElementById("selected-level").textContent = "";

    // Show difficulty selection
    document.getElementById("level-section").style.display = "block";
}

function hideMistakeNotebook() {

    document.getElementById("mistake-section").style.display =
        "none";

    document.getElementById("result-section").style.display =
        "block";
}