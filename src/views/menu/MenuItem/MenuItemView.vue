<template>
    <PageTemplate
        title="Itens do menu"
    >
        <Search 
            :options="options"
            @search="onSearch"
        />
        <DataTableTemplate
            :columns="columns"
            :service="service"
            :data="data"
            :paginate="paginate"
            @on-search="onSearch"
        >
        </DataTableTemplate>
        <Form 
            :options="options"
            :sheetOptions="sheetOptions()"
            @submitted="search"
        />
    </PageTemplate>
</template>

<script src="./script.ts" lang="ts"></script>