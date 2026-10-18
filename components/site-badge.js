const siteBadgeTemplate = document.createElement("template");

siteBadgeTemplate.innerHTML = `
  <span class="site-badge" data-node-id="51:30" data-name="badge">
    <span class="site-badge__label" data-node-id="51:31"></span>
  </span>
`;

class SiteBadge extends HTMLElement {
  static get observedAttributes() {
    return ["label"];
  }

  connectedCallback() {
    const text = this.textContent.trim();

    if (!this.querySelector(".site-badge")) {
      this.textContent = "";
      this.append(siteBadgeTemplate.content.cloneNode(true));
    }

    this.render(text);
  }

  attributeChangedCallback() {
    this.render();
  }

  render(text) {
    const label = this.querySelector(".site-badge__label");

    if (label) {
      label.textContent = this.getAttribute("label") || text || "WIP";
    }
  }
}

if (!customElements.get("site-badge")) {
  customElements.define("site-badge", SiteBadge);
}
