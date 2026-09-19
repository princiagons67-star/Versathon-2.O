// =========================================
// DASHBOARD DATA
// =========================================

const recentTests = [
    {
        name: "Test 1",
        score: 80,
        correct: 8,
        total: 10
    },
    {
        name: "Test 2",
        score: 65,
        correct: 13,
        total: 20
    },
    {
        name: "Test 3",
        score: 90,
        correct: 18,
        total: 20
    }
];


// =========================================
// CALCULATE PERFORMANCE
// =========================================

let totalCorrect = 0;
let totalQuestions = 0;
let totalScore = 0;

recentTests.forEach(function (test) {

    totalCorrect += test.correct;
    totalQuestions += test.total;
    totalScore += test.score;

});

let accuracy = 0;

if (totalQuestions > 0) {

    accuracy = Math.round(
        (totalCorrect / totalQuestions) * 100
    );

}

const testsTaken = recentTests.length;

let averageScore = 0;

if (recentTests.length > 0) {

    averageScore = Math.round(
        totalScore / recentTests.length
    );

}


// =========================================
// TOPIC PERFORMANCE
// =========================================

const topicPerformance = [

    {
        topic: "HTML Basics",
        accuracy: 90
    },

    {
        topic: "CSS Styling",
        accuracy: 82
    },

    {
        topic: "JavaScript Arrays",
        accuracy: 45
    },

    {
        topic: "DOM Manipulation",
        accuracy: 55
    },

    {
        topic: "Database Concepts",
        accuracy: 40
    }

];


const strongTopics = [];
const weakTopics = [];

topicPerformance.forEach(function (topic) {

    if (topic.accuracy >= 70) {

        strongTopics.push(topic);

    } else {

        weakTopics.push(topic);

    }

});


// =========================================
// GET HTML ELEMENTS
// =========================================

const preparationValue =
    document.getElementById("preparationValue");

const testsTakenValue =
    document.getElementById("testsTakenValue");

const averageScoreValue =
    document.getElementById("averageScoreValue");

const accuracyValue =
    document.getElementById("accuracyValue");

const progressFill =
    document.getElementById("progressFill");

const progressMessage =
    document.getElementById("progressMessage");


// =========================================
// UPDATE DASHBOARD VALUES
// =========================================

const preparation = averageScore;

if (preparationValue) {
    preparationValue.textContent =
        preparation + "%";
}

if (testsTakenValue) {
    testsTakenValue.textContent =
        testsTaken;
}

if (averageScoreValue) {
    averageScoreValue.textContent =
        averageScore + "%";
}

if (accuracyValue) {
    accuracyValue.textContent =
        accuracy + "%";
}


// =========================================
// STRONG TOPICS
// =========================================

const strongTopicsList =
    document.getElementById("strongTopicsList");

if (strongTopicsList) {

    strongTopicsList.innerHTML = "";

    strongTopics.forEach(function (topic) {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            topic.topic + " — " +
            topic.accuracy + "%";

        strongTopicsList.appendChild(listItem);

    });

}


// =========================================
// WEAK TOPICS
// =========================================

const weakTopicsList =
    document.getElementById("weakTopicsList");

if (weakTopicsList) {

    weakTopicsList.innerHTML = "";

    weakTopics.forEach(function (topic) {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            topic.topic + " — " +
            topic.accuracy + "%";

        weakTopicsList.appendChild(listItem);

    });

}


// =========================================
// PROGRESS BAR
// =========================================

if (progressFill) {

    progressFill.style.width =
        preparation + "%";

}


// =========================================
// PROGRESS MESSAGE
// =========================================

if (progressMessage) {

    if (preparation >= 80) {

        progressMessage.textContent =
            "Excellent preparation! Keep up the good work.";

    } else if (preparation >= 60) {

        progressMessage.textContent =
            "You're making good progress. Keep revising your weak topics.";

    } else {

        progressMessage.textContent =
            "You need more revision. Focus on your weak topics.";

    }

}


// =========================================
// TAKE TEST BUTTON
// =========================================

const takeTestBtn =
    document.getElementById("takeTestBtn");

if (takeTestBtn) {

    takeTestBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "tests.html";

        }
    );

}


// =========================================
// MISTAKE BUTTON
// =========================================

const mistakeBtn =
    document.getElementById("mistakeBtn");

if (mistakeBtn) {

    mistakeBtn.addEventListener(
        "click",
        function () {

            const mistakes =
                JSON.parse(
                    localStorage.getItem(
                        "mistakeNotebook"
                    ) || "[]"
                );

            const unanswered =
                JSON.parse(
                    localStorage.getItem(
                        "unansweredNotebook"
                    ) || "[]"
                );

            const total =
                mistakes.length +
                unanswered.length;

            if (total === 0) {

                alert(
                    "You have no mistakes to revise."
                );

            } else {

                window.location.href =
                    "tests.html";

            }

        }
    );

}


// =========================================
// RECENT TESTS
// =========================================

const recentTestsList =
    document.getElementById("recentTestsList");

if (recentTestsList) {

    recentTestsList.innerHTML = "";

    recentTests.forEach(function (test) {

        const testRow =
            document.createElement("div");

        testRow.className =
            "test-row";

        let status;

        if (test.score >= 80) {

            status = "Excellent";

        } else if (test.score >= 60) {

            status = "Good";

        } else {

            status = "Needs Revision";

        }

        testRow.innerHTML = `
            <span>${test.name}</span>
            <span>${test.score}%</span>
            <span>${status}</span>
        `;

        recentTestsList.appendChild(testRow);

    });

}


// =========================================
// ACHIEVEMENTS
// =========================================

const achievements = [
    "🌟 First Test Completed",
    "🎯 Accuracy Master"
];

const achievementsList =
    document.getElementById("achievementsList");

if (achievementsList) {

    achievementsList.innerHTML = "";

    achievements.forEach(function (achievement) {

        const achievementCard =
            document.createElement("div");

        achievementCard.className =
            "achievement-card";

        achievementCard.textContent =
            achievement;

        achievementsList.appendChild(
            achievementCard
        );

    });

}


// =========================================
// MISTAKE NOTEBOOK
// =========================================

function loadMistakes() {

    const mistakesList =
        document.getElementById("mistakesList");

    if (!mistakesList) {
        return;
    }

    const mistakes =
        JSON.parse(
            localStorage.getItem(
                "mistakeNotebook"
            ) || "[]"
        );

    const unanswered =
        JSON.parse(
            localStorage.getItem(
                "unansweredNotebook"
            ) || "[]"
        );

    const allMistakes =
        mistakes.concat(unanswered);

    mistakesList.innerHTML = "";

    if (allMistakes.length === 0) {

        mistakesList.innerHTML = `
            <p class="empty-mistakes">
                No mistakes to revise yet. Keep practising!
            </p>
        `;

        return;
    }

    allMistakes.forEach(function (mistake, index) {

        const mistakeCard =
            document.createElement("div");

        mistakeCard.className =
            "mistake-card";

        mistakeCard.innerHTML = `
            <strong>
                ${index + 1}. ${mistake.topic || "General"}
            </strong>

            <p>
                ${mistake.question}
            </p>

            ${
                mistake.studentAnswer
                ? `
                    <p>
                        <strong>Your Answer:</strong>
                        ${mistake.studentAnswer}
                    </p>
                `
                : `
                    <p>
                        <strong>Status:</strong>
                        Not answered
                    </p>
                `
            }

            <p>
                <strong>Correct Answer:</strong>
                ${mistake.correctAnswer}
            </p>
        `;

        mistakesList.appendChild(
            mistakeCard
        );

    });

}

loadMistakes();