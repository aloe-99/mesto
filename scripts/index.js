import {Card, initialCards} from './Card.js';

const popups = document.querySelectorAll('.popup');
const elements = document.querySelector('.elements');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdt = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#image');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const profileForm = document.querySelector('#edit-form');
const addCardForm = document.querySelector('#add-form');
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


// function createImagePopup(mesto, img) {  //создает попап для карточки
//   mestoImage.src = img;
//   mestoImage.alt = mesto;
//   mestoName.textContent = mesto;
// }


// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// class Card {
//   constructor(data, cardSelector) {
//     this._cardName = data.name;
//     this._imageLink = data.link;

//     this._cardSelector = cardSelector;
//   }

//   _handleOpenPopup() {
//     mestoImage.src = this._imageLink;
//     mestoImage.alt = this._cardName;
//     mestoName.textContent = this._cardName;

//     openPopup(popupImage);
//   }


//   _setEventListeners() {
//     this._element.querySelector('.elements__image').addEventListener('click', () => {
//       this._handleOpenPopup();
//     });
//     this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
//       evt.target.classList.toggle('elements__like-button_active');
//     });
//     this._element.querySelector('.elements__delete-btn').addEventListener('click', () => {
//       this._element.remove();
//     });
//     }

//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardSelector)
//       .content
//       .querySelector('.elements__item')
//       .cloneNode(true);

//     return cardElement;
//   }
//   generateCard() {
//     this._element = this._getTemplate();

//     this._element.querySelector('.elements__name').textContent = this._cardName;
//     this._element.querySelector('.elements__image').src = this._imageLink;
//     this._element.querySelector('.elements__image').alt = this._cardName;

//     this._setEventListeners();

//     return this._element;
//   }
// }

initialCards.forEach((obj) => {  // создает стартовые карточки
  const card = new Card(obj, '#card');
  const newCard = card.generateCard();

  elements.append(newCard);
});

// const cardTemplate = document.querySelector('#card').content;

// const toggleLike = (evt) => {
//   evt.target.classList.toggle('elements__like-button_active');
// }


// function createCard(image, name) {  // создает карточку
//   const card = cardTemplate.querySelector('.elements__item').cloneNode(true);
//   const deleteBtn = card.querySelector('.elements__delete-btn');
//   const cardImage = card.querySelector('.elements__image');
//   cardImage.src = image;
//   cardImage.alt = name;
//   cardImage.addEventListener('click', () => {
//     createImagePopup(name, image);
//     openPopup(popupImage);
//   });
//   card.querySelector('.elements__name').textContent = name;
//   const likeBtn = card.querySelector('.elements__like-button');
  
//   likeBtn.addEventListener('click', toggleLike);
//   deleteBtn.addEventListener('click', () => {
//     card.remove();
//   });
//   return card;
// }


// function addStartCards(arr) {
//   arr.forEach((item) => {
//     elements.append(createCard(item.link, item.name));
//   });
// }

// addStartCards(initialCards);

function addNewCard(evt) {
  evt.preventDefault();
  const newData = {
    name: mestoInput.value,
    link: imageInput.value
  }
  const card = new Card(newData, '#card');
  const newCard = card.generateCard();
  elements.prepend(newCard);
  closePopup(popupAdd);
  addCardForm.reset();
  const popupBtn = addCardForm.querySelector('.popup__save-button');
  const popupBtnText = popupBtn.querySelector('.popup__save-text');
  popupBtnText.classList.add('popup__save-text_disabled');
  popupBtn.classList.add('popup__save-button_disabled');
  popupBtn.disabled = true;
}

addCardForm.addEventListener('submit', addNewCard);