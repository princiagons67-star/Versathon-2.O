    let mindMapData = null;

const colours = [
    "#FF6B9D",
    "#FFB84D",
    "#42C88A",
    "#5B8DEF",
    "#9B6DFF",
    "#FF6B6B"
];

const icons = [
    "⚙️",
    "💡",
    "📚",
    "🔧",
    "🔐",
    "⭐"
];

async function loadMindMap() {

    const notes = localStorage.getItem("studentNotes");

    const container =
        document.getElementById("mindmap-container");

    if (!notes || notes.trim() === "") {

        container.innerHTML = `
            <div class="mindmap-empty">
                <div class="empty-icon">📚</div>
                <h2>No notes yet</h2>
                <p>Upload your study material first.</p>
            </div>
        `;

        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/mindmap",
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
                data.error || "Mind map generation failed."
            );
        }

        mindMapData = data.mindmap;

        createMindMap();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="mindmap-empty">
                <div class="empty-icon">⚠️</div>
                <h2>Something went wrong</h2>
                <p>Make sure the backend server is running.</p>
            </div>
        `;
    }
}


/* ==========================================
   CREATE MIND MAP
========================================== */

function createMindMap() {

    const container =
        document.getElementById("mindmap-container");

    container.innerHTML = "";


    const map =
        document.createElement("div");

    map.className = "mind-map";

    container.appendChild(map);


    /* ---------------------------------------
       SVG CONNECTION LAYER
    --------------------------------------- */

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.classList.add("mind-lines");

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    svg.setAttribute(
        "viewBox",
        "0 0 1200 700"
    );

    map.appendChild(svg);


    /* ---------------------------------------
       CENTRAL TOPIC
    --------------------------------------- */

    const centre =
        document.createElement("div");

    centre.className = "central-topic";

    centre.innerHTML = `
        <div class="brain">🧠</div>

        <div class="central-text">
            ${escapeHTML(
                mindMapData.title || "Your Topic"
            )}
        </div>
    `;

    map.appendChild(centre);


    /* ---------------------------------------
       CREATE BETTER BRANCHES
    --------------------------------------- */

    const branches =
        makeBetterBranches(
            mindMapData.branches || []
        );


    const positions = [

        {
            x: 80,
            y: 90
        },

        {
            x: 850,
            y: 90
        },

        {
            x: 900,
            y: 300
        },

        {
            x: 80,
            y: 300
        },

        {
            x: 270,
            y: 530
        },

        {
            x: 690,
            y: 530
        }

    ];


    branches
        .slice(0, 6)
        .forEach(
            function(branch, index) {

                createBranch(
                    map,
                    svg,
                    branch,
                    index,
                    positions[index]
                );

            }
        );


    /*
       Draw the connections after
       all nodes exist.
    */

    setTimeout(
        drawLines,
        50
    );
}


/* ==========================================
   IMPROVE RAW BACKEND TOPICS
========================================== */

function makeBetterBranches(rawBranches) {

    const results = [];

    rawBranches.forEach(
        function(branch) {

            if (!branch) {
                return;
            }

            let title =
                branch.name || "";

            title =
                title
                    .replace(/[.,:;!?]/g, "")
                    .trim();


            /*
               Don't show meaningless
               one-word branches.
            */

            if (
                title.length < 5 ||
                title.split(" ").length === 1
            ) {

                if (
                    branch.points &&
                    branch.points.length > 0
                ) {

                    const sentence =
                        branch.points[0];

                    title =
                        makeTitleFromSentence(
                            sentence
                        );
                }
            }


            if (!title) {
                return;
            }


            results.push({
                name: title,
                points:
                    branch.points || []
            });

        }
    );


    /*
       Remove duplicate concepts.
    */

    const unique = [];

    results.forEach(
        function(item) {

            const exists =
                unique.some(
                    x =>
                        x.name.toLowerCase() ===
                        item.name.toLowerCase()
                );

            if (!exists) {
                unique.push(item);
            }
        }
    );


    return unique;
}


/* ==========================================
   MAKE A SHORT CONCEPT TITLE
========================================== */

function makeTitleFromSentence(sentence) {

    if (!sentence) {
        return "Key Concept";
    }

    const words =
        sentence
            .replace(/[.,:;!?]/g, "")
            .split(/\s+/)
            .filter(word => word.length > 2);


    return words
        .slice(0, 4)
        .join(" ");
}


/* ==========================================
   CREATE BRANCH NODE
========================================== */

function createBranch(
    map,
    svg,
    branch,
    index,
    position
) {

    const node =
        document.createElement("div");

    node.className =
        "mind-branch branch-" + index;


    node.style.left =
        position.x + "px";

    node.style.top =
        position.y + "px";


    node.innerHTML = `

        <div
            class="branch-colour"
            style="background:${colours[index]}"
        ></div>

        <div class="branch-top">

            <div
                class="branch-icon"
                style="background:${colours[index]}"
            >
                ${icons[index]}
            </div>

            <div class="branch-title">
                ${escapeHTML(branch.name)}
            </div>

        </div>

        <div class="branch-info">

            ${
                branch.points.length > 0

                ?

                branch.points
                    .slice(0, 3)
                    .map(
                        point =>
                            `<p>${escapeHTML(point)}</p>`
                    )
                    .join("")

                :

                `<p>Explore this concept.</p>`
            }

        </div>

    `;


    map.appendChild(node);


    /*
       Click to expand
    */

    node.addEventListener(
        "click",
        function() {

            node.classList.toggle(
                "expanded"
            );

        }
    );
}


/* ==========================================
   DRAW CURVED CONNECTIONS
========================================== */

function drawLines() {

    const map =
        document.querySelector(".mind-map");

    const svg =
        document.querySelector(".mind-lines");

    const centre =
        document.querySelector(
            ".central-topic"
        );

    const branches =
        document.querySelectorAll(
            ".mind-branch"
        );


    if (!map || !svg || !centre) {
        return;
    }


    svg.innerHTML = "";


    const mapRect =
        map.getBoundingClientRect();

    const centreRect =
        centre.getBoundingClientRect();


    const startX =
        centreRect.left -
        mapRect.left +
        centreRect.width / 2;


    const startY =
        centreRect.top -
        mapRect.top +
        centreRect.height / 2;


    branches.forEach(
        function(branch, index) {

            const rect =
                branch.getBoundingClientRect();


            const endX =
                rect.left -
                mapRect.left +
                rect.width / 2;


            const endY =
                rect.top -
                mapRect.top +
                rect.height / 2;


            const curve =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            const controlX =
                (startX + endX) / 2;


            const controlY =
                (startY + endY) / 2;


            const path = `
                M ${startX} ${startY}
                Q ${controlX} ${controlY}
                  ${endX} ${endY}
            `;


            curve.setAttribute(
                "d",
                path
            );


            curve.setAttribute(
                "stroke",
                colours[index]
            );


            curve.setAttribute(
                "stroke-width",
                "7"
            );


            curve.setAttribute(
                "fill",
                "none"
            );


            curve.setAttribute(
                "stroke-linecap",
                "round"
            );


            curve.setAttribute(
                "opacity",
                "0.75"
            );


            svg.appendChild(
                curve
            );

        }
    );
}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}


window.addEventListener(
    "resize",
    drawLines
);


loadMindMap();