const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "Learn From Your Notes backend is running!"
    });
});


// =====================================================
// QUESTIONS
// =====================================================

app.post("/api/questions", (req, res) => {

    try {

        const {
            notes,
            difficulty = "Easy",
            count = 10
        } = req.body;

        if (!notes || notes.trim() === "") {

            return res.status(400).json({
                error: "No notes were provided."
            });

        }

        const requestedCount =
            Math.min(Math.max(Number(count) || 10, 1), 30);

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

        console.error(
            "Question generation error:",
            error
        );

        res.status(500).json({
            error: "Unable to generate questions."
        });

    }

});


// =====================================================
// FLASHCARDS
// =====================================================

app.post("/api/flashcards", (req, res) => {

    try {

        const {
            notes,
            count = 10
        } = req.body;

        if (!notes || notes.trim() === "") {

            return res.status(400).json({
                error: "No notes were provided."
            });

        }

        const requestedCount =
            Math.min(Math.max(Number(count) || 10, 1), 30);

        const flashcards =
            generateFlashcards(
                notes,
                requestedCount
            );

        res.json({
            success: true,
            count: flashcards.length,
            flashcards: flashcards
        });

    }

    catch (error) {

        console.error(
            "Flashcard generation error:",
            error
        );

        res.status(500).json({
            error: "Unable to generate flashcards."
        });

    }

});


// =====================================================
// MIND MAP
// =====================================================

app.post("/api/mindmap", (req, res) => {

    try {

        const { notes } = req.body;

        if (!notes || notes.trim() === "") {

            return res.status(400).json({
                error: "No notes were provided."
            });

        }

        const mindmap =
            generateMindMap(notes);

        res.json({
            success: true,
            mindmap: mindmap
        });

    }

    catch (error) {

        console.error(
            "Mind map generation error:",
            error
        );

        res.status(500).json({
            error: "Unable to generate mind map."
        });

    }

});


// =====================================================
// STORY
// =====================================================

app.post("/api/story", (req, res) => {

    try {

        const { notes } = req.body;

        if (!notes || notes.trim() === "") {

            return res.status(400).json({
                error: "No notes were provided."
            });

        }

        const story =
            generateStory(notes);

        res.json({
            success: true,
            story: story
        });

    }

    catch (error) {

        console.error(
            "Story generation error:",
            error
        );

        res.status(500).json({
            error: "Unable to generate story."
        });

    }

});


// =====================================================
// COMMON NOTE PROCESSING
// =====================================================

function cleanNotes(notes) {

    return notes
        .replace(/\r/g, " ")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


function getSentences(notes) {

    const clean =
        cleanNotes(notes);

    return clean
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length >= 20);

}


function getWords(sentence) {

    return sentence
        .replace(/[,:;()[\]{}]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2);

}


function capitalise(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}


// =====================================================
// QUESTION GENERATOR
// =====================================================

function generateQuestions(
    notes,
    difficulty,
    count
) {

    const sentences =
        getSentences(notes);

    if (sentences.length === 0) {
        return [];
    }

    const questions = [];

    const usableSentences =
        shuffle([...sentences]);

    for (
        let i = 0;
        i < Math.min(count, usableSentences.length);
        i++
    ) {

        const sentence =
            usableSentences[i];

        const questionData =
            createQuestionFromSentence(
                sentence,
                sentences,
                difficulty,
                i
            );

        if (questionData) {

            questions.push(
                questionData
            );

        }

    }

    return questions;

}


