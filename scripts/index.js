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


function openPopup(popup) {  // Открывает попап
  popup.classList.add('popup_opened');
}

function closePopup(popup) {  // Закрывает попап
  popup.classList.remove('popup_opened');
}

popups.forEach((popup) => {
  const closeBtn = popup.querySelector('.popup__close-button');
  closeBtn.addEventListener('click', () => {
     closePopup(popup);
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


function createImagePopup() {  //создает попап для карточки
  const img = popupImage.querySelector('.popup__image');
  const txt = popupImage.querySelector('.popup__text');
  img.src = cardImage.src;
  img.alt = cardImage.alt;
  txt.textContent = cardImage.alt;
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
    createImagePopup();
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
}

formElementAdd.addEventListener('submit', addNewCard);