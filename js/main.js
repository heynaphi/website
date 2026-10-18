// GitHub repository the site is published from, as "username/repo".
// Used to show the date of the latest commit in the footer.
const githubRepo = "heynaphi/website";

const siteStrings = {
  email: "p.heyna@hertie-school.org",
  mailSubject: "Hello Philipp 👋",
};

function renderSiteStrings(root = document) {
  const encodeValue = (value) => encodeURIComponent(value);
  const replacements = {
    email: siteStrings.email,
    mailSubject: siteStrings.mailSubject,
    mailSubjectEncoded: encodeValue(siteStrings.mailSubject),
  };

  const replaceTokens = (value) =>
    Object.entries(replacements).reduce(
      (result, [key, replacement]) => result.replaceAll(`{{${key}}}`, replacement),
      value,
    );

  root.querySelectorAll("[data-string]").forEach((element) => {
    const key = element.getAttribute("data-string");

    if (key && key in siteStrings) {
      element.textContent = siteStrings[key];
    }
  });

  root.querySelectorAll("[data-template-attrs]").forEach((element) => {
    element
      .getAttribute("data-template-attrs")
      .split(" ")
      .filter(Boolean)
      .forEach((attributeName) => {
        const value = element.getAttribute(attributeName);

        if (value) {
          element.setAttribute(attributeName, replaceTokens(value));
        }
      });
  });

  root.querySelectorAll("[data-template]").forEach((element) => {
    element.innerHTML = replaceTokens(element.innerHTML);
  });
}

window.renderSiteStrings = renderSiteStrings;
renderSiteStrings();

const desktopParallaxQuery = window.matchMedia("(min-width: 1024px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const stickyContent = document.querySelector(".sticky-content");
let parallaxFrame = null;

function updateHeroParallax() {
  parallaxFrame = null;

  if (!stickyContent || !desktopParallaxQuery.matches || reducedMotionQuery.matches) {
    stickyContent?.style.removeProperty("--hero-parallax-y");
    return;
  }

  const offset = Math.max(-64, window.scrollY * -0.08);
  stickyContent.style.setProperty("--hero-parallax-y", `${offset}px`);
}

function requestHeroParallaxUpdate() {
  if (parallaxFrame !== null) {
    return;
  }

  parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
}

window.addEventListener("scroll", requestHeroParallaxUpdate, { passive: true });
desktopParallaxQuery.addEventListener("change", updateHeroParallax);
reducedMotionQuery.addEventListener("change", updateHeroParallax);
updateHeroParallax();

function renderLastUpdated() {
  const el = document.getElementById("last-updated");

  if (!el || githubRepo.includes("YOUR-")) {
    return;
  }

  fetch(`https://api.github.com/repos/${githubRepo}/commits?per_page=1`)
    .then((response) => response.json())
    .then(([latest]) => {
      const date = new Date(latest.commit.committer.date);
      el.textContent = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      el.setAttribute("datetime", date.toISOString());
    })
    .catch(() => {});
}

renderLastUpdated();
