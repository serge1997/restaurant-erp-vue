<template>
    <div class="ts-form">
        <section class="ts-section">
            <SectionTitle
                title="Item do menu"
                icon="pi-receipt s-sm"
            />
            <div class="ts-field">
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
        </section>

        <section class="ts-section">
            <SectionTitle
                title="Adicionar produto"
                icon="pi-plus-circle s-sm"
            />
            <div class="ts-add-row">
                <div class="ts-field ts-field-grow ts-col">
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
                <div class="ts-field ts-field-qty ts-col d-flex flex-column">
                    <label>Quantidade <small v-if="product.unit_measure_label">[{{ product.unit_measure_label }}]</small> <span class="text-danger">*</span></label>
                    <InputNumber
                        v-model="product.quantity"
                        placeholder="Digite a quantidade"
                        @blur="triggerCustomValidation('quantity')"
                        :minFractionDigits="2"
                    />
                    <small class="text-danger s-sm" v-if="customValidation.quantity.$dirty">{{ customValidation.quantity.$error }}</small>
                </div>
                <div class="ts-add-btn-wrap ts-col btn-button">
                    <Button
                        label="Adicionar"
                        class="btn-green-primary"
                        icon="pi pi-plus"
                        @click="addtoSheet"
                    />
                </div>
            </div>
        </section>

        <section class="ts-section">
            <SectionTitle
                title="Itens da ficha"
                icon="pi-list s-sm"
            />
            <DataTableTemplate
                tableRowCountTitle="Elementos da ficha"
                :columns="columns"
                :data="sheetdDetail"
            >
                <template #action-header>
                    Açoes
                </template>
                <template #action-content="{ action }">
                    <div class="ts-row-actions">
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
                    </div>
                </template>
            </DataTableTemplate>
        </section>

        <div class="ts-footer btn-button">
            <Button
                label="Salvar"
                class="btn-green-primary ts-save-btn"
                icon="pi pi-check s-sm"
                @click="onStore"
            />
        </div>
    </div>
</template>
<script src="./script.ts" lang="ts"></script>
<style src="./style.css" scoped></style>
