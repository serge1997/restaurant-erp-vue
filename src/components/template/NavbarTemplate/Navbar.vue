<template>
    <div class="w-100 d-flex justify-content-between p-2 bg-white position-fixed" style="top: 0; left: 0; z-index: 999;">
        <div class="d-flex align-items-center gap-1">
            <Button @click="openSideBar" class="btn-green-primary py-2" icon="pi pi-bars s-sm" />
            <div>
                <img class="cursor-p" @click="openSideBar" style="height: 28px;" :src="restaurant.logo" alt="" srcset="">
                <span class="title2 fw-bold cursor-p"> {{ restaurant.id.toString().padStart(3, '0') }} - {{ restaurant.name }}</span>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2">
            <div>
                <span class="title3 ff-fantasy">{{ time }}</span>
            </div>
            <div>
                <span class="user-av b-bg-surface3">
                    {{ auth.inicial }}
                </span>
            </div>
            <Button
                icon="pi pi pi-cart-arrow-down"
                class="btn-cart-btn p-1 border-green-primary rounded-2"
                @click="openCartSidebar"
            >
                <template #badge>
                    <span class="s-sm">{{ carts.length }}</span>
                </template>
            </Button>
        </div>
    </div>
    <SidebarTemplate 
        ref="menuSidebar"
        :auth="auth"
    >
    </SidebarTemplate>
    <Sidebar v-model:visible="visibleCartSidebar" position="right" class="cart-sidebar" :style="{width: '27em'}">
        <template #header>
            <div class="w-100 d-flex justify-content-between align-items-center border-bottom-1 py-1">
                <span class="d-flex align-items-center gap-2">
                    <span>
                        <Button
                            icon="pi pi pi-cart-arrow-down"
                            class="btn-cart-btn p-1 border-green-primary rounded-2"
                        />
                    </span>
                    <span style="line-height: 16px;" class="title1 d-flex flex-column">
                        {{ getCartTiltle }}
                        <small class="title3">{{ getActiveOrderCustomerName }} - {{ activeOrder.since }}</small>
                    </span>
                </span>
                <span>
                    <Badge 
                        :value="carts.length"
                    />
                </span>
            </div>
        </template>
        <div v-if="!order.id">
            <div class="d-flex align-items-center gap-3 mb-2">
                <div class="icon">
                    <Button
                        icon="pi pi-clipboard"
                        class="b-bg-surface3 p-1 border-t3 rounded-2"
                    />
                </div>
                <div class="d-flex flex-column w-50">
                    <span class="title2">Mesa</span>
                    <Select
                        class="w-100"
                        :options="tables"
                        optionLabel="label"
                        v-model="order.table_id"
                    />
                </div>
            </div>
            <div class="d-flex align-items-center gap-3 py-1">
                <div class="icon">
                    <Button
                        icon="pi pi-user"
                        class="b-bg-surface3 p-1 border-t3 rounded-2"
                    />
                </div>
                <div class="d-flex flex-column">
                    <span class="title2">Garçom</span>
                    <Input 
                        :isDisable="true"
                        v-model="getWaiterName"
                    />
                </div>
            </div>
            <div class="d-flex align-items-center gap-3 border-bottom-1 py-1">
                <div class="icon">
                    <Button
                        icon="pi pi-user"
                        class="b-bg-surface3 p-1 border-t3 rounded-2"
                    />
                </div>
                <div class="d-flex flex-column">
                    <span class="title2">Nome do cliente</span>
                    <Input 
                        v-model="order.customer_name"
                    />
                </div>
            </div>

            <div class="row d-flex flex-column mt-2">
                <div 
                    v-for="(cart, index) of carts"
                    class="d-flex justify-content-between cart-item-card align-items-center mb-3 border py-2 px-2" 
                >
                <div class="d-flex gap-2">
                        <div class="image d-flex align-items-center">
                            <img :src="cart.item.image" alt="" srcset="">
                        </div>
                        <div class="d-flex flex-column">
                            <span class="ellipssed-text w-90">{{ cart.item.name }}</span>
                            <span class="title3">R$ {{ cart.subtotal.toFixed(2) }}</span>
                        </div>
                </div>
                    <div class="d-flex gap-3">
                        <Button
                            icon="pi pi-minus s-sm"
                            class="btn-white-primary amber-el-hov"
                            @click="decrementCartItemQuantity(index)"
                        />
                        <span>{{ cart.quantity }}</span>
                        <Button
                            icon="pi pi-plus s-sm"
                            class="btn-white-primary amber-el-hov"
                            @click="incrementCartItemQuantity(index)"
                        />
                    </div>
                </div>
            </div>
        </div>
        <TabView v-model:active-index="orderPanelIndex" v-if="order.id && activeOrder?.id">
            <TabPanel header="Pedido">
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
                            <span class="title3">Mesa</span>
                            <span class="title-md sm-xs">{{ activeOrder.table.number }}</span>
                        </li>
                        <li class="list-group-item border-0 py-1 p-0 d-flex justify-content-between">
                            <span class="title3">Aberta há</span>
                            <span class="title-md sm-xs">{{ activeOrder.since }}</span>
                        </li>
                        <li class="list-group-item border-0 py-1 p-0 d-flex justify-content-between">
                            <span class="title3">Status</span>
                            <span :class="activeOrder.status.severity" class="title-md cfw-sm px-2 text-capitalize">{{ activeOrder.status.label }}</span>
                        </li>
                    </ul>
                </div>
                <Divider align="left">
                    <small class="c-gray-primary s-sm title3">itens do pedido</small>
                </Divider>
                <div class="col-md-12">
                    <ul class="list-group gap-3">
                        <li 
                            v-for="cart in carts"
                            class="list-group-item d-flex justify-content-between border-top b-bg-surface2 rounded-3"
                        >
                            <div class="d-flex gap-2 align-items-center">
                                <img class="order-item-image" :src="cart.item.image" alt="menu item image" srcset="">
                                <div class="d-flex flex-column">
                                    <span class="ellipssed-text w-100 title-md">{{ cart.item.name }}</span>
                                    <span class="title3">{{ cart.quantity }}x {{ !cart.item.price?.label ? 'R$' : '' }} {{ cart.item.price?.label || cart.item.price  }}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="title-md">R$ {{ cart.subtotal.toFixed(2) }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <Divider align="left">
                    <small class="c-gray-primary s-sm title3">resumo</small>
                </Divider>
                <div class="card b-bg-surface2">
                    <div class="card-body py-2">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                                <span class="title3">Subtotal</span>
                                <span class="title-md-fw1">R$ {{ getCartTotal }}</span>
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
                                <span class="title1">R$ {{ getCartTotal }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Adicionar item">
                <Divider class="order-divider" align="left">
                    <small class="c-gray-primary s-sm title3">Cardápio</small>
                </Divider>

                <div class="psec">
                    <div class="dish-grid">
                        <div 
                            class="dcard" 
                            v-for="item in menuItems"
                        >
                            <img class="dcard-img" :src="item.image" :alt="item.name">
                            <div class="dcard-body">
                                <div class="dcard-name">{{ item.name }}</div>
                                <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;">
                                    <div class="dcard-price">R$ {{ item.price.label }}</div>
                                    <button 
                                        style="width:20px;height:20px;border-radius:4px;background:var(--ac);color:#fff;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;"
                                        @click="addToOrder(item)"
                                    >
                                        <svg viewBox="0 0 10 10" fill="none" style="width:9px;height:9px"><path d="M5 1v8M1 5h8" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Transferir">
                <SuccessTemplate
                    v-if="transfertPayload.table?.id && transfertSuccessMessage"
                    :message="transfertSuccessMessage" 
                >
                    <template #sup-content>
                        <div class="title3 p-2 text-center">
                            Os itens foram transferidos para a Mesa <span class="fw-bold">{{ transfertPayload.table.number }}</span> com sucesso.
                            Um novo pedido foi criado automaticamente.
                        </div>
                    </template>
                </SuccessTemplate>
                <Stepper v-else linear v-model:active-step="transfertStepIndex">
                    <StepperPanel>
                        <template #header>
                            <div class="step d-flex align-items-center gap-1">
                                <div class="step-circle" :class="`${isActiveTransfertStepperPanelClass(0)} ${transfertStepSelectItemDoneClass}`">1✓</div>
                                <span class="title3">Selecionar itens</span>
                            </div>
                        </template>
                        <template #content="{ nextCallback }">
                            <div class="">
                                <CardMultipleOptions 
                                    :options="transfertItemOptions"
                                    scrollHeight="400px"
                                    v-model="transfertPayload.items"
                                    class="d-none"
                                />
                                <div 
                                    class="d-flex justify-content-between options-item-list mb-3 py-2 px-2" 
                                    v-for="(option, index) of transfertItemOptions"
                                >
                                    <div class="d-flex align-items-center">
                                        <Checkbox
                                            v-model="transfertPayload.items"
                                            :value="option.id"
                                            @change="onChangeTransertItem(option.id)"
                                        />
                                        <div class="d-flex flex-column px-2">
                                            <label class="options-item-list-name">{{ option.name }}</label>
                                            <small class="px-1 options-item-list-desc">{{ option.description }}</small>
                                        </div>
                                    </div>
                                    <div v-if="transfertPayload.items.includes(option.id) && transfertPayload.itemsQuantities[index]" class="w-15">
                                        <InputOtp 
                                            length="1"
                                            v-model="transfertPayload.itemsQuantities[index].quantity"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 d-flex justify-content-end gap-2 btn-button">
                                <Button 
                                    label="Escolher mesa"
                                    class="btn-green-primary d-flex justify-content-center px-3 w-75"
                                    icon="pi pi-arrow-right s-sm"
                                    @click="nextCallback"
                                    :isDisable="transfertNextStepBtns.disableNextOnItem"
                                />
                            </div>
                        </template>
                    </StepperPanel>
                    <StepperPanel>
                        <template #header>
                            <div class="step d-flex align-items-center gap-1">
                                <div class="step-circle" :class="`${isActiveTransfertStepperPanelClass(1)} ${transfertStepSelectTableDoneClass}`">2✓</div>
                                <span class="title3">Escolher mesa</span>
                            </div>
                        </template>
                        <template #content="{ prevCallback ,nextCallback }">
                            <div class="m-0" style="margin-top: -20px !important;">
                                <p class="title3">
                                    Escolha uma mesa livre para transferir o pedido. Um novo pedido será criado automaticamente.
                                </p>
                                <div class="table-select-grid mb-2">
                                    <div
                                        v-for="table in tables"
                                        class="ts-btn" 
                                        :title="`${table.active_order ? 'Ocupada':'Livre'}`"
                                        :class="`${table.active_order ? 'occ-t' : 'free-t'} ${transfertPayload.table.id == table.id ? 'tp-selected' : ''}`"
                                        @click="setTransfertTable(table)"
                                    >
                                        <span 
                                            :class="`${transfertPayload.table.id == table.id ? 'tn-white' : 'tn'}`"
                                        >
                                            {{ table.number }}
                                        </span>
                                        <span :class="`${transfertPayload.table.id == table.id ? 'ts-white' : 'ts'}`">{{table.active_order ? 'Ocupada' : 'Livre'}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 d-flex justify-content-between gap-2 btn-button">
                                <Button 
                                    label="Voltar"
                                    class="btn-white-primary d-flex justify-content-center px-3"
                                    iconPosition="left"
                                    icon="pi pi-arrow-left s-sm"
                                    @click="prevCallback"
                                />
                                <Button 
                                    label="Confirmar seleçao"
                                    class="btn-green-primary d-flex justify-content-center px-3 w-75"
                                    icon="pi pi-arrow-right s-sm"
                                    @click="nextCallback"
                                    :isDisable="transfertNextStepBtns.disableOnTable"
                                />
                            </div>
                        </template>
                    </StepperPanel>
                    <StepperPanel>
                        <template #header>
                            <div class="step d-flex align-items-center gap-1">
                                <div class="step-circle" :class="isActiveTransfertStepperPanelClass(2)">3✓</div>
                                <span class="title3">Confirmar</span>
                            </div>
                        </template>
                        <template #content="{ prevCallback, nextCallback }">
                            <div style="margin-top: -35px !important;">
                                <Divider align="left">
                                    <small class="c-gray-primary s-sm title3">Revise a transferencia</small>
                                </Divider>
                                <div class="d-flex flex-column">
                                    <div class="card confirm-transfert-card bg-green-alert rounded-3 border-green-light mb-3">
                                        <div class="card-body d-flex flex-column">
                                            <div class="d-flex justify-content-center gap-4">
                                                <div class="d-flex flex-column">
                                                    <span class="title1-xl text-center">{{ activeOrder.table.number }}</span>
                                                    <span class="title3">Origem</span>
                                                </div>
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <i class="pi pi-arrow-right fw-bold fs-3 c-dark-green"></i>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <span class="title1-xl text-center">{{ transfertPayload.table.number }}</span>
                                                    <span class="title3">Destino</span>
                                                </div>
                                            </div>
                                            <div>
                                                <ul v-if="transfertItems.length" class="list-group mb-2">
                                                    <li 
                                                        class="list-group-item d-flex py-1 justify-content-between rounded-3 border-green-light mb-1"
                                                        v-for="item in transfertItems"
                                                    >
                                                        <div class="d-flex align-items-center">
                                                            <img class="t-selected-img" :src="item.image" alt="" srcset="">
                                                            <span class="s-md">{{ item.name }}</span>
                                                        </div>
                                                        <div class="d-flex align-items-center">
                                                            <span class="title1">{{ item.quantity }}x</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="border-green-light"></div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="c-dark-green s-sm fw-bold">Total transferido</span>
                                                <span class="c-dark-green fw-bold title1">R$ 504</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="border mb-3"></div>
                                    <div class="d-flex flex-column mb-3">
                                        <div class="col-md-12 mb-2">
                                            <Input
                                                label="Nome do cliente"
                                                v-model="transfertPayload.customer_name"
                                            />
                                        </div>
                                        <div class="col-md-12">
                                            <Textarea 
                                                label="Razao de transferencia"
                                                v-model="transfertPayload.transfert_reason"
                                            />
                                        </div>
                                    </div>
                                    <div class="bg-green-alert p-2 rounded-3 c-dark-green s-sm">
                                        <i class="pi pi-info-circle s-sm px-1"></i>
                                        Um novo pedido será criado automaticamente na Mesa <span class="fw-bold">{{ transfertPayload.table.number }}</span>
                                        com os itens selecionados. 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 d-flex justify-content-between gap-2 btn-button">
                                <Button 
                                    label="Voltar"
                                    class="btn-white-primary d-flex justify-content-center px-3"
                                    icon="pi pi-arrow-left s-sm"
                                    @click="prevCallback"
                                />
                                <Button
                                    label="Confirmar transferencia"
                                    class="btn-green-primary d-flex justify-content-center px-3 w-75"
                                    icon="pi pi-check s-sm"
                                    @click="transfertOrder"
                                />
                            </div>
                        </template>
                    </StepperPanel>
                </Stepper>
            </TabPanel>
        </TabView>
        <div v-if="!carts.length" class="h-100 d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column">
                <span class="d-flex justify-content-center">
                    <Button 
                    icon="pi pi-cart-minus"
                    class="border rounded-2 py-3 px-4 b-bg-surface2 text2"
                    />
                </span>
                <small class="title3">Selecione os itens do cardápio</small>
            </div>
        </div>
        <div v-if="!order.id" class="border-top row px-0 py-2">
            <div class="col-md-12">
                <Textarea
                    label="Observaçao do pedido"
                    placeholder="Digite a abservaçao"
                    v-model="order.observation"
                />
            </div>
            <div class="col-md-12 py-2">
                <div class="b-bg-surface2 px-2 py-2 rounded-2 border title3-md">
                    Total: <span class="title1 px-1">R$ {{ getCartTotal }}</span>
                </div>
            </div>
            <div class="col-md-12">
                <Button 
                    label="Enviar pedido"
                    class="btn-green-primary w-100 d-flex justify-content-center mb-2"
                    @click="openConfirmOrder"
                />
                <Button 
                    label="Limpar o carrinho"
                    class="btn-white-primary w-100 d-flex justify-content-center"
                    @click="clearCart"
                />
            </div>
        </div>
        <div v-if="order.id && !orderTabIsTransfertIndex">
            <div class="col-md-12 d-flex gap-2">
                <Button 
                    label="Pedir conta"
                    class="btn-danger-alert d-flex justify-content-center"
                    icon="pi pi-trash s-sm"
                />
                <Button 
                    label="Adicionar item"
                    class="btn-green-primary d-flex justify-content-center w-50"
                    icon="pi pi-plus s-sm"
                    @click="sendOrder"
                />
            </div>
        </div>
    </Sidebar>
    <ConfirmTemplate
        @acceptCallback="sendOrder"
        group="confirm_order"
    />
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>