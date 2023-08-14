import base from '../base'
// axios
import request from '@/utils/request'

const API = {
  menuList: data => request({ url: base.Login, method: 'post', data })
}

export default API
