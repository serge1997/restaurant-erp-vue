<template>
    <FormTemplate
        :itemId="form.id"
        :hasMenu="true"
        :title="getTitle"
        :isDisableSaveBtn="disableSaveBtn"
        formWidth="w-35"
        @submitData="onStore"
        @on-clear-form="clearForm"
    >
        <template v-if="form.id" #subtitle>
            <div class="d-flex align-items-center gap-1">
                <div class="b-bg-surface3 px-2 rounded-1 title3">{{ form.code }}</div>
                <div :class="`${form.status.severity} d-flex gap-1 align-items-center`">
                    <span class="mb-1" :class="`sdot b-bg-${extractColor}`"></span>
                    <span class="w-75">{{ form.status?.label }}</span>
                </div>
            </div>
        </template>
        <template #form-menu>
            <TieredMenu :model="tiredMenuItems" class="tiredmenu px-0">
                <template #item="{ item, hasSubmenu}">
                    <div
                        v-if="item.attach_status === true"
                        @click="attacheStatus(item.value)"
                        :disabled="item.disabled_on_completed === true && isCompleted ? item.disabled = true : item.disabled = false"
                        :class="item.disabled_on_completed === true && isCompleted ? 'disabled' : ''"
                        class="p-2 d-flex tieredmelement align-items-center cursor-p justify-content-between"
                    >
                        <div class="d-flex gap-1 align-items-center">
                            <i class="s-md p-row-toggler" :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </div>
                        <i v-if="hasSubmenu" class="pi pi-angle-right"></i>
                    </div>
                    <div v-else
                        :disabled="item.disabled_on_completed === true && isCompleted ? item.disabled = true : item.disabled = false"
                        :class="item.disabled_on_completed === true && isCompleted ? 'disabled' : ''"
                        class="p-2 d-flex tieredmelement align-items-center cursor-p justify-content-between"
                    >
                        <div @click="item.actions" class="d-flex gap-1 align-items-center">
                            <i class="s-md p-row-toggler" :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </div>
                        <i v-if="hasSubmenu" class="pi pi-angle-right"></i>
                    </div>
                </template>
            </TieredMenu>
        </template>

        <div class="pr-form">
            <section class="pr-section">
                <div class="pr-section-header">
                    <span class="pr-section-icon"><i class="pi pi-info-circle"></i></span>
                    <div class="d-flex flex-column">
                        <span class="pr-section-title">Dados gerais</span>
                        <span class="pr-section-sub">Informações principais da requisição</span>
                    </div>
                </div>

                <div class="pr-grid pr-grid-3">
                    <div class="pr-field">
                        <Select
                            v-model="form.department_id"
                            label="Departamento"
                            placeholder="Selecione o departamento"
                            :options="departments"
                            optionValue="value"
                            optionLabel="label"
                        />
                    </div>
                    <div class="pr-field">
                        <Select
                            v-model="form.priority"
                            label="Prioridade"
                            placeholder="Selecione a prioridade"
                            :options="options.priorities"
                            optionValue="value"
                            optionLabel="label"
                        />
                    </div>
                    <div class="pr-field">
                        <DatePicker
                            label="Data de entrega"
                            v-model="expected_delivery_date"
                        />
                    </div>
                </div>

                <div class="pr-field mt-1">
                    <Textarea
                        label="Observaçao"
                        v-model="form.observation"
                        placeholder="Digite a observaçao"
                    />
                </div>
            </section>

            <section class="pr-section">
                <div class="pr-section-header">
                    <span class="pr-section-icon pr-section-icon-amber"><i class="pi pi-shopping-cart"></i></span>
                    <div class="d-flex flex-column">
                        <span class="pr-section-title">Produtos solicitados</span>
                        <span class="pr-section-sub">Adicione os itens e as quantidades desejadas</span>
                    </div>
                </div>

                <div class="pr-add-item">
                    <div class="pr-add-item-row">
                        <div class="pr-field pr-field-grow">
                            <Select
                                :options="options?.products"
                                v-model="formItem.product_id"
                                :hasFilter="true"
                                @hide="v.formItem.product_id.$touch()"
                                :error="v.formItem.product_id.$error ? v.formItem.product_id.$errors[0]?.$message : ''"
                                @onFilter="$emit('searchProduct', $event)"
                                placeholder="Selecione o produto"
                                @change="onSelectProduct"
                            >
                                <template #label>
                                    Produto <span class="text-danger">*</span>
                                </template>
                            </Select>
                        </div>
                        <div class="pr-field pr-field-qty">
                            <Input
                                v-model="formItem.ordered_quantity"
                                placeholder="Digite a quantidade"
                                @blur="v.formItem.ordered_quantity.$touch()"
                                :error="v.formItem.ordered_quantity.$error ? v.formItem.ordered_quantity.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Quantidade <span class="text-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="pr-add-btn-wrap btn-button">
                            <Button
                                icon="pi pi-plus s-sm"
                                label="Adicionar"
                                class="btn-green-primary"
                                @click="AddItems"
                                :isDisable="disableSaveBtn"
                            />
                        </div>
                    </div>
                    <div
                        class="pr-field mt-2"
                        v-if="hasUnitVolume()"
                    >
                        <Select
                            :options="getVolumeOfProduct"
                            v-model="formItem.unit_size"
                            optionLabel="label"
                            optionValue="value"
                            :hasFilter="true"
                            placeholder="Selecione o volume"
                            @change="onSelectUnitMeasure"
                        >
                            <template #label>
                                Volume <span class="text-danger">*</span>
                            </template>
                        </Select>
                    </div>
                    <div
                        class="pr-field mt-2 d-none"
                        v-if="current_product?.category?.unit_measure.label == 'G'"
                    >
                        <Select
                            :options="[{value: 'G', label: 'g (gramas))'}, {value: 'KG', label: 'kg (kilogramas)'}]"
                            v-model="formItem.unit_of_measure"
                            optionLabel="label"
                            optionValue="value"
                            :hasFilter="true"
                            placeholder="Selecione o volume"
                        >
                            <template #label>
                                Unidade de medida <span class="text-danger">*</span>
                            </template>
                        </Select>
                    </div>
                </div>

                <div class="pr-items">
                    <span class="pr-items-count" v-if="items.length">{{ items.length }} {{ items.length === 1 ? 'item' : 'itens' }} adicionado{{ items.length === 1 ? '' : 's' }}</span>
                    <div v-if="items.length" class="pr-items-list">
                        <div v-for="(item, index) of items" :key="index" class="pr-item-card">
                            <span class="pr-item-index">{{ (index + 1).toString().padStart(2, "0") }}</span>
                            <div class="pr-item-info">
                                <span class="pr-item-name ellipssed-text">{{ item?.product ? item.product.name : item.name }}</span>
                                <span class="pr-item-qty">{{ transformOrderedQuantity(item) }} {{ getUnitMeasureLabel(item.unit_of_measure) }}</span>
                            </div>
                            <div class="pr-item-actions">
                                <Button
                                    class="p-0"
                                    @click="removeItem(index)"
                                    :isDisable="disableSaveBtn"
                                >
                                    <template #svg>
                                        <div
                                            class="rac del"
                                            @click="removeItem(index)"
                                            :disabled="disableSaveBtn"
                                        >
                                            <svg style="pointer-events: none" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M5 3V2h2v1M4 3v7h4V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </template>
                                </Button>
                                <Button
                                    v-if="item?.id"
                                    class="p-0"
                                    @click="selectItemToEdit(index)"
                                    :isDisable="disableSaveBtn"
                                >
                                    <template #svg>
                                        <div
                                            v-if="item?.id" class="rac"
                                            @click="selectItemToEdit(index)"
                                            :disable="disableSaveBtn"
                                        >
                                            <svg viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </template>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="tcard-empty pr-empty">
                        <i class="pi pi-inbox"></i>
                        <span>Nenhum produto adicionado ainda</span>
                    </div>
                </div>
            </section>
        </div>
    </FormTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>
