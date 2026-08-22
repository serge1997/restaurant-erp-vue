<template>
    <FormTemplate
        :title="getTitle()"
        @submitData="onSubmit"
        :itemId="form.id"
        @on-clear-form="onClearForm"
    >
        <form class="w-100">
            <div class="row mb-3">
                <div class="col-md-12">
                    <Input
                        v-model="form.customer"
                        placeholder="Digite o nome do cliente"
                        @blur="v.form.customer.$touch()"
                        :error="v.form.customer.$error ? v.form.customer.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            Nome do cliente <span class="text-danger">*</span>
                        </template>
                    </Input>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <DatePicker
                        @blur="v.form.date.$touch()"
                        :error="v.form.date.$error ? v.form.date.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            Data <span class="text-danger">*</span>
                        </template>
                    </DatePicker>
                </div>
                <div class="col-md-6">
                    <DatePicker
                        @blur="v.form.hour.$touch()"
                        :error="v.form.hour.$error ? v.form.hour.$errors[0]?.$message : ''"
                        :timeOnly="true"
                    >
                        <template #label>
                            Hora <span class="text-danger">*</span>
                        </template>
                    </DatePicker>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-12">
                    <Input
                        v-model="form.quantity_of_person"
                        placeholder="Digite a quantidade de pessoa"
                        @blur="v.form.quantity_of_person.$touch()"
                        :error="v.form.quantity_of_person.$error ? v.form.quantity_of_person.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            Quantidade de pessoas <span class="text-danger">*</span>
                        </template>
                    </Input>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-12">
                    <Select
                        v-model="form.table_id"
                        placeholder="Selecione a(s) mesa(s)"
                        @hide="v.form.table_id.$touch()"
                        :error="v.form.table_id.$error ? v.form.table_id.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            Mesa(s) <span class="text-danger">*</span>
                        </template>
                    </Select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <Textarea
                        v-model="form.observation"
                        label="Observaçao"
                        placeholder="Informe uma especificaçao / observaçao do cliente"
                    />
                </div>
            </div>
        </form>
    </FormTemplate>
</template>

<script src="./script.ts"></script>
