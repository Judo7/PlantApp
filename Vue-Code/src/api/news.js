import request from '@/utils/request'

export function GetList() {
    return request({
        url: process.env.VUE_APP_BASE_API+'news/list.do',
        method: 'get'
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'news/del.do',
        method: 'get',
        params:{id}
    })
}

export function GetByID(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'news/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'news/add.do',
        method: 'post',
        data
    })
}

