const headerNavTemplate = document.createElement("template");

headerNavTemplate.innerHTML = `
  <header class="site-header" data-node-id="1:57" data-name="Header Nav">
    <nav class="header-nav" aria-label="Main navigation">
      <a class="header-nav__brand" href="./index.html" data-node-id="1:6">Philipp Heyna</a>

      <ul class="header-nav__menu" aria-label="Primary navigation" data-node-id="1:7">
        <li><a class="header-nav__link" href="#research">Research</a></li>
        <li><a class="header-nav__link" href="assets/docs/Philipp-Heyna-CV.pdf" target="_blank" rel="noopener">CV</a></li>
        <!-- <li><a class="header-nav__link" href="#events">Events</a></li> -->
        <li><a class="header-nav__link" href="mailto:p.heyna@hertie-school.org?subject=Hello%20Philipp%20%F0%9F%91%8B">Contact</a></li>
      </ul>

      <button class="header-nav__menu-button" type="button" aria-label="Open navigation menu" data-node-id="1:30">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </nav>
  </header>
`;

class HeaderNav extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.append(headerNavTemplate.content.cloneNode(true));
  }
}

if (!customElements.get("header-nav")) {
  customElements.define("header-nav", HeaderNav);
}
