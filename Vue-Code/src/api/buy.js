import request from '@/utils/request'

export function Add(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buy/add.do',
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

export function AddCart(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buying/add.do',
        method: 'post',
        data
    })
}


export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buy/list.do',
        method: 'post',
        data
    })
}

export function Del(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buy/del.do',
        method: 'get',
        params:{id}
    })
}



export function State(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buy/state.do',
        method: 'post',
        data
    })
}