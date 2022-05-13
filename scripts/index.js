const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_edit_name');
let jobInput = formElement.querySelector('.popup__input_edit_text');



function popupOpen() {  // Открывает попап и заносит в форму текущие значения профиля
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function popupClose() {  // Закрывает попап
  popup.classList.remove('popup_opened')
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

function addCards(arr) {  // загружает карточки при загрузке страницы
  for (let i = 0; i < arr.length; i++) {
    const elementsItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    elementsItem.querySelector('.elements__image').src = arr[i].link;
    elementsItem.querySelector('.elements__image').alt = arr[i].name;
    elementsItem.querySelector('.elements__name').textContent = arr[i].name;
    elements.append(elementsItem);
  }
}

addCards(initialCards);