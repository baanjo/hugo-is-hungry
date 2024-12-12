document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".carousel-container");
    const images = document.querySelectorAll(".carousel-container img");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    let index = 0;
    const totalImages = images.length;

    // Function to update the carousel display
    function updateCarousel() {
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    // Move to the previous image
    prevButton.addEventListener("click", () => {
        index = (index === 0) ? totalImages - 1 : index - 1;
        updateCarousel();
    });

    // Move to the next image
    nextButton.addEventListener("click", () => {
        index = (index === totalImages - 1) ? 0 : index + 1;
        updateCarousel();
    });
});
