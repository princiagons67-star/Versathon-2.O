let flashcards = [];
let currentCard = 0;
let isFlipped = false;

async function loadFlashcards() {
    const notes = localStorage.getItem("studentNotes");

    const cardText = document.getElementById("flashcardText");

    if (!notes || notes.trim() === "") {
        if (cardText) {
            cardText.textContent = "Please upload and process your notes first.";
        }
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/flashcards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                notes: notes,
                count: 10
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to generate flashcards.");
        }

        flashcards = data.flashcards || [];

        if (flashcards.length === 0) {
            cardText.textContent = "No flashcards could be generated.";
            return;
        }

        localStorage.setItem(
            "generatedFlashcards",
            JSON.stringify(flashcards)
        );

        displayFlashcard();

    } catch (error) {
        console.error(error);

        if (cardText) {
            cardText.textContent =
                "Unable to generate flashcards. Make sure the backend is running.";
        }
    }
}

function displayFlashcard() {
    const cardText = document.getElementById("flashcardText");

    if (!cardText || flashcards.length === 0) {
        return;
    }

    const card = flashcards[currentCard];

    isFlipped = false;

    cardText.textContent = card.question;

    const flashcard = document.querySelector(".flashcard");

    if (flashcard) {
        flashcard.classList.remove("flipped");
    }
}

function flipCard() {
    if (flashcards.length === 0) return;

    const cardText = document.getElementById("flashcardText");
    const flashcard = document.querySelector(".flashcard");

    const card = flashcards[currentCard];

    isFlipped = !isFlipped;

    if (isFlipped) {
        cardText.textContent = card.answer;

        if (flashcard) {
            flashcard.classList.add("flipped");
        }
    } else {
        cardText.textContent = card.question;

        if (flashcard) {
            flashcard.classList.remove("flipped");
        }
    }
}

function nextCard() {
    if (flashcards.length === 0) return;

    currentCard++;

    if (currentCard >= flashcards.length) {
        currentCard = 0;
    }

    displayFlashcard();
}

function previousCard() {
    if (flashcards.length === 0) return;

    currentCard--;

    if (currentCard < 0) {
        currentCard = flashcards.length - 1;
    }

    displayFlashcard();
}

loadFlashcards();