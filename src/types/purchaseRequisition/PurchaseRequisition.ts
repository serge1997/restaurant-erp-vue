import type { ProductProps } from "../products/Product"

export interface RequisitionItemsProps {
    purchase_requisition_id?: number
    product_id: number
    ordered_quantity: number
    received_quantity: number | null
    unit_size: number,
    unit_of_measure?: string
    cost: number
    product: ProductProps
}

export interface PurchaseRequisition {
    author_id: null,
    department_id: number,
    expected_delivery_date: string,
    approved_by?: any,
    observation?: string,
    author?:any
    department?: any
    items: Array<RequisitionItemsProps>
}

export interface FormOptions {
    products: Array<any>,
    unitMlMeasure: Array<any>,
    unitGramMeasures: Array<any>,
    priorities: Array<any>
}

export enum PurchaseRequisitionEnum {
    DRAFT = 1,
    APPROVED,
    PARCIAL,
    COMPLETED,
    REJECTED
}

export enum PurchaseRequisitionPriorityEnum {
    NORMAL = 1,
    HIGHT,
    URGENT
}

export const purchasePriorityOptions = [
    {value: PurchaseRequisitionPriorityEnum.NORMAL, label: "Normal"},
    {value: PurchaseRequisitionPriorityEnum.HIGHT, label: "Alta"},
    {value: PurchaseRequisitionPriorityEnum.URGENT, label: "Urgente"}
]

export const purchaseRequisitionStatusOptions = [
    {value: PurchaseRequisitionEnum.DRAFT, label: "Pendente"},
    {value: PurchaseRequisitionEnum.APPROVED, label: "Aprovado"},
    {value: PurchaseRequisitionEnum.PARCIAL, label: "Parcial"},
    {value: PurchaseRequisitionEnum.COMPLETED, label: "Completo"},
    {value: PurchaseRequisitionEnum.REJECTED, label: "Rejeitar"}
]

export const approveOptions = [
    {value: PurchaseRequisitionEnum.APPROVED, label: "Approvar", severity: "flag-approved", color: "c-flag-approved"},
    {value: PurchaseRequisitionEnum.REJECTED, label: "Rejeitar", severity: "flag-rejected", color: "c-flag-rejected"},
]

export const getRequisitionStatus = (status: PurchaseRequisitionEnum): any => {
    const all: Record<PurchaseRequisitionEnum, Object> = {
        [PurchaseRequisitionEnum.DRAFT]:  {value: PurchaseRequisitionEnum.DRAFT, label: "Pendente", severity: "severity-amber", color: "c-flag-draft"},
        [PurchaseRequisitionEnum.APPROVED]:  {value: PurchaseRequisitionEnum.APPROVED, label: "Aprovado", severity: "severity-success", color: "c-flag-approved"},
        [PurchaseRequisitionEnum.PARCIAL]:  {value: PurchaseRequisitionEnum.PARCIAL, label: "Parcial", severity: "severity-purple", color: "c-flag-parcial"},
        [PurchaseRequisitionEnum.COMPLETED]:  {value: PurchaseRequisitionEnum.COMPLETED, label: "Completo", severity: "severity-blue", color: "c-flag-completed"},
        [PurchaseRequisitionEnum.REJECTED]:  {value: PurchaseRequisitionEnum.REJECTED, label: "Rejeitada", severity: "severity-danger", color: "c-flag-rejected"},
    }
    return  all[status]
}

export const disabledOnSelect = (status: number): boolean => {
    return [PurchaseRequisitionEnum.REJECTED, PurchaseRequisitionEnum.COMPLETED].includes(status) ? true : false
}

export const getProductRequestUnitMeasureLabel = (unit_of_measure: string) => {
    if (unit_of_measure == "UNIT" || unit_of_measure == "ML") return "Unidade(s)"
    if (unit_of_measure == "G") return "G"
    if (unit_of_measure == "KG") return unit_of_measure
}

export class PurchaseRequisitionItem {
    constructor(
        private readonly props: RequisitionItemsProps
    ){}

    static create(props: RequisitionItemsProps): PurchaseRequisitionItem {
        return new PurchaseRequisitionItem(props)
    }

    formatReceivedQuantity(): string | number {
        if ((this.isG() || this.isKg()) && this.props.received_quantity) {
            if (this.props.received_quantity >= 1000){
                return this.props.received_quantity / this.props.unit_size + ` KG`;
            }
            return this.props.received_quantity + ` G`
        }
        if (this.isMl() && this.props.received_quantity) {
            if (this.props.received_quantity >= 1000){
                return this.props.received_quantity / this.props.unit_size + ` Unidade (s)`;
            }
            return this.props.received_quantity + ` ML`
        }
        return this.props.received_quantity || 0
    }

    isMl(): boolean {
        return this.props.unit_of_measure == "ML"
    }

    isG(): boolean {
        return this.props.unit_of_measure == "G"
    }

    isKg(): boolean {
        return this.props.unit_of_measure == "KG"
    }

    isUnit(): boolean {
        return this.props.unit_of_measure == "UNIT"
    }
}