let selectedDifficulty = "";

let questionCount = 10;

let currentQuestion = 0;

let selectedAnswers = [];

let flaggedQuestions = [];

let testQuestions = [];

let timeLeft = 300;

let timer;

let mistakeNotebook = [];

let isRetryTest = false;


// =====================================================
// TEMPORARY QUESTION BANK
// =====================================================

const questionBank = [];


for (let i = 1; i <= 30; i++) {

    questionBank.push({

        id: "easy-" + i,

        difficulty: "Easy",

        question: "Easy Question " + i,

        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],

        correctAnswer: "Option 2",

        topic: "General",

        explanation: "This is the correct answer."

    });


    questionBank.push({

        id: "medium-" + i,

        difficulty: "Medium",

        question: "Medium Question " + i,

        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],

        correctAnswer: "Option 3",

        topic: "General",

        explanation: "This is the correct answer."

    });


    questionBank.push({

        id: "hard-" + i,

        difficulty: "Hard",

        question: "Hard Question " + i,

        options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],

        correctAnswer: "Option 4",

        topic: "General",

        explanation: "This is the correct answer."

    });

}


// =====================================================
// USED QUESTIONS
// =====================================================

let usedQuestions = {

    Easy: [],

    Medium: [],

    Hard: []

};


// =====================================================
// SELECT DIFFICULTY
// =====================================================

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


    document.getElementById("mistake-section").style.display =
        "none";

}


// =====================================================
// SELECT QUESTION COUNT
// =====================================================

function selectQuestionCount(count) {

    questionCount = count;

    currentQuestion = 0;

    selectedAnswers = [];

    flaggedQuestions = [];

    isRetryTest = false;


    document.getElementById("result-section").style.display =
        "none";


    document.getElementById("mistake-section").style.display =
        "none";


    document.getElementById("test-area").style.display =
        "block";


    document.getElementById("question-count-section").style.display =
        "none";


    createNewTest();

    displayQuestion();

    startTimer();

}


// =====================================================
// CREATE NEW TEST
// =====================================================

function createNewTest() {

    let availableQuestions =
        questionBank.filter(function (question) {

            return question.difficulty === selectedDifficulty;

        });


    let unusedQuestions =
        availableQuestions.filter(function (question) {

            return !usedQuestions[selectedDifficulty].includes(
                question.id
            );

        });


    if (unusedQuestions.length < questionCount) {

        usedQuestions[selectedDifficulty] = [];

        unusedQuestions = availableQuestions;

    }


    unusedQuestions.sort(function () {

        return Math.random() - 0.5;

    });


    testQuestions =
        unusedQuestions.slice(0, questionCount);


    testQuestions.forEach(function (question) {

        usedQuestions[selectedDifficulty].push(
            question.id
        );

    });

}


// =====================================================
// DISPLAY QUESTION
// =====================================================

function displayQuestion() {

    const question =
        testQuestions[currentQuestion];


    if (!question) {
        return;
    }


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


    // Restore selected answer

    if (selectedAnswers[currentQuestion]) {

        optionButtons.forEach(function (button) {

            if (
                button.textContent ===
                selectedAnswers[currentQuestion]
            ) {

                button.style.backgroundColor =
                    "#2d63d8";

                button.style.color =
                    "#ffffff";

            }

        });


        document.getElementById("selected-answer").textContent =
            "You selected: " +
            selectedAnswers[currentQuestion];

    }
    else {

        document.getElementById("selected-answer").textContent =
            "";

    }


    // Previous button

    document.getElementById("previous-button").disabled =
        currentQuestion === 0;


    // Next / Submit buttons

    if (currentQuestion === testQuestions.length - 1) {

        document.getElementById("next-button").style.display =
            "none";

        document.getElementById("submit-button").style.display =
            "block";

    }
    else {

        document.getElementById("next-button").style.display =
            "block";

        document.getElementById("submit-button").style.display =
            "none";

    }


    // Flag button

    updateFlagButton();


    // Question number panel

    updateQuestionGrid();

}


// =====================================================
// SELECT ANSWER
// =====================================================

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


    updateQuestionGrid();

}


// =====================================================
// NEXT QUESTION
// =====================================================

function nextQuestion() {

    if (
        currentQuestion <
        testQuestions.length - 1
    ) {

        currentQuestion++;

        displayQuestion();

    }

}


