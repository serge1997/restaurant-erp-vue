import type { MenuCategoryProps } from "../menuCategory/MenuCategory";
export const SIDE_DISHE_CATEGORY_ID = 28;
export interface MenuItemProps {
    id: number
    name: string
    price: any
    promotional_price: {value: number, label: string}
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

export class MenuItem {
    private constructor(
        private menuItem: MenuItemProps
    ){}
    hasPromotionalTag(): boolean {
        return this.menuItem.featured_types?.includes(FeaturedMenuItemEnum.PROMOTION) || false
    }
    usePromotionalPrice(): boolean {
        return this.hasPromotionalTag() && this.menuItem.promotional_price?.value !== undefined || this.menuItem.promotional_price?.value !== null
    }
    static create(menuItem: MenuItemProps): MenuItem {
        return new MenuItem(menuItem)
    }
    item(): MenuItemProps {
        return this.menuItem
    }
    get promotionalPrice(): {value: number, label: string} | undefined {
        if(this.usePromotionalPrice()){
            return this.menuItem.promotional_price
        }
        return undefined
    }
}