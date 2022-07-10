import request from '@/utils/request'



export function GetList(data) {
    return request({
        url: process.env.VUE_APP_BASE_API+'buylist/list.do',
        method: 'post',
        data
    })
}

