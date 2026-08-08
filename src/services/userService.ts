import type { Restaurant } from "@/types/restaurant/restaurant";
import baseService from "./baseService";

export default {
    ...baseService,
    modulePath: "users",
    serviceTitle: 'Usuarios / colaboradores',

    switchRestaurant(restaurantId: number) {
        return this.client.put<Restaurant>(`${this.modulePath}/switchRestaurant/${restaurantId}`, {})
    }
}