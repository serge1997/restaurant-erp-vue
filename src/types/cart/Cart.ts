import type { CardProps } from "primevue/card";
import { MenuItem, type MenuItemProps } from "../menuItem/MenuItem";

export type SideDish = MenuItemProps & {
    quantity: number
    menu_item_id: number
    subtotal: number
}
export interface CartProps {
    item: MenuItemProps;
    order_item_id?: number;
    quantity: number;
    subtotal: number;
    side_dishes?: SideDish[];
    sideDisheItems?: MenuItemProps[] 
}

interface CartPayload {
    order_item_id?: number;
    menu_item_id: number;
    quantity: number;
    unit_price?: number;
    side_dishes?: Array<{
        menu_item_id: number;
        quantity: number;
        unit_price?: number;
    }>
}

export const getSideDishTotalOfItem = (cart: CartProps): number => {
    let total = 0
    if(cart.side_dishes?.length){
        cart.side_dishes.map(s => {
            total += s.quantity * s.price.value
        })
    }
    return total || 0
}

export class Cart {
    private items: CartProps[] = []
    private sideDishe?: SideDish
    constructor(
        private cart: CartProps
    ){
        this.cart.subtotal = cart.item.price.value
    }

    getCart(): CartProps {
        return this.cart
    }

    static create(cart: CartProps): Cart{
        return new Cart(cart)
    }
    add() {
        const all = Cart.load() || []
        const has = this.get(this.cart.item.id)
        if (has) {
            const index = all!.findIndex(a => a.item.id == this.cart.item.id)
            const price = this.getItemPriceToUse(this.cart.item)
            has.quantity += 1
            has.subtotal = has.quantity * price
            all[index] = has
        }else{
            const price = this.getItemPriceToUse(this.cart.item)
            this.cart.subtotal = price
            this.cart.sideDisheItems = []
            all!.push(this.cart)
        }
        this.items = all
        this.save()
    }

    all(): CartProps[] | null{
        return Cart.load()
    }

    static getItem(id: number) {
        const carts = Cart.load()
        const result = carts?.find(c => c.item.id == id) || null
        return result
    }

