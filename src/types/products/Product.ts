import type { ProductCategoryProps } from "../productCategory/ProductCategory"

export interface ProductProps {
    id: number | null
    name: string
    description: string | null,
    cost: number | null,
    category?: ProductCategoryProps
}

export interface FormOptions {
    categories: Array<any>
}