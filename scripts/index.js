const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const saveBtn = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__text');

nameInput.value = profileName.textContent;
jobInput.value = profileText.textContent;

function addProfile() {
  popup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', addProfile);
closeBtn.addEventListener('click', addProfile);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    addProfile();
}

formElement.addEventListener('submit', formSubmitHandler);