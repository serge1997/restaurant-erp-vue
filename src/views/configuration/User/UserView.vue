<template>
    <PageTemplate
        title="Gestao de usuarios / colaboradores"
    >
        <DataTableTemplate
            :data="data"
            :columns="columns"
            :service="service"
            :paginate="paginate"
            @processDataEdit="setDataEdit"
        >
            <template #tag-header>
                Status
            </template>
            <template #tag-content="{ flag }">
                <span :class="`badge ${flag.is_active ? 'b-active' : 'b-inactive' }`"> {{ flag.is_active ? 'Ativa':'Inativa' }}</span>
            </template>
        </DataTableTemplate>
        <Form 
            ref="form"
            @submitted="search"
            :options="options"
        />
    </PageTemplate>
</template>

<script src="./script.ts"></script>