document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const buttons = document.querySelectorAll(".category-menu button");
    const recipeCards = document.querySelectorAll(".card");
    const noResults = document.getElementById("noResults");
    const recipeContainer = document.getElementById("recipeContainer");

    let activeCategory = "all"; // Default to "all"

    const searchableRecipes = Array.from(recipeCards).map((card, index) => {
        return {
            id: index,
            element: card,
            title: card.getAttribute("data-title"),
            summary: card.getAttribute("data-summary"),
            content: card.getAttribute("data-content"),
            categories: card.dataset.category
        };
    });

    // Initialize Fuse for fuzzy searching
    const fuse = new Fuse(searchableRecipes, {
        keys: [
            {name: 'title', weight: 1}, // Give higher weight for title matches
            {name: 'summary', weight: 0.5},
            {name: 'content', weight: 0.5}
        ],
        threshold: 0.2, // Accept typos such as Kartofel
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
        findAllMatches: true
    });

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
        const queryWords = searchInput.value.trim().split(/\s+/).filter(word => word.length >= 2);

        if (queryWords.length === 0) {
            recipeCards.forEach(card => {
                const matchesCategory = activeCategory === "all" || card.dataset.category.includes(activeCategory);
                card.style.display = matchesCategory ? "block" : "none";
                recipeContainer.appendChild(card); // append moves (not copies) the element to the end
            });
            updateNoResultsMessage();
            return;
        }

        // Map to store cumulative scores for each recipe (lower is better)
        const recipeScores = new Map();
        queryWords.forEach(word => {
            fuse.search(word).forEach(result => {
                const id = result.item.id;
                recipeScores.set(id, (recipeScores.get(id) || 1) * result.score);
            });
        });

        const matchedElements = Array.from(recipeScores.entries())
            .filter(entry => entry[1] < 0.85) // Filter out bad matches
            .sort((a, b) => a[1] - b[1])
            .map(([id]) => searchableRecipes[id])
            .filter(recipe => activeCategory === "all" || recipe.categories.includes(activeCategory))
            .map(recipe => recipe.element);

        // Hide all cards
        recipeCards.forEach(card => {
            card.style.display = "none";
        });

        // Add matching elements back to the container in order of relevance
        matchedElements.forEach(card => {
            recipeContainer.appendChild(card);
            card.style.display = "block";
        });

        updateNoResultsMessage();
    }

    // Show or hide the "no results" message
    function updateNoResultsMessage() {
        const hasVisible = Array.from(recipeCards).some(card => card.style.display !== "none");
        noResults.style.display = hasVisible ? "none" : "block";
    }

    // Initial call to ensure the current category and search query are applied on load
    filterAndSearch();
});
