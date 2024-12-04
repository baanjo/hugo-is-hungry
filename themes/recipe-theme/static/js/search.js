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

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category-filter');
    const cards = document.querySelectorAll('.card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove `selected` class from all buttons
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Add `selected` class to the clicked button
            button.classList.add('selected');

            const category = button.dataset.category;

            cards.forEach(card => {
                if (category === 'all' || card.dataset.category.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
