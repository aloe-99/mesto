export default class UserInfo {
  constructor({nameSelector, profSelector}) {
    this._name = document.querySelector(nameSelector);
    this._prof = document.querySelector(profSelector);
  }

  getUserInfo() {
    const profileName = this._name.textContent;
    const profileProfText = this._prof.textContent;
    return {name: profileName, about: profileProfText}
  }

  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._prof.textContent = newData.about;
  }
}