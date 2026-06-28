import type { CardProps } from "primevue/card";
import type { MenuItemProps } from "../menuItem/MenuItem";

export interface CartProps {
    item: MenuItemProps
    order_item_id?: number
    quantity: number
    subtotal: number
}


export class Cart {
    private items: CartProps[] = []
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
            all!.push(this.cart)
        }
        this.items = all
        this.save()
    }

    all(): CartProps[] | null{
        return Cart.load()
    }

    get(id: number): CartProps | null {
        const carts = Cart.load()
        const result = carts?.find(c => c.item.id == id) || null
        return result

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
        })
        return total || 0
    }
    private save() {
        localStorage.setItem("cart", JSON.stringify(this.items))
    }

    static toPayload(cats: CartProps[] | undefined = undefined): Array<{order_item_id?: number, menu_item_id: number, quantity: number, unit_price?: number}> {
        if (cats){
            const payload = cats.map(c => {
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
}