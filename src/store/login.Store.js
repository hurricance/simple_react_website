// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken } from '/src/utils'

class LoginStore {
  
    token = getToken() ?? ''
  
    constructor() {
        makeAutoObservable(this)
    }
  
    async login({ mobile, password }) {

        const url = `http://localhost:3000/users/?mobile=${mobile}&password=${password}`
        const res = await http.get(url)
        this.token = res.id
        setToken(this.token)
  }

}

export default LoginStore
