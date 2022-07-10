import request from '@/utils/request'

export function index() {
  return request({
    url: process.env.VUE_APP_BASE_API + 'index.do',
    method: 'get'
  })
}
export function GetList() {
  return request({
      url: process.env.VUE_APP_BASE_API+'news/list.do',
      method: 'get'
  })
}

export function getconfig() {
    return request({
      url: process.env.VUE_APP_BASE_API + 'config.do',
      method: 'get'
    })
  }
  