<template>
    <PageTemplate
        title="Cadastro de restaurante"
    >
        <DataTableTemplate
            :data="data"
            :columns="columns"
            :service="service"
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