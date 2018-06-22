import createHistory from 'history/createHashHistory'
import {Modal } from 'antd'
import axios from 'axios'
let history = createHistory()
let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
// req拦截
axios.interceptors.request.use(
    config => {
        if (token) {  //判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['X-Authorization'] = 'Bearer ' + token
        }
        return config
    },err => {
        return Promise.reject(err)
    })
// res拦截
axios.interceptors.response.use(
    response => {
        return response.data
    },error => {
        //console.log(error.response),token 过期后跳转login
        if (error.response.data.message === 'Token has expired' && error.response.data.status === 401) {
            // 返回 401 跳转到登录页面
            Modal.info({
                title: '提示',
                content: '登录信息已过期，请重新登录？',
                okText:"确认",
                onOk() {
                    history.push('/login')
                }
            });
        }
    })
export default axios