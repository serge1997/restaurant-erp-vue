import addressService from "@/services/addressService";
import { defineStore } from "pinia";


export const useStateStore = defineStore('state', {
    state: () => ({
        states: [] as any[],
        loading: false,
        loaded: false
    }),
    actions: {
        async loadStates() {
            if (this.loaded || this.loading) return
            this.loading = true
            const { data } = await addressService.getStates() as any
            this.states = data
            this.loaded = true
            this.loading = false
        }
    }
});