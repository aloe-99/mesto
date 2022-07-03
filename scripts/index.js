import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validityConfig} from './const.js';

const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.elements');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdt = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#image');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const profileForm = popupEdt.querySelector('#edit-form');
const addCardForm = popupAdd.querySelector('#add-form');
const nameInput = profileForm.querySelector('#prof-name');
const jobInput = profileForm.querySelector('#prof-job');
const mestoInput = addCardForm.querySelector('#mesto');
const imageInput = addCardForm.querySelector('#mesto-image');
const mestoImage = popupImage.querySelector('.popup__image');
const mestoName = popupImage.querySelector('.popup__text');

function handleEscKey(evt) {  // закрывает попап если нажать ESC
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {  // Открывает попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {  // Закрывает попап
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

popups.forEach((popup) => {
  const closeBtn = popup.querySelector('.popup__close-button');
  const popupItem = popup.querySelector('.popup__item');

  popup.addEventListener('click', (evt) =>  {
    if (closeBtn.contains(evt.target)) { // закрывает попап нажатием кнопки закрытия
      closePopup(popup);
    } else if (popup.contains(popupItem)) { // закрывает попап если нажать на оверлей
      if (!popupItem.contains(evt.target)) {
        closePopup(popup);
      }
    } else if (evt.target !== mestoImage) {
      closePopup(popup);
    }
  });
});

editBtn.addEventListener('click', () => { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(popupEdt);
});

addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});


function handleProfileFormSubmit (evt) {  // Заменяет текущие значения профиля на введенные в форму
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEdt);    
}

profileForm.addEventListener('submit', handleProfileFormSubmit);



initialCards.forEach((obj) => {  // создает стартовые карточки
  const card = new Card(obj, '#card');
  const newCard = card.generateCard();

  cardList.append(newCard);
});



function addNewCard(evt) {
  evt.preventDefault();
  const newData = {
    name: mestoInput.value,
    link: imageInput.value
  }
  const card = new Card(newData, '#card');
  const newCard = card.generateCard();
  cardList.prepend(newCard);
  closePopup(popupAdd);
  addCardForm.reset();
  const popupBtn = addCardForm.querySelector('.popup__save-button');
  const popupBtnText = popupBtn.querySelector('.popup__save-text');
  addFormValidator.disableFormBtn(popupBtn, popupBtnText);
}

addCardForm.addEventListener('submit', addNewCard);

const edtFormValidator = new FormValidator(validityConfig, '#edit-form');
edtFormValidator.enableValidation();
const addFormValidator = new FormValidator(validityConfig, '#add-form');
addFormValidator.enableValidation();

export {openPopup, popupImage, mestoName, mestoImage};