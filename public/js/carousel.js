/*
  Carrossel da seção de história.

  Ele mostra diferentes frascos de poções, dando mais vida visual
  para a parte histórica da loja.
*/

const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const dots = document.querySelectorAll(".carousel-dots button");

let currentSlide = 0;

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[currentSlide].classList.add("active");
}

function goToNextSlide() {
  currentSlide++;

  if (currentSlide >= carouselSlides.length) {
    currentSlide = 0;
  }

  updateCarousel();
}

function goToPrevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = carouselSlides.length - 1;
  }

  updateCarousel();
}

nextButton.addEventListener("click", goToNextSlide);
prevButton.addEventListener("click", goToPrevSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide = Number(dot.dataset.slide);
    updateCarousel();
  });
});

/*
  Troca automática a cada 4 segundos.
*/
setInterval(goToNextSlide, 4000);