<template>
    <FormTemplate
        :itemId="form.id"
        :title="getTitle()"
        @on-clear-form="onClearForm"
        @submitData="onSubmit"
    >
        <div class="w-100">
            <div class="col-md-12 mb-2">
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
            <div class="row mb-2">
                <div class="col-md-6">
                    <Input 
                        v-model="form.email"
                        placeholder="Digite o e-mail"
                    >
                        <template #label>
                            Email
                        </template>
                    </Input>
                </div>
                <div class="col-md-6">
                    <InputMask
                        v-model="form.phone"
                        mask="(99) 99999-9999"
                        placeholder="(99) 99999-9999"
                    >
                        <template #label>
                            Phone <span class="text-danger">*</span>
                        </template>
                    </InputMask>
                </div>
            </div>
            <div>
                <Switch
                    v-model="form.is_active"
                />
            </div>
        </div>
    </FormTemplate>
</template>
<script src="./script.ts" lang="ts"></script>