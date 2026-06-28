<template>
    <PageTemplate
        title="Gestao de mesas"
        newBtnLabel="Nova mesa"
    >
        <div class="stat-cards mb-2">
            <div class="stat-card">
                <span class="stat-card-icon bg-green-alert-primary "><i class="pi pi-shopping-bag"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ metaData.total }}</span>
                    <small class="title3"> Total de salas </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-green-alert-secondary"><i class="pi pi-check"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ metaData.count_actives }}</span>
                    <small class="title3"> Salas cadastradas </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-danger-alert"><i class="pi pi-info-circle"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ metaData.count_inactives }}</span>
                    <small class="title3"> Inativas / Manutençao </small>
                </span>
            </div>
            <div class="stat-card">
                <span class="stat-card-icon bg-purple-alert-secondary"><i class="pi pi-users"></i></span>
                <span class="d-flex flex-column justify-content-center">
                    <span class="title1">{{ metaData.capacity }}</span>
                    <small class="title3"> Capacidade total </small>
                </span>
            </div>
        </div>
    
        <div class="table-list-area">
            <div class="table-list-legend"></div>
           <div class="table-list-cards">
                <div v-for="table in data" 
                    class="table-list-card p-0 px-2"
                    :class="getClassOfStatusType(table)"
                    @click="getTableItemToEdit(table.id)"
                >
                    <span class="d-flex justify-content-end w-100 text-uppercase s-sm cfw-md">{{ table.is_active ? 'Ativa' : 'Inativa'}}</span>
                    <span v-if="table.shape"><i :class="`${table.shape} fs-4 title3`"></i></span>
                    <span v-else style="color:var(--t3);width:32px;height:40px;display:flex;align-items:center;justify-content:center;">
                        <svg viewBox="0 0 28 20" fill="none"><rect x="2" y="2" width="25" height="17" rx="3" stroke="#7E959E" stroke-width="2"/></svg>
                    </span>
                    <span class="title1">{{ table.name }}</span>
                    <span class="title3">{{ table.room.name }}</span>
                    <span class="title3 d-flex align-items-center gap-2">
                        <i class="pi pi-users"></i>
                        {{ table.capacity }} pessoas
                    </span>
                </div>
           </div>
        </div>
        <Form 
            :options="options"
            ref="form"
            @submitted="search(paginate, withoutActiveFilter)"
        />
    </PageTemplate>
</template>

<script src="./script.ts"></script>
<style src="./style.css" lang="css"></style>