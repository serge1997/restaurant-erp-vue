<template>
    <InlineSearch
        @on-search="onSearch"
        :hasActiveFilter="false"
        :menuFiltersOptions="filters"
        searchInputPlaceholder="Pesquisar por código"
        :sumFiltersQuantity="sumFilterMoreFilterSelected"
    >
        <template #filters>
            <div class="fg w-280px">
                <Select
                    labelClass="search"
                    inputCustomClass="b-bg-surface2"
                    v-model="query.status"
                    :options="options.status"
                    label="Status"
                    optionLabel="label"
                    optionValue="value"
                />
            </div>
            <div class="fg w-280px">
                <Select
                    labelClass="search"
                    inputCustomClass="b-bg-surface2"
                    v-model="query.priority"
                    :options="options.priorities"
                    label="Prioridade"
                    optionLabel="label"
                    optionValue="value"
                />
            </div>
        </template>
        <template #createdAt>
            <div class="w-100 d-flex flex-column">
                <DatePicker
                    label="Data"
                    class="mb-2"
                    v-model="query.createdAt"
                    customInputClass="bg-surface2"
                    placeholder="Data inicial"
                />
                <DatePicker
                    label="Até"
                    v-model="query.createdAtTo"
                    customInputClass="bg-surface2"
                    placeholder="Data final"
                />
            </div>
        </template>
        <template #deliveredAt>
            <div class="w-100 d-flex flex-column">
                <DatePicker
                    label="Data"
                    class="mb-2"
                    v-model="query.deliveredAt"
                    customInputClass="bg-surface2"
                    placeholder="Data inicial"
                />
                <DatePicker
                    label="Até"
                    v-model="query.deliveredAtTo"
                    customInputClass="bg-surface2"
                    placeholder="Data final"
                />
            </div>
        </template>
        <template #department>
            <MultipleOptions 
                :options="options.departments"
                v-model="query.department"
                optionLabel="label"
                optionValue="value"
            />
        </template>
    </InlineSearch>
</template>

<script src="./script.ts"></script>