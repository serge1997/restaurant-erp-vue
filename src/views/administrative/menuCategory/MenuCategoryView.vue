<template>
    <PageTemplate
        title="Cadastro de categoria de menu"
    >
        <DataTableTemplate
            :data="data"
            :columns="columns"
            :service="service"
            :paginate="paginate"
        >
            <template #search>
                <Search 
                    @search="search"
                />
            </template>
        </DataTableTemplate>
        <Form 
            :service="service"
            @update-dataTable="search"
        />
    </PageTemplate>
</template>
<script src="./script.ts" lang="ts"></script>