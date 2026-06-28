<template>
    <div class="filter-bar">
        <div class="filter-row">
            <div class="fd">
                <div class="d-flex flex-column">
                    <label class="title3">Pesquisar</label>
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText 
                            v-model="query.search"
                            :placeholder="searchInputPlaceholder" 
                        />
                    </IconField>
                </div>
            </div>
            <slot name="filters"></slot>
            <div class="filter-sep"></div>
            <div class="cursor-p px-2 rounded-2" @click="toggleFiltersMenu">
                <span class="title3 text-decoration-underline"><i class="pi pi-plus s-sm"></i> Mais filtros {{ sumFiltersQuantity }}</span>
            </div>

            <Menu ref="filtersMenu" :style="{width: '28rem', height: '30rem'}" :popup="true">
                <template #end>
                    <div class="d-flex gap-2 w-100">
                        <ul class="list-group border-rt3" style="width: 190px; height: 28rem;">
                            <li 
                                v-for="(item, index) in filters" 
                                @click.stop="setActiveFilter(index)" 
                                class="list-group-item d-flex border-0 d-flex justify-content-between rounded-0 align-items-centers cursor-p px-1 title3-md" 
                                style="width: 140px;"
                                :class="{ 'options-active-filter' : item.hidden == false }"
                            >
                                <span>{{ item.label }}</span>
                                <span v-if="item.selectionLenght" class="sdot occupied"></span>
                            </li>
                        </ul>
                        <div class="d-flex flex-column w-100 justify-content-between" style="height: 28rem">
                            <div class="w-100">
                                <div  v-for="item in filters">
                                    <div class="px-2 w-100" v-if="item.slot && item.hidden == false">
                                        <label class="title3">{{ item.title }}</label>
                                        <slot :name="item.slot"></slot>
                                    </div>
                                    <div v-else-if="item.label.toLocaleLowerCase() == 'status' && !item.hidden && hasActiveFilter" class="d-flex flex-column justify-content-between px-2">
                                        <div>
                                            <label class="mb-1 title3">{{ item.title }}</label>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="d-flex align-items-center gap-1 mb-1">
                                                    <RadioButton v-model="query.is_active" inputId="ingredient1" :value="true" />
                                                    <label class="ml-2">Ativo</label>
                                                </div>
                                                <div class="d-flex align-items-center gap-1 mb-1">
                                                    <RadioButton v-model="query.is_active" inputId="ingredient2" :value="false" />
                                                    <label class="ml-2">Inativo</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end gap-2 btn-button">
                                <Button 
                                    class="btn-green-primary" 
                                    label="Aplicar" 
                                    icon="pi pi-filter s-sm"
                                    @click="$emit('on-search', query)"
                                />
                                <Button 
                                    class="btn-white-primary" 
                                    label="Limpar"
                                    icon="pi pi-times s-md" 
                                    @click="clearFilters"
                                />
                            </div>
                        </div>
                    </div>
                </template> 
            </Menu>
            <div style="width: 78px;" class="fg btn-button">
                <Button 
                    class="btn-green-primary" 
                    label="Filtrar" 
                    icon="pi pi-filter s-sm"
                    @click="$emit('on-search', query)"
                />
             
            </div>
            <div style="width: 78px;" class="fg btn-button">
               
                    <Button 
                        class="btn-white-primary" 
                        label="Limpar"
                        icon="pi pi-times s-md" 
                        @click="clearFilters"
                    />
              
            </div>
        </div>
    </div>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>