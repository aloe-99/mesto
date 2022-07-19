import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {validityConfig} from '../utils/const.js';
import {addNewCard, createCard} from'../utils/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'



export const API = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '6c0813fa-7f5c-4c03-af63-becb96462d1c',
    'Content-type': 'application/json'
  }
});

const getUserData = API.getUserData();
const getInitialCards = API.getInitialCards();

Promise.all([getUserData, getInitialCards])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    defaultCardList.renderItems(cards);
  })
  .catch(err => console.log(err));


export const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  profSelector: '.profile__text', 
  avatarSelector: '.profile__avatar-image'
});

export const popupWithEdit = new PopupWithForm('#edit', (evt) => {
  evt.preventDefault();
  popupWithEdit.changeSaveTextInProcess();
  API.editUserInfo(popupWithEdit.getInputValues())
    .then((result) => {
      userInfo.setUserInfo(result);
      popupWithEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithEdit.changeSaveText()
    });
});

popupWithEdit.setEventListeners();

export const popupWithAdd = new PopupWithForm('#add', (evt) => {
  evt.preventDefault();
  popupWithAdd.changeSaveTextInProcess();
  addNewCard(evt);
});

popupWithAdd.setEventListeners();

export const popupWithImage = new PopupWithImage('#image');

popupWithImage.setEventListeners();

export const popupWithDecision = new PopupWithDelete('#decision', (evt) => {
  evt.preventDefault();
  popupWithDecision.card.deleteCard();
  popupWithDecision.changeSaveTextInProcess();
});

popupWithDecision.setEventListeners();

export const popupWithAvatar = new PopupWithForm('#avatar', (evt) => {
  evt.preventDefault();
  popupWithAvatar.changeSaveTextInProcess();
  const avatarData = popupWithAvatar.getInputValues();
  API.editAvatar(avatarData.avatar)
    .then(result => {
      userInfo.setUserInfo(result);
      popupWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAvatar.changeSaveText()
    });
});

popupWithAvatar.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () =>{
  popupWithAvatar.open();
});


export const defaultCardList = new Section((item) => {
    defaultCardList.addItem(createCard(item, '#initial-card'));
  }, '.elements');

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