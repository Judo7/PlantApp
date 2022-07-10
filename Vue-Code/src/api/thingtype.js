import request from '@/utils/request'

export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype/list.do',
        method: 'post',
        data
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype/del.do',
        method: 'get',
        params:{id}
    })
}

export function GetByID(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'thingtype/add.do',
        method: 'post',
        data
    })
}

