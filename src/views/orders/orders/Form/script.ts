import orderService from "@/services/orderService";
import { useFormStore } from "@/stores/formStore";
import { useFormMixin } from "@/stores/useFormMixin";
import { CancelItemReasonEnum, CancelItemReasonOptions, type OrderItemResponse, type OrderResponse } from "@/types/order/Order";
import { defineComponent, reactive } from "vue";
import type { TableProps } from "@/types/table/Table";
import type { MenuItemProps } from "@/types/menuItem/MenuItem";
import { paymentMethodOptions } from "@/types/paymentMethod/PaymentMethod";
import { useNotify } from "@/shared/utility/notify";
import { handleError } from "@/shared/utility/utils";
import ConfirmTemplate from "@/components/template/ConfirmTemplate/ConfirmTemplate.vue";
import { useConfirm } from "primevue/useconfirm";
import Dialog from "primevue/dialog";

export default defineComponent({
    name: 'Form',

    components: {
        ConfirmTemplate,
        Dialog
    },

    setup(props, ctx) {
        const formStore = useFormStore()
        const notify = useNotify()
        const confirm = useConfirm()
        const order = reactive({
            id: 0,
            status: {value: '', label: 0, severity: ''},
            table: {} as TableProps,
            customer_name: '',
            waiter: {
                id: 0,
                name: ''
            },
            since: '',
            observation: '',
            items: [{}] as OrderItemResponse[] ,
            payment_status:{
                value: '',
                label: '',
                is_paid: ''
            },
            payment_method: {
                value: '',
                label: '',
                severity: ''
            },
            cancelItems: [],
            total: 0
        })
        const cancelItemForm = reactive({
            id: null as any,
            item_id: null as any,
            quantity: 1,
            reason: null,
            observation: null,
            is_returned: [],
            confirm_cancelation: [],
            restock: false,
            is_confirmed: false
        })
        const {
            populateForm,
            onClearForm
        } = useFormMixin(orderService, order, ctx.emit)

        return {
            formStore,
            order,
            populateForm,
            notify,
            confirm,
            onClearForm,
            cancelItemForm
        }
    },

    computed: {
        getOrderTotal(){
            return this.order.items.reduce((acc, curr) => acc + curr.quantity * curr.unit_price, 0).toFixed(2)
        },
        getTitle(){
            return `Pedido #${this.order.id}`
        },
        disableCloseOrderBtn(){
            return this.selectedPaymentMethod == null || this.selectedPaymentMethod == 0
        },
        disablePaymentMethodBtn(){
            return this.order.payment_status.is_paid;
        },
        getCancelledItemAmount(){
            return this.isCancelingItem ? (Number(this.cancelItem.unit_price) * this.cancelItemForm.quantity).toFixed(2) : this.order.total
        },
        cancelReasonIsOther() {
            return this.cancelItemForm.reason == CancelItemReasonEnum.OTHER
        },
        isCancelItemsAreVisbile(){
            return this.order.cancelItems && this.cancelItemsAreVisible
        },
        cancelItemTitle(){
            return this.isCancelingItem ? `Cancelar item do pedido` : 'Cancelar pedido'
        },
        cancellHasBeenConfirmed(){
            return this.cancelItemForm.confirm_cancelation.length && this.cancelItemForm.confirm_cancelation[0] == true
        }
    },
    data(){
        return {
            paymentMethods: paymentMethodOptions,
            selectedPaymentMethod: 0,
            visibleCancelItemModal: false,
            cancelItem: {} as OrderItemResponse,
            returnedToSockOption: [
                {id: true, name: "Devolver ao estoque", description: "A quantidade cancelada será reposta no estoque automaticamente."},
            ],
            confirmCancellationOption: [
                {id: true, name: "Atençao", description: "Entendo que esta ação é irreversível e confirmo o cancelamento."},
            ],
            cancelItemReasonOptions: CancelItemReasonOptions,
            cancelItemsAreVisible: true,
            isCancelingItem: false
        }
    },

    methods: {
        setCancelOrder() {
           this.isCancelingItem = false
           this.visibleCancelItemModal = true
           this.cancelItemForm.id = this.order.id
           this.cancelItemForm.item_id = null
           this.cancelItemForm.quantity = this.order.items.reduce((acc, curr) => acc + curr.quantity, 0)
        },
        async handleCancel(){
            this.cancelItemForm.restock = this.cancelItemForm.is_returned.length ? this.cancelItemForm.is_returned[0] || false : false
            this.cancelItemForm.is_confirmed = this.cancelItemForm.confirm_cancelation.length ? this.cancelItemForm.confirm_cancelation[0] || false : false
            if (this.cancellHasBeenConfirmed){
                if (this.isCancelingItem) {
                    await this.cancelOrderItem()
                    return
                }
                await this.cancelOrder()
            }
        },
        async cancelOrder(){
            try{
                const response = await orderService.cancel(this.cancelItemForm)
                this.notify.success(response.message)
                this.clearCancelForm()
                this.visibleCancelItemModal = false;
                this.isCancelingItem = false
            }catch(err: any) {
                handleError(err, this.notify)
            }
        },
        clearCancelForm(){
            this.cancelItemForm = {
                id: 0,
                item_id: null,
                quantity: 1,
                reason: null,
                observation: null,
                is_returned: [],
                restock: false,
                confirm_cancelation: [],
                is_confirmed: false
            }
        },
        async cancelOrderItem() {
            try{
                this.cancelItemForm.id = this.order.id
                this.cancelItemForm.restock = this.cancelItemForm.is_returned.length ? this.cancelItemForm.is_returned[0] || false : false
                const response = await orderService.cancelItem(this.cancelItemForm)
                this.notify.success(response.message)
                this.clearCancelForm()
                this.visibleCancelItemModal = false;
                this.isCancelingItem = false
            }catch(err: any) {
                handleError(err, this.notify)
            }
        },
        setCancelItem(item: OrderItemResponse) {
            this.visibleCancelItemModal = true
            this.isCancelingItem = true
            this.cancelItem = item
            this.cancelItemForm.item_id = this.cancelItem.id
        },
        incrementCancellItemQuantity(){
            if (this.cancelItem.quantity > this.cancelItemForm.quantity) {
                this.cancelItemForm.quantity += 1
            }
        },
        decrementCancellItemQuantity(){
            if (this.cancelItemForm.quantity > 1) {
                this.cancelItemForm.quantity -= 1
            }
        },
        clearOrder(){
            this.selectedPaymentMethod = 0
            this.onClearForm()
        },
        getSelectedPaymentMethodClass(payment_method: number){
            return this.selectedPaymentMethod == payment_method ? 'pm-btn-selected' : ''
        },
        selectPaymentMethod(payment_method: number){
            this.selectedPaymentMethod = payment_method
        },
        confirmOrderPayment(){
            if (!this.selectedPaymentMethod){
                return this.notify.warn("Nenhuma metodo de pagamento selecionado")
            }
            this.confirm.require({
                message: 'Confirmar o pagmento do pedido.',
                group: 'confirm_payment'
            })
        },
       async updateOrderPaymentMethod() {
            try{
                const response = await orderService.updateOrderPayment(this.order.id, this.selectedPaymentMethod)
                this.notify.success(response.message)
                this.formStore.closeForm()
                this.$emit('submitted')
            }catch(err){
                handleError(err, this.notify)
            }finally{
                this.confirm.close()
            }
        },
        openItemOverlayPanel(event: any){
            if (Array.isArray(this.$refs.OverlayPanelorderItem)){
                (this.$refs.OverlayPanelorderItem[0] as any).toggle(event)
            }
        }
    },
    mounted() {
     
    },
})