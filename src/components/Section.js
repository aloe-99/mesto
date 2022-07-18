import { createCard } from "../utils/utils.js";

export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach((item) => {
      if (item.owner._id === "c618fc51e5dd6c2993d73f44") {
        this.addItem(createCard(item, '#card'));
      } else {
        this._renderer(item);
      }
    });
  }
}