<template>
    <PageTemplate
        title="Cadastro de fornecedores"
    >
        <Search
            @on-filter="onSearch"
        />
        <DataTableTemplate
            :data="data"
            :columns="columns"
            :service="service"
        >
        </DataTableTemplate>
        <Form
            :service="service"
        />
    </PageTemplate>
</template>

<script src="./script.ts" lang="ts"></script>