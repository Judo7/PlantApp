import request from '@/utils/request'

export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thing/list.do',
        method: 'post',
        data
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thing/del.do',
        method: 'get',
        params:{id}
    })
}

export function GetByID(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thing/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thing/add.do',
        method: 'post',
        data
    })
}

