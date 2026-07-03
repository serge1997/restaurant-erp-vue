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
        />
    </PageTemplate>
</template>

<script src="./script.ts"></script>