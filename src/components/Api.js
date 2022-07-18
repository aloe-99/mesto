import {popupWithEdit, popupWithAdd, popupWithAvatar, popupWithDecision, defaultCardList, userInfo} from "../pages/index.js";
import { createCard } from "../utils/utils.js";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers; 
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        userInfo.setUserInfo(result);
        document.querySelector('.profile__avatar-image').src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        defaultCardList.renderItems(result);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  editUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(
        popupWithEdit.getInputValues()
      )
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => userInfo.setUserInfo(result))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithEdit.changeSaveText()
      })
  }

  editAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        document.querySelector('.profile__avatar-image').src = result.avatar
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.changeSaveText()
      })
  }

  postCard() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(
        popupWithAdd.getInputValues()
      )
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        defaultCardList.addItem((createCard(result, '#card')));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAdd.changeSaveText()
      })
  }


  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithDecision.changeSaveText()
      })
  }

  addLike(cardId, card) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        card.querySelector('.elements__like-counter').textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeLike(cardId, card) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        card.querySelector('.elements__like-counter').textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  }
}