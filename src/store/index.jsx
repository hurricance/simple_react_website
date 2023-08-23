import { useContext } from 'react'

import loginStore from './login.Store'
import userStore from './user.Store'
import channelStore from './channel.Store'

import { createContext } from 'react'

class RootStore{

    constructor() {
        this.loginStore = new loginStore()
        this.userStore = new userStore()
        this.channelStore = new channelStore()
    }

}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)
export default useStore
