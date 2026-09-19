const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));


// =====================================================
// HOME / SERVER TEST
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "Learn From Your Notes backend is running!"
    });
});


// =====================================================
// GENERATE QUESTIONS
// =====================================================

app.post("/api/questions", (req, res) => {

    try {

        const { notes, difficulty = "Easy", count = 10 } = req.body;


        // Check notes

        if (!notes || notes.trim() === "") {

            return res.status(400).json({
                error: "No notes were provided."
            });

        }


        // Limit question count

        const requestedCount =
            Math.min(Number(count) || 10, 30);


        // Create temporary questions

        const questions =
            generateQuestions(
                notes,
                difficulty,
                requestedCount
            );


        res.json({
            success: true,
            difficulty: difficulty,
            count: questions.length,
            questions: questions
        });

    }

    catch (error) {

        console.error("Question generation error:", error);

        res.status(500).json({
            error: "Unable to generate questions."
        });

    }

});


// =====================================================
// TEMPORARY QUESTION GENERATOR
// =====================================================

function generateQuestions(notes, difficulty, count) {

    // Clean the extracted notes
    const cleanNotes = notes
        .replace(/\r/g, " ")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();


    // Try splitting into sentences
    let sentences = cleanNotes
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length >= 15);


    // If sentence splitting did not work,
    // split the notes into smaller chunks instead.
    if (sentences.length === 0) {

        const words = cleanNotes.split(" ");

        sentences = [];

        for (
            let i = 0;
            i < words.length;
            i += 30
        ) {

            const chunk =
                words.slice(i, i + 30).join(" ").trim();

            if (chunk.length >= 15) {
                sentences.push(chunk);
            }

        }

    }


    // Generate questions
    const questions = [];


    for (
        let i = 0;
        i < Math.min(count, sentences.length);
        i++
    ) {

        const sentence = sentences[i];


        questions.push({

            id:
                "notes-" +
                Date.now() +
                "-" +
                i,

            difficulty:
                difficulty,

            question:
                "According to the uploaded notes, which statement is correct?",

            options: [

                sentence,

                "The notes do not contain information about this topic.",

                "This concept is unrelated to the subject.",

                "This statement contradicts the uploaded notes."

            ],

            correctAnswer:
                sentence,

            topic:
                "Uploaded Notes",

            explanation:
                "The correct answer is taken from the student's uploaded study material."

        });

    }


    return questions;
}

// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});