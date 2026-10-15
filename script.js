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

/* ---------- PLANET DATA ---------- */
const API_URL = "https://anurella.github.io/json/planet.json";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchError = document.getElementById("search-error");
const planetCard = document.getElementById("planet-card");
const errorCard = document.getElementById("error-card");

let planets = [];

async function loadPlanets() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Request failed");
    planets = await response.json();
    showPlanet(planets.find((p) => p.name === "Earth") || planets[0]);
  } catch (error) {
    showError();
  }
}

function showPlanet(planet) {
  document.getElementById("planet-name").textContent = planet.name;
  document.getElementById("planet-type").textContent = planet.type;
  document.getElementById("planet-description").textContent = planet.description;
  document.getElementById("planet-gravity").textContent = planet.gravity;
  document.getElementById("planet-mass").textContent = planet.mass;
  document.getElementById("planet-period").textContent = planet.period;
  document.getElementById("planet-temperature").textContent = planet.temperature;
  document.getElementById("planet-moons").textContent = planet.moons;
  document.getElementById("planet-diameter").textContent = planet.diameter;
  document.getElementById("planet-distance").textContent = planet.distanceFromSun;

  const image = document.getElementById("planet-image");
  image.src = planet.image;
  image.alt = planet.name;

  clearError();
  planetCard.hidden = false;
  errorCard.hidden = true;
}

function showError() {
  searchForm.classList.add("has-error");
  searchError.hidden = false;
  planetCard.hidden = true;
  errorCard.hidden = false;
}

function clearError() {
  searchForm.classList.remove("has-error");
  searchError.hidden = true;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  const match = planets.find((p) => p.name.toLowerCase() === query);
  if (match) {
    showPlanet(match);
  } else {
    showError();
  }
});

searchInput.addEventListener("input", clearError);

loadPlanets();