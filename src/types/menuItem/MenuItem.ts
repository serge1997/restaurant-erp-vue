import type { MenuCategoryProps } from "../menuCategory/MenuCategory";
export interface MenuItemProps {
    id: number
    name: string
    price: any
    image?: string
    description?: string
    featured_types?: number[]
    technicalSheet?: Array<any>
}
export enum FeaturedMenuItemEnum{
    CHEF_DISH = 1,
    NEW_DISH,
    PROMOTION
}
export interface FormOptions {
    categories: Array<MenuCategoryProps>,
    featureMenuitems: any[]
}

export const featureMenuitemOptions = [
    
        {id: FeaturedMenuItemEnum.CHEF_DISH, name: "Prato do chef", description: "Selo 'Recomendado' no cardapio"},
        {id: FeaturedMenuItemEnum.NEW_DISH, name: "Novidade", description: "Badge 'Novo' por 30 dias"},
        {id: FeaturedMenuItemEnum.PROMOTION, name: "Exibir um preço promocional", description: "Exibe preço promocional"}
    
]