import axios from 'axios'
import endpoints from './endpoints'

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const api = {}
for (const key in endpoints) {
  api[key] = (arg) => {
    const { variables, params } = arg || {}
    const endpoint = { ...endpoints[key] }
    return client({...endpoint, data: variables ? variables : null, params:  params ?  params : null}).catch((err) => {
      throw err
    })
  }
}

export default api
