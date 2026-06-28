<template>
    <PageTemplate
        title="Gestao salas"
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
                    <small class="title3"> Inativas </small>
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
        <div class="rooms-grid">
            <div v-for="room in data" class="room-card">
                <div :style="`border-top: 4px solid ${room.severity};`"></div>
                <div class="room-card-body">
                    <div class="room-card-header">
                        <div class="room-card-icon" :style="`background:${room.severity}22;border:1px solid ${room.severity}44}`">
                            <i :style="`color: ${room.severity};`" :class="`pi ${room.icon}`"></i>
                        </div>
                        <div style="flex:1;padding-left:10px">
                            <div class="room-card-title">{{ room.name }}</div>
                        </div>
                    </div>
                    <div class="room-card-desc">{{ room.description || "Nenhuma descriçao informada" }}</div>
                    <div class="room-card-pills">
                        <span class="pill pill-tables"><svg viewBox="0 0 10 10" fill="none"><rect x="1" y="3" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.1"/></svg>3 mesas</span>
                        <span class="pill pill-cap d-flex"><i class="pi pi-users s-sm"></i>{{room.capacity}} pax</span>
                    </div>
                    <div class="room-card-footer">
                        <span :class="`badge ${room.is_active ? 'b-active' : 'b-inactive' }`"> {{ room.is_active ? 'Ativa':'Inativa' }}</span>
                        <div class="rcard-actions d-flex gap-2">
                            <div @click="getRoomToEdit(room.id)" class="rac" title="Editar"><svg viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                            <div @click="openDeleteConfirm(room.id)" class="rac del" title="Excluir"><svg style="pointer-events: none" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M5 3V2h2v1M4 3v7h4V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Form
            :options="options"
            ref="form"
            @submitted="search"
        />
    </PageTemplate>
    <ConfirmTemplate />
</template>

<script src="./script.ts"></script>
<style src="./style.css" lang="css"></style>