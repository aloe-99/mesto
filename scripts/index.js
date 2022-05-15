const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtn = document.querySelector('#close-btn');
const closeAddBtn = document.querySelector('#close-add');
const closeImageBtn = document.querySelector('#close-image-btn')
const popupEdt = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#image-popup')
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('#edit-form');
let formElementAdd = document.querySelector('#add-form');
let nameInput = formElement.querySelector('#prof-name');
let jobInput = formElement.querySelector('#prof-job');
let mestoInput = formElementAdd.querySelector('#mesto');
let imageInput = formElementAdd.querySelector('#mesto-image');


function popupOpen() {  // Открывает попап и заносит в форму текущие значения профиля
  popupEdt.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function popupClose() {  // Закрывает попап
  popupEdt.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {  // Заменяет текущие значения профиля на введенные в форму
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    popupClose();
}

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);



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


const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

const likeClick = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
}

initialCards.forEach((item) => {  // загружает карточки при загрузке страницы
  const elementsItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const elementsImage = elementsItem.querySelector('.elements__image');
  elementsImage.src = item.link;
  elementsImage.alt = item.name;
  elementsImage.addEventListener('click', imagePopupOpen);
  elementsItem.querySelector('.elements__name').textContent = item.name;
  const likeBtn = elementsItem.querySelector('.elements__like-button');
  likeBtn.addEventListener('click', likeClick);
  elements.append(elementsItem);
});

const deleteBtns = elements.querySelectorAll('.elements__delete-btn');

deleteBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentElement.remove();
  });
});



function popupAddMesto() { // открывает попап добавления места
  popupAdd.classList.add('popup_opened');
}

function popupAddClose() {  // закрывает попап добавления места
  popupAdd.classList.remove('popup_opened');
}

function addNewCard(evt) {  // добавляет новую карточку
  evt.preventDefault();
  newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  deleteBtn = newCard.querySelector('.elements__delete-btn');
  newCardImage = newCard.querySelector('.elements__image');
  newCardImage.src = imageInput.value;
  newCardImage.alt = mestoInput.value;
  newCardImage.addEventListener('click', imagePopupOpen);
  newCard.querySelector('.elements__name').textContent = mestoInput.value;
  elements.prepend(newCard);
  const likeBtn = newCard.querySelector('.elements__like-button');
  likeBtn.addEventListener('click', likeClick);
  deleteBtn.addEventListener('click', () => {
    newCard.remove();
  });
  popupAddClose();
}

addBtn.addEventListener('click', popupAddMesto);

closeAddBtn.addEventListener('click', popupAddClose);

formElementAdd.addEventListener('submit', addNewCard);



function imagePopupOpen(evt) {  // открывает попап фотографии
  const img = popupImage.querySelector('.popup__image');
  const txt = popupImage.querySelector('.popup__text');
  img.src = evt.target.src;
  img.alt = evt.target.alt;
  txt.textContent = evt.target.alt;
  popupImage.classList.add('popup_opened');
}

function imagePopupClose() {  // закрывает попап фотографии
  popupImage.classList.remove('popup_opened');
}

closeImageBtn.addEventListener('click', imagePopupClose);