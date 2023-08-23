import { makeAutoObservable } from 'mobx'
import { http, getToken } from '/src/utils'

class UserStore {
    
    userInfo = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getUserInfo() {
        const id = getToken()
        const res = await http.get(`http://localhost:3000/users/?id=${id}`)
        this.userInfo = res
    }

}

export default UserStore