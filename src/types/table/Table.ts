import type { RoomProps } from "../room/room";

export interface TableShapeProps {
    name: string;
    shape?: string
}

export interface TableProps {
    id: number
    number: number
    name?: string | null;
    capacity: number;
    label: string
    active_order?: number
}

export interface FormOptions {
    rooms: RoomProps[]
}
export const tableShapeOptions: TableShapeProps[] = [
    {shape: "pi pi-stop", name: "Quadrada"},
    {shape: "pi pi-circle", name: "Redonda"},
    {shape: undefined, name: "Rectangular"}
] 