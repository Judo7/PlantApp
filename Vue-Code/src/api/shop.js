import request from '@/utils/request'

export function GetList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'shop/list.do',
    method: 'post',
    data
  })
}
export function pwd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'shop/pwd.do',
    method: 'post',
    data
  })
}

export function reg(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'shop/reg.do',
      method: 'post',
      data
    })
  }

export function edit(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'shop/edit.do',
      method: 'post',
      data
    })
  }

  export function State(data) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'shop/state.do',
      method: 'post',
      data
    })
  }
  
  export function getbyid(id) {
    return request({
      url: process.env.VUE_APP_BASE_API + 'shop/getbyid.do',
      method: 'get',
      params:{id}
    })
  }
  
