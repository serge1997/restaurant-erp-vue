import type { PermissionProps } from "../permission/Permission"

export interface RoleProps {
    id: number
    name: string
    permissions: PermissionProps[]
}