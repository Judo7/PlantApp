import request from '@/utils/request'

export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype2/list.do',
        method: 'post',
        data
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype2/del.do',
        method: 'get',
        params:{id}
    })
}

export function GetByID(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype2/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype2/add.do',
        method: 'post',
        data
    })
}

