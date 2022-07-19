export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._prof = document.querySelector(data.profSelector);
    this._avatar = document.querySelector(data.avatarSelector);
  }

  getUserInfo() {
    const profileName = this._name.textContent;
    const profileProfText = this._prof.textContent;
    return {name: profileName, about: profileProfText}
  }

  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._prof.textContent = newData.about;
    this._avatar.src = newData.avatar;
    this.id = newData._id;
  }
}