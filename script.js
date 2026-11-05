const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const searchForm = document.getElementById("searchForm");
const propertyGrid = document.getElementById("propertyGrid");
const noResults = document.getElementById("noResults");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("propertyType").value;
  const location = document.getElementById("propertyLocation").value;
  const budget = document.getElementById("propertyBudget").value;
  let visibleCount = 0;

  propertyGrid.querySelectorAll(".property-card").forEach((card) => {
    const matchesType = type === "all" || card.dataset.type === type;
    const matchesLocation = location === "all" || card.dataset.location === location;
    const price = Number(card.dataset.price);
    const matchesBudget = budget === "all" || (budget === "under" ? price < 10000000 : price >= 10000000);
    const visible = matchesType && matchesLocation && matchesBudget;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  noResults.hidden = visibleCount !== 0;
  document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("formMessage").textContent =
    "Thank you! This demo form is ready to be connected to an email or backend service.";
  event.currentTarget.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
