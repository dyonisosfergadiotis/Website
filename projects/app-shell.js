const appHeader = document.querySelector(".app-header");
const appNavToggle = document.querySelector(".app-nav-toggle");
const appNav = document.querySelector(".app-nav");

if (appHeader) {
  const scrollRevealThreshold = 48;
  let scrollFrame;

  document.documentElement.classList.add("app-header-scroll-reveal");

  const updateHeaderVisibility = () => {
    const shouldShow =
      window.scrollY > scrollRevealThreshold ||
      appHeader.matches(":focus-within") ||
      appNav?.classList.contains("open");

    appHeader.classList.toggle("is-visible", shouldShow);
    scrollFrame = undefined;
  };

  const requestHeaderUpdate = () => {
    if (scrollFrame !== undefined) return;
    scrollFrame = window.requestAnimationFrame(updateHeaderVisibility);
  };

  updateHeaderVisibility();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderUpdate);
  appHeader.addEventListener("focusin", requestHeaderUpdate);
  appHeader.addEventListener("focusout", requestHeaderUpdate);
}

appNavToggle?.addEventListener("click", () => {
  const open = appNav?.classList.toggle("open") ?? false;
  appNavToggle.setAttribute("aria-expanded", String(open));
  appHeader?.classList.toggle("is-visible", open || window.scrollY > 48);
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