// =====================================================
// PREVIOUS QUESTION
// =====================================================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();

    }

}


// =====================================================
// GO TO QUESTION
// =====================================================

function goToQuestion(index) {

    currentQuestion = index;

    displayQuestion();

}


// =====================================================
// FLAG QUESTION
// =====================================================

function toggleFlag() {

    if (flaggedQuestions[currentQuestion]) {

        flaggedQuestions[currentQuestion] = false;

    }
    else {

        flaggedQuestions[currentQuestion] = true;

    }


    updateFlagButton();

    updateQuestionGrid();

}


// =====================================================
// UPDATE FLAG BUTTON
// =====================================================

function updateFlagButton() {

    const button =
        document.getElementById("flag-button");


    if (flaggedQuestions[currentQuestion]) {

        button.textContent =
            "🚩 Unflag Question";

    }
    else {

        button.textContent =
            "🚩 Flag Question";

    }

}


// =====================================================
// QUESTION NUMBER GRID
// =====================================================

function updateQuestionGrid() {

    const grid =
        document.getElementById("question-grid");


    grid.innerHTML = "";


    for (
        let i = 0;
        i < testQuestions.length;
        i++
    ) {

        const questionBox =
            document.createElement("button");


        questionBox.type =
            "button";


        questionBox.className =
            "question-box";


        questionBox.textContent =
            i + 1;


        // Answered

        if (selectedAnswers[i]) {

            questionBox.classList.add(
                "answered"
            );

        }


        // Current question

        if (i === currentQuestion) {

            questionBox.classList.add(
                "current"
            );

        }


        // Flag

        if (flaggedQuestions[i]) {

            const flag =
                document.createElement("span");


            flag.className =
                "question-flag";


            flag.textContent =
                "🚩";


            questionBox.appendChild(flag);

        }


        questionBox.onclick =
            function () {

                goToQuestion(i);

            };


        grid.appendChild(
            questionBox
        );

    }

}


// =====================================================
// TIMER
// =====================================================

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


// =====================================================
// UPDATE TIMER
// =====================================================

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


// =====================================================
// SUBMIT TEST
// =====================================================

function submitTest() {

    clearInterval(timer);


    let correct = 0;

    let wrong = 0;

    let unanswered = 0;


    let newMistakes = [];


    // =============================================
    // CHECK ALL QUESTIONS
    // =============================================

    for (
        let i = 0;
        i < testQuestions.length;
        i++
    ) {

        const question =
            testQuestions[i];


        const studentAnswer =
            selectedAnswers[i];


        // UNANSWERED

        if (!studentAnswer) {

            unanswered++;


            // During retry, unanswered mistakes remain

            if (isRetryTest) {

                newMistakes.push(
                    findOriginalMistake(question)
                );

            }

        }


        // CORRECT

        else if (
            studentAnswer ===
            question.correctAnswer
        ) {

            correct++;

        }


        // WRONG

        else {

            wrong++;


            if (isRetryTest) {

                const originalMistake =
                    findOriginalMistake(question);


                if (originalMistake) {

                    newMistakes.push(
                        originalMistake
                    );

                }

            }
            else {

                newMistakes.push({

                    id: question.id,

                    question:
                        question.question,

                    options:
                        question.options,

                    studentAnswer:
                        studentAnswer,

                    correctAnswer:
                        question.correctAnswer,

                    topic:
                        question.topic,

                    explanation:
                        question.explanation

                });

            }

        }

    }


    // =============================================
    // UPDATE MISTAKES AFTER RETRY
    // =============================================

    if (isRetryTest) {

        mistakeNotebook =
            newMistakes.filter(function (mistake) {

                return mistake !== null;

            });

    }
    else {

        mistakeNotebook =
            newMistakes;

    }


    // =============================================
    // PERCENTAGE
    // =============================================

    let percentage = 0;


    if (testQuestions.length > 0) {

        percentage =
            Math.round(
                (correct /
                    testQuestions.length) *
                100
            );

    }


    // =============================================
    // DISPLAY RESULT
    // =============================================

    document.getElementById("total-questions").textContent =
        testQuestions.length;


    document.getElementById("score").textContent =
        correct +
        " / " +
        testQuestions.length;


    document.getElementById("percentage").textContent =
        percentage +
        "%";


    document.getElementById("correct-count").textContent =
        correct;


    document.getElementById("wrong-count").textContent =
        wrong;


    document.getElementById("unanswered-count").textContent =
        unanswered;


    if (isRetryTest) {

        document.getElementById("result-title").textContent =
            "Retry Result";

    }
    else {

        document.getElementById("result-title").textContent =
            "Test Result";

    }


    document.getElementById("test-area").style.display =
        "none";


    document.getElementById("result-section").style.display =
        "block";


    document.getElementById("mistake-section").style.display =
        "none";

}


