<template>
    <PageTemplate
        title="Requisiçao de compra"
    >
        <Search 
            @on-filter="onSearch"
        />
        <DataTableTemplate
            :columns="colums"
            :service="service"
            :data="data"
            :paginate="paginate"
        >
            <template #customer-header>
                Prioridade
            </template>
            <template #customer-content="data">
                <span class="text-capitalize" :class="`${data.data.priority.severity}`">{{ data.data.priority.label}}</span>
            </template>
            <template #status-header>
                status
            </template>
            <template #status-content="status">
                <div class="d-flex align-items-center gap-1" :class="status.status.status.severity">
                    <span class="mb-1" :class="`sdot b-bg-${extractColor(status.status.status.severity)}`"></span>
                    {{ status.status.status.label }}
                </div>
            </template>

        </DataTableTemplate>
        <Form
            :options="options"
            @searchProduct="getProducts"
            @submitted="search"
        />
    </PageTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts" lang="ts"></script>