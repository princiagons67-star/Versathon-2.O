let generatedQuestions = [];


// =====================================================
// LOAD QUESTIONS
// =====================================================

async function loadQuestions() {

    const notes =
        localStorage.getItem("studentNotes");


    // No notes

    if (!notes || notes.trim() === "") {

        document.getElementById("loading").style.display =
            "none";

        document.getElementById("no-notes").style.display =
            "block";

        return;

    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/questions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    notes: notes,

                    difficulty: "Easy",

                    count: 10

                })

            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Unable to generate questions."
            );

        }


        generatedQuestions =
            data.questions || [];


        document.getElementById("loading").style.display =
            "none";


        displayQuestions();

    }

    catch (error) {

        console.error(error);


        document.getElementById("loading").innerHTML = `

            <h3>
                Unable to generate questions
            </h3>

            <p>
                Make sure the backend server is running.
            </p>

            <p>
                ${error.message}
            </p>

        `;

    }

}


// =====================================================
// DISPLAY QUESTIONS
// =====================================================

function displayQuestions() {

    const container =
        document.getElementById("questions-container");


    container.innerHTML = "";


    if (generatedQuestions.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    No questions could be generated.
                </h3>

                <p>
                    Try uploading notes with more readable text.
                </p>

            </div>

        `;

        return;

    }


    generatedQuestions.forEach(
        function(question, index) {

            const card =
                document.createElement("div");


            card.className =
                "question";


            const optionsHTML =
                question.options.map(
                    function(option, optionIndex) {

                        return `

                            <div class="option">

                                <strong>
                                    ${String.fromCharCode(65 + optionIndex)}.
                                </strong>

                                ${option}

                            </div>

                        `;

                    }
                ).join("");


            card.innerHTML = `

                <span class="difficulty">
                    ${question.difficulty}
                </span>

                <h3>
                    ${index + 1}. ${question.question}
                </h3>

                <div class="options">

                    ${optionsHTML}

                </div>

                <button
                    type="button"
                    class="answer-button"
                    onclick="showAnswer(${index})">

                    View Answer

                </button>

                <div
                    id="answer-${index}"
                    class="answer">

                    <strong>
                        Correct Answer:
                    </strong>

                    ${question.correctAnswer}

                    <br><br>

                    <strong>
                        Explanation:
                    </strong>

                    ${question.explanation}

                </div>

                <div class="topic">

                    Topic:
                    ${question.topic}

                </div>

            `;


            container.appendChild(card);

        }
    );


    document.getElementById("test-box").style.display =
        "block";

}


// =====================================================
// SHOW ANSWER
// =====================================================

function showAnswer(index) {

    const answer =
        document.getElementById(
            "answer-" + index
        );


    if (answer.style.display === "block") {

        answer.style.display =
            "none";

    }

    else {

        answer.style.display =
            "block";

    }

}


// =====================================================
// SEND QUESTIONS TO TEST
// =====================================================

function sendQuestionsToTest() {

    if (generatedQuestions.length === 0) {

        alert(
            "No questions are available."
        );

        return;

    }


    localStorage.setItem(
        "testQuestions",
        JSON.stringify(generatedQuestions)
    );


    alert(
        "Questions are ready for the Test module!"
    );


    window.location.href =
        "tests.html";

}


// =====================================================
// START
// =====================================================

loadQuestions();