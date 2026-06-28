<template>
    <PageTemplate
        title="Histórico de pedidos"
        :hasNewButton="false"
    >
        <Search 
            :filters="filters"
            @clearFilter="clearFilter"
            @on-filter="onSearch"
        />
        <DataTableTemplate
            :data="data"
            :service="service"
            :paginate="paginate"
            @processDataEdit="populateOrder"
            waiterColWidth="15%"
            tableColWidth="8%"
            totalColWidth="10%"
            statusColWidth="8%"
            tagColWidth="8%"
            actionColWidth="5%"
            idColWidth="5%"
            customerColWidth="34%"
            @on-search="onSearch"
            searchInputPlaceholder="Pesquisar por nome do cliente, do garçom..."
        >
            <template #id-header>
                <span class="th">pedido</span>
            </template>
            <template #id-content="{ data }">
                <div class="d-flex align-items-center justify-content-center">
                    <span class="title3">#{{ data.id }}</span>
                </div>
            </template>
            <template #date-header>
                <span class="th">Data</span>
            </template>
            <template #date-content="{ data }">
                <div class="d-flex align-items-center justify-content-center">
                    <span class="s-md fw-bold">{{ data.business_day.formatted }}</span>
                </div>
            </template>
            <template #customer-header>
                <span class="th">cliente</span>
            </template>
            <template #customer-content="{ data }">
                <div class="d-flex flex-column">
                    <span class="px-3 fw-bold">{{ data.customer_name || '-' }}</span>
                    <span class="title3 px-3">{{ data.since }}</span>
                </div>
            </template>
            <template #waiter-header>
                <span class="th">Garçom</span>
            </template>
            <template #waiter-content="{ data }">
                <div class="d-flex align-items-center gap-1">
                    <span class="user-av b-bg-surface3">
                        {{ data.waiter.inicial }}
                    </span>
                    <span class="title-md-fw1">{{ data.waiter.name }}</span>
                </div>
            </template>
            <template #table-header>
                <span class="th">Mesa</span>
            </template>
            <template #table-content="{ data }">
                <div class="d-flex align-items-center gap-1">
                    <span class="table-ico title-md-fw1">
                        {{ data.table.number }}
                    </span>
                    <span class="title-md-fw1">Mesa</span>
                </div>
            </template>
            <template #total-header>
                <span class="th">Total</span>
            </template>
            <template #total-content="{ data }">
                <div class="d-flex align-items-center gap-1">
                    <span class="title1">
                        R$ {{ data.total.toFixed(2) }}
                    </span>
                </div>
            </template>
            <template #status-header>
                <span class="th">status</span>
            </template>
            <template #status-content="{ status }">
                <div class="d-flex align-items-center justify-content-center gap-1">
                    <span class="px-1 rounded-3 s-sm d-flex align-items-center gap-1 text-capitalize" :class="status.status.severity">
                        <i class="pi pi-circle-fill s-xxs"></i>
                        {{ status.status.label }}
                    </span>
                </div>
            </template>
            <template #tag-header>
                <span class="th">Pagamento</span>
            </template>
            <template #tag-content="{ flag }">
                <span v-if="flag.payment_status.is_paid" :class="flag.payment_method.severity">
                    {{ flag.payment_method.label }}
                </span>
                <div v-else class="d-flex justify-content-start align-items-center">
                    <span class="text-capitalize s-sm b-bg-surface3 px-1 cfw-sm rounded-2 border">
                        {{ flag.payment_status.label }}
                    </span>
                </div>
            </template>
            <template #action-header>
                <span class="th">Açao</span>
            </template>
            <template #action-content="{ action }">
                <div class="d-flex justify-content-center">
                    <Button 
                        icon="pi pi-ellipsis-v s-sm"
                        class="b-bg-surface3 surface3-h px-1 py-1 rounded-3 border"
                        @click="showOrder(action)"
                    />
                </div>
            </template>
        </DataTableTemplate>

        <Form 
            :order="order"
        />
    </PageTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>