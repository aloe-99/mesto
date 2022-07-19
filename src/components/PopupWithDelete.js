import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithDelete extends PopupWithForm {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector, callbackSubmit)
  }

  open(card) {
    super.open();
    this.card = card;
  }
}