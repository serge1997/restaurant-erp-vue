<template>
    <InlineSearch
        @on-search="onSearch"
        @clear-filter="clearSearchInputs"
    >
        <template #filters>
            <div class="fg w-280px">
                <MultiSelect
                    :options="filters.categories"
                    v-model="search.categories"
                    label="Categorias"
                />
            </div>
            <div class="filter-sep"></div>
            <div class="fg w-280px">
                <MultiSelect 
                    :options="filters.features"
                    v-model="search.features"
                    label="Ticket do item"
                />
            </div>
        </template>
    </InlineSearch>
</template>

<script src="./script.ts"></script>