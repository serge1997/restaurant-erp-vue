<template>
    <FormTemplate
        :title="getTitle()"
        @submitData="onSubmit"
        :itemId="form.id"
        @on-clear-form="onClearForm"
    >
        <div class="w-100 mb-2">
            <div class="col-md-12 mb-2">
                <Input
                    v-model="form.name"
                    @blur="v.form.name.$touch()"
                    :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                    placeholder="Digite o nome"
                >
                    <template #label>
                        Nome <span class="text-danger">*</span>
                    </template>
                </Input>
            </div>
            <div class="col-md-12 mb-2">
                <Select
                    v-model="form.category_id"
                    :options="options.categories"
                    @blur="v.form.category_id.$touch()"
                    @change="onSelectCategory"
                    :error="v.form.category_id.$error ? v.form.category_id.$errors[0]?.$message : ''"
                    placeholder="Selecione"
                >
                    <template #label>
                        Categoria <span class="text-danger">*</span>
                    </template>
                </Select>
            </div>
            <div class="row mb-2">
                <div class="col-6">
                    <Input
                        v-model="form.min_quantity"
                        placeholder="Digite a quantidade minima"
                    >
                        <template #label>
                            Quantidade minima
                        </template>
                    </Input>
                </div>
                <div class="col-md-6">
                    <Select
                        v-if="form.category_id && category && category?.isMl()"
                        :options="unitMlMeasureOptions"
                        v-model="form.unit_contain"
                        optionLabel="label"
                        optionValue="value"
                        :hasFilter="true"
                        placeholder="Selecione o volume"
                    >
                        <template #label>
                            Conteudo por unidade de compra <span class="text-danger">*</span>
                        </template>
                    </Select>
                    <Input
                        v-else
                        v-model="form.unit_contain"
                        @blur="v.form.unit_contain.$touch()"
                        :error="v.form.unit_contain.$error ? v.form.unit_contain.$errors[0]?.$message : ''"
                        :isDisable="true"
                    >
                        <template #label>
                            Conteudo por unidade de compra
                        </template>
                    </Input>
                </div>
            </div>
            <div class="col-md-12 mb-2">
                <Textarea
                    v-model="form.description"
                    label="Descriçao"
                    placeholder="Digite a descriçao do produto"
                />
            </div>
            <div>
                <Switch
                    v-model="form.is_active"
                />
            </div>
        </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>