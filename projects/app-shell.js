const appNavToggle = document.querySelector(".app-nav-toggle");
const appNav = document.querySelector(".app-nav");

appNavToggle?.addEventListener("click", () => {
  const open = appNav?.classList.toggle("open") ?? false;
  appNavToggle.setAttribute("aria-expanded", String(open));
});

appNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    appNav.classList.remove("open");
    appNavToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-current-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
