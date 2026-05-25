const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const slider = document.querySelector("[data-slider]");
const beforePanel = document.querySelector("[data-before]");
const sliderLine = document.querySelector("[data-line]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themePreference = window.matchMedia("(prefers-color-scheme: dark)");
const packageOptions = document.querySelectorAll("[data-package-option]");
const selectedPackageInput = document.querySelector("[data-selected-package]");
const selectedPackageLabel = document.querySelector("[data-selected-package-label]");
const contactForm = document.querySelector("[data-contact-form]");
const scrollLinks = document.querySelectorAll('a[href^="#"]');

const getPreferredTheme = () => {
  return themePreference.matches ? "dark" : "light";
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeLabel) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeLabel.textContent = isDark ? "Dark" : "Light";
  }
};

setTheme(getPreferredTheme());

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", targetId);

    if (siteNav && navToggle) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (slider && beforePanel && sliderLine) {
  const updateComparison = () => {
    const value = `${slider.value}%`;
    beforePanel.style.width = value;
    sliderLine.style.left = value;
  };

  slider.addEventListener("input", updateComparison);
  updateComparison();
}

if (packageOptions.length && selectedPackageInput && selectedPackageLabel) {
  const selectPackage = (option) => {
    const packageName = option.dataset.packageOption;

    packageOptions.forEach((packageOption) => {
      const isSelected = packageOption === option;
      packageOption.classList.toggle("is-selected", isSelected);
      packageOption.setAttribute("aria-checked", String(isSelected));
      packageOption.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    selectedPackageInput.value = packageName;
    selectedPackageLabel.textContent = `Selected package: ${packageName}`;
  };

  packageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      selectPackage(option);
    });

    option.addEventListener("keydown", (event) => {
      const currentIndex = Array.from(packageOptions).indexOf(option);
      const lastIndex = packageOptions.length - 1;
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      } else if (event.key === " " || event.key === "Enter") {
        selectPackage(option);
        event.preventDefault();
        return;
      } else {
        return;
      }

      event.preventDefault();
      const nextOption = packageOptions[nextIndex];
      selectPackage(nextOption);
      nextOption.focus();
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

themePreference.addEventListener("change", () => {
  setTheme(getPreferredTheme());
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Not provided";
    const website = formData.get("website") || "Not provided";
    const message = formData.get("message") || "Not provided";
    const selectedPackage = formData.get("package") || "Not selected";
    const subject = `Website teardown request from ${name}`;
    const body = [
      `Name: ${name}`,
      `Website URL: ${website}`,
      `Selected package: ${selectedPackage}`,
      "",
      "Biggest concern:",
      message,
    ].join("\n");

    window.location.href = `mailto:gilreon202@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
