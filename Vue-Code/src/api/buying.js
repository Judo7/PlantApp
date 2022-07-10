import request from '@/utils/request'

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buying/add.do',
        method: 'post',
        data
    })
}
export function Pay(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'pay/alipay.do',
        method: 'post',
        data
    })
}

export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buying/list.do',
        method: 'post',
        data
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buying/del.do',
        method: 'get',
        params:{id}
    })
}