const projectCardTemplate = document.createElement("template");

projectCardTemplate.innerHTML = `
  <article class="project-card" data-node-id="3:32" data-name="card">
    <div class="project-card__media" data-node-id="3:33">
      <img class="project-card__image" alt="" />
      <div class="project-card__badge"></div>
    </div>
    <div class="project-card__body" data-node-id="3:36">
      <h3 class="project-card__title" data-node-id="3:37"></h3>
      <p class="project-card__description" data-node-id="3:38"></p>
    </div>
    <div class="project-card__actions"></div>
    <div class="project-card__accordions"></div>
  </article>
`;

class ProjectCard extends HTMLElement {
  static get observedAttributes() {
    return ["badge", "button-label", "description", "hide-image", "image", "image-width", "link", "target", "title", "vertical"];
  }

  connectedCallback() {
    this.buttonConfigs = this.getButtonConfigs();
    this.accordionConfigs = this.getAccordionConfigs();

    if (!this.querySelector(".project-card")) {
      this.querySelectorAll(":scope > project-card-button, :scope > project-card-accordion, :scope > site-button, :scope > site-accordion").forEach((child) => child.remove());
      this.append(projectCardTemplate.content.cloneNode(true));
    }

    this.bindCardLink();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const link = this.querySelector(".project-card");
    const media = this.querySelector(".project-card__media");
    const image = this.querySelector(".project-card__image");
    const title = this.querySelector(".project-card__title");
    const description = this.querySelector(".project-card__description");
    const badge = this.querySelector(".project-card__badge");
    const actions = this.querySelector(".project-card__actions");
    const accordions = this.querySelector(".project-card__accordions");
    const imageSource = this.getAttribute("image");
    const shouldHideImage = this.hasAttribute("hide-image");
    const isVertical = this.getAttribute("vertical") !== "false";

    if (link) {
      link.setAttribute("role", "link");
      link.tabIndex = 0;
      link.dataset.href = this.getAttribute("link") || "#";
      link.classList.toggle("project-card--horizontal", !isVertical);
      link.classList.toggle("project-card--vertical", isVertical);
      link.classList.toggle("project-card--no-image", shouldHideImage);
      link.style.setProperty("--project-card-image-width", this.getAttribute("image-width") || "38%");
    }

    if (media) {
      media.hidden = shouldHideImage;
    }

    if (title) {
      title.textContent =
        this.getAttribute("title") ||
        "The Far-Right on TikTok: Incidental Exposure to Political Content on Social Media Can Mobilize Without Persuading";
    }

    if (description) {
      description.innerHTML =
        this.getAttribute("description") ||
        "With Gaetano Inglese and Dorde Milosav · Draft available on request";
    }

    if (badge) {
      this.renderBadge(badge);
    }

    if (actions) {
      if (!this.hasCustomButtons) {
        this.buttonConfigs = this.getButtonConfigs();
      }

      this.renderButtons(actions);
    }

    if (accordions) {
      this.renderAccordions(accordions);
    }

    if (image) {
      image.hidden = shouldHideImage || !imageSource;
      image.removeAttribute("src");
      image.alt = this.getAttribute("title") || "";

      if (shouldHideImage || !imageSource) {
        return;
      }

      image.src = imageSource;
      image.addEventListener(
        "error",
        () => {
          image.hidden = true;
        },
        { once: true },
      );
    }
  }

  renderBadge(container) {
    const label = this.getAttribute("badge");
    container.textContent = "";
    container.hidden = !label;

    if (!label) {
      return;
    }

    const badge = document.createElement("site-badge");
    badge.setAttribute("label", label);
    container.append(badge);
  }

  bindCardLink() {
    const card = this.querySelector(".project-card");

    if (!card || card.dataset.linkBound) {
      return;
    }

    card.dataset.linkBound = "true";

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, site-button, site-accordion")) {
        return;
      }

      this.activateCard();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.activateCard();
      }
    });
  }

  activateCard() {
    if (this.accordionConfigs.length > 0) {
      this.toggleFirstAccordion();
      return;
    }

    this.openCardLink();
  }

  toggleFirstAccordion() {
    const accordion = this.querySelector(".project-card__accordions site-accordion");

    if (!accordion) {
      return;
    }

    accordion.toggleAttribute("open");
  }

  openCardLink() {
    const link = this.getAttribute("link") || "#";

    if (link && link !== "#") {
      if (this.getAttribute("target") === "_blank") {
        window.open(link, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.href = link;
    }
  }

  getButtonConfigs() {
    const buttonNodes = Array.from(this.querySelectorAll(":scope > project-card-button, :scope > site-button"));
    this.hasCustomButtons = buttonNodes.length > 0;

    if (!buttonNodes.length) {
      // No button inside the card: show none, unless a button-label attribute is set.
      if (!this.hasAttribute("button-label")) {
        return [];
      }

      return [
        {
          bg: false,
          label: this.getAttribute("button-label") || "View Preprint",
          link: "",
          width: "full",
        },
      ];
    }

    return buttonNodes.map((button) => ({
      bg: button.hasAttribute("bg"),
      label: button.getAttribute("label") || button.textContent.trim() || "View Preprint",
      link: button.getAttribute("link") || "",
      target: button.getAttribute("target") || "",
      width: button.getAttribute("width") || "full",
    }));
  }

  getAccordionConfigs() {
    const accordionNodes = Array.from(this.querySelectorAll(":scope > project-card-accordion, :scope > site-accordion"));

    return accordionNodes.map((accordion) => ({
      content: accordion.getAttribute("content") || accordion.innerHTML.trim(),
      label: accordion.getAttribute("label") || "Label",
      open: accordion.hasAttribute("open"),
    }));
  }

  renderButtons(actions) {
    actions.textContent = "";
    actions.hidden = this.buttonConfigs.length === 0;

    this.buttonConfigs.forEach((config) => {
      const button = document.createElement("site-button");

      if (!config.link) {
        button.setAttribute("as", "span");
      }

      if (config.link) {
        button.setAttribute("link", config.link);
      }

      if (config.target) {
        button.setAttribute("target", config.target);
      }

      button.setAttribute("label", config.label);

      if (config.width) {
        button.setAttribute("width", config.width);
      }

      if (config.bg) {
        button.setAttribute("bg", "");
      }

      actions.append(button);
    });
  }

  renderAccordions(accordions) {
    accordions.textContent = "";
    accordions.hidden = this.accordionConfigs.length === 0;

    this.accordionConfigs.forEach((config) => {
      const accordion = document.createElement("site-accordion");
      accordion.setAttribute("label", config.label);

      if (config.open) {
        accordion.setAttribute("open", "");
      }

      accordion.innerHTML = config.content;
      accordions.append(accordion);
    });
  }
}

if (!customElements.get("project-card")) {
  customElements.define("project-card", ProjectCard);
}
