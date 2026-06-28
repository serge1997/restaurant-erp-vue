import type { PermissionProps } from "../permission/Permission"
import type UserProps from "../User/User"

export interface AuthProps {

}
interface ModuleProps {
    id: number
    name: string
    description: string
    base_view_path: string
    icon: string
}
export interface RouteGroupProps {
    id: number
    name: string
    module: ModuleProps
    permissions: PermissionProps[]
}
export interface AuthResponse {
    token: string
    auth: UserProps
    menu: RouteGroupProps[]
}