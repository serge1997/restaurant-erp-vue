<template>
    <PageTemplate
        title="Reservas"
    >
        <Form
            ref="formRef"
            :dataGrid="data"
            @submitted="onSearch"
        />
    </PageTemplate>
</template>

<script src="./script.ts"></script>
