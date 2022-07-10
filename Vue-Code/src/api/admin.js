import request from '@/utils/request'

export function loginin(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'login.do',
    method: 'post',
    data
  })
}

export function pwd(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'admin/pwd.do',
      method: 'post',
      data
    })
  }

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
