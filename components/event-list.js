const eventListTemplate = document.createElement("template");

eventListTemplate.innerHTML = `
  <article class="event-list" data-node-id="0:61" data-name="EventList">
    <p class="event-list__title" data-node-id="0:62"></p>
    <p class="event-list__date" data-node-id="0:63"></p>
  </article>
`;

class EventList extends HTMLElement {
  static get observedAttributes() {
    return ["event", "date"];
  }

  connectedCallback() {
    if (!this.hasChildNodes()) {
      this.append(eventListTemplate.content.cloneNode(true));
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.querySelector(".event-list__title");
    const date = this.querySelector(".event-list__date");

    if (title) {
      title.textContent = this.getAttribute("event") || "Something @ Event, City";
    }

    if (date) {
      date.textContent = this.getAttribute("date") || "Date";
    }
  }
}

if (!customElements.get("event-list")) {
  customElements.define("event-list", EventList);
}
