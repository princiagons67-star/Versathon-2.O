// =========================================
// COMMON APPLICATION SCRIPT
// Sidebar for all pages
// =========================================

function loadSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }


    sidebar.innerHTML = `

        <div class="sidebar-logo">
            NOTIVA
        </div>

        <nav class="sidebar-menu">

            <a
                href="dashboard.html"
                data-page="dashboard">

                <span>🏠</span>
                <span>Dashboard</span>

            </a>


            <a
                href="notes.html"
                data-page="notes">

                <span>📝</span>
                <span>Notes</span>

            </a>


            <a
                href="questions.html"
                data-page="questions">

                <span>❓</span>
                <span>Questions</span>

            </a>


            <a
                href="flashcards.html"
                data-page="flashcards">

                <span>🃏</span>
                <span>Flashcards</span>

            </a>


            <a
                href="mindmap.html"
                data-page="mindmap">

                <span>🧠</span>
                <span>Mind Map</span>

            </a>


            <a
                href="story.html"
                data-page="story">

                <span>📖</span>
                <span>Story Learning</span>

            </a>


            <a
                href="tests.html"
                data-page="tests">

                <span>🧪</span>
                <span>Tests</span>

            </a>

        </nav>

        <div class="sidebar-bottom">

        </div>

    `;


    setActiveSidebarLink();

}


// =========================================
// ACTIVE SIDEBAR LINK
// =========================================

function setActiveSidebarLink() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "");


    const links =
        document.querySelectorAll(
            ".sidebar a[data-page]"
        );


    links.forEach(function (link) {

        if (
            link.dataset.page ===
            currentPage
        ) {

            link.classList.add("active");

        }

    });

}


// =========================================
// START
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSidebar();

    }
);