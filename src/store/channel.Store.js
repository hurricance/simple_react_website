import { makeAutoObservable } from 'mobx'

class channelStore {

    channels = []

    constructor() {
        makeAutoObservable(this)
    }

    async getChannels() {
        const res = await fetch("http://localhost:3000/channels")
        const data = await res.json()
        this.channels = data
    }

}

export default channelStore