// Format a number to use a comma as a decimal separator, rounded to 4 places
const formatNumber = (value) => {
    return value.toFixed(4).replace(".", ",").replace(/,?0+$/, "");
};

// Store and retrieve the original cell content
const getOriginalText = (cell) => {
    if (!cell.dataset.original) {
        cell.dataset.original = cell.textContent.trim();
    }
    return cell.dataset.original;
};

// Recalculate and replace all numbers in a given text
const recalculateNumbers = (text, portionMultiplier, baselinePortions) => {
    return text.replace(/(\d+,\d+|\d+)/g, (match) => {
        const originalNumber = parseFloat(match.replace(",", "."));
        if (!isNaN(originalNumber)) {
            const updatedValue = (originalNumber * portionMultiplier / baselinePortions);
            return formatNumber(updatedValue);
        }
        return match; // Return the original match if parsing fails
    });
};

//Update the table quantities based on the portion multiplier
const updateTableQuantities = (portionMultiplier, baselinePortions) => {
    document.querySelectorAll("table tr").forEach((row, index) => {
        if (index === 0) return; // Skip the header row

        const quantityCell = row.querySelector("td");
        if (!quantityCell) return;

        const originalText = getOriginalText(quantityCell);
        quantityCell.textContent = recalculateNumbers(originalText, portionMultiplier, baselinePortions);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const portionControl = document.getElementById("portionControl");
    const decreaseButton = document.getElementById("decreasePortion");
    const increaseButton = document.getElementById("increasePortion");
    const portionDisplay = document.getElementById("portionDisplay");

    const baselinePortions = parseFloat(portionControl.dataset.baselinePortions) || 2;
    let portionMultiplier = baselinePortions;

    // Update the portion display and refresh table quantities
    const updatePortion = (delta) => {
        portionMultiplier = Math.max(0.5, portionMultiplier + delta); // Prevent values below 0.5
        portionDisplay.textContent = formatNumber(portionMultiplier);
        updateTableQuantities(portionMultiplier, baselinePortions);
    };

    decreaseButton.addEventListener("click", () => updatePortion(-0.5));
    increaseButton.addEventListener("click", () => updatePortion(0.5));

    // Initialize the portion display and table
    portionDisplay.textContent = formatNumber(portionMultiplier);
});
