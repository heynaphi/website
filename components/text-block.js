const textBlockTemplate = document.createElement("template");

textBlockTemplate.innerHTML = `
  <p class="text-block" data-node-id="1:112"></p>
`;

class TextBlock extends HTMLElement {
  connectedCallback() {
    const text = this.innerHTML.trim();

    if (!this.hasChildNodes() || text) {
      this.textContent = "";
      this.append(textBlockTemplate.content.cloneNode(true));
    }

    this.render(text);
  }

  render(text) {
    const paragraph = this.querySelector(".text-block");

    if (paragraph) {
      paragraph.innerHTML =
        text ||
        "I study political attitudes and behavior using econometric methods, with a particular focus on rising support for the far right among young people in Europe. My dissertation approaches this puzzle from several angles, including the role of changing media environments, gender identity, and economic decline in shaping political preferences.";
    }
  }
}

if (!customElements.get("text-block")) {
  customElements.define("text-block", TextBlock);
}