function createQuestionFromSentence(
    sentence,
    allSentences,
    difficulty,
    index
) {

    const words =
        getWords(sentence);

    if (words.length < 5) {
        return null;
    }


    // Find a useful word to turn into a question.
    const importantWords =
        words.filter(word =>
            word.length >= 5 &&
            !isCommonWord(word)
        );


    if (importantWords.length === 0) {
        return null;
    }


    const answerWord =
        importantWords[
            index %
            importantWords.length
        ];


    // Create a question by replacing one important
    // word in the original sentence.
    const question =
        sentence.replace(
            new RegExp(
                "\\b" +
                escapeRegExp(answerWord) +
                "\\b",
                "i"
            ),
            "_____"
        );


    // If replacement did not happen, skip it.
    if (question === sentence) {
        return null;
    }


    const wrongAnswers =
        createWrongAnswers(
            answerWord,
            allSentences,
            3
        );


    const options =
        [
            answerWord,
            ...wrongAnswers
        ];


    shuffle(options);


    return {

        id:
            "notes-" +
            Date.now() +
            "-" +
            index,

        difficulty:
            difficulty,

        question:
            "Fill in the blank based on the uploaded notes: " +
            question,

        options:
            options,

        correctAnswer:
            answerWord,

        topic:
            findTopic(sentence),

        explanation:
            "The answer is taken from the information in the uploaded study notes."

    };

}


// =====================================================
// WRONG ANSWERS
// =====================================================

function createWrongAnswers(
    correctAnswer,
    sentences,
    required
) {

    const candidates = [];


    for (const sentence of sentences) {

        const words =
            getWords(sentence);

        for (const word of words) {

            if (
                word.toLowerCase() !==
                correctAnswer.toLowerCase() &&
                word.length >= 4 &&
                !isCommonWord(word)
            ) {

                candidates.push(word);

            }

        }

    }


    const unique =
        [...new Set(
            candidates.map(word =>
                word.toLowerCase()
            )
        )];


    shuffle(unique);


    const answers = [];


    for (const word of unique) {

        if (
            word.toLowerCase() !==
            correctAnswer.toLowerCase()
        ) {

            answers.push(
                word
            );

        }

        if (answers.length === required) {
            break;
        }

    }


    // If the notes do not contain enough useful words,
    // use neutral alternatives rather than pretending
    // they came from the notes.
    const backup =
        [
            "Information",
            "System",
            "Process"
        ];


    for (const word of backup) {

        if (
            answers.length < required &&
            word.toLowerCase() !==
            correctAnswer.toLowerCase() &&
            !answers.includes(word)
        ) {

            answers.push(word);

        }

    }


    return answers.slice(0, required);

}


// =====================================================
// FLASHCARD GENERATOR
// =====================================================

function generateFlashcards(
    notes,
    count
) {

    const sentences =
        getSentences(notes);

    const cards = [];

    const selected =
        shuffle([...sentences]);


    for (
        let i = 0;
        i < Math.min(count, selected.length);
        i++
    ) {

        const sentence =
            selected[i];

        const words =
            getWords(sentence);

        const important =
            words.find(word =>
                word.length >= 5 &&
                !isCommonWord(word)
            );


        if (!important) {
            continue;
        }


        const question =
            createFlashcardQuestion(
                sentence,
                important
            );


        cards.push({

            id:
                "card-" +
                Date.now() +
                "-" +
                i,

            question:
                question,

            answer:
                sentence,

            topic:
                findTopic(sentence)

        });

    }


    return cards;

}


function createFlashcardQuestion(
    sentence,
    keyword
) {

    const lower =
        sentence.toLowerCase();

    const index =
        lower.indexOf(
            keyword.toLowerCase()
        );


    if (index === -1) {

        return "What does this concept mean?";

    }


    return (
        "What does the following note explain about " +
        keyword +
        "?"
    );

}


// =====================================================
// MIND MAP GENERATOR
// =====================================================

