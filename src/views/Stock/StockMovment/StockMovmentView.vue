<template>
    <PageTemplate
        title="Movimentaçao de estoque"
    >
        <Search
            @on-filter="onSearch"
            :options="searchOptions"
            class="border"
        />
        <DataTableTemplate
            :columns="columns"
            :service="service"
            :data="data"
            :paginate="paginate"
            :expandedColumns="expandedColumns"
            :expandedTitle="expandedTitle"
            :hasExpendedRows="true"
            :editable="false"
            @onExpandedRow="onExpandedRow"
        >
            <template #search>
            </template>
            <template #expanded-filters="{ data }">
                <div class="d-flex align-items-center gap-2">
                    <label>Data da movimentaçao</label>
                    <div class="d-flex align-items-center gap-2">
                        <Divider class="vertical-divider" layout="vertical"  />
                        <div class="col-md-3 d-flex align-items-center gap-1">
                            <DatePicker 
                                v-model="expandSearch.moved_at_from"
                            />
                        </div>
                        <label>Até</label>
                        <div class="col-md-3 d-flex align-items-center gap-1">
                            <DatePicker 
                                v-model="expandSearch.moved_at_to"
                            />
                        </div>
                        <Divider class="vertical-divider" layout="vertical"  />
                        <MultiSelect
                            style="margin-bottom: 17px;"
                            :options="stockMovmentTypeToOptions" 
                            v-model="expandSearch.reference_types"
                            label="Tipo movimentaçao"
                            placeholder="Selecione os tipos de movimentaçao"
                        />
                    </div>
                    <div class="btn-button d-flex gap-2">
                        <Button
                            label="Filtrar"
                            class="btn-green-primary"
                            @click="onExpandedRow(data)"
                        />
                        <Button
                            label="Limpar"
                            class="btn-white-primary"
                        />
                    </div>
                </div>
            </template>
            <template #tag-header>
                Status
            </template>
            <template #tag-content="{ flag }">
                <Flag 
                    :label="flag.product.in_stock_label"
                    :class="flag.product.in_stock_label_severity"
                />
            </template>
            <template #expand-quantity-header>
                qtd.
            </template>
            <template #expand-quantity-content="{ data }">
                <span class="px-1 fw-bold ff-fantasy" :class="data.direction.color">{{ data.quantity }}</span>
            </template>
            <template #expand-status-header>
                Tipo
            </template>
            <template #expand-status-content="{ data }">
                <div class="d-flex align-items-center gap-1">
                    <span class="px-1" :class="data.direction.severity">{{ data.direction.label }}</span>
                    <span 
                        v-if="data.description"
                        v-tooltip.bottom="{
                            value: `${data.description}\nAuthor: ${data.created_by.name}`,
                            fitContent: true,
                            pt: {
                                arrow: {
                                    style: {
                                        borderBottomColor: 'var(--surface2)',
                                        
                                    }
                                },
                                text: 'bg-white c-t3'
                            }
                        }"
                    > 
                            <i class="pi pi-info-circle s-md"></i>
                    </span>
                </div>
            </template>
        </DataTableTemplate>

        <Form 
            :options="options"
            @submitted="search"
        />
    </PageTemplate>
</template>
<script src="./script.ts" lang="ts"></script>

<style>
.p-divider.vertical-divider::before {
    border: .1px solid var(--c-green-secondary);
    opacity: 0.5;
    height: 20px;
    display: flex;
    align-items: center;
    margin-top: 6px;
}
</style>