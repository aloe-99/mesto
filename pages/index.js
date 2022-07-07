import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import {initialCards, validityConfig} from '../utils/const.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.elements');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdt = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const profileForm = popupEdt.querySelector('#edit-form');
const addCardForm = popupAdd.querySelector('#add-form');
const nameInput = profileForm.querySelector('#prof-name');
const jobInput = profileForm.querySelector('#prof-job');
const mestoInput = addCardForm.querySelector('#mesto');
const imageInput = addCardForm.querySelector('#mesto-image');


const popupEdit = new Popup('#edit');
const popupWithAdd = new Popup('#add');
const popupWithImage = new PopupWithImage('#image');


const defaultCardList = new Section(
  {
    items: initialCards, 
    renderer: (item) => {
      const card = new Card(item, '#card', (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)});
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    }
  }, 
  '.elements'
);

defaultCardList.renderItems();




// popups.forEach((popup) => {
//   const closeBtn = popup.querySelector('.popup__close-button');
//   const popupItem = popup.querySelector('.popup__item');

//   popup.addEventListener('click', (evt) =>  {
//     if (closeBtn.contains(evt.target)) { // закрывает попап нажатием кнопки закрытия
//       closePopup(popup);
//     } else if (popup.contains(popupItem)) { // закрывает попап если нажать на оверлей
//       if (!popupItem.contains(evt.target)) {
//         closePopup(popup);
//       }
//     } else if (evt.target !== mestoImage) {
//       closePopup(popup);
//     }
//   });
// });

editBtn.addEventListener('click', () => { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  popupEdit.open();
  popupEdit.setEventListeners();
});

addBtn.addEventListener('click', () => {
  popupWithAdd.open();
  popupWithAdd.setEventListeners();
});


function handleProfileFormSubmit (evt) {  // Заменяет текущие значения профиля на введенные в форму
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  popupEdit.close();    
}

profileForm.addEventListener('submit', handleProfileFormSubmit);



// initialCards.forEach((obj) => {  // создает стартовые карточки
//   const card = new Card(obj, '#card');
//   const newCard = card.generateCard();

//   cardList.append(newCard);
// });



function addNewCard(evt) {
  evt.preventDefault();
  const newData = {
    name: mestoInput.value,
    link: imageInput.value
  }
  const card = new Card(newData, '#card');
  const newCard = card.generateCard();
  cardList.prepend(newCard);
  popupWithAdd.close();
  addCardForm.reset();
  addFormValidator.disableFormBtn();
}

addCardForm.addEventListener('submit', addNewCard);

const edtFormValidator = new FormValidator(validityConfig, '#edit-form');
edtFormValidator.enableValidation();
const addFormValidator = new FormValidator(validityConfig, '#add-form');
addFormValidator.enableValidation();