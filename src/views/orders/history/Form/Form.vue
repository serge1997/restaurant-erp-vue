<template>
    <FormTemplate
        :title="getTitle"
        :showDefaultFooter="false"
        :showSaveButton="false"
        @on-clear-form="clearOrder"
        :itemId="order?.id"
        :hasMenu="true"
    >
        <template #form-menu>
            <ul class="list-group">
                <li 
                    class="list-group-item border-0 cursor-p"
                    >
                        Imprimir fatura
                </li>
            </ul>
        </template>
        <ShowOrderTemplate
            :order="order"
            :readOnly="true"
        />
    </FormTemplate>
</template>
<script src="./script.ts"></script>