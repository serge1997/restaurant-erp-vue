<template>
    <PageTemplate
        title="Redes de restaurantes"
    >
        <DataTableTemplate
            :columns="columns"
            :data="data"
            :service="service"
            @processDataEdit="setDatEdit"
        >

        </DataTableTemplate>

        <Form
            ref="formRef"
            @submitted="search"
        />
    </PageTemplate>
</template>

<script src="./script.ts"></script>