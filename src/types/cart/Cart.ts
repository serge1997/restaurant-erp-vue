import type { CardProps } from "primevue/card";
import type { MenuItemProps } from "../menuItem/MenuItem";

export type SideDish = MenuItemProps & {
    quantity: number
    menu_item_id: number
}
export interface CartProps {
    item: MenuItemProps;
    order_item_id?: number;
    quantity: number;
    subtotal: number;
    side_dishes?: SideDish[];
    sideDisheItems?: MenuItemProps[] 
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
            has.quantity += 1
            has.subtotal = has.quantity * has.item.price.value
            all[index] = has
        }else{
            this.cart.subtotal = this.cart.item.price.value
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
                const subtotal = carts[index]!.quantity * carts[index].item.price.value
                carts[index].subtotal = subtotal
                this.cart = carts[index]
                this.items = carts
                this.save()
            }
        }
    }
    canDecrement(){
        return this.cart.quantity >= 2
    }
    increment(index: number){
        const carts = Cart.load()
        if (carts && carts[index]){
            carts[index]!.quantity += 1
            const subtotal = carts[index]!.quantity * carts[index].item.price.value
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

    static toPayload(crts: CartProps[] | undefined = undefined): Array<{order_item_id?: number, menu_item_id: number, quantity: number, unit_price?: number}> {
        if (crts){
            const payload = crts.map(c => {
                return {
                    order_item_id: c.order_item_id,
                    menu_item_id: c.item.id,
                    quantity: c.quantity,
                    unit_price: c.item.price.value
                }
            })
            return payload
        }
        const carts = Cart.load()
        const payload = carts?.map(c => {
            return {
                menu_item_id: c.item.id,
                quantity: c.quantity
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
                const sideDishIndex = item.side_dishes!.findIndex(s => s.id == sideDish.id)
                sideDishExists.quantity += 1
                item.side_dishes[sideDishIndex] = sideDishExists
            }else{
                item.side_dishes = item.side_dishes ?? []
                sideDish.quantity = 1
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
            cart.sideDishe = sideDish
            const sideDishExists = cart.getItemSideDish()
            if(sideDishExists && item.side_dishes?.length){
                const sideDishIndex = item.side_dishes!.findIndex(s => s.id == sideDish.id)
                if (sideDishExists.quantity == 0) {
                    return
                }
                sideDishExists.quantity -= 1
                item.side_dishes[sideDishIndex] = sideDishExists
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
}