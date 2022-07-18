import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {validityConfig} from '../utils/const.js';
import {addNewCard, createCard} from'../utils/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'



export const API = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '6c0813fa-7f5c-4c03-af63-becb96462d1c',
    'Content-type': 'application/json'
  }
});

API.getUserData();


export const userInfo = new UserInfo({nameSelector: '.profile__name', profSelector: '.profile__text'});

export const popupWithEdit = new PopupWithForm('#edit', (evt) => {
  evt.preventDefault();
  popupWithEdit.changeSaveTextInProcess();
  API.editUserInfo();
  popupWithEdit.close();
});

popupWithEdit.setEventListeners();

export const popupWithAdd = new PopupWithForm('#add', (evt) => {
  evt.preventDefault();
  popupWithAdd.changeSaveTextInProcess();
  addNewCard(evt);
  popupWithAdd.close();
});

popupWithAdd.setEventListeners();

export const popupWithImage = new PopupWithImage('#image');

popupWithImage.setEventListeners();

export const popupWithDecision = new PopupWithForm('#decision', (evt) => {
  evt.preventDefault();
  popupWithDecision.changeSaveTextInProcess();
});

popupWithDecision.setEventListeners();

export const popupWithAvatar = new PopupWithForm('#avatar', (evt) => {
  evt.preventDefault();
  popupWithAvatar.changeSaveTextInProcess();
  API.editAvatar(popupWithAvatar.form.querySelector('.popup__input').value);
  popupWithAvatar.close();
});

popupWithAvatar.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () =>{
  popupWithAvatar.open();
});


export const defaultCardList = new Section((item) => {
    defaultCardList.addItem(createCard(item, '#initial-card'));
  }, '.elements');

API.getInitialCards();

popupWithImage.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => { 
  const profData = userInfo.getUserInfo();
  popupWithEdit.setInputValues(profData);
  popupWithEdit.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  popupWithAdd.open();
});

const edtFormValidator = new FormValidator(validityConfig, '#edit-form');
edtFormValidator.enableValidation();
export const addFormValidator = new FormValidator(validityConfig, '#add-form');
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validityConfig, '#avatar-form');
avatarFormValidator.enableValidation();