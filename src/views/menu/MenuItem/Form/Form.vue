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
            <ul class="list-group">
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
        <TabView>
            <TabPanel header="Informaçoes">
                <SectionTitle
                    title="Dados Gerais"
                    icon="pi-receipt s-sm"
                />
                <div class="col-12">
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
                <div class="row mt-3">
                    <div class="col-md-12">
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
                </div>
                <div class="col-md-12 mt-3">
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
                <div class="col-md-12 d-flex flex-column mt-3 mb-3">
                    <Switch 
                        label="Ficha técnica"
                        v-model="form.enable_technical_sheet"
                    />
                </div>
                <SectionTitle
                    title="Serviço & status"
                    icon="pi-image s-sm"
                />
                <div class="row">
                    <div class="col-4 d-flex flex-column">
                        <label>Preço <span class="text-danger">*</span></label>
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
                    <div class="col-4 d-flex flex-column">
                        <label>Preparo (hh:mm)</label>
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
                    <div class="col-4 d-flex flex-column">
                        <label>Serve </label>
                        <InputNumber
                            placeholder="Digite a quantidade de pessoa"
                            locale="pt-BR"
                            v-model="form.for_quantity_of_person"
                        />
                    </div>
                    <div class="col-12 mt-3">
                        <div class="w-100 rounded-3 m-auto b-bg-surface3 d-flex justify-content-between align-items-center mt-2 py-2 px-2">
                            <div class="text2 d-flex gap-2 align-items-center">
                                <i :class="isActiveIconClass" class="pi pi-circle-fill s-xs"></i>
                                {{ isActiveLabel }}
                            </div>
                            <Switch 
                                class="d-flex justify-content-end align-items-center"
                                label=""
                                v-model="form.is_active"
                            />
                        </div>
                    </div>
                </div>
                <SectionTitle
                    class="mt-3"
                    title="Destaque"
                    icon="pi-sparkles s-sm"
                />
                <div class="col-md-12">
                    <Transition mode="out-in" appear>
                        <div v-if="hasPromotionalSelected" class="col-4 d-flex flex-column">
                            <label>Preço promocional </label>
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
                </div>
                <SectionTitle
                    title="Foto"
                    icon="pi-image s-sm"
                />
                <div class="col-md-12 mb-3">
                    <InputFileUpload 
                        v-model="form.image"
                        @fileSelected="loadImage"
                    />
                </div>
            </TabPanel>
            <TabPanel v-if="form.id && form.enable_technical_sheet" header="Ficha técnica">
                <div class="row">
                    <div class="col-5 d-flex flex-column">
                        <SectionTitle
                            title="Ingrediente"
                        />

                        <div v-for="(item, index) of sheetDetails.items" class="row mb-2">
                            <AutoComplete 
                                v-model="sheetData[index].product"
                                option-label="name"
                                :suggestions="products"
                                @complete="productsAutocomplete"
                            />
                        </div>
                    </div>
                    <div class="col-3 d-flex flex-column">
                        <SectionTitle
                            title="qtd/und"
                        />
                        <div v-for="(item, index) of sheetDetails.items" class="row mb-2">
                            <Input 
                                v-model="sheetData[index].quantity"
                                @input="onInputSheetProductQuantity(index)"
                            />
                        </div>
                    </div>
                    <div class="col-4 d-flex flex-column">
                        <SectionTitle
                            title="Custo R$"
                        />
                        <div v-for="(item, index) of sheetDetails.items"  class="w-100 d-flex gap-2 mb-2">
                            <Input
                                v-model="item.cost"
                                :isDisable="true"
                            />
                            <Button 
                                icon="pi pi-times"
                                class="btn-white-primary"
                                @click="removeProductFromSheet(index)"
                            />
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center mt-2 btn-button">
                        <Button 
                            label="Adicionar ingredientes"
                            class="w-100 d-flex justify-content-center btn-dotted-white"
                            icon="pi pi-plus"
                            @click="addItemToSheet"
                        />
                    </div>
                    <div class="w-95 rounded-3 m-auto b-bg-surface3 d-flex justify-content-between mt-2 py-1">
                        <div class="title3 d-flex align-items-center">
                            Custo total dos ingredientes
                        </div>
                        <div class="d-flex gap-2 align-items-center">
                            <span class="title1">{{ sheetDetails.totalCost }} R$</span>
                            <Tag class="px-3 tag-greenlight" :value="`${sheetDetails.marge}%`" />
                        </div>
                    </div>
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