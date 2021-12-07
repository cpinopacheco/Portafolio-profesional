const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");
const toggleColors = document.getElementById("toggle-colors");
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");
const scrollButton = document.querySelector(".scroll-top-btn");
const rootStyles = document.documentElement.style;

const scrollTopButton = () => {
  window.addEventListener("scroll", (e) => {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 900) {
      scrollButton.classList.remove("hidden");
    } else {
      scrollButton.classList.add("hidden");
    }
  });
};

scrollTopButton();

scrollButton.addEventListener("click", (e) => {
  if (e.target === scrollButton || e.target.matches(".scroll-top-btn i")) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }
});

const changeLanguage = async (language) => {
  const requestJson = await fetch(`js/languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    console.log(section, value);
    textToChange.innerHTML = texts[section][value];
  }
};

flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

toggleTheme.addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
  if (toggleIcon.src.includes("moon.svg")) {
    toggleIcon.src = "assets/icons/sun.svg";
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.src = "assets/icons/moon.svg";
    toggleText.textContent = "Dark Mode";
  }
});

toggleColors.addEventListener("click", (e) => {
  rootStyles.setProperty("--primary-color", e.target.dataset.color);
});
