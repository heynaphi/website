const sectionTitleTemplate = document.createElement("template");

sectionTitleTemplate.innerHTML = `
  <div class="section-title" data-node-id="3:3" data-name="Section title">
    <p class="section-title__text" data-node-id="3:2"></p>
  </div>
`;

class SectionTitle extends HTMLElement {
  connectedCallback() {
    const text = this.textContent.trim();

    if (!this.hasChildNodes() || text) {
      this.textContent = "";
      this.append(sectionTitleTemplate.content.cloneNode(true));
    }

    this.render(text);
  }

  render(text) {
    const title = this.querySelector(".section-title__text");

    if (title) {
      title.textContent = text || "Title";
    }
  }
}

if (!customElements.get("section-title")) {
  customElements.define("section-title", SectionTitle);
}
