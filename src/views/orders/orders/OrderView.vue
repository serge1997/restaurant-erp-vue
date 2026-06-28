<template>
    <PageTemplate
        title=""
        newBtnLabel="Nova pedido"
        :hasNewButton="false"
    >
        <div>
            <div class="stats-bar">
                <div class="stat s-all">
                <div class="stat-lbl">Total hoje</div>
                <div class="stat-val" id="st-total">{{ metaData.total_count }}</div>
                <div class="stat-sub">pedidos</div>
            </div>
            <div class="stat s-open">
                <div class="stat-lbl">Em aberto</div>
                <div class="stat-val" id="st-open">{{ metaData.opened_count }}</div>
                <div class="stat-sub">aguardando</div>
            </div>
            <div class="stat s-deliv">
                <div class="stat-lbl">Cancelados</div>
                <div class="stat-val" id="st-deliv">{{ metaData.canceled_count }}</div>
                <div class="stat-sub">a fechar</div>
            </div>
            <div class="stat s-closed">
                <div class="stat-lbl">Fechados</div>
                <div class="stat-val" id="st-closed">{{ metaData.closed_count }}</div>
                <div class="stat-sub">hoje</div>
            </div>
            <div class="stat s-rev">
                <div class="stat-lbl">Faturamento</div>
                <div class="stat-val" id="st-rev">R$<span style="font-size:16px">{{ metaData.business_day_revenue }}</span></div>
                <div class="stat-sub">hoje</div>
            </div>
        </div>
        </div>
        <div class="toolbar">
            <div class="sw">
                <svg class="cursor-p" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                <input class="si" placeholder="Buscar cliente, garçom, mesa..." v-model="serach_query">
                <Button 
                    icon="pi pi-filter filter-icon c-t3 px-1"
                    class="p-0"
                    title="buscar"
                    @click="filterSearch"
                />
            </div>
            <div class="filters" id="filters">
                <div 
                    v-for="status in statusFilterOptions"
                    :class="activeClassStatusFilter(status.value)" 
                    class="ftab" @click="filterStatus(status.value)"
                >
                        {{ status.label }} <span class="fn" id="fn-todos">{{ metaData[status.meta_data_prop] }}</span>
                </div>
            </div>
            <div class="tright2">
                <div class="btn-ic" title="Exportar">
                    <svg viewBox="0 0 14 14" fill="none"><path d="M2 10v2h10v-2M7 2v7M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="btn-ic" title="Atualizar" @click="search">
                    <svg viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 019.5-2M12 7a5 5 0 01-9.5 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M11.5 2v3h-3M2.5 12V9h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="btn-button">
                    <Button 
                        label="Novo"
                        class="btn-green-primary"
                        icon="pi pi-plus s-xs"
                        @click="$router.push('/orders/tables')"
                    />
                </div>
            </div>
        </div>
        <DataTableTemplate
            :data="data"
            :service="service"
            @processDataEdit="populateOrder"
            waiterColWidth="15%"
            tableColWidth="8%"
            totalColWidth="10%"
            statusColWidth="8%"
            tagColWidth="8%"
            actionColWidth="5%"
            idColWidth="5%"
            customerColWidth="34%"
        >
            <template #id-header>
                <span class="th">pedido</span>
            </template>
            <template #id-content="{ data }">
                <div class="d-flex align-items-center justify-content-center">
                    <span class="title3">#{{ data.id }}</span>
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
            ref="form"
            @submitted="search"
        />
    </PageTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>