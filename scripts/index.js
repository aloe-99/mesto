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