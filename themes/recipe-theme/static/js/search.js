document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const recipeCards = document.querySelectorAll(".card");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        recipeCards.forEach((card) => {
            const title = card.getAttribute("data-title");
            const summary = card.getAttribute("data-summary");
            const content = card.getAttribute("data-content");

            // Show card if query matches title or content
            if (title.includes(query) || summary.includes(query) || content.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
