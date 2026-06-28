import roleService from "@/services/roleService";
import type { RoleProps } from "@/types/role/Role";
import { defineStore } from "pinia";


export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [] as RoleProps[],
        loaded: false,
        loading: false
    }),
    actions: {
        async load() {
            if (this.loaded || this.loading) return 
            this.loading = true
            const { data } = await roleService.getAll<RoleProps>({})
            this.roles = data
            this.loading = false
            this.loaded = true

        }
    }
})