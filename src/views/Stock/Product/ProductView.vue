<template>
    <PageTemplate
        title="Cadastro de produtos"
    >
        <Search
            @search="onSearch"
            :options="options"
        />
        <DataTableTemplate
            :columns="columns"
            :service="service"
            :data="data"
            :paginate="paginate"
            @processDataEdit="setDatEdit"
            @on-search="onSearch"
            searchInputPlaceholder="Pesquisar por nome, categoria, sku..."
        >
        </DataTableTemplate>
        <Form
            ref="formRef"
            :options="options"
            :dataGrid="data"
            @submitted="search"
        />
    </PageTemplate>
</template>

<script src="./script.ts" lang="ts"></script>