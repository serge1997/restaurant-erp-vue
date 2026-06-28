<template>
    <div class="d-flex gap-2 align-items-center">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="query.search" placeholder="Search" />
        </IconField>
        <Button 
            icon="pi pi-search s-sm"
            class="btn-green-primary"
            style="padding: 6px; padding-left: 8px; padding-right: 8px;"
            @click="search"
        />
        <Button
            v-if="hasFilters"
            icon="pi pi-filter fw-bold s-sm"
            class="c-blue-primary btn-default border py-2"
            @click="openFilterDialog"
        >
            <template #badge>
               <span v-if="sumFiltersQuantity" class="d-flex align-items-center"> 
                    <Badge class="px-0" :value="sumFiltersQuantity" />
                </span>
            </template>
        </Button>
    </div>
    <Dialog 
        v-model:visible="visibleSearchFiltersDialog"
        :style="{width: '40em'}"
        modal
        position="top"
        class="search-dialog"
        :closable="false"
    >
        <template #header>
            <div class="d-flex justify-content-between w-100 p-2 mb-2">
                <div class="d-flex align-items-center px-3">
                    <span class="detail-ico detail-ico-svg detail-ico">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 7h7M2 11h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    </span>
                    <span class="cfw-md px-2">Filtros</span>
                </div>
                <Button 
                    @click="visibleSearchFiltersDialog = false" 
                    class="btn-circle-close" 
                    icon="pi pi-times s-sm"
                />
            </div>
        </template>
        <div class="w-100 d-flex justify-content-between filter-container">
            <div class="w-40 px-1 filters-group">
                <ul class="list-group filter-lists w-100">
                    <li 
                        v-for="(filter, index) of filters" 
                        class="list-group-item w-100 s-md px-1 py-3 rounded-0 cursor-p cfw-sm"
                        style="height: 54px;"
                        :class="getActiveFilterClass(filter)"
                        @click="toggleFilterSlot(filter.slot)"
                    >
                        <span class="d-flex justify-content-between">
                            <span class="d-flex gap-1">
                                <small><i :class="`pi ${filter.icon} s-sm text-secondary`"></i></small>
                                <small>{{ filter.label }}</small>
                            </span>
                            <span class="d-flex align-items-center gap-2">
                                <div v-if="filter.selectionLenght"><Badge style="right:20px; top: 15px;" class="s-xs position-absolute" :value="filter.selectionLenght" /></div>
                                <div><i class="pi pi-angle-right s-sm"></i></div>
                            </span>
                        </span>
                    </li>
                    <li 
                        v-if="hasStatus"
                        class="list-group-item w-100 s-md px-1 py-3 rounded-0 cursor-p cfw-sm"
                        :class="getStatusActiveClass"
                        style="height: 54px;"
                        @click="setStatusVisible"
                    >
                        <span class="d-flex justify-content-between">
                            <span class="d-flex gap-1">
                                <small><i :class="`pi pi-circle s-sm text-secondary`"></i></small>
                                <small>Status</small>
                            </span>
                            <span class="d-flex align-items-center gap-2">
                                <div><Badge style="right:20px; top: 15px;" class="s-xs position-absolute" value="1" /></div>
                                <div><i class="pi pi-angle-right s-sm"></i></div>
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="w-50 d-flex flex-column gap-2" style="height: 100%;">
                <div class="w-100 d-flex align-items-center filters-inputs">
                    <slot v-if="getCurrentFilterSlot" :name="getCurrentFilterSlot"></slot>
                </div>
                <MultipleOptions 
                    v-if="hasStatus && isActiveIsVisible"
                    :options="activesOptions"
                    :hasSearch="false"
                    v-model="query.is_active"
                    type="radio"
                />
            </div>
        </div>
        <slot name="filters"></slot>
        <template #footer>
            <div class="d-flex align-items-center btn-button gap-1">
                <Button 
                    icon="pi pi-filter s-sm"
                    class="btn-green-primary py-1"
                    label="Aplicar"
                    @click="search"
                />
                <Button 
                    icon="pi pi-filter-slash s-sm"
                    label="Limpar"
                    class="btn-white-primary c-gray-primary py-1 rounded-2"
                    @click="$emit('clearFilter')"
                />  
            </div>
        </template>
    </Dialog>
</template>

<script src="./script.ts"></script>
<style src="./style.css" lang="css"></style>