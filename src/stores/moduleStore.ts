import moduleService from "@/services/moduleService";
import type { MenuProps, ModuleProps } from "@/types/module/Module";
import type { PermissionProps } from "@/types/permission/Permission";
import { defineStore } from "pinia";
import type { PropType } from "vue";


export const useModuleStore = defineStore('module', {

    state: () => ({
        modules: [] as ModuleProps[],
        menu: [] as MenuProps[],
        loading: false,
        loaded: false
    }),
    actions: {
        async loadModules() {
            if (this.loaded || this.loading) return
            this.loading = true
            const { data } = await moduleService.getAll<ModuleProps>({})
            this.modules = data
            this.loaded = true
            this.loading = false
        },
        mountMenuElements() {
            this.modules.map(mod => {
                let permissions: PermissionProps[] = []
                mod.routeGroupes?.map(group => {
                    permissions = group.permissions
                })
                this.menu.push({
                    name: mod.name,
                    icon: mod.icon,
                    description: mod.description,
                    permissions: permissions
                })
            })
        }
    }
});