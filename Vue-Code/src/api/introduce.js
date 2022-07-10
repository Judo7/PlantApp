import request from '@/utils/request'

export function list() {
    return request({
        url: process.env.VUE_APP_BASE_API+'introduce/list.do',
        method: 'get'
    })
}


export function getbyid(id) {
    return request({
        url: process.env.VUE_APP_BASE_API+'introduce/getbyid.do',
        method: 'get',
        params:{id}
    })
}

export function edit(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'introduce/edit.do',
        method: 'post',
        data
    })
}

