import { defineComponent } from "vue";
import Menubar from "primevue/menubar";
import SidebarTemplate from "@/components/template/SidebarTemplate/SidebarTemplate.vue"
import { Cart, type CartProps } from "@/types/cart/Cart";
import { useAuthStore } from "@/stores/authStore";
import { useTableStore } from "@/stores/useTableStore";
import ConfirmTemplate from "../ConfirmTemplate/ConfirmTemplate.vue";
import { useConfirm } from "primevue/useconfirm";
import orderService from "@/services/orderService";
import type { OrderResponse } from "@/types/order/Order";
import { useNotify } from "@/shared/utility/notify";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Divider from "primevue/divider";
import type { MenuItemProps } from "@/types/menuItem/MenuItem";
import { useMenuitemStore } from "@/stores/menuItemStore";
import type { TableProps } from "@/types/table/Table";
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import InputOtp from 'primevue/inputotp';
import { handleError } from "@/shared/utility/utils";
import Menu from "primevue/menu";
import type { Restaurant } from "@/types/restaurant/restaurant.ts";
import restaurantService from "@/services/restaurantService.ts";
import userService from "@/services/userService.ts";


export default defineComponent({
    name: 'Navbar',
    components: {
        Menubar,
        SidebarTemplate,
        ConfirmTemplate,
        TabPanel,
        TabView,
        Divider,
        Stepper,
        StepperPanel,
        InputOtp,
        Menu
    },
    props: {
        cardQuantityItems: {
            type: Number,
            default: 0
        },
        cartTotal: {
            type: Number,
            default: 0
        }
    },

    setup(props, {emit}){
       const authStore = useAuthStore()
       const auth = authStore.getAuth()
       const restaurant = auth.restaurant
       const tableStore = useTableStore()
       const menuItemStore = useMenuitemStore()
       const confirm = useConfirm()
       const notify = useNotify()
       const chain = restaurant?.chain || null

       return {
        auth,
        tableStore,
        confirm,
        notify,
        menuItemStore,
        restaurant,
        chain,
        authStore
       }
    },
    watch: {
        '$route.params'(newParams){
            if (newParams?.orderId){
                this.visibleCartSidebar = true
                this.order.id = Number(newParams.orderId)
                orderService.getOne<OrderResponse>(this.order.id)
                .then(response => {
                    this.activeOrder = response.data
                    this.order.observation = this.activeOrder.observation
                    this.order.customer_name = this.activeOrder.customer_name
                    this.carts = []
                    response.data.items.map((item: any) => {
                        const cartItem: CartProps = {
                            order_item_id: item.id,
                            item: {...item.menu_item, price: item.unit_price},
                            quantity: item.quantity,
                            subtotal: item.unit_price * item.quantity
                        }
                        this.carts.push(cartItem)
                        this.order.table_id = this.activeOrder.table.id
                    })
                })
            }
        },
        visibleCartSidebar(newValue){
            if (!newValue && this.order.id){
                this.$router.push('/orders/tables')
                this.activeOrder = {} as OrderResponse
                this.carts = []
                this.order.customer_name = null
                this.order.table_id = null
                this.order.id = 0
                this.transfertSuccessMessage = ''
            }
        },
        transfertStepIndex(newValue){
        },
        transfertPayload: {
            handler(newValue) {
                this.transfertNextStepBtns.disableNextOnItem = newValue.items.length ? false : true
                this.transfertNextStepBtns.disableOnTable = newValue.table?.id ? false : true
            },
            deep: true
        }
    },
    computed: {
       getCartTotal(){
            if (this.cartTotal && !this.activeOrder?.id){
                return this.cartTotal.toFixed(2)
            }
            return this.carts.reduce((acc, curr) => acc + curr.subtotal, 0).toFixed(2)
       },
       getWaiterName(){
            return this.order.waiterName || this.auth.name
       },
       getCartTiltle(){
            if (this.activeOrder?.id){
                return `Mesa #${this.activeOrder.table.number}`
            }
            return "Novo Pedido"
       },
       getActiveOrderCustomerName(){
            return this.activeOrder?.customer_name || ''
       },
       orderTabIsTransfertIndex(){
        return this.orderPanelIndex == 2
       },
       transfertItemOptions(){
            const transfert: any = []
            this.carts.map(cart => transfert.push({
                id: cart.item.id,
                name: cart.item.name,
                price: cart.item.price.label,
                quantity: cart.quantity,
                subtotal: cart.subtotal,
                description: `${cart.quantity}x. R$ ${cart.item.price}`
            }))
            return transfert
       },
       transfertItems() {
            type TransfertItem = MenuItemProps & {quantity: string}
            const items: TransfertItem[] = []
            this.carts.map(cart => {
                if (this.transfertPayload.items.includes(cart.item.id)){
                    const itemsQuantities = Object.values(this.transfertPayload.itemsQuantities)
                    const itemQuantity = itemsQuantities.find(item => item.menu_item_id == cart.item.id)
                    items.push({quantity: itemQuantity!.quantity, ...cart.item})
                }
            })
            return items
       },
       transfertStepSelectItemDoneClass(){
            return  !this.isActiveTransfertStepperPanelClass(0) && this.transfertPayload.items.length ? 'done' : ''
       },
       transfertStepSelectTableDoneClass(){
            return  !this.isActiveTransfertStepperPanelClass(1) && this.transfertPayload.table.id ? 'done' : ''
       },
       transfertItemsTotalAmount(){
        let sum = 0
        this.transfertItems.forEach(el => {
            sum += el.price * Number(el.quantity)
        })
        return sum.toFixed(2)
       }
    },
    data(){
        return {
            items: [],
            visibleCartSidebar: false,
            carts: [] as CartProps[],
            tables: [] as TableProps[],
            orderId: 0,
            order: {
                id: 0,
                table_id: null as any,
                customer_name: '' as any,
                observation: '',
                waiterName: null,
                items: [] as any
            },
            activeOrder: {} as OrderResponse,
            menuItems: [] as MenuItemProps[],
            orderPanelIndex: 0,
            transfertStepIndex: 0,
            transfertPayload: {
                items: [] as number[],
                quantities: [] as number[],
                table: {} as TableProps,
                itemsQuantities: {} as Record<string, {menu_item_id: number, quantity: string}>,
                table_id: 0,
                customer_name: null,
                transfert_reason: null
            },
            transfertNextStepBtns: {
                disableNextOnItem: true,
                disableOnTable: true,
                disableConfirm: true
            },
            selectedTransfertItems: [],
            transfertSuccessMessage: '',
            time: null as any,
            swicthedRestaurant: [] as Restaurant[]
        }
    },
    methods: {
        onLimitransfertQuantity(key: number){
            const item = this.transfertItemOptions.find((item: any) => item.id == key)
            const transfert = this.transfertPayload.itemsQuantities[key]
            if(Number(item.quantity) < Number(transfert?.quantity)){
                transfert!.quantity = item.quantity
                return
            }
            if(!Number(transfert?.quantity)){
                transfert!.quantity = item.quantity
            }
        },
        isCurrentRestaurant(restaurant: Restaurant){
            return this.restaurant?.id  == restaurant.id
        },
        isActiveTransfertStepperPanelClass(index: number){
            return this.transfertStepIndex === index ? 'active' : ''
        },
        setTransfertTable(table: TableProps){
            this.transfertPayload.table = table
        },
        itemIndexInCart(item: MenuItemProps){
            return this.carts.findIndex(it => it.item.id == item.id)
        },
        addToOrder(item: MenuItemProps){
            const index = this.itemIndexInCart(item)
            if (index >= 0 && this.carts[index]) {
                this.carts[index].quantity += 1
                const element = this.carts[index]
                const price = element.item.price.value || element.item.price
                this.carts[index].subtotal = Number(price) * element.quantity
                return
            }
            const cartItem: CartProps = {
                item: item,
                quantity: 1,
                subtotal: item.price.value
            }
            this.carts.push(cartItem)
            this.notify.success(item.name + " adicionado com successo!")
        },
        openConfirmOrder() {
            this.confirm.require({
                message: "Confirmar para o envio do pedido.",
                group: 'confirm_order'
            })
        },
        onChangeTransertItem(itemId: number){
            const key = itemId.toString()
            if (!this.transfertPayload.items.includes(itemId)){
                //const toRemoveIndex = this.transfertPayload.itemsQuantities[key]
                delete this.transfertPayload.itemsQuantities[key]
                return
            }
            const index = this.transfertPayload.items.indexOf(itemId)
            if (index < 0) return
            this.transfertPayload.itemsQuantities[key] = {menu_item_id: itemId, quantity: '1'}
        },
        async transfertOrder(){
            try{
                const paylod = {
                    id: this.activeOrder.id,
                    items: Object.values(this.transfertPayload.itemsQuantities),
                    table_id: this.transfertPayload.table.id,
                    customer_name: this.transfertPayload.customer_name,
                    transfert_reason: this.transfertPayload.transfert_reason
                }
                const response = await orderService.transferOrder(paylod)
                this.transfertSuccessMessage = response.message
            }catch(err){
                handleError(err, this.notify)
            }
        },
        async sendOrder(){
           try{
            this.order.items = Cart.toPayload()
            if (!this.order.id){
                const response = await orderService.create(this.order)
                this.notify.success(response.message)
                this.confirm.close()
                this.clearCart()
            }else{
                const updatePayload = this.order
                const items = Cart.toPayload(this.carts)
                updatePayload.items = Cart.toPayload(this.carts)
                const payloadItems = [] as any[]
                const activeOrdemItems = this.activeOrder.items
                items.map((item: any, index: number) => {
                   const activeItem = activeOrdemItems.find((i: any) => i.menu_item.id == item.menu_item_id)
                   if (activeItem){
                    item.id = activeItem.id
                    item.quantity = item.quantity - activeItem.quantity
                    if (item.quantity > 0){
                        payloadItems.push(item)
                    }
                   }else{
                    item.quantity = item.quantity
                    payloadItems.push(item)
                   }
                })
                if (!payloadItems.length){
                    return this.notify.error("Adicione ao menos um item para atualizar o pedido.")
                }
                updatePayload.items = payloadItems
                const response = await orderService.update(updatePayload)
                this.notify.success(response.message)
                this.confirm.close()
                this.clearCart()
            }
           }catch(error){
            handleError(error, this.notify)
           }
        },
        openSideBar() {
            const menuSidebar = this.$refs.menuSidebar as {visibleMenuSidebar: boolean}
            menuSidebar.visibleMenuSidebar = true
        },
        decrementCartItemQuantity(index: number) {
            if (this.carts[index]){
                const item = this.carts[index]
                if (this.order.id && item.order_item_id){
                    if (this.carts[index].quantity > 1){
                        this.carts[index].quantity -= 1
                        this.carts[index].subtotal = Number(this.carts[index].item.price) * this.carts[index].quantity
                    }
                    return
                }
                const cart = Cart.create(this.carts[index])
                if(cart.canDecrement()){
                    cart.decrement(index)
                    this.carts[index] = cart.getCart()
                    this.$emit('load-cart')
                }
            }
        },
        incrementCartItemQuantity(index: number){
            if (this.carts[index]){
                const item = this.carts[index]
                if (this.order.id && item.order_item_id){
                    this.carts[index].quantity += 1
                    this.carts[index].subtotal = Number(this.carts[index].item.price) * this.carts[index].quantity
                    return
                }
                const cart = Cart.create(this.carts[index])
                cart.increment(index)
                this.carts[index] = cart.getCart()
                this.$emit('load-cart')
                
            }
        },
        openCartSidebar(){
            const carts = Cart.load()
            if (carts){
                this.carts = carts
            }
            this.visibleCartSidebar = true
            this.$emit('load-cart')
        },
        clearCart() {
            Cart.clear()
            this.carts = []
            this.$emit('cart-cleared')
            
        },
        async openSwicthRestaurantMenu(event: any) {
            (this.$refs.swicthRestaurant as any).toggle(event)
            if(!this.swicthedRestaurant.length){
                const { data } = await restaurantService.getAll<Restaurant>({})
                this.swicthedRestaurant = data
            }
        },
        async switchRestaurant(restaurantId: number){
            (this.$refs.swicthRestaurant as any).hide()
            if(this.restaurant?.id == restaurantId) return
            const { data } = await userService.switchRestaurant(restaurantId)
            this.authStore.storeSwicthedRestaurant(data)
            window.location.href = "/"
        }
    },
    async mounted() {
        const carts = Cart.load()
        await this.tableStore.loadAvailables()
        await this.menuItemStore.loadItems()
        if (carts){
            this.carts = carts
        }
        this.menuItems = this.menuItemStore.items
        this.tables = this.tableStore.availabes
        const tableId = this.$route.params.tableId
        if (tableId){
            this.order.table_id = Number(tableId)
            this.visibleCartSidebar = true
        }
        setInterval(() => {
            this.time = new Date().toLocaleTimeString()
        }, 1000)
    },
})