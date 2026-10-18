const siteDividerTemplate = document.createElement("template");

siteDividerTemplate.innerHTML = `
  <div class="site-divider" data-node-id="1:58" data-name="Divider" role="separator">
    <span class="site-divider__line" aria-hidden="true"></span>
    <span class="site-divider__title"></span>
    <span class="site-divider__line" aria-hidden="true"></span>
  </div>
`;

class SiteDivider extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    if (!this.querySelector(".site-divider")) {
      this.textContent = "";
      this.append(siteDividerTemplate.content.cloneNode(true));
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const divider = this.querySelector(".site-divider");
    const title = this.querySelector(".site-divider__title");
    const titleText = this.getAttribute("title") || "";

    if (!divider || !title) {
      return;
    }

    title.textContent = titleText;
    title.hidden = !titleText;
    divider.classList.toggle("site-divider--titled", Boolean(titleText));
  }
}

if (!customElements.get("site-divider")) {
  customElements.define("site-divider", SiteDivider);
}
