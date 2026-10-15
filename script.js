const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.getElementById("theme-icon");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeLabel.textContent = theme === "light" ? "DARK" : "LIGHT";
  themeIcon.src = theme === "light" ? "images/moon.png" : "images/sun.svg";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
});

setTheme(localStorage.getItem("theme") || "light");