export interface StockMovment {

}
export enum StockMovmentTypeEnum {
    PURCHASE = 1,
    SALE,
    DEVOLUTION_SUPPLIER,
    DEVOLUTION_SALE,
    WASTE,
    MANUAL_IN,
    MANUAL_OUT,
}
export interface FormOptions {
    purchaseRequests: Array<any>,
    stockMovmentTypes: Array<any>,
    products: Array<any>,
    suppliers: Array<any>
}

export const stockMovmentTypeOptions = [
    {value: StockMovmentTypeEnum.PURCHASE, label: "Entrada de requisiçao"},
    {value: StockMovmentTypeEnum.SALE, label: "Saída | venda"},
    {value: StockMovmentTypeEnum.DEVOLUTION_SUPPLIER, label: "Devoluçao para fornecedor"},
    {value: StockMovmentTypeEnum.DEVOLUTION_SALE, label: "Devoluçao de venda"},
    {value: StockMovmentTypeEnum.WASTE, label: "Gastos | produtos estragados | quebrados"},
    {value: StockMovmentTypeEnum.MANUAL_IN, label: "Entrada manual"},
    {value: StockMovmentTypeEnum.MANUAL_OUT, label: "Saída manual"}
]   

export const OUT_MOVS = [StockMovmentTypeEnum.MANUAL_OUT, StockMovmentTypeEnum.SALE, StockMovmentTypeEnum.WASTE, StockMovmentTypeEnum.DEVOLUTION_SUPPLIER];
export const IN_MOVS = [StockMovmentTypeEnum.DEVOLUTION_SALE, StockMovmentTypeEnum.MANUAL_IN, StockMovmentTypeEnum.PURCHASE]