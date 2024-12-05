document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const buttons = document.querySelectorAll(".category-filter");
    const recipeCards = document.querySelectorAll(".card");

    let activeCategory = "all"; // Default to "all"

    // Handle category filtering
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove `selected` class from all buttons
            buttons.forEach((btn) => btn.classList.remove("selected"));

            // Add `selected` class to the clicked button
            button.classList.add("selected");

            // Set the active category
            activeCategory = button.dataset.category;

            // Filter recipes by category and apply search query
            filterAndSearch();
        });
    });

    // Handle search input
    searchInput.addEventListener("input", () => {
        filterAndSearch();
    });

    // Function to filter and search recipes
    function filterAndSearch() {
        const query = searchInput.value.toLowerCase().trim();

        recipeCards.forEach((card) => {
            const title = card.getAttribute("data-title");
            const summary = card.getAttribute("data-summary");
            const content = card.getAttribute("data-content");
            const categories = card.dataset.category;

            // Check if the card matches the active category and search query
            const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
            const matchesSearch = title.includes(query) || summary.includes(query) || content.includes(query);

            // Show the card only if it matches both category and search query
            if (matchesCategory && matchesSearch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Initial call to ensure the current category and search query are applied on load
    filterAndSearch();
});
