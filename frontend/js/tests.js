function selectDifficulty(level) {
    document.getElementById("selected-level").textContent =
        "You selected: " + level;
}

function selectAnswer(answer) {
    document.getElementById("selected-answer").textContent =
        "You selected: " + answer;
}

function nextQuestion() {
    alert("Next question will be displayed here.");
}