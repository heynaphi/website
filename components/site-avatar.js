const siteAvatarTemplate = document.createElement("template");

siteAvatarTemplate.innerHTML = `
  <div class="site-avatar">
    <img class="site-avatar__image" alt="" />
  </div>
`;

class SiteAvatar extends HTMLElement {
  static get observedAttributes() {
    return ["alt", "image", "size"];
  }

  connectedCallback() {
    if (!this.querySelector(".site-avatar")) {
      this.append(siteAvatarTemplate.content.cloneNode(true));
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const avatar = this.querySelector(".site-avatar");
    const image = this.querySelector(".site-avatar__image");
    const imageSource = this.getAttribute("image");
    const size = this.getAttribute("size");

    if (avatar) {
      if (size) {
        avatar.style.setProperty("--avatar-size", /^\d+$/.test(size) ? `${size}px` : size);
      } else {
        avatar.style.removeProperty("--avatar-size");
      }
    }

    if (image) {
      image.hidden = !imageSource;
      image.removeAttribute("src");
      image.alt = this.getAttribute("alt") || "";

      if (!imageSource) {
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
}

if (!customElements.get("site-avatar")) {
  customElements.define("site-avatar", SiteAvatar);
}
