import request from '@/utils/request'

export function GetList() {
    return request({
        url: process.env.VUE_APP_BASE_API+'newstype/list.do',
        method: 'get'
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'newstype/del.do',
        method: 'get',
        params:{id}
    })
}

export function GetByID(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'newstype/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'newstype/add.do',
        method: 'post',
        data
    })
}

