<template>
    <DataTable
        :value="entityData"
        class="b-bg-primary"
        scrollable 
        :scrollHeight="tableHeight"
        ref="dataTable"
        columnResizeMode="fit"
        v-model:expandedRows="expandedRows"
        collapsedRowIcon="pi pi-chevron-right s-sm title3"
        expandedRowIcon="pi pi-chevron-down v-small-fs"
        dataKey="id"
        @rowExpand="onRowExpand"
        @row-collapse="onRowCollapse"
    >
        <template #header>
            <div v-if="hasHeader" class="w-100 d-flex justify-content-between">
                <div>
                    <small style="font-weight: 500;">{{ tableRowCountTitle }}: {{ entityData?.length }}</small>
                </div>
                <div class="d-flex d-none">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText 
                            v-model="filters.search"
                            @input="$emit('on-search', {search: filters.search})" 
                            :placeholder="searchInputPlaceholder" 
                        />
                    </IconField>
                    <span @click="clearFilters" class="d-flex align-items-center px-1"><i class="pi pi-times s-md"></i></span>
                    <slot name="search"></slot>
                </div>
            </div>
        </template>
        <Column v-if="hasExpendedRows" expander style="width: 1rem" />
        <Column 
            v-for="column in columns"
            class="cursor-p"
            :sortable="isSortable"
            :style="`width: ${column.width || 'auto'}`"
        >
            <template #header="slotProps">
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">{{ column.label }}</span>
            </template>
            <template #body="slotProps">
               <div @click="getElement(slotProps.data)">
                    <span v-if="column.property == 'image'">
                        <img :src="slotProps.data[column.property]" alt="" srcset="">
                    </span>
                    <span v-else-if="column.nested" :class="`${column.class ? column.class : columnContentSize}`">
                        {{ slotProps.data[column.property][column.nested] }}
                    </span>
                    <span v-else-if="column.format" :class="`${column.class ? column.class : columnContentSize}`">{{ column?.format(slotProps.data[column.property]) }}</span>
                    <span v-else :class="`${column.class ? column.class : columnContentSize}`">{{ slotProps.data[column.property] }}</span>
               </div>
            </template>
        </Column>
        <Column :style="`width: ${idColWidth || 'auto'}`" v-if="$slots['id-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="id-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="id-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${idColWidth || 'auto'}`" v-if="$slots['id-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="date-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="date-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${customerColWidth || 'auto'}`" v-if="$slots['customer-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="customer-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" :class="columnContentSize" class="cursor-p">
                    <slot name="customer-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${waiterColWidth || 'auto'}`" v-if="$slots['waiter-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`" >
                    <slot name="waiter-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="waiter-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${tableColWidth || 'auto'}`" v-if="$slots['table-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="table-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="table-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${totalColWidth || 'auto'}`" v-if="$slots['total-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="total-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="total-content" :data="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${statusColWidth || 'auto'}`" v-if="$slots['status-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="status-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="status-content" :status="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${tagColWidth || 'auto'}`" v-if="$slots['tag-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="tag-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <div @click="getElement(slotProps.data)" class="cursor-p">
                    <slot name="tag-content" :flag="slotProps.data"></slot>
                </div>
            </template>
        </Column>
        <Column :style="`width: ${actionColWidth || 'auto'}`" v-if="$slots['action-header']">
            <template #header>
                <span :class="`${columnHeaderSize} ${columnHeaderFw}`">
                    <slot name="action-header"></slot>
                </span>
            </template>
            <template #body="slotProps">
                <slot name="action-content" :action="slotProps.data"></slot>
            </template>
        </Column>
        <template #empty>
            <div class="d-flex flex-column align-items-center justify-content-center py-4 gap-2">
                <i class="pi pi-search c-t3" style="font-size: 2rem;" />
                <span class="s-md c-t2" style="font-weight: 500;">
                    Nenhum resultado encontrado
                </span>
                <span class="c-t1" style="font-size: 12px;">
                    Tente ajustar os filtros ou a busca
                </span>
            </div>
        </template>
        <template #expansion="slotProps">
            <DataTable
                :value="slotProps.data.details"
                class="b-bg-primary p-2"
                scrollable 
                columnResizeMode="fit"
                dataKey="id"
                @rowExpand="onRowExpand"
            >
                <template #header>
                    <div class="w-100 d-flex flex-column gap-2">
                        <div>
                            <small style="font-weight: 500;">{{ expandedTitle }}</small>
                        </div>
                        <div>
                            <slot name="expanded-filters" :data="slotProps.data"></slot>
                        </div>
                    </div>
                </template>
                <Column 
                    v-for="column in expandedColumns"
                    class="cursor-p"
                    :sortable="isSortable"
                    :style="`width: ${column.width || 'auto'}`"
                >
                    <template #header="slotProps">
                        <span>{{ column.label }}</span>
                    </template>
                    <template #body="slotProps">
                        <div>
                            <span v-if="column.property == 'image'">
                                <img :src="slotProps.data[column.property]" alt="" srcset="">
                            </span>
                            <span v-else-if="column.nested" :class="`${column.class ? column.class : columnContentSize}`">
                                {{ slotProps.data[column.property][column.nested] }}
                            </span>
                            <span v-else-if="column.format" :class="`${column.class ? column.class : columnContentSize}`">{{ column?.format(slotProps.data[column.property]) }}</span>
                            <span v-else :class="`${column.class ? column.class : columnContentSize}`">{{ slotProps.data[column.property] }}</span>
                        </div>
                    </template>
                </Column>
                <Column :style="`width: ${tableColWidth || 'auto'}`" v-if="$slots['expand-quantity-header']">
                    <template #header>
                        <span :class="``">
                            <slot name="expand-quantity-header"></slot>
                        </span>
                    </template>
                    <template #body="slotProps">
                        <div class="cursor-p">
                            <slot name="expand-quantity-content" :data="slotProps.data"></slot>
                        </div>
                    </template>
                </Column>
                <Column :style="`width: ${tableColWidth || 'auto'}`" v-if="$slots['expand-status-header']">
                    <template #header>
                        <span :class="``">
                            <slot name="expand-status-header"></slot>
                        </span>
                    </template>
                    <template #body="slotProps">
                        <div class="cursor-p">
                            <slot name="expand-status-content" :data="slotProps.data"></slot>
                        </div>
                    </template>
                </Column>
                <template #footer v-if="$slots['expand-footer']">
                    <slot name="expand-footer"></slot>
                </template>
            </DataTable>
        </template>
    </DataTable>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>