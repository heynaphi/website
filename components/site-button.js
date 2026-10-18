class SiteButton extends HTMLElement {
  static get observedAttributes() {
    return ["as", "bg", "label", "link", "target"];
  }

  connectedCallback() {
    const text = this.textContent.trim();

    if (!this.querySelector(".site-button")) {
      this.textContent = "";
      this.append(this.createControl());
    }

    this.render(text);
  }

  attributeChangedCallback() {
    this.render();
  }

  createControl() {
    const tagName = this.getAttribute("as") === "span" ? "span" : this.hasAttribute("link") ? "a" : "button";
    const control = document.createElement(tagName);
    const label = document.createElement("span");

    control.className = "site-button";
    control.dataset.nodeId = "3:4";
    control.dataset.name = "Button";

    if (control instanceof HTMLAnchorElement) {
      control.href = this.getAttribute("link") || "#";
      this.applyAnchorTarget(control);
    } else if (control instanceof HTMLButtonElement) {
      control.type = "button";
    }

    label.className = "site-button__label";
    label.dataset.nodeId = "3:24";
    control.append(label);

    return control;
  }

  render(text) {
    const control = this.querySelector(".site-button");
    const label = this.querySelector(".site-button__label");

    if (control instanceof HTMLAnchorElement) {
      control.href = this.getAttribute("link") || "#";
      this.applyAnchorTarget(control);
    }

    if (label) {
      label.textContent = this.getAttribute("label") || text || "Contact";
    }
  }

  applyAnchorTarget(anchor) {
    const target = this.getAttribute("target");

    if (target) {
      anchor.target = target;
    } else {
      anchor.removeAttribute("target");
    }

    if (target === "_blank") {
      anchor.rel = "noopener noreferrer";
    } else {
      anchor.removeAttribute("rel");
    }
  }
}

if (!customElements.get("site-button")) {
  customElements.define("site-button", SiteButton);
}
