export function addNewCard(evt) {
  evt.preventDefault();
  const newData = {
    name: mestoInput.value,
    link: imageInput.value
  }
  const card = new Card(newData, '#card', (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)});
  const newCard = card.generateCard();
  document.querySelector('.elements').prepend(newCard);
  popupWithAdd.close();
  addFormValidator.disableFormBtn();
}