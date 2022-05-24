const popups = document.querySelectorAll('.popup');
const elements = document.querySelector('.elements');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdt = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#image');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const formElement = document.querySelector('#edit-form');
const formElementAdd = document.querySelector('#add-form');
const nameInput = formElement.querySelector('#prof-name');
const jobInput = formElement.querySelector('#prof-job');
const mestoInput = formElementAdd.querySelector('#mesto');
const imageInput = formElementAdd.querySelector('#mesto-image');
const mestoImage = popupImage.querySelector('.popup__image');
const mestoName = popupImage.querySelector('.popup__text');

function openPopup(popup) {  // Открывает попап
  popup.classList.add('popup_opened');
}

function closePopup(popup) {  // Закрывает попап
  popup.classList.remove('popup_opened');
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
  document.addEventListener('keydown', (evt) => {  // закрывает попап если нажать ESC
    console.log(evt);
    if (popup.classList.contains('popup_opened')) {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
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

formElement.addEventListener('submit', handleProfileFormSubmit);


function createImagePopup(mesto, img) {  //создает попап для карточки
  mestoImage.src = img;
  mestoImage.alt = mesto;
  mestoName.textContent = mesto;
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card').content;

const likeClick = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
}


function createCard(image, name) {  // создает карточку
  const card = cardTemplate.querySelector('.elements__item').cloneNode(true);
  deleteBtn = card.querySelector('.elements__delete-btn');
  cardImage = card.querySelector('.elements__image');
  cardImage.src = image;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    createImagePopup(name, image);
    openPopup(popupImage);
  });
  card.querySelector('.elements__name').textContent = name;
  const likeBtn = card.querySelector('.elements__like-button');
  
  likeBtn.addEventListener('click', likeClick);
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });
  return card;
}


function addStartCards(arr) {
  arr.forEach((item) => {
    elements.append(createCard(item.link, item.name));
  });
}

addStartCards(initialCards);

function addNewCard(evt) {
  evt.preventDefault();
  elements.prepend(createCard(imageInput.value, mestoInput.value));
  closePopup(popupAdd);
  imageInput.value = "";
  mestoInput.value = "";
}

formElementAdd.addEventListener('submit', addNewCard);