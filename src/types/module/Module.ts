import type { PermissionProps } from "../permission/Permission"

interface RouteGroupProps {
    id: number
    name: string
    permissions: PermissionProps[]
}
export interface ModuleProps {
    id: number
    name: string
    description: string
    icon: string
    routeGroupes?: RouteGroupProps[]
}

export interface MenuProps {
    name: string
    description: string
    icon: string
    permissions: PermissionProps[]
}