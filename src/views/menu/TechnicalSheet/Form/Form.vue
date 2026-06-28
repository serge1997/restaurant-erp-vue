<template>
    <div class="col-12">
        <Select
            :options="options?.menuItems"
            :hasFilter="true"
            :isDisable="true"
            v-model="getcurrentmenuItem"
            placeholder="Selecionar o item do menu"
            @change="onSelectMenuItem"
        >
            <template #label>
                Item do menu <span class="text-danger">*</span>
            </template>
        </Select>
    </div>
    <div class="col-12 mt-3">
        <Select
            v-model="product.product_id"
            :options="products"
            :hasFilter="true"
            placeholder="Selecionar o produto"
            @change="onSelectProduct($event)"
            @hide="triggerCustomValidation('product_id')"
            :error="customValidation.product_id.$dirty ? customValidation.product_id.$error : ''"
        >
            <template #label>
                Produto <span class="text-danger">*</span>
            </template>
        </Select>
    </div>
    <div class="row mt-3">
        <div class="col-md-5">
            <label>Quantidade <small v-if="product.unit_measure_label">  [{{ product.unit_measure_label }}]</small> <span class="text-danger">*</span></label>
            <InputNumber
                v-model="product.quantity"
                placeholder="Digite a quantidade"
                @blur="triggerCustomValidation('quantity')"
                :minFractionDigits="2"
            />
            <small class="text-danger s-sm" v-if="customValidation.quantity.$dirty">{{ customValidation.quantity.$error }}</small>
        </div>
        <div class="col-md-6 d-flex align-items-center">
            <Button 
                label="Adicionar Produto"
                class="mt-4 btn-green-primary"
                icon="pi pi-plus"
                @click="addtoSheet"
            />
        </div>
    </div>
    <div class="col-md-6 d-flex align-items-center">
        <Button 
            label="Salvar"
            class="mt-4 btn-green-primary"
            @click="onStore"
        />
    </div>
    <div class="col-12 mt-3">
        <DataTableTemplate
            tableRowCountTitle="Elementos da ficha"
            :columns="columns"
            :data="sheetdDetail"
        >
            <template #action-header>
                Açoes
            </template>
            <template #action-content="{ action }">
                <Button 
                    class="p-0 px-1"
                    icon="pi pi-pen-to-square c-gray-primary"
                    @click="addSheetProductToEdit(action)"
                />
                <Button 
                    class="p-0"
                    icon="pi pi-trash text-danger"
                    @click="removeProductFromSheet(action)"
                />
            </template>
        </DataTableTemplate>
    </div>
</template>
<script src="./script.ts" lang="ts"></script>
<style src="./style.css"></style>