import axios from 'axios'
import _ from 'lodash'

axios.defaults.baseURL = 'http://localhost:3030/'
if (process.env.NODE_ENV === "production") axios.defaults.baseURL = 'https://sys-api.shiningcafe.com'

// axios.defaults.headers.common['X-DATA-Authorization'] = crypto()

// 攔截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    if (_.size(response) > 0) {
      console.error('[API Error]', response.status, response.statusText)
      console.error(` ${response.config.method.toUpperCase()} / ${response.config.url}`)
      if (response.config.method.toUpperCase() === 'POST') {
        console.error(` params: ${response.config.data}`)
      } else {
        console.error(` params: ${JSON.stringify(response.config.params)}`)
      }
    }
    return Promise.reject(response.data.message)
  }
)
function Api () {

  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'bearer '+ token
    axios.defaults.headers.common['Accept'] = 'application/json'
  }

  this.post = (url, data = null) => {
    return axios.post(url, data)
  }
  this.get = (url, data = null) => {
    return axios.get(url, { params: data })
  }
  this.put = (url, data = null) => {
    return axios.put(`${url}/${data._id}`, data)
  }
  this.patch = (url, data = null) => {
    return axios.patch(`${url}/${data._id}`, data)
  }
  this.delete = (url, data = null) => {
    return axios.delete(url, { params: data })
  }
}

export default Api