function generateMindMap(notes) {

    const sentences =
        getSentences(notes);

    const clean =
        cleanNotes(notes);

    const words =
        getWords(clean);


    const mainTopic =
        findMainTopic(words);


    const topicWords =
        extractTopicWords(
            words,
            mainTopic,
            6
        );


    const branches =
        topicWords.map(
            (topic, index) => {

                const related =
                    sentences
                        .filter(sentence =>
                            sentence
                                .toLowerCase()
                                .includes(
                                    topic.toLowerCase()
                                )
                        )
                        .slice(0, 3)
                        .map(sentence =>
                            shortenSentence(
                                sentence,
                                8
                            )
                        );


                return {

                    name:
                        capitalise(topic),

                    points:
                        related

                };

            }
        );


    return {

        title:
            capitalise(mainTopic),

        branches:
            branches

    };

}


// =====================================================
// STORY GENERATOR
// =====================================================

function generateStory(notes) {

    const sentences =
        getSentences(notes);

    const clean =
        cleanNotes(notes);

    const words =
        getWords(clean);

    const mainTopic =
        findMainTopic(words);


    const selected =
        sentences.slice(0, 8);


    const paragraphs = [];


    paragraphs.push(
        "Imagine you are learning about " +
        mainTopic +
        "."
    );


    selected.forEach(
        sentence => {

            paragraphs.push(
                sentence
            );

        }
    );


    paragraphs.push(
        "The important idea is to connect these concepts together and remember how they relate to " +
        mainTopic +
        "."
    );


    return {

        title:
            "A Simple Story About " +
            capitalise(mainTopic),

        paragraphs:
            paragraphs

    };

}


// =====================================================
// TOPIC HELPERS
// =====================================================

function findTopic(sentence) {

    const words =
        getWords(sentence);

    const candidates =
        words.filter(word =>
            word.length >= 6 &&
            !isCommonWord(word)
        );


    if (candidates.length > 0) {

        return capitalise(
            candidates[0]
        );

    }


    return "Study Notes";

}


function findMainTopic(words) {

    const frequency = {};


    words.forEach(word => {

        const clean =
            word.toLowerCase();

        if (
            clean.length < 5 ||
            isCommonWord(clean)
        ) {
            return;
        }

        frequency[clean] =
            (frequency[clean] || 0) + 1;

    });


    const sorted =
        Object.entries(frequency)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    if (sorted.length > 0) {

        return sorted[0][0];

    }


    return "Your Study Topic";

}


function extractTopicWords(
    words,
    mainTopic,
    count
) {

    const frequency = {};


    words.forEach(word => {

        const clean =
            word.toLowerCase();

        if (
            clean.length < 5 ||
            clean ===
                mainTopic.toLowerCase() ||
            isCommonWord(clean)
        ) {
            return;
        }

        frequency[clean] =
            (frequency[clean] || 0) + 1;

    });


    return Object.entries(frequency)
        .sort(
            (a, b) =>
                b[1] - a[1]
        )
        .slice(0, count)
        .map(item => item[0]);

}


function shortenSentence(
    sentence,
    wordCount
) {

    const words =
        sentence.split(/\s+/);

    if (
        words.length <= wordCount
    ) {

        return sentence;

    }


    return (
        words
            .slice(0, wordCount)
            .join(" ") +
        "..."
    );

}


// =====================================================
// COMMON WORD FILTER
// =====================================================

function isCommonWord(word) {

    const commonWords = [

        "about",
        "after",
        "again",
        "also",
        "because",
        "being",
        "between",
        "could",
        "does",
        "from",
        "have",
        "into",
        "more",
        "other",
        "should",
        "such",
        "than",
        "that",
        "their",
        "there",
        "these",
        "they",
        "this",
        "those",
        "through",
        "using",
        "what",
        "when",
        "where",
        "which",
        "while",
        "with",
        "would",
        "your",

        "the",
        "and",
        "for",
        "are",
        "was",
        "were",
        "has",
        "had",
        "its",
        "not",
        "but",
        "can",
        "you",
        "our",
        "their",

        "system",
        "process",
        "important",
        "information",
        "concept"

    ];


    return commonWords.includes(
        word.toLowerCase()
    );

}


// =====================================================
// UTILITY
// =====================================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;

}


function escapeRegExp(text) {

    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

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