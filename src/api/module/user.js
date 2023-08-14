import base from '../base'
// axios
import request from '@/utils/request'

const API = {
  login: data => request({ url: base.Login, method: 'post', data }),
  loginout: data => request({ url: base.loginout, method: 'get', params: data })
}

export default API
