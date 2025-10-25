const greeting = document.getElementById("greeting");
const hours = new Date().getHours();

if (hours < 12) {
  greeting.textContent = "🌞 Good Morning!";
} else if (hours < 18) {
  greeting.textContent = "🌤️ Good Afternoon!";
} else {
  greeting.textContent = "🌙 Good Evening!";
}

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 Dark Mode";
  }
});