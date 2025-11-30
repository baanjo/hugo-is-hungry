document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const buttons = document.querySelectorAll(".category-menu button");
    const recipeCards = document.querySelectorAll(".card");
    const noResults = document.getElementById("noResults");
    const recipeContainer = document.getElementById("recipeContainer");

    let activeCategory = "all"; // Default to "all"
    let originalOrder = [];

    const searchableRecipes = Array.from(recipeCards).map((card, index) => {
        originalOrder.push(card);
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
            { name: 'title', weight: 0.7 }, // Give higher weight for title matches
            { name: 'summary', weight: 0.2 },
            { name: 'content', weight: 0.1 }
        ],
        threshold: 0.2, // Accept typos such as Kartofel
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
        shouldSort: true
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
        const query = searchInput.value.trim();

        if (query === "") {
            originalOrder.forEach(card => {
                recipeContainer.appendChild(card);
                const matchesCategory = activeCategory === "all" || card.dataset.category.includes(activeCategory);
                card.style.display = matchesCategory ? "block" : "none";
            });
            updateNoResultsMessage();
            return;
        }

        const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length >= 2);
        if (queryWords.length === 0) {
            updateNoResultsMessage();
            return;
        }

        const recipeScores = new Map();
        queryWords.forEach(word => {
            fuse.search(word).forEach(result => {
                const id = result.item.id;
                recipeScores.set(id, (recipeScores.get(id) || 0) + (1 / (result.score + 0.1)) + 1);
            });
        });

        const matchedElements = Array.from(recipeScores.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => searchableRecipes[id])
            .filter(recipe => activeCategory === "all" || recipe.categories.includes(activeCategory))
            .map(recipe => recipe.element);

        const matchingSet = new Set(matchedElements);
        recipeCards.forEach(card => {
            card.style.display = matchingSet.has(card) ? "block" : "none";
        });

        matchedElements.forEach(card => recipeContainer.appendChild(card));
        updateNoResultsMessage();
    }

    function updateNoResultsMessage() {
        const hasVisible = Array.from(recipeCards).some(card => card.style.display !== "none");
        noResults.style.display = hasVisible ? "none" : "block";
    }

    // Initial call to ensure the current category and search query are applied on load
    filterAndSearch();
});
