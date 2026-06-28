<template>
    <FormTemplate
        :form="form"
        :title="getTitle()"
        @submitData="onStore"
        @on-clear-form="clearForm"
        :formTitleIconClass="formTitleiconClass"
        :saveBtnLabel="getSaveBtnLabel"
    >
        <div class="row">
            <div class="ref-grid border-bottom py-3" id="ref-grid">
                <div class="ref-card" :class="selectedRefTypeClass(1)" data-ref="gastos_quebrados" data-dir="out" @click="selectRef(1)" style="grid-column:span 2">
                    <div class="ref-card-ico" style="background:var(--gl)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M12 6H5a3 3 0 000 6h4" stroke="#059669" stroke-width="1.3" stroke-linecap="round"/><path d="M10 4l2 2-2 2" stroke="#059669" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Entrada de requisiçao</div>
                        <div class="ref-card-dir ref-dir-in">↓ Entrada</div>
                    </div>
                </div>
                <div class="ref-card" :class="selectedRefTypeClass(6)" data-ref="entrada_manual" data-dir="in" @click="selectRef(6)">
                    <div class="ref-card-ico" style="background:var(--gl)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M7 2v8M3.5 6.5L7 10l3.5-3.5" stroke="#059669" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12h10" stroke="#059669" stroke-width="1.4" stroke-linecap="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Entrada manual</div>
                        <div class="ref-card-dir ref-dir-in">↑ Entrada</div>
                    </div>
                </div>

                <div class="ref-card" :class="selectedRefTypeClass(7)" data-ref="saida_manual" data-dir="out" @click="selectRef(7)">
                    <div class="ref-card-ico" style="background:var(--rl)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M7 10V2M3.5 5.5L7 2l3.5 3.5" stroke="#DC2626" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12h10" stroke="#DC2626" stroke-width="1.4" stroke-linecap="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Saída manual</div>
                        <div class="ref-card-dir ref-dir-out">↓ Saída</div>
                    </div>
                </div>

                <div class="ref-card" :class="selectedRefTypeClass(4)" data-ref="devolucao_cliente" data-dir="in" @click="selectRef(4)">
                    <div class="ref-card-ico" style="background:var(--bl)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M2 6h7a3 3 0 010 6H5" stroke="#2563EB" stroke-width="1.3" stroke-linecap="round"/><path d="M4 4L2 6l2 2" stroke="#2563EB" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Devolução cliente</div>
                        <div class="ref-card-dir ref-dir-in">↑ Entrada</div>
                    </div>
                </div>

                <div class="ref-card" :class="selectedRefTypeClass(3)" data-ref="devolucao_fornecedor" data-dir="out" @click="selectRef(3)">
                    <div class="ref-card-ico" style="background:#F5F3FF">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M12 6H5a3 3 0 000 6h4" stroke="#7C3AED" stroke-width="1.3" stroke-linecap="round"/><path d="M10 4l2 2-2 2" stroke="#7C3AED" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Devolução fornecedor</div>
                        <div class="ref-card-dir ref-dir-out">↓ Saída</div>
                    </div>
                </div>

                <div class="ref-card" :class="selectedRefTypeClass(5)" data-ref="gastos_quebrados" data-dir="out" @click="selectRef(5)" style="grid-column:span 2">
                    <div class="ref-card-ico" style="background:var(--aml)">
                        <svg viewBox="0 0 14 14" fill="none"><path d="M7 2l5 9H2L7 2z" stroke="#D97706" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 6v2M7 9.5v.5" stroke="#D97706" stroke-width="1.3" stroke-linecap="round"/></svg>
                    </div>
                    <div class="ref-card-body">
                        <div class="ref-card-name">Gastos / Quebrados / Desperdício</div>
                        <div class="ref-card-dir ref-dir-out">↓ Saída — perda operacional</div>
                    </div>
                </div>
            </div>
            <Divider class="py-2" align="left" type="solid">
                <b>Movimentaçao selecionada</b>
            </Divider>
            <div v-if="!form.reference_type" class="tcard-empty">
                <span>Selecione um tipo de movimentaçao em cima </span>
            </div>
            <div v-if="form.reference_type" class="d-flex justify-content-center">
                <div class="dir-indicator w-100" :class="`${!formTitleiconClass ? 'dir-none' : formTitleiconClass}`" id="dir-indicator" style="margin-bottom:14px">
                    <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/></svg>
                    <span id="dir-label">{{ getStockMovmentRefTypeLabel ? getStockMovmentRefTypeLabel.label : 'Selecione um tipo acima' }} </span>
                </div>
            </div>
            <div v-if="!isManualMovement" class="w-100">
                <div class="col-12 mb-2 mt-3 d-none">
                    <Select
                        v-model="form.reference_type"
                        :options="options?.stockMovmentTypes"
                        optionLabel="label"
                        optionValue="value"
                    >
                        <template #label>
                            Tipo de movimentaçao <span class="text-danger">*</span>
                        </template>
                    </Select>
                </div>
                <div class="col-12 mb-2">
                    <Select
                        v-model="form.reference_id"
                        :options="options?.purchaseRequests"
                        :hasFilter="true"
                        @hide="v.form.reference_id.$touch()"
                        :error="v.form.reference_id.$error ? v.form.reference_id.$errors[0]?.$message : ''"
                        optionLabel="code"
                        optionValue="id"
                        @change="getProducts($event)"
                    >
                        <template #label>
                            Código da requisiçao <span class="text-danger">*</span>
                        </template>
                        <template #options="option">
                            <div 
                                :class="disabledRequistionStatusOnSelect(option.option.status.value) ? 'disabled' : ''"
                                :disabled="true"
                            >
                                {{ option.option.code }} - <span :class="getRequisitionStatus(option.option.status.value).severity">{{ option.option.status.label }}</span>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="col-12 mb-2">
                    <Select
                        v-model="form.supplier_id"
                        :options="options?.suppliers"
                        :hasFilter="true"
                        optionLabel="name"
                        optionValue="id"
                    >
                        <template #label>
                            Fornecedor
                        </template>
                    </Select>
                </div>
                <div v-if="currentProduct" class="col-md-12 m-auto">
                    <div class="card-body bg-gray-alert d-flex justify-content-between py-1 px-1 cursor-p">
                        <div class="d-flex align-items-center gap-2">
                            <span><i class="border p-1 px-1 py-1 s-sm rounded-circle pi pi-box"></i></span>
                            <span class="s-md">{{ currentProduct.product.name }}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="s-sm cfw-sm">{{ currentProduct.ordered_quantity }} {{ productRequestUnitMeasureLabel(currentProduct.unit_of_measure) }} pedido</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <Select
                            v-model="form.product_id"
                            :options="options.products"
                            :hasFilter="true"
                            @hide="v.form.product_id.$touch()"
                            :error="v.form.product_id.$error ? v.form.product_id.$errors[0]?.$message : ''"
                            optionLabel="name"
                            optionValue="id"
                            @change="getPurchaseRequisition($event)"
                        >
                            <template #label>
                                Produto <span class="text-danger">*</span>
                            </template>
                        </Select>
                    </div>
                    <div class="col-md-6">
                        <Input 
                            v-model="form.quantity"
                            placeholder="Digite a quantidade"
                            @blur="v.form.quantity.$touch()"
                            :error="v.form.quantity.$error ? v.form.quantity.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                Quantidade <span class="text-danger">*</span>
                            </template>
                        </Input>
                    </div>
                </div>
                <div class="col-md-6 d-flex mt-2 flex-column">
                <label>Custo unitario <span class="text-danger">*</span></label>
                <InputNumber 
                        placeholder="Digite o preço"
                        v-model="form.cost"
                        locale="pt-BR"
                        mode="currency"
                        currency="BRL"
                        @blur="v.form.cost.$touch()"
                />
                <small class="text-danger px-1 s-sm" v-if="v.form.cost.$error ">{{ v.form.cost.$errors[0]?.$message }}</small>
                </div>
                <div v-if="movmentTypeIsPurchase" class="col-md-12 mt-2">
                    <Button 
                        label="Ver detalhes"
                        class="py-1 px-2 rounded-3 c-blue-primary s-md"
                        :icon="`pi ${showDetailButtonIcon}`"
                        @click="togglePurchaseDetailBox"
                    />
                </div>
                <div class="col-md-12 show-purchase-detail-box d-none">
                    <DataTableTemplate
                        tableRowCountTitle="Total de produtos"
                        :columns="columnDetails"
                        :data="purchaseDetails"
                        columnHeaderFw="fw-normal"
                    />
                </div>
            </div>
            <div v-if="isManualMovement && form.reference_type" class="w-100">
                <div class="col-md-12 mb-2">
                    <Select
                        v-model="form.product_id"
                        :options="options.products"
                        :hasFilter="true"
                        @hide="v.form.product_id.$touch()"
                        :error="v.form.product_id.$error ? v.form.product_id.$errors[0]?.$message : ''"
                        optionLabel="name"
                        optionValue="id"
                        @change="getPurchaseRequisition($event)"
                    >
                        <template #label>
                            Produto <span class="text-danger">*</span>
                        </template>
                    </Select>
                </div>
                <div class="row mb-2">
                    <div class="col-md-6 d-flex flex-column">
                        <label>Quantity</label>
                        <InputNumber 
                            v-model="form.quantity"
                        />
                    </div>
                    <div class="col-md-6 d-flex flex-column">
                        <DatePicker 
                            label="Data"
                            v-model="form.moved_at_date"
                        />
                    </div>
                </div>
                <div v-if="showQuantityAlert" class="col-md-12 px-1 border-amber-left-2 mb-2 bg-amber-alert mt-2 p-1 d-flex align-items-center gap-1 w-100">
                    <i class="pi pi-info-circle s-md"></i>
                    <span class="s-md">O valor do campo quantidade deve ser informado em {{ currentProductUnitMeasureIsML ? 'ml' : 'gr'  }}.</span>
                </div>
                <div class="col-md-12">
                    <Textarea 
                        label="Observaçao"
                        placeholder="Descreva o motivo do lançamento..."
                        v-model="form.description"
                    />
                </div>
                <div v-if="form.product_id" class="col-md-12 py-1">
                    <Divider class="" align="left" type="solid">
                        <b>Prévia do estqoue</b>
                    </Divider>
                    <div class="card b-bg-surface2 mt-3">
                        <div class="card-body py-2">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                                    <span class="title3">Estoque atual</span>
                                    <span class="s-md fw-bold ff-fantasy">{{ lastProductMovment?.current_stock?.value }} <span class="text-lowercase">{{ lastProductMovment?.product.db_unit_size_label }}</span></span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0">
                                    <span class="title3">Movimentaçao</span>
                                    <span :class="isMovOut ? 'ref-dir-out' : 'ref-dir-in'" class="s-md fw-bold ff-fantasy">{{ isMovOut ? `- ${form.quantity}` : `+ ${form.quantity}`}} <span class="text-lowercase">{{ lastProductMovment?.product.db_unit_size_label }}</span></span>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer bg-transparent">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between bg-transparent border-0 p-0 mb-1">
                                    <span class="title-md">Novo estoque</span>
                                    <span class="title1 ff-fantasy">{{ getProductNewStock }} <span class="text-lowercase">{{ lastProductMovment?.product.db_unit_size_label }}</span></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FormTemplate>
</template>

<style src="./style.css"></style>
<script src="./script.ts" lang="ts"></script>