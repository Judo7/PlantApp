import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove("author")
  return Cookies.remove(TokenKey)
}


export function getID() {
  return Cookies.get("id")
}

export function setID(id) {
  return Cookies.set("id", id)
}

export function getAuthor() {
  return Cookies.get("author")
}

export function setAuthor(author) {
  return Cookies.set("author", author)
}

export function getLogin() {
  return Cookies.get("login")
}

export function setLogin(login) {
  return Cookies.set("login", login)
}

export function getAvatar() {
  return Cookies.get("avatar")
}

export function setAvatar(avatar) {
  return Cookies.set("avatar", avatar)
}

export function getPwd() {
    return Cookies.get("pwd")
  }
  
  export function setPwd(pwd) {
    return Cookies.set("pwd", pwd)
  }