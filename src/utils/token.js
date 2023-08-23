const TOKEN_KEY = 'fuck_pc'

const getToken = () => window.localStorage.getItem(TOKEN_KEY)
const setToken = token => window.localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => window.localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, clearToken }
