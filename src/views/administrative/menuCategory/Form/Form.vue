<template>
    <FormTemplate
        :title="title"
        :dataEdit="dataEdit"
        @on-clear-form="onClearForm"
        @submitData="onSubmit"
    >
        <div>
            <Input
                placeholder="Digite o nome"
                v-model="form.name"
                @blur="v.form.name.$touch()"
                :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
            >
                <template #label>
                    Nome <span class="text-danger">*</span>
                </template>
            </Input>
        </div>
        <div>
            <Textarea
                label="Descriçao"
                placeholder="Digite a descriçao"
                v-model="form.description"
            />
        </div>
        <div class="mt-3">
            <InputFileUpload 
                @file-selected="setFileSelected"
            />
        </div>
    </FormTemplate>
</template>

<script src="./script.ts" lang="ts"></script>