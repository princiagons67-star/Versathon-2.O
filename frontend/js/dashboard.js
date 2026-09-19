// -----------------------------
// Dashboard Data
// -----------------------------

const studentData = {
    testsTaken: 8,
    averageScore: 76,
    accuracy: 81
};

const strongTopics = [
    "HTML Basics",
    "CSS Styling",
    "JavaScript Functions"
];

const weakTopics = [
    "JavaScript Arrays",
    "DOM Manipulation",
    "Database Concepts"
];

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

const preparation = studentData.averageScore;

preparationValue.textContent = preparation + "%";

testsTakenValue.textContent = studentData.testsTaken;

averageScoreValue.textContent = studentData.averageScore + "%";

accuracyValue.textContent = studentData.accuracy + "%";

const strongTopicsList =
    document.getElementById("strongTopicsList");

const weakTopicsList =
    document.getElementById("weakTopicsList");


strongTopics.forEach(function (topic) {

    const listItem = document.createElement("li");

    listItem.textContent = topic;

    strongTopicsList.appendChild(listItem);

});


weakTopics.forEach(function (topic) {

    const listItem = document.createElement("li");

    listItem.textContent = topic;

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

    alert("Test section will open here.");

});


mistakeBtn.addEventListener("click", function () {

    alert("Mistake Notebook will open here.");

});

// -----------------------------
// Recent Tests
// -----------------------------

const recentTests = [
    {
        name: "Test 1",
        score: 80,
        status: "Good"
    },
    {
        name: "Test 2",
        score: 65,
        status: "Needs Revision"
    },
    {
        name: "Test 3",
        score: 90,
        status: "Excellent"
    }
];

const recentTestsList =
    document.getElementById("recentTestsList");


recentTests.forEach(function (test) {

    const testRow = document.createElement("div");

    testRow.className = "test-row";

    testRow.innerHTML = `
        <span>${test.name}</span>
        <span>${test.score}%</span>
        <span>${test.status}</span>
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