// =====================================================
// FIND ORIGINAL MISTAKE
// =====================================================

function findOriginalMistake(question) {

    const mistake =
        mistakeNotebook.find(function (item) {

            return item.id === question.id;

        });


    return mistake || null;

}


// =====================================================
// SHOW MISTAKE NOTEBOOK
// =====================================================

function showMistakeNotebook() {

    document.getElementById("result-section").style.display =
        "none";


    document.getElementById("mistake-section").style.display =
        "block";


    const mistakeList =
        document.getElementById("mistake-list");


    mistakeList.innerHTML = "";


    if (mistakeNotebook.length === 0) {

        mistakeList.innerHTML =
            "<p>No active mistakes. Great job!</p>";


        document.getElementById(
            "retry-mistakes-button"
        ).style.display = "none";


        return;

    }


    document.getElementById(
        "retry-mistakes-button"
    ).style.display = "block";


    mistakeNotebook.forEach(function (
        mistake,
        index
    ) {

        const mistakeCard =
            document.createElement("div");


        mistakeCard.className =
            "mistake-card";


        mistakeCard.innerHTML = `

            <h3>
                Mistake ${index + 1}
            </h3>

            <p>
                <strong>Question:</strong>
                ${mistake.question}
            </p>

            <p class="student-answer">
                <strong>Your Answer:</strong>
                ${mistake.studentAnswer || "Not answered"}
            </p>

            <p class="correct-answer">
                <strong>Correct Answer:</strong>
                ${mistake.correctAnswer}
            </p>

        `;


        mistakeList.appendChild(
            mistakeCard
        );

    });

}


// =====================================================
// RETRY MISTAKES
// =====================================================

function retryMistakes() {

    if (mistakeNotebook.length === 0) {

        alert(
            "There are no mistakes to retry."
        );

        return;

    }


    // Create test from mistakes

    testQuestions =
        mistakeNotebook.map(function (mistake) {

            return {

                id:
                    mistake.id,

                question:
                    mistake.question,

                options:
                    mistake.options,

                correctAnswer:
                    mistake.correctAnswer,

                topic:
                    mistake.topic,

                explanation:
                    mistake.explanation

            };

        });


    // Retry settings

    isRetryTest = true;

    questionCount =
        testQuestions.length;

    currentQuestion = 0;

    selectedAnswers = [];

    flaggedQuestions = [];


    // Hide notebook

    document.getElementById(
        "mistake-section"
    ).style.display = "none";


    // Hide result

    document.getElementById(
        "result-section"
    ).style.display = "none";


    // Show test

    document.getElementById(
        "test-area"
    ).style.display = "block";


    displayQuestion();

    startRetryTimer();

}


// =====================================================
// RETRY TIMER
// =====================================================

function startRetryTimer() {

    clearInterval(timer);


    // Give 1 minute per retry question

    timeLeft =
        Math.max(
            60,
            testQuestions.length * 60
        );


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


// =====================================================
// HIDE MISTAKE NOTEBOOK
// =====================================================

function hideMistakeNotebook() {

    document.getElementById(
        "mistake-section"
    ).style.display = "none";


    document.getElementById(
        "result-section"
    ).style.display = "block";

}


// =====================================================
// START ANOTHER TEST
// =====================================================

function startAnotherTest() {

    clearInterval(timer);


    currentQuestion = 0;

    selectedAnswers = [];

    flaggedQuestions = [];

    testQuestions = [];

    isRetryTest = false;


    document.getElementById(
        "result-section"
    ).style.display = "none";


    document.getElementById(
        "mistake-section"
    ).style.display = "none";


    document.getElementById(
        "test-area"
    ).style.display = "none";


    document.getElementById(
        "question-count-section"
    ).style.display = "none";


    document.getElementById(
        "level-section"
    ).style.display = "block";


    document.getElementById(
        "selected-level"
    ).textContent = "";

}