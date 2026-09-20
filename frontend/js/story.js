async function loadStory() {

    const notes = localStorage.getItem("studentNotes");
    const container = document.getElementById("story-container");

    if (!notes || notes.trim() === "") {

        container.innerHTML = `
            <h2>📚 No Notes Available</h2>

            <p>
                Please upload and process your study notes
                first.
            </p>
        `;

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
        `;

        container.innerHTML = html;

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


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}


loadStory();