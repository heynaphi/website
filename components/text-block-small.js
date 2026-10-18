const textBlockSmallTemplate = document.createElement("template");

textBlockSmallTemplate.innerHTML = `
  <p class="text-block-small" data-node-id="1:113"></p>
`;

class TextBlockSmall extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML.trim();

    if (!this.querySelector(".text-block-small")) {
      this.textContent = "";
      this.append(textBlockSmallTemplate.content.cloneNode(true));
    }

    this.render(content);
  }

  render(content) {
    const paragraph = this.querySelector(".text-block-small");

    if (paragraph) {
      paragraph.replaceChildren(...this.createSafeContent(content || "Add your text here."));
    }
  }

  createSafeContent(content) {
    const template = document.createElement("template");
    template.innerHTML = content;

    return Array.from(template.content.childNodes).map((node) => this.sanitizeNode(node));
  }

  sanitizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || "");
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return document.createTextNode("");
    }

    const element = /** @type {Element} */ (node);
    const tagName = element.tagName.toLowerCase();

    if (tagName === "strong" || tagName === "b") {
      const strong = document.createElement("strong");
      strong.append(...Array.from(element.childNodes).map((child) => this.sanitizeNode(child)));
      return strong;
    }

    return document.createTextNode(element.textContent || "");
  }
}

if (!customElements.get("text-block-small")) {
  customElements.define("text-block-small", TextBlockSmall);
}
