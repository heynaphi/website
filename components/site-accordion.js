const siteAccordionTemplate = document.createElement("template");

siteAccordionTemplate.innerHTML = `
  <section class="site-accordion">
    <button class="site-accordion__trigger" type="button">
      <span class="site-accordion__label"></span>
      <span class="site-accordion__icon" aria-hidden="true"></span>
    </button>
    <div class="site-accordion__panel">
      <div class="site-accordion__content"></div>
    </div>
  </section>
`;

class SiteAccordion extends HTMLElement {
  static get observedAttributes() {
    return ["label", "open"];
  }

  connectedCallback() {
    this.content = this.innerHTML.trim();

    if (!this.querySelector(".site-accordion")) {
      this.textContent = "";
      this.append(siteAccordionTemplate.content.cloneNode(true));
    }

    this.trigger = this.querySelector(".site-accordion__trigger");
    this.panel = this.querySelector(".site-accordion__panel");
    this.contentNode = this.querySelector(".site-accordion__content");

    this.trigger.addEventListener("click", () => {
      this.toggleAttribute("open");
    });

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const isOpen = this.hasAttribute("open");
    const label = this.querySelector(".site-accordion__label");

    if (label) {
      label.textContent = this.getAttribute("label") || "Label";
    }

    if (this.trigger) {
      this.trigger.setAttribute("aria-expanded", String(isOpen));
    }

    if (this.contentNode) {
      this.contentNode.innerHTML = this.content || "content contentcont entco ntentconte ntcontentcont entcontent contentc ontent content";
    }

    if (this.panel) {
      this.panel.hidden = false;
      this.panel.style.maxHeight = isOpen ? `${this.panel.scrollHeight}px` : "0px";
    }
  }
}

if (!customElements.get("site-accordion")) {
  customElements.define("site-accordion", SiteAccordion);
}
