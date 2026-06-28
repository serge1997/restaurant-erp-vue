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
                </template>m
            </TieredMenu>
        </template>
        <div class="w-100 mb-2">
            <Divider align="left">
                <b>Dados Gerais</b>
            </Divider>
            <div class="d-flex justify-content-between gap-1 mb-2">
                <div class="col-md-4">
                    <Select
                        v-model="form.department_id"
                        label="Departamento"
                        placeholder="Selecione o departamento"
                        :options="departments"
                        optionValue="value"
                        optionLabel="label"
                    />
                </div>
                <div class="col-md-4">
                    <Select
                        v-model="form.priority"
                        label="Prioridade"
                        placeholder="Selecione a prioridade"
                        :options="options.priorities"
                        optionValue="value"
                        optionLabel="label"
                    />
                </div>
                <div class="col-md-4">
                <DatePicker
                    label="Data de entrega"
                    v-model="expected_delivery_date"
                />
            </div>
            </div>
            <div class="row mb-3">
                <Textarea
                    label="Observaçao"
                    v-model="form.observation"
                    placeholder="Digite a observaçao"
                />
            </div>
            <Divider align="left">
                <b>Produtos solicitados</b>
            </Divider>
            <div class="row">
                <div class="w-100 d-flex justify-content-between align-items-center">
                    <div class="col-md-6">
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
                    <div class="col-md-3">
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
                    <div class="btn-button mt-3">
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
                    class="col-12 mt-2"
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
                    class="col-12 mt-2 d-none"
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
            <div class="col-md-12 mt-3">
                <div v-if="items.length" v-for="(item, index) of items" class="card mb-2 rounded-3 b-bg-surface2 py-1">
                    <div class="card-body d-flex justify-content-between py-1 px-1 cursor-p">
                        <div class="d-flex align-items-center gap-2">
                            <span class="text2 px-1">{{ (index + 1).toString().padStart(2, "0") }}</span>
                            <span class="s-md">{{ item?.product ? item.product.name : item.name }}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="s-md cfw-sm">{{ transformOrderedQuantity(item) }} {{getUnitMeasureLabel(item.unit_of_measure)}}</span>
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
                <div v-else class="tcard-empty">
                    <span>Nenhum produto adicionado ainda</span>
                </div>
            </div>
        </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>

<style scoped>
.list-group .list-group-item{
    font-family: 'IBM Plex Sans', sans-serif !important;
}
</style>