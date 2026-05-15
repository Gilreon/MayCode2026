const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const slider = document.querySelector("[data-slider]");
const beforePanel = document.querySelector("[data-before]");
const sliderLine = document.querySelector("[data-line]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (slider && beforePanel && sliderLine) {
  const updateComparison = () => {
    const value = `${slider.value}%`;
    beforePanel.style.width = value;
    sliderLine.style.left = value;
  };

  slider.addEventListener("input", updateComparison);
  updateComparison();
}
