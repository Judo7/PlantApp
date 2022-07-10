import request from '@/utils/request'

export function GetList() {
    return request({
        url: process.env.VUE_APP_BASE_API+'pinglun/list.do',
        method: 'get'
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'pinglun/del.do',
        method: 'get',
        params:{id}
    })
}

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'pinglun/add.do',
        method: 'post',
        data
    })
}

