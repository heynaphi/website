const heroSectionTemplate = document.createElement("template");

heroSectionTemplate.innerHTML = `
  <section class="hero-section" data-node-id="6:13" data-name="Hero">
    <site-avatar></site-avatar>
    <div class="hero-section__content" data-node-id="6:15">
      <h1 class="hero-section__title" data-node-id="6:16"></h1>
      <div class="hero-section__body" data-node-id="6:17"></div>
      <div class="hero-section__actions" data-node-id="6:18">
        <a class="hero-section__action" data-action="primary">
          <site-button as="span" width="full" bg></site-button>
        </a>
        <a class="hero-section__action hero-section__action--mobile-only" data-action="tertiary" target="_blank" rel="noopener">
          <site-button as="span" width="full" bg></site-button>
        </a>
        <a class="hero-section__action" data-action="secondary">
          <site-button as="span" width="full" bg></site-button>
        </a>
      </div>
    </div>
  </section>
`;

class HeroSection extends HTMLElement {
  static get observedAttributes() {
    return ["avatar-alt", "avatar-image", "primary-href", "primary-label", "secondary-href", "secondary-label", "tertiary-href", "tertiary-label", "title"];
  }

  connectedCallback() {
    this.bodyLines = this.getBodyLines();

    if (!this.querySelector(".hero-section")) {
      this.textContent = "";
      this.append(heroSectionTemplate.content.cloneNode(true));
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getBodyLines() {
    const lines = this.textContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.length
      ? lines
      : ["Phd Candidate,", "@Hertie School Berlin", "Researching democracy in the DYNAMICS programme"];
  }

  render() {
    const avatar = this.querySelector("site-avatar");
    const title = this.querySelector(".hero-section__title");
    const body = this.querySelector(".hero-section__body");
    const primaryLink = this.querySelector('[data-action="primary"]');
    const secondaryLink = this.querySelector('[data-action="secondary"]');
    const primaryButton = primaryLink?.querySelector("site-button");
    const secondaryButton = secondaryLink?.querySelector("site-button");
    const tertiaryLink = this.querySelector('[data-action="tertiary"]');
    const tertiaryButton = tertiaryLink?.querySelector("site-button");

    if (avatar) {
      avatar.setAttribute("image", this.getAttribute("avatar-image") || "");
      avatar.setAttribute("alt", this.getAttribute("avatar-alt") || this.getAttribute("title") || "");
    }

    if (title) {
      title.textContent = this.getAttribute("title") || "Philipp Heyna";
    }

    if (body) {
      body.textContent = "";
      this.bodyLines.forEach((line) => {
        const item = document.createElement("p");
        item.textContent = line;
        body.append(item);
      });
    }

    if (primaryLink) {
      primaryLink.href = this.getAttribute("primary-href") || "#";
    }

    if (secondaryLink) {
      secondaryLink.href = this.getAttribute("secondary-href") || "#";
    }

    if (primaryButton) {
      primaryButton.setAttribute("label", this.getAttribute("primary-label") || "Publications");
    }

    if (secondaryButton) {
      secondaryButton.setAttribute("label", this.getAttribute("secondary-label") || "Contact");
    }

    // Optional middle button (e.g. CV), only shown when tertiary-href is set.
    if (tertiaryLink) {
      const tertiaryHref = this.getAttribute("tertiary-href");
      tertiaryLink.hidden = !tertiaryHref;
      tertiaryLink.href = tertiaryHref || "#";
    }

    if (tertiaryButton) {
      tertiaryButton.setAttribute("label", this.getAttribute("tertiary-label") || "CV");
    }
  }
}

if (!customElements.get("hero-section")) {
  customElements.define("hero-section", HeroSection);
}
