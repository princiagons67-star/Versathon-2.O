let currentStoryText = "";


async function loadStory() {

    const notes = localStorage.getItem("studentNotes");
    const container = document.getElementById("story-container");

    if (!notes || notes.trim() === "") {

        container.innerHTML = `
            <h2>📚 No Notes Available</h2>

            <p>
                Please upload and process your study notes first.
            </p>

            <button id="listen-button" type="button">
                🔊 Listen
            </button>
        `;

        setupListenButton();

        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/story",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    notes: notes
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to generate story."
            );
        }

        const story = data.story;

        let html = `
            <h2>📖 ${escapeHTML(story.title)}</h2>
        `;

        if (story.paragraphs && story.paragraphs.length > 0) {

            story.paragraphs.forEach(function(paragraph) {

                html += `
                    <p>${escapeHTML(paragraph)}</p>
                `;

            });

        }

        html += `
            <h3>💡 Keep Learning!</h3>

            <button id="listen-button" type="button">
                🔊 Listen
            </button>
        `;

        container.innerHTML = html;

        currentStoryText =
            story.title + ". " +
            story.paragraphs.join(". ");

        setupListenButton();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <h2>⚠️ Unable to Generate Story</h2>

            <p>
                Make sure the backend server is running.
            </p>

            <p>
                ${escapeHTML(error.message)}
            </p>
        `;
    }
}


function setupListenButton() {

    const button = document.getElementById("listen-button");

    if (!button) return;

    button.addEventListener("click", function() {

        if (!currentStoryText) {
            alert("There is no story available to read.");
            return;
        }

        if (!("speechSynthesis" in window)) {
            alert("Text-to-speech is not supported in this browser.");
            return;
        }

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(
            currentStoryText
        );

        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onstart = function() {
            button.textContent = "⏹️ Stop";
        };

        speech.onend = function() {
            button.textContent = "🔊 Listen";
        };

        window.speechSynthesis.speak(speech);

        button.onclick = function() {

            if (window.speechSynthesis.speaking) {

                window.speechSynthesis.cancel();

                button.textContent = "🔊 Listen";

            } else {

                setupListenButton();

            }
        };

    });
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}


loadStory();