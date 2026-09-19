// -----------------------------
// Dashboard Data
// -----------------------------

const studentData = {
    preparation: 68,
    testsTaken: 8,
    averageScore: 76,
    accuracy: 81
};


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