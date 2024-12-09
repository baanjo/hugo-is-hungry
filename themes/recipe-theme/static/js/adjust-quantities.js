document.addEventListener("DOMContentLoaded", () => {
    const decreaseButton = document.getElementById("decreasePortion");
    const increaseButton = document.getElementById("increasePortion");
    const portionDisplay = document.getElementById("portionDisplay");

    let portionMultiplier = 2; // Default baseline

    // Update portion count and recalculate quantities
    const updatePortion = (delta) => {
        portionMultiplier = Math.max(0.5, portionMultiplier + delta); // Prevent values below 0.5
        portionDisplay.textContent = portionMultiplier.toString().replace(".", ",");

        document.querySelectorAll("table tr").forEach((row, index) => {
            if (index === 0) return; // Skip table header row

            const quantityCell = row.querySelector("td");
            if (!quantityCell) return;

            // Extract and store original value
            if (!quantityCell.dataset.original) {
                quantityCell.dataset.original = quantityCell.textContent.trim();
            }

            const originalText = quantityCell.dataset.original;
            const match = originalText.match(/^([\d,\.]+)\s*(.*)$/);

            if (match) {
                const originalQuantity = parseFloat(match[1].replace(",", "."));
                const unit = match[2];

                if (!isNaN(originalQuantity)) {
                    // Adjust relative to baseline
                    const updatedValue = (originalQuantity * portionMultiplier / 2)
                        .toString()
                        .replace(".", ",");

                    quantityCell.textContent = `${updatedValue} ${unit}`;
                }
            }
        });
    };

    decreaseButton.addEventListener("click", () => updatePortion(-0.5));
    increaseButton.addEventListener("click", () => updatePortion(0.5));

    // Set initial portion display without recalculation
    portionDisplay.textContent = "2";
});
