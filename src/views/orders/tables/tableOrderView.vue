<template>
    <PageTemplate
        title=" "
        :hasNewButton="false"
        mt="mt-0"
    >
        <template #sub-navbar>
            <div class="d-flex align-items-center bg-white gap-3 mt-5 border-top p-2 position-fixed w-100" style="top: -1px; left: 0; z-index: 999;">
                <div @click="filterTableView('all')" class="stab" :class="setTableFilterActiveClass('all')">Todas <span class="sn" id="sn-todas">{{ tablesTotal }}</span></div>
                <div @click="filterTableView('busy')" class="stab" :class="setTableFilterActiveClass('busy')">Ocupadas <span class="sn" id="sn-occ">{{ tablesWithOrdersTotal }}</span></div>
                <div class="d-none">Conta pedida <span class="sn" id="sn-wait">2</span></div>
                <div @click="filterTableView('free')" class="stab" :class="setTableFilterActiveClass('free')">Livres <span class="sn" id="sn-free">{{ availableTablesTotal }}</span></div>
                <div @click="filterTableView('reserved')" class="stab" :class="setTableFilterActiveClass('reserved')">Reservadas <span class="sn" id="sn-res">1</span></div>
            </div>
        </template>
        <div class="stat-cards mt-6">
            <div class="stat-card">
                <span class="stat-card-icon bg-danger-alert"><i class="pi pi-shopping-bag"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ tablesWithOrdersTotal }}</span>
                    <small class="title3"> Mesas ocupadas </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-green-alert-primary"><i class="pi pi-bookmark"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ availableTablesTotal }}</span>
                    <small class="title3"> Mesas livres </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-blue-alert-secondary"><i class="pi pi-lock"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">23</span>
                    <small class="title3"> Mesas Reservadas </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-purple-alert-secondary"><i class="pi pi-wave-pulse"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">R$ {{ tableWithOrderTotalAmount }}</span>
                    <small class="title3"> Em aberto Hoje </small>
                </span>
            </div>
        </div>
        <div class="w-100">
            <div v-if="tablesFilterisAll || tablesFilterisBusy" class="w-100">
                <Divider align="left">
                    <small class="c-gray-primary s-sm title3">Mesas ocupadas</small>
                </Divider>
                <div class="w-100 tables-grid mb-3">
                    <div 
                        v-for="table in tables_with_orders" 
                        class="card overflow-hidden tcard occupied cursor-p"
                        @click="$router.push(`/orders/tables/${table.order_id}`)"
                    >
                        <div :style="`border-top: 4px solid #D97706;`"></div>
                        <div class="card-header border-0 bg-transparent py-1 d-flex justify-content-between align-items-center">
                            <div style="line-height: 17px;" class="d-flex flex-column py-1">
                                <span class="title1 fs-5">{{ table.table_number }}</span>
                                <span>Mesa</span>
                            </div>
                            <div class="sdot occupied">

                            </div>
                        </div>
                        <div class="card-body d-flex flex-column py-1 ">
                            <span class="title2 cfw-sm">{{ table.customer_name }}</span>
                            <span class="title3">{{ table.waiter_name }}</span>
                            <span class="d-flex title3 fw-normal align-items-center gap-1">
                                {{ table.total_items }} itens no pedido
                            </span>
                        </div>
                        <div class="card-footer bg-transparent d-flex justify-content-between align-items-center py-1">
                            <span class="title3 d-flex align-items-center gap-1 c-gray-primary">
                                <i class="pi pi-clock s-sm"></i>{{ table.since }}
                            </span>
                            <span class="title1">R$ {{ table.total_price }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="tablesFilterisAll || tablesFilterisFree" class="w-100">
                <Divider align="left">
                    <small class="c-gray-primary s-sm title3">Mesas livres</small>
                </Divider>
                <div class="w-100 tables-grid mb-3">
                    <div v-for="table in available_tables" class="card overflow-hidden tcard free cursor-p" style="height: 160px;">
                        <div :style="`border-top: 4px solid #059669;`"></div>
                        <div class="card-header border-0 bg-transparent py-1 d-flex justify-content-between align-items-center">
                            <div style="line-height: 17px;" class="d-flex flex-column py-1">
                                <span class="title1 fs-5">{{ table.number }}</span>
                                <span>Mesa</span>
                            </div>
                            <div class="sdot free">
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column py-1 ">
                            <span class="title3">Disponível</span>
                        </div>
                        <div class="card-footer px-2 bg-transparent d-flex justify-content-between align-items-center py-1">
                            <span class="title3 px-2 b-active">Livre</span>
                            <Button 
                                label="Abrir"
                                icon="pi pi-plus s-xs"
                                class="p-0 c-green-primary s-sm"
                                @click="$router.push(`/menu/${table.id}`)"
                            />
                        </div>
                    </div>
                    <div @click="$router.push('/administrative/tables')" class="tcard-new">
                        <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>Nova mesa</span>
                    </div>
                </div>
            </div>
            <div v-if="tablesFilterisAll || tablesFilterisReserved" class="w-100">
                <Divider align="left">
                    <small class="c-gray-primary s-sm title3">Mesas reservadas</small>
                </Divider>
                <div class="w-100 tables-grid mb-3">
                    <div class="card overflow-hidden tcard reserved cursor-p" style="height: 160px;">
                        <div :style="`border-top: 4px solid #2563EB;`"></div>
                        <div class="card-header border-0 bg-transparent py-1 d-flex justify-content-between align-items-center">
                            <div style="line-height: 17px;" class="d-flex flex-column py-1">
                                <span class="title1 fs-5">67</span>
                                <span>Mesa</span>
                            </div>
                            <div class="sdot reserved">
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column py-1 ">
                            <span class="title3">Reserva 19:45</span>
                        </div>
                        <div class="card-footer px-1 bg-transparent d-flex justify-content-between align-items-center py-1">
                            <span class="title3 px-2 b-blue">Reservada</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageTemplate>
</template>

<style scoped src="./style.css"></style>
<script src="./script.ts"></script>