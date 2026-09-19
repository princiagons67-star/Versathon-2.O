// =========================================
// NOTES - PASTE TEXT
// =========================================

function processNotes() {

    const notesInput =
        document.getElementById("notesInput");

    const notesResult =
        document.getElementById("notesResult");

    const displayNotes =
        document.getElementById("displayNotes");

    if (!notesInput) {
        return;
    }

    const notes =
        notesInput.value.trim();

    if (notes === "") {

        alert("Please paste your notes first.");

        return;
    }

    displayNotes.textContent =
        notes;

    notesResult.style.display =
        "block";

    localStorage.setItem(
        "studentNotes",
        notes
    );

}


// =========================================
// READ UPLOADED FILE
// =========================================

function readUploadedFile() {

    const fileInput =
        document.getElementById("noteFile");

    if (!fileInput) {
        return;
    }

    const file =
        fileInput.files[0];

    if (!file) {

        alert("Please select a file first.");

        return;
    }

    const fileName =
        file.name.toLowerCase();


    // TXT

    if (fileName.endsWith(".txt")) {

        const reader =
            new FileReader();

        reader.onload =
            function (event) {

                const text =
                    event.target.result;

                displayUploadedNotes(text);

            };

        reader.readAsText(file);

    }


    // PDF

    else if (fileName.endsWith(".pdf")) {

        readPDF(file);

    }


    // DOCX

    else if (fileName.endsWith(".docx")) {

        readDOCX(file);

    }


    else {

        alert(
            "Please upload a PDF, DOCX or TXT file."
        );

    }

}


// =========================================
// DISPLAY UPLOADED NOTES
// =========================================

function displayUploadedNotes(text) {

    const displayNotes =
        document.getElementById("displayNotes");

    const notesResult =
        document.getElementById("notesResult");

    if (!displayNotes || !notesResult) {
        return;
    }

    displayNotes.textContent =
        text;

    notesResult.style.display =
        "block";

    localStorage.setItem(
        "studentNotes",
        text
    );

    notesResult.scrollIntoView({
        behavior: "smooth"
    });

}


// =========================================
// READ PDF
// =========================================

async function readPDF(file) {

    try {

        const arrayBuffer =
            await file.arrayBuffer();

        const pdf =
            await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;

        let fullText = "";

        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            const page =
                await pdf.getPage(pageNumber);

            const textContent =
                await page.getTextContent();

            const pageText =
                textContent.items
                    .map(item => item.str)
                    .join(" ");

            fullText +=
                `\n\n--- Page ${pageNumber} ---\n\n`;

            fullText +=
                pageText;
        }

        if (fullText.trim() === "") {

            alert(
                "No readable text was found in this PDF."
            );

            return;
        }

        displayUploadedNotes(fullText);

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to read this PDF."
        );

    }

}


// =========================================
// READ DOCX
// =========================================

function readDOCX(file) {

    const reader =
        new FileReader();

    reader.onload =
        function (event) {

            mammoth.extractRawText({
                arrayBuffer:
                    event.target.result
            })

            .then(function (result) {

                const text =
                    result.value;

                if (text.trim() === "") {

                    alert(
                        "No readable text was found in this DOCX file."
                    );

                    return;
                }

                displayUploadedNotes(text);

            })

            .catch(function (error) {

                console.error(error);

                alert(
                    "Unable to read this DOCX file."
                );

            });

        };

    reader.readAsArrayBuffer(file);

}


// =========================================
// SHOW ANSWER
// =========================================

function showAnswer(id) {

    const answer =
        document.getElementById(id);

    if (!answer) {
        return;
    }

    if (answer.style.display === "block") {

        answer.style.display =
            "none";

    } else {

        answer.style.display =
            "block";

    }

}


// =========================================
// FLASHCARDS
// =========================================

const flashcards = [

    {
        question:
            "What is an Operating System?",

        answer:
            "An Operating System is system software that manages computer hardware and software."
    },

    {
        question:
            "What is a Process?",

        answer:
            "A process is a program that is currently being executed."
    },

    {
        question:
            "What is RAM?",

        answer:
            "RAM is temporary memory used by the computer to store data while programs are running."
    },

    {
        question:
            "What is a CPU?",

        answer:
            "CPU is the main processing unit that executes instructions."
    }

];


let currentCard = 0;
let showingAnswer = false;


function displayFlashcard() {

    const card =
        document.getElementById(
            "flashcardText"
        );

    if (!card) {
        return;
    }

    if (showingAnswer) {

        card.innerText =
            flashcards[currentCard].answer;

    } else {

        card.innerText =
            flashcards[currentCard].question;

    }

}


function flipCard() {

    showingAnswer =
        !showingAnswer;

    displayFlashcard();

}


function nextCard() {

    currentCard++;

    if (
        currentCard >=
        flashcards.length
    ) {

        currentCard = 0;

    }

    showingAnswer = false;

    displayFlashcard();

}


function previousCard() {

    currentCard--;

    if (currentCard < 0) {

        currentCard =
            flashcards.length - 1;

    }

    showingAnswer = false;

    displayFlashcard();

}