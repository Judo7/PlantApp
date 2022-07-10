import request from '@/utils/request'

export function GetList() {
  return request({
    url: process.env.VUE_APP_BASE_API + 'client/list.do',
    method: 'get'
  })
}

export function Del(id) {
  return request({
      url: process.env.VUE_APP_BASE_API+'client/del.do',
      method: 'get',
      params:{id}
  })
}

export function pwd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'client/pwd.do',
    method: 'post',
    data
  })
}

export function reg(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'client/reg.do',
      method: 'post',
      data
    })
  }

export function edit(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'client/edit.do',
      method: 'post',
      data
    })
  }

  
  export function getbyid(id) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'client/getbyid.do',
      method: 'get',
      params:{id}
    })
  }
  
