<template>
    <PageTemplate
        title="Categoria de produtos"
        :hasNewButton="false"
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
        />
    </PageTemplate>
</template>

<script src="./script.ts" lang="ts"></script>