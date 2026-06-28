<template>
    <div>
        <Divider align="left">
            <small class="c-gray-primary s-sm title3">informçoes</small>
        </Divider>
        <div class="col-md-12">
                <ul class="w-100 list-group">
                    <li class="list-group-item py-1 border-0 p-0 d-flex justify-content-between">
                        <span class="title3">Cliente</span>
                        <span class="title-md">{{ order.customer_name }}</span>
                    </li>
                    <li class="list-group-item py-1 border-0 p-0 d-flex justify-content-between">
                        <span class="title3">Garçom</span>
                        <span class="title-md">{{ order.waiter.name }}</span>
                    </li>
                    <li class="list-group-item py-1 border-0 p-0 d-flex justify-content-between">
                        <span class="title3">Mesa</span>
                        <span class="title-md sm-xs">{{ order.table.number }}</span>
                    </li>
                    <li class="list-group-item border-0 py-1 p-0 d-flex justify-content-between">
                            <span class="title3">Aberta há</span>
                            <span class="title-md sm-xs">{{ order.since }}</span>
                    </li>
                    <li class="list-group-item border-0 py-1 p-0 d-flex justify-content-between">
                        <span class="title3">Status</span>
                        <span :class="order.status.severity" class="title-md cfw-sm px-2 text-capitalize">{{ order.status.label }}</span>
                    </li>
                    <li class="list-group-item border-0 py-1 p-0 d-flex justify-content-between">
                        <span class="title3">Pagamento</span>
                        <span v-if="!order.payment_status.is_paid" class="text-capitalize s-sm b-bg-surface3 px-1 cfw-sm rounded-2 border">{{ order.payment_status.label }}</span>
                        <span v-else :class="order.payment_method.severity">{{ order.payment_method.label }}</span>
                    </li>
                </ul>
        </div>

        <Divider align="left">
            <small class="c-gray-primary s-sm title3">Itens do pedido</small>
        </Divider>
        <div class="col-md-12">
            <ul class="list-group gap-3">
                    <li 
                        v-for="item in order.items"
                        class="list-group-item d-flex justify-content-between border-top b-bg-surface2 rounded-3"
                    >
                        <div class="d-flex gap-2 align-items-center">
                            <img class="order-item-image" :src="item.menu_item.image" alt="menu item image" srcset="">
                            <div class="d-flex flex-column">
                                <span class="ellipssed-text w-100 title-md">{{ item.menu_item.name }}</span>
                                <span class="title3">{{ item.quantity }}x R$ {{ item.unit_price}}</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="title-md">R$ {{ (item.quantity * item.unit_price).toFixed(2) }}</span>
                            <div class="d-flex justify-content-center">
                                <Button 
                                    v-if="!readOnly && !order.status.is_cancelled && !order.status.is_closed"
                                    class="p-0"
                                    @click="setCancelItem(item)"
                                   
                                >
                                    <template #svg>
                                        <div 
                                            class="rac del"
                                        >
                                            <svg style="pointer-events: none" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M5 3V2h2v1M4 3v7h4V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </template>
                                </Button>
                            </div>
                        </div>
                    </li>
            </ul>
        </div>

        <Divider v-if="order.cancelItems?.length" align="left">
               <span class="d-flex align-items-center gap-2">
                    <small class="c-gray-primary s-sm title3">Itens cancelados</small>
                    <span @click="cancelItemsAreVisible = !cancelItemsAreVisible" :title="isCancelItemsAreVisbile ? 'Ocultar' : 'Visualizar'"><i :class="`pi ${ isCancelItemsAreVisbile ? 'pi-eye-slash' : 'pi-eye'} cursor-p`"></i></span>
               </span>
        </Divider>
        <div v-if="isCancelItemsAreVisbile" class="col-md-12">
                <ul class="list-group gap-3">
                    <li 
                        v-for="item in order.cancelItems"
                        class="list-group-item d-flex justify-content-between bg-danger-alert border-danger-1 rounded-3"
                       
                    >
                        <div class="d-flex gap-2 align-items-center">
                            <img class="order-item-image" :src="item.menu_item.image" alt="menu item image" srcset="">
                            <div class="d-flex flex-column">
                                <span class="ellipssed-text w-100 c-danger-primary title-md">{{ item.menu_item.name }}</span>
                                <span class="title3">{{ item.quantity }}x R$ {{ item.unit_price}} . <small class="c-danger-primary">{{ item.reason }}</small></span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="title-md c-danger-primary line-through">R$ - {{ (item.quantity * item.unit_price).toFixed(2) }}</span>
                        </div>
                    </li>
                </ul>
        </div>

        <Divider align="left">
                <small class="c-gray-primary s-sm title3">resumo</small>
        </Divider>
        <div class="card b-bg-surface2 mb-3">
            <div class="card-body py-2">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                                <span class="title3">Subtotal</span>
                                <span class="title-md-fw1">R$ {{ getOrderTotal }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0">
                                <span class="title3">Taxa de Serviço</span>
                                <span class="title-md-fw1">7.00%</span>
                            </li>
                        </ul>
            </div>
                    <div class="card-footer bg-transparent">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                                <span class="title-md">Total</span>
                                <span class="title1">R$ {{ getOrderTotal }}</span>
                            </li>
                        </ul>
                    </div>
            </div>
    </div>
   

    <ConfirmTemplate 
        @acceptCallback="updateOrderPaymentMethod"
        group="confirm_payment"
    />
    <Dialog modal v-model:visible="visibleCancelItemModal" :style="{width: '28rem'}" :closable="false">
        <template #header>
            <div class="w-100 d-flex justify-content-between align-items-center border-bottom-1 p-2">
                <span class="d-flex align-items-center gap-2">
                    <span>
                        <Button
                            icon="pi pi pi-cart-arrow-down"
                            class="btn-danger-alert p-1 border-danger-primary rounded-2"
                        />
                    </span>
                    <span style="line-height: 16px;" class="d-flex cfw-sm flex-column">
                        {{ cancelItemTitle }}
                        <small class="title3">Pedido #{{ order.id }} - Mesa {{ order.table?.number}}</small>
                    </span>
                </span>
                <div class="px-2">
                    <Button 
                        @click="visibleCancelItemModal = false" 
                        class="btn-circle-close" 
                        icon="pi pi-times s-sm"
                    />
                </div>
            </div>
        </template>
        <div class="col-md-12 mt-3 border-bottom py-2">
            <div v-if="!isCancelingItem" class="col-md-12 px-1 border-amber-left-2 mb-2 bg-amber-alert mt-2 p-1 d-flex flex-column w-100">
                <span class="s-md d-flex align-items-center gap-1 fw-500">
                    <i class="pi pi-info-circle s-md px-1"></i>
                    <span class="fw-bold">Você está prestes a cancelar este pedido #{{ order.id }}</span>
                </span>
                <div class="col-md-12 px-1 p-1 d-flex align-items-center gap-1 w-100">
                    <span class="s-md">
                        <b>{{ cancelItemForm.quantity }} iten(s)</b> · Total de $R <b>{{ getCancelledItemAmount }}</b> serão cancelados. 
                            Esta ação não poderá ser revertida.
                    </span>
                </div>
            </div>
            <ul v-if="isCancelingItem" class="list-group gap-3">
                <li 
                    class="list-group-item d-flex justify-content-between border-top b-bg-surface2 rounded-3"
                >
                    <div class="d-flex gap-2 align-items-center">
                        <img class="order-item-image" :src="cancelItem.menu_item.image" alt="menu item image" srcset="">
                    <div class="d-flex flex-column">
                        <span class="ellipssed-text w-100 title-md">{{ cancelItem.menu_item.name }}</span>
                        <span class="title3">{{ cancelItem.quantity }}x R$ {{ cancelItem.unit_price}}</span>
                    </div>
                </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="title-md">R$ {{ (cancelItem.quantity * cancelItem.unit_price).toFixed(2) }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="form mt-2">
            <div v-if="isCancelingItem" class="d-flex gap-3 mb-2">
                <Button
                    icon="pi pi-minus s-sm"
                    class="btn-white-primary b-bg-surface2 amber-el-hov"
                    @click="decrementCancellItemQuantity"
                />
                <Input 
                    style="width: 45px !important;"
                    class="bg-white"
                    v-model="cancelItemForm.quantity"
                />
                <Button
                    icon="pi pi-plus s-sm"
                    class="btn-white-primary b-bg-surface2 amber-el-hov"
                    @click="incrementCancellItemQuantity"
                />
                <span class="title-md-fw1 d-flex align-items-center">de {{ cancelItem.quantity }} unidade(s)</span>
            </div>
            <div class="mb-2">
                <Select 
                    :options="cancelItemReasonOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Selecione o motivo"
                    v-model="cancelItemForm.reason"
                >
                    <template #label>
                        Motivo do cancelamento <span class="text-danger">*</span>
                    </template>
                </Select>
            </div>
            <div class="">
                <Textarea 
                    placeholder="Detalhe o motivo se necessário..."
                    v-model="cancelItemForm.observation"
                >
                    <template #label>
                        Observação <span v-if="cancelReasonIsOther" class="text-danger">*</span>
                    </template>
                </Textarea>
                <div v-if="cancelReasonIsOther" class="col-md-12 px-1 border-amber-left-2 mb-2 bg-amber-alert mt-2 p-1 d-flex align-items-center gap-1 w-100">
                    <i class="pi pi-info-circle s-md"></i>
                    <span class="s-md">O valor do campo observaçao é obrigatório quando o motivo do cancelamento for <b>OUTROS</b>.</span>
                </div>
            </div>
            <div class="mb-4">
                <CardMultipleOptions
                    :options="returnedToSockOption"
                    height="60px"
                    scrollHeight="auto"
                    v-model="cancelItemForm.is_returned"
                />
            </div>
            <div class="card b-bg-surface2">
                <div class="card-header p-0 bg-transparent p-1 border-0">
                    <h6 class="c-t2 s-smd text-uppercase px-2">resumo do cancelamento</h6>
                </div>
                <div class="card-body py-0">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                            <span class="title3">Itens cancelados</span>
                            <span class="s-md">{{ cancelItemForm.quantity }} un.</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0">
                            <span class="title3">Valor estornados</span>
                            <span class="s-md c-danger-primary fw-bold">- R$ {{ getCancelledItemAmount }}</span>
                        </li>
                        <li class="list-group-item d-flex mb-2 justify-content-between bg-transparent border-0 p-0">
                            <span class="title3">Retorno ao estoque</span>
                            <span :class="cancelItemForm.is_returned[0] ? 'c-green-primary' : 'c-amber'" class="s-md fw-bold">{{ cancelItemForm.is_returned[0] ? 'Sim' : 'Nao' }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <CardMultipleOptions
                    :options="confirmCancellationOption"
                    height="60px"
                    scrollHeight="auto"
                    v-model="cancelItemForm.confirm_cancelation"
                />
            </div>
            <div class="mt-3 border-top">
                <div class="mt-2 d-flex gap-2 btn-button">
                    <Button
                        class="btn-white-primary b-bg-surface2 amber-el-hov"
                        label="Cancelar"
                        @click="visibleCancelItemModal = false"
                    />
                    <Button
                        class="btn-danger-alert"
                        label="Confirmar cancelamento"
                        :isDisable="!cancellHasBeenConfirmed"
                        @click="handleCancel"
                    >
                        <template #svg>
                            <div 
                                class="rac rac-danger"
                            >
                                <svg style="pointer-events: none" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M5 3V2h2v1M4 3v7h4V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>