    get(id: number): CartProps | null {
        const carts = Cart.load()
        const result = carts?.find(c => c.item.id == id) || null
        return result

    }
    static delete(id: number): void {
        const carts = Cart.load()
        if (carts){
            const index = carts.findIndex(c => c.item.id == id)
            if (index >= 0){
                carts.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(carts))
            }
        }
    }
    static has(id: number): boolean {
        const carts = Cart.load()
        const result = carts?.find(c => c.item.id == id) || null
        return result ? true : false

    }

    quantity(): number {
        return this.all()?.length || 0
    }
    decrement(index: number){
        const carts = Cart.load()
        if (carts && carts[index]){
            if (carts[index].quantity >= 2) {
                carts[index]!.quantity -= 1
                const price = this.getItemPriceToUse(carts[index].item)
                const subtotal = carts[index]!.quantity * price
                carts[index].subtotal = subtotal
                this.cart = carts[index]
                this.items = carts
                this.save()
            }
        }
    }
    getItemPriceToUse(item: MenuItemProps): number {
        const menuItem = MenuItem.create(item)
        let price = item.price.value
        if (menuItem.usePromotionalPrice() && menuItem.promotionalPrice) {
            price = menuItem.promotionalPrice.value
        }
        return price
    }
    canDecrement(){
        return this.cart.quantity >= 2
    }
    increment(index: number){
        const carts = Cart.load()
        if (carts && carts[index]){
            carts[index]!.quantity += 1
            const price = this.getItemPriceToUse(carts[index].item)
            const subtotal = carts[index]!.quantity * price
            carts[index].subtotal = subtotal
            this.cart = carts[index]
            this.items = carts
            this.save()
        }
    }

    static load(): CartProps[]|null {
        const storage = localStorage.getItem("cart")
        if (!storage) return null
        const carts = JSON.parse(storage) as Array<CartProps>
        return carts
    }
    static clear() {
        localStorage.removeItem("cart")
    }
    static total(): number {
        const carts = Cart.load()
        let total = 0
        carts?.map(c => {
            total += c.item.price.value * c.quantity
            if(c.side_dishes?.length){
                c.side_dishes.map(s => {
                    total += s.quantity * s.price
                })
            }
        })
        return total || 0
    }
    private save() {
        localStorage.setItem("cart", JSON.stringify(this.items))
    }

    static toPayload(crts: CartProps[] | undefined = undefined): CartPayload[] {
        if (crts){
            const payload = crts.map(c => {
                return {
                    order_item_id: c.order_item_id,
                    menu_item_id: c.item.id,
                    quantity: c.quantity,
                    unit_price: c.item.price.value,
                    side_dishes: c.side_dishes?.map(s => {
                        return {
                            id: s.id,
                            menu_item_id: s.menu_item_id,
                            quantity: s.quantity,
                            unit_price: s.price
                        }
                    })
                }
            })
            return payload
        }
        const carts = Cart.load()
        const payload = carts?.map(c => {
            return {
                menu_item_id: c.item.id,
                quantity: c.quantity,
                side_dishes: c.side_dishes?.map(s => {
                    return {
                        id: s.id,
                        menu_item_id: s.menu_item_id,
                        quantity: s.quantity
                    }
                })
            }
        }) || []
        return payload
    }
    getItemSideDish(): SideDish | null {
        const cartItem = this.get(this.cart.item.id)
        if(!cartItem?.side_dishes){
            return null
        }
        const sideElement = cartItem.side_dishes.find(s => s.id == this.sideDishe?.id)
        if(!sideElement){
            return null
        }
        return sideElement
    }

    static createOrIncrementSideDish(index: number, sideDish: SideDish) {
        const item = Cart.getItem(sideDish.menu_item_id)
        const cartItems = Cart.load()
        if(item && cartItems?.length){
            const cart = new Cart(item)
            cart.sideDishe = sideDish
            const sideDishExists = cart.getItemSideDish()
            if(sideDishExists && item.side_dishes?.length){
                const price = cart.getItemPriceToUse(sideDishExists)
                const sideDishIndex = item.side_dishes!.findIndex(s => s.id == sideDish.id)
                sideDishExists.quantity += 1
                sideDishExists.subtotal = sideDishExists.quantity * price
                item.side_dishes[sideDishIndex] = sideDishExists
            }else{
                item.side_dishes = item.side_dishes ?? []
                const price = cart.getItemPriceToUse(sideDish)
                sideDish.quantity = 1
                sideDish.subtotal = sideDish.quantity * price
                item.side_dishes.push(sideDish)
            }
            cartItems[index] = item
            cart.items = cartItems
            cart.save()
        }
    }
    static reduceSideDishQuantity(index: number, sideDish: SideDish){
        const item = Cart.getItem(sideDish.menu_item_id)
        const cartItems = Cart.load()
        if(item && cartItems?.length){
            const cart = new Cart(item)
            const price = cart.getItemPriceToUse(item.item)
            cart.sideDishe = sideDish
            const sideDishExists = cart.getItemSideDish()
            if(sideDishExists && item.side_dishes?.length){
                const sideDishIndex = item.side_dishes!.findIndex(s => s.id == sideDish.id)
                if (sideDishExists.quantity == 0) {
                    item.side_dishes?.splice(sideDishIndex, 1)
                    return
                }
                sideDishExists.quantity -= 1
                sideDishExists.subtotal = sideDishExists.quantity * price
                item.side_dishes[sideDishIndex] = sideDishExists
                if (sideDishExists.quantity == 0) {
                    item.side_dishes?.splice(sideDishIndex, 1)
                }
            }
            cartItems[index] = item
            cart.items = cartItems
            cart.save()
        }
    }

    static getItemSideDishByItem(itemId: number, sideDishId: number): SideDish | null {
        const cartItem = Cart.getItem(itemId)
        if(!cartItem?.side_dishes){
            return null
        }
        const sideElement = cartItem.side_dishes.find(s => s.id == sideDishId)
        if(!sideElement){
            return null
        }
        return sideElement
    }

    static deleteSideDish(index: number, id: number, ): void {
        const carts = Cart.load()
        if (carts){
            const item = carts[index]
            if(!item?.side_dishes){
                return
            }
            const sideDishIndex = item.side_dishes.findIndex(s => s.id == id)
            if (index >= 0){
                item.side_dishes.splice(sideDishIndex, 1)
                carts[index] = item
                localStorage.setItem("cart", JSON.stringify(carts))
            }
        }
    }
}