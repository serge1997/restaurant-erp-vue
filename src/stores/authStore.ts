import type { AuthResponse, RouteGroupProps } from "@/types/auth/Auth";
import type { Restaurant, RestaurantChainProps } from "@/types/restaurant/restaurant";
import type UserProps from "@/types/User/User";
import { defineStore } from "pinia";



export const useAuthStore = defineStore('auth', {
    state: () => ({
        storage: {} as AuthResponse
    }),
    actions: {
        store() {
            localStorage.setItem('auth', JSON.stringify(this.storage.auth))
            localStorage.setItem('menu', JSON.stringify(this.storage.menu))
            localStorage.setItem('token', this.storage.token)
        },
        getMenu(): RouteGroupProps[] {
            return JSON.parse(localStorage.getItem('menu') || '') as RouteGroupProps[]
        },
        getAuth(): UserProps {
            return JSON.parse(localStorage.getItem('auth') || '') as UserProps
        },
        getRestaurant(): Restaurant {
            return this.getAuth().restaurant as Restaurant
        },
        getChain(): RestaurantChainProps {
            return this.getRestaurant().chain as RestaurantChainProps
        },
        storeSwicthedRestaurant(restaurant: Restaurant){
            const auth = this.getAuth()
            auth.restaurant = restaurant
            localStorage.setItem('auth', JSON.stringify(auth))
        }
    }
})