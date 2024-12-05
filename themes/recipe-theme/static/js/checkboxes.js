document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("li").forEach(listItem => {
        const checkbox = listItem.querySelector("input[type='checkbox']");

        if (checkbox) {
            checkbox.removeAttribute("disabled"); // Enable the checkbox

            // Add click event listener to the list item
            listItem.addEventListener("click", (event) => {
                if (event.target !== checkbox) {
                    checkbox.checked = !checkbox.checked; // Toggle the checkbox state
                }
                listItem.classList.toggle("completed", checkbox.checked); // Toggle strikethrough
            });
        }
    });
});
