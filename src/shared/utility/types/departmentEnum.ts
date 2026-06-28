export enum DepartmentEnum {
    KITCHEN = 1,
    HOT_KITCHEN,
    COLD_KITCHEN,
    PATISSERIE,
    WAITER_ROOM,
    BAR,
    ALL,
}
interface DepartamentProps {
    value: number,
    label: string
}

export function getLabel(department: DepartmentEnum): string {
    return {
        [DepartmentEnum.KITCHEN]: "Cozinha",
        [DepartmentEnum.HOT_KITCHEN]: "Cozinha quente",
        [DepartmentEnum.COLD_KITCHEN]: "Cozinha fria",
        [DepartmentEnum.PATISSERIE]: "Confeitaria",
        [DepartmentEnum.WAITER_ROOM]: "Sala",
        [DepartmentEnum.BAR]: "Bar",
        [DepartmentEnum.ALL]: "Todos",
    }[department]
}
export function getAll(): Array<DepartamentProps> {
    return [
        {value: DepartmentEnum.ALL, label: getLabel(DepartmentEnum.ALL)},
        {value: DepartmentEnum.KITCHEN, label: getLabel(DepartmentEnum.KITCHEN)},
        {value: DepartmentEnum.HOT_KITCHEN, label: getLabel(DepartmentEnum.HOT_KITCHEN)},
        {value: DepartmentEnum.COLD_KITCHEN, label: getLabel(DepartmentEnum.COLD_KITCHEN)},
        {value: DepartmentEnum.PATISSERIE, label: getLabel(DepartmentEnum.PATISSERIE)},
        {value: DepartmentEnum.WAITER_ROOM, label: getLabel(DepartmentEnum.WAITER_ROOM)},
        {value: DepartmentEnum.BAR, label: getLabel(DepartmentEnum.BAR)}
    ]
}