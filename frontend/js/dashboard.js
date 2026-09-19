// -----------------------------
// Dashboard Data
// -----------------------------
const studentData = {

    accuracy: 81
};

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

let totalCorrect = 0;
let totalQuestions = 0;

recentTests.forEach(function (test) {
    totalCorrect += test.correct;
    totalQuestions += test.total;
});

const accuracy = Math.round(
    (totalCorrect / totalQuestions) * 100
);

const testsTaken = recentTests.length;
let totalScore = 0;

recentTests.forEach(function (test) {
    totalScore += test.score;
});

const averageScore =
    Math.round(totalScore / recentTests.length);

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
        strongTopics.push(topic.topic);
    } else {
        weakTopics.push(topic.topic);
    }

});

// -----------------------------
// Get HTML Elements
// -----------------------------

const preparationValue = document.getElementById("preparationValue");
const testsTakenValue = document.getElementById("testsTakenValue");
const averageScoreValue = document.getElementById("averageScoreValue");
const accuracyValue = document.getElementById("accuracyValue");

const progressFill = document.getElementById("progressFill");
const progressMessage = document.getElementById("progressMessage");


// -----------------------------
// Update Dashboard
// -----------------------------

const preparation = averageScore;

preparationValue.textContent = preparation + "%";

testsTakenValue.textContent = testsTaken;

averageScoreValue.textContent = averageScore + "%";

accuracyValue.textContent = accuracy + "%";

const strongTopicsList =
    document.getElementById("strongTopicsList");

const weakTopicsList =
    document.getElementById("weakTopicsList");


strongTopics.forEach(function (topic) {

    const listItem = document.createElement("li");

    const topicData = topicPerformance.find(function (item) {
        return item.topic === topic;
    });

    listItem.textContent =
        topic + " — " + topicData.accuracy + "%";

    strongTopicsList.appendChild(listItem);

});

weakTopics.forEach(function (topic) {

    const listItem = document.createElement("li");

    const topicData = topicPerformance.find(function (item) {
        return item.topic === topic;
    });

    listItem.textContent =
        topic + " — " + topicData.accuracy + "%";

    weakTopicsList.appendChild(listItem);

});


// Update progress bar

progressFill.style.width = preparation + "%";

// Update progress message

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


// -----------------------------
// Button Actions
// -----------------------------

const takeTestBtn = document.getElementById("takeTestBtn");
const mistakeBtn = document.getElementById("mistakeBtn");


takeTestBtn.addEventListener("click", function () {
    window.location.href = "tests.html";
});

mistakeBtn.addEventListener("click", function () {

    alert("You have " + mistakes.length + " mistakes to revise.");

});
// -----------------------------
// Recent Tests
// -----------------------------


const recentTestsList =
    document.getElementById("recentTestsList");


recentTests.forEach(function (test) {

    const testRow = document.createElement("div");

    testRow.className = "test-row";

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

// -----------------------------
// Achievements
// -----------------------------

const achievements = [
    "🌟 First Test Completed",
    "🎯 Accuracy Master"
];

const achievementsList =
    document.getElementById("achievementsList");


achievements.forEach(function (achievement) {

    const achievementCard = document.createElement("div");

    achievementCard.className = "achievement-card";

    achievementCard.textContent = achievement;

    achievementsList.appendChild(achievementCard);

});

// -----------------------------
// Mistake Notebook
// -----------------------------

const mistakes = [
    {
        question: "What is the difference between an array and an object?",
        topic: "JavaScript Arrays"
    },
    {
        question: "What is the DOM?",
        topic: "DOM Manipulation"
    }
];

const mistakesList =
    document.getElementById("mistakesList");

mistakes.forEach(function (mistake) {

    const mistakeCard = document.createElement("div");

    mistakeCard.className = "mistake-card";

    mistakeCard.innerHTML = `
        <strong>${mistake.topic}</strong>
        <p>${mistake.question}</p>
    `;

    mistakesList.appendChild(mistakeCard);

});