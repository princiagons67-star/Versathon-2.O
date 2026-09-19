// -----------------------------
// Dashboard Data
// -----------------------------

const studentData = {
    preparation: 68,
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

preparationValue.textContent = studentData.preparation + "%";

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

progressFill.style.width = studentData.preparation + "%";


// Update progress message

if (studentData.preparation >= 80) {

    progressMessage.textContent =
        "Excellent preparation! Keep up the good work.";

} else if (studentData.preparation >= 60) {

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