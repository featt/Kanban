import create from 'zustand'
import { persist } from 'zustand/middleware'

let store = (set, get) => ({
    user: '',
    setUser: (login) => {        
        set({
            user: login
        })
    }, 
    
    token: '',
    setToken: (token) => {        
        set({
            token: token
        })
    },
})

store = persist(store)

const useUserStore = create(store)

export default useUserStore