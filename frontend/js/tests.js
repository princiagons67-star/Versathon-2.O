let selectedDifficulty = "";

let timeLeft = 60;
let timer;


/* Select Difficulty */

function selectDifficulty(level) {

    selectedDifficulty = level;

    document.getElementById("selected-level").textContent =
        "You selected: " + level;

    // Show test area
    document.getElementById("test-area").style.display = "block";

    // Start timer
    startTimer();

    /*
        Questions will come from the notes uploaded
        by the student.

        No questions are hard-coded here.
    */
}


/* Timer */

function startTimer() {

    // Stop previous timer
    clearInterval(timer);

    // Reset timer
    timeLeft = 60;

    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(function () {

        timeLeft--;

        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("Time's up!");

        }

    }, 1000);
}


/* Select Answer */

function selectAnswer(button) {

    const buttons = document.querySelectorAll(".option-button");

    // Remove previous selection
    buttons.forEach(function (option) {

        option.style.backgroundColor = "#ffffff";
        option.style.color = "#244394";

    });


    // Highlight selected answer
    button.style.backgroundColor = "#2d63d8";
    button.style.color = "#ffffff";


    document.getElementById("selected-answer").textContent =
        "You selected: " + button.textContent;
}


/* Next Question */

function nextQuestion() {

    /*
        The actual questions will later come
        from the student's uploaded notes.

        This function will be connected to
        the backend question API.
    */

    console.log(
        "Get next " + selectedDifficulty + " question from notes"
    );

}