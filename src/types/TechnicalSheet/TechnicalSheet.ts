import { currency } from "@/shared/utility/utils";
import type { MenuItemProps } from "../menuItem/MenuItem";
import type { UnitMeasure } from "../productCategory/ProductCategory";
import type { ProductProps } from "../products/Product";

export interface FormOptions {
    menuItems: Array<MenuItemProps>,
    products: Array<ProductProps>
}

export interface TechnicalSheetProps {
    product: ProductProps,
    menuItem: MenuItemProps,
    quantity: number,
    cost: number,
    unit_of_measure: string,
    unit_size: number,
    costs?: number
}

export class TechnicalSheet {
    constructor(
        private readonly props: TechnicalSheetProps
    ){}

    static create(props: TechnicalSheetProps): TechnicalSheet {
        return new TechnicalSheet(props)
    }

    getProductQuantityLabel(): string {
        return (this.props.product.category?.unit_measure as UnitMeasure).sheet || ""
    }

    computeQuantityCost(): string | null {
        const getCost = (this.props.product.cost as any).value || this.props.product.cost
        if (!getCost) return ''
        if (this.isUnit()){
            const cost = getCost * this.props.quantity
            this.props.costs = cost
            return currency(cost)
        }
        const cost = (this.props.quantity * this.props.cost) / this.props.unit_size
        this.props.costs = cost
        return currency(cost)
    }
    static costSum(sheets: TechnicalSheet[]): number {
        const costs: number[] = []
        sheets.map(sheet => {
            costs.push(sheet.props?.costs || 0)
        })
        return costs.reduce((acc, curr) => acc + curr)
    }
    static computeSellMarge(totalCost: number, menuItem: MenuItemProps): number {
        const marge = Math.round((1 - totalCost / menuItem.price.value) * 100)
        return marge
    }

    isUnit(): boolean{
        const unitMeasureLabel = (this.props.product.category?.unit_measure as any).label 
        return (this.props.unit_of_measure == "UNIT" || this.props.unit_of_measure == "Un") || unitMeasureLabel == "UNIT" || unitMeasureLabel == "Un"
    }
}