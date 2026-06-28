import userService from "@/services/userService";
import type UserProps from "@/types/User/User";
import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {

    state() {
        return {
            users: [] as UserProps[],
            loaded: false,
            loading: false,
        }
    },
    actions: {
        async loadUsers(){
            if(this.loading || this.loaded) return
            this.loading = true
            const response =  userService.getAll<UserProps>({limit: 40})
            const {data} = await response
            this.users = data
            this.loaded = true
            this.loading = false;
        }
    }
})