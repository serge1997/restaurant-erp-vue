import type { RoomTypeProps } from "../roomType/room.type"

export interface RoomProps {
    id: number
    name: string
    description: string | null
    capacity: number
    roomType?: RoomTypeProps
}

export interface FormOptions {
    roomTypes: RoomTypeProps[]
}