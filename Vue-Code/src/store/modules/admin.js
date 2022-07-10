import { loginin, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken, getID, setID, getAuthor, setAuthor, getLogin, setLogin, getAvatar, setAvatar ,getPwd, setPwd} from '@/utils/auth'


const getDefaultState = () => {
  return {
    token: getToken(),
    login: getLogin(),
    avatar: getAvatar(),
    id: getID(),
    author: getAuthor(),
    pwd: getPwd()
  }
}
const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_Login: (state, login) => {
    state.login = login
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_Author: (state, author) => {
    state.author = author
  },
  SET_PWD: (state, pwd) => {
    state.pwd = pwd
  }
}
const actions = {
  // user login
  loginin({ commit }, userInfo) {
    console.log("userinfo:%s",JSON.stringify(userInfo))
    const { login, pwd, author } = userInfo
    return new Promise((resolve, reject) => {
      loginin({ login: login.trim(), pwd: pwd, author: author }).then(res => {
        const { token } = res
        const { login, avatar, id, author, pwd } = res.data
        commit('SET_Login', login)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', id)
        commit('SET_Author', author)
        commit('SET_PWD', pwd)
        setToken(token)
        setLogin(login)
        setID(id)
        setPwd(pwd)
        setAvatar(avatar)
        setAuthor(author)
        commit('SET_TOKEN', token)
          resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    //return new Promise((resolve, reject) => {
      //getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        
        // const { login, avatar,id,author } = data
        // commit('SET_LoginName', login)
        // commit('SET_AVATAR', avatar)
        // commit('SET_ID', id)
        // commit('SET_Author', author)
        resolve(data)
      //}).catch(error => {
        reject(error)
      //})
    //})
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

