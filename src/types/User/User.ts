import type { ModuleProps } from "../module/Module";
import type { Restaurant } from "../restaurant/restaurant";
import type { RoleProps } from "../role/Role";

export interface FormOptions {
    modules: ModuleProps[]
    roles: RoleProps[]
}

export default interface UserProps {
    id: number
    name: string,
    inicial?: string
    restaurant?: Restaurant
}