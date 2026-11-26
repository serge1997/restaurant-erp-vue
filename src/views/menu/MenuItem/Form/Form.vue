<template>
    <FormTemplate
        :title="title"
        :hasMenu="true"
        @submitData="onSubmit"
        @on-clear-form="clearForm"
        :itemId="form.id"
        :isDisableSaveBtn="isDisableSaveBtn"
    >
        <template #form-menu>
            <ul class="list-group mi-menu-list">
                <li
                    class="list-group-item border-0 cursor-p" v-if="form.enable_technical_sheet"
                    @click="openTechnicalSheetModal"
                    >
                        {{ hasTechnicalsheet ? 'Alterar ficha técnica' : 'Gerar ficha técnica' }}
                </li>
                <li
                    class="list-group-item border-0 cursor-p"
                    @click="openShowTechnicalsheetModal"
                    v-if="hasTechnicalsheet"
                >
                        Visualizar ficha tecnica
                </li>
                <li class="list-group-item border-0 cursor-p" v-if="hasTechnicalsheet">Imprimir ficha Tecnica</li>
            </ul>
        </template>
        <TabView class="mi-tabs">
            <TabPanel header="Informaçoes">
                <div class="mi-form">
                    <section class="mi-section">
                        <SectionTitle
                            title="Dados Gerais"
                            icon="pi-receipt s-sm"
                        />
                        <div class="mi-field">
                            <Input
                                v-model="form.name"
                                placeholder="Digite o nome"
                                @blur="v.form.name.$touch()"
                                :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Nome <span class="text-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="mi-field mt-2">
                            <Select
                                v-model="form.category_id"
                                :options="options?.categories"
                                :hasFilter="true"
                                placeholder="Selecione a categoria"
                                @hide="v.form.category_id.$touch()"
                                :error="v.form.category_id.$error ? v.form.category_id.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Categoria <span class="text-danger">*</span>
                                </template>
                            </Select>
                        </div>
                        <div class="mi-field mt-2">
                            <Textarea
                                placeholder="Digite a descriçao"
                                v-model="form.description"
                                @blur="v.form.description.$touch()"
                                :error="v.form.description.$error ? v.form.description.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Descriçao <span class="text-danger">*</span>
                                </template>
                            </Textarea>
                        </div>
                        <div class="mi-switch-row mt-2">
                            <Switch
                                label="Ficha técnica"
                                v-model="form.enable_technical_sheet"
                            />
                        </div>
                    </section>

                    <section class="mi-section">
                        <SectionTitle
                            title="Serviço & status"
                            icon="pi-tags s-sm"
                        />
                        <div class="mi-grid mi-grid-3">
                            <div class="d-flex flex-column">
                                <label class="mi-label">Preço <span class="text-danger">*</span></label>
                                <InputNumber
                                    placeholder="Digite o preço"
                                    v-model="form.price"
                                    locale="pt-BR"
                                    mode="currency"
                                    currency="BRL"
                                    @blur="v.form.price.$touch()"
                                />
                                <small class="text-danger px-1 s-sm" v-if="v.form.price.$error ">{{ v.form.price.$errors[0]?.$message }}</small>
                            </div>
                            <div class="d-flex flex-column">
                                <label class="mi-label">Preparo (hh:mm)</label>
                                <InputNumber
                                    placeholder="Digite o tempo cozimento"
                                    locale="pt-BR"
                                    v-model="form.cooking_time"
                                    class="d-none"
                                />
                                <DatePicker
                                    :timeOnly="true"
                                    v-model="form.cooking_time"
                                    :showIcon="false"
                                />
                            </div>
                            <div class="d-flex flex-column">
                                <label class="mi-label">Serve</label>
                                <InputNumber
                                    placeholder="Digite a quantidade de pessoa"
                                    locale="pt-BR"
                                    v-model="form.for_quantity_of_person"
                                />
                            </div>
                        </div>
                        <div class="mi-status-row mt-2">
                            <div class="mi-status-info">
                                <i :class="isActiveIconClass" class="pi pi-circle-fill s-xs"></i>
                                {{ isActiveLabel }}
                            </div>
                            <Switch
                                label=""
                                v-model="form.is_active"
                            />
                        </div>
                    </section>

                    <section class="mi-section">
                        <SectionTitle
                            title="Destaque"
                            icon="pi-sparkles s-sm"
                        />
                        <Transition mode="out-in" appear>
                            <div v-if="hasPromotionalSelected" class="mi-field mi-field-narrow mb-2">
                                <label class="mi-label">Preço promocional</label>
                                <InputNumber
                                    placeholder="R$ 00.00"
                                    locale="pt-BR"
                                    mode="currency"
                                    currency="BRL"
                                    v-model="form.promotional_price"
                                />
                            </div>
                        </Transition>
                        <CardMultipleOptions
                            :options="options?.featureMenuitems"
                            height="auto"
                            scrollHeight="auto"
                            v-model="form.featured_types"
                        />
                    </section>

                    <section class="mi-section">
                        <SectionTitle
                            title="Foto"
                            icon="pi-camera s-sm"
                        />
                        <InputFileUpload
                            v-model="form.image"
                            @fileSelected="loadImage"
                        />
                    </section>
                </div>
            </TabPanel>
            <TabPanel v-if="form.id && form.enable_technical_sheet" header="Ficha técnica">
                <div class="mi-form">
                    <section class="mi-section">
                        <SectionTitle title="Ingredientes" icon="pi-list s-sm" />
                        <div class="mi-ingredients">
                            <div class="mi-ingredients-head">
                                <span>Ingrediente</span>
                                <span>Qtd/und</span>
                                <span>Custo R$</span>
                                <span></span>
                            </div>
                            <div v-for="(item, index) of sheetDetails.items" class="mi-ingredient-row">
                                <div class="mi-ing-product">
                                    <AutoComplete
                                        v-model="sheetData[index].product"
                                        option-label="name"
                                        :suggestions="products"
                                        @complete="productsAutocomplete"
                                    />
                                </div>
                                <div class="mi-ing-qty">
                                    <Input
                                        v-model="sheetData[index].quantity"
                                        @input="onInputSheetProductQuantity(index)"
                                    />
                                </div>
                                <div class="mi-ing-cost">
                                    <Input
                                        v-model="item.cost"
                                        :isDisable="true"
                                    />
                                </div>
                                <Button
                                    icon="pi pi-times"
                                    class="btn-white-primary mi-ing-remove"
                                    @click="removeProductFromSheet(index)"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-2 btn-button">
                            <Button
                                label="Adicionar ingredientes"
                                class="w-100 d-flex justify-content-center btn-dotted-white"
                                icon="pi pi-plus"
                                @click="addItemToSheet"
                            />
                        </div>
                        <div class="mi-total-bar mt-2">
                            <span class="mi-total-label">Custo total dos ingredientes</span>
                            <div class="d-flex gap-2 align-items-center">
                                <span class="mi-total-value">{{ sheetDetails.totalCost }} R$</span>
                                <Tag class="px-3 tag-greenlight" :value="`${sheetDetails.marge}%`" />
                            </div>
                        </div>
                    </section>
                </div>
            </TabPanel>
        </TabView>
        <Dialog v-model:visible="visibleTechnicalSheetModal" position="top" modal :style="{ width: '40rem' }">
            <template #header>
                <h6>Ficha técnica {{ title }} {{ form.id }}</h6>
            </template>
            <TechnicalSheetForm
                :options="sheetOptions"
                :currentmenuItem="form.id"
                @close-modal="visibleTechnicalSheetModal = false"
                :menuItem="getItemEdit"
            />
        </Dialog>
        <Dialog :closable="false" class="show-sheet-modal border-0" v-model:visible="visibleShowTechnicalsheetModal" position="top" modal :style="{ width: '55rem' }">
            <template #header>
                <h6 class="d-none">Ficha técnica {{ title }} {{ form.id }}</h6>
                <div
                    class="header-container w-100"
                    :style="`background: linear-gradient(to bottom, rgba(13,26,31,0.1) 0%, rgba(13,26,31,0.72) 100%), url(${form.image}) center/cover no-repeat;`"
                >
                    <div class="px-2 d-flex gap-3">
                        <Tag
                            :value="form.category?.name"
                            class="px-2 rounded-1 sheet-item-category sheet-item-tag"
                        />
                        <Tag
                            :value="form.is_active ? 'Ativo' : 'Inativo'"
                            class="px-2 rounded-1 sheet-item-status sheet-item-tag"
                        />
                        <Tag
                            :value="form.code"
                            class="px-2 rounded-1 sheet-item-code sheet-item-tag"
                        />
                    </div>
                    <div class="d-flex flex-column px-2 mb-2">
                        <span class="sheet-item-title">{{ form.name }}</span>
                        <span class="sheet-item-subtitle">Serve {{ form.for_quantity_of_person }} pessoa(s) - Preparo {{ getItemEdit?.cooking_time_label }}</span>
                    </div>
                </div>
            </template>
            <div class="row mt-2">
                <div class="col-md-9 d-flex flex-column gap-1">
                    <Divider align="left" type="solid">
                        <b>Descriçao</b>
                    </Divider>
                    <div class="col-md-6 px-2 sheet-item-desc">
                        {{ getItemEdit.description }}
                    </div>
                    <Divider align="left" type="solid">
                        <b>compisiçao de ingredientes</b>
                    </Divider>
                    <div>
                        <DataTableTemplate
                            :hasHeader="false"
                            :columns="sheetColumns"
                            :data="sheetDetails.items"
                        />
                    </div>
                </div>
                <div class="col-md-3 d-flex flex-column content-right-side">
                    <Divider align="left" type="solid">
                        <b>preço de venda</b>
                    </Divider>
                    <div class="px-3">
                        <span class="sheet-item-price">{{ getItemEdit.price.label }}</span>
                    </div>
                    <Divider align="left" type="solid">
                        <b>dados do prato</b>
                    </Divider>
                    <div>
                        <ul class="list-group">
                            <li class="list-group-item p-0 border-0 bg-transparent sheet-item-meta-l d-flex justify-content-between">
                                Tempo de preparo
                                <span class="sheet-item-meta-v">{{ getItemEdit.cooking_time_label }}</span>
                            </li>
                            <li class="list-group-item p-0 border-0 bg-transparent sheet-item-meta-l d-flex justify-content-between">
                                Porcao
                                <span class="sheet-item-meta-v">{{ getItemEdit.for_quantity_of_person }} pessoa (s)</span>
                            </li>
                        </ul>
                    </div>
                    <Divider align="left" type="solid">
                        <b>Destaque</b>
                    </Divider>
                    <div>
                        <ul class="list-group">
                            <li
                                v-for="label in getItemFeatureLabels"
                                class="list-group-item p-0 border-0 bg-transparent title3 d-flex align-items-center gap-3"
                            >
                                <i class="pi pi-circle-fill c-green-secondary s-xxs"></i>
                                <span class="sheet-item-meta-v">{{ label }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
           </div>
           <template #footer>
                <div class="btn-button d-flex align-items-center gap-2">
                    <Button
                        class="btn-white-primary"
                        label="Imprimir"
                        icon="pi pi-print s-sm"
                    />
                    <Button
                        class="btn-white-primary"
                        label="Cancelar"
                        icon="pi pi-times s-xs"
                        @click="visibleShowTechnicalsheetModal = false"
                    />
                </div>
           </template>
        </Dialog>
    </FormTemplate>
</template>
<script src="./script.ts" lang="ts"></script>
<style src="./style.css" scoped></style>
