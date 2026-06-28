<template>
    <InlineSearch
        @onSearch="onSearch"
        @on-clearFilter="clearFilters"
        :menuFiltersOptions="filtersOptions"
        :hasActiveFilter="false"
        :sumFiltersQuantity="sumFilter"
        searchInputPlaceholder="Pesquisar por nome do cliente, do garçom..."
    >
        <template #filters>
            <div class="fg" style="width: 180px;">
                <Select 
                    labelClass="search"
                    label="Pagamento"
                    optionLabel="label"
                    optionValue="value"
                    :options="options.payments"
                    v-model="query.payment"
                    inputCustomClass="b-bg-surface2"
                />
            </div>
            <div class="filter-sep"></div>
            <div class="fg" style="width: 180px;">
                <Select 
                    labelClass="search"
                    label="Método"
                    optionLabel="label"
                    optionValue="value"
                    :options="options.paymentMethods"
                    v-model="query.paymentMethod"
                    inputCustomClass="b-bg-surface2"
                />
            </div>
            <div class="filter-sep"></div>
            <div class="fg" style="width: 160px;">
                <Select 
                    labelClass="search"
                    label="Mesa"
                    :options="filters.tables"
                    v-model="query.table"
                    inputCustomClass="b-bg-surface2"
                />
            </div>
        </template>
        <template #businessDate>
            <div class="w-100">
                <DatePicker 
                    labelClass="search"
                    label="De"
                    customInputClass="bg-surface2"
                    v-model="query.businessDate"
                />
            </div>
            <div class="w-100">
                <DatePicker 
                    labelClass="search"
                    label="Até"
                    customInputClass="bg-surface2"
                    v-model="query.businessDateTo"
                />
            </div>
        </template>
        <template #status>
            <MultipleOptions
                :options="options.orderStatus"
                v-model="query.status"
                :hasSearch="true" 
                height="auto"
                optionLabel="label"
                optionValue="value"
                optionBoxClasses="gap-2 flex-column"
            />
        </template>
        <template #customer>
            <Input 
                labelClass="search"
                placeholder="Nome do cliente..."
                v-model="query.customer"
                inputCustomClass="b-bg-surface2"
            />
        </template>
        <template #waiter>
            <MultipleOptions 
                labelClass="search"
                label="Garçom / Author"
                :options="filters.users"
                v-model="query.waiter"
                inputCustomClass="b-bg-surface2"
            />
        </template>
    </InlineSearch>
</template>

<script src="./script.ts"></script>