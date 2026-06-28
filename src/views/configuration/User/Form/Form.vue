<template>
    <FormTemplate
        :title="getTitle()"
        @submitData="onSubmit"
        @on-clear-form="onClearForm"
        :itemId="form.id"
    >
        <div class="row d-flex justify-content-center">
            <TabView>
                <TabPanel header="Informaçoes">
                    <SectionTitle
                        title="Identificaçao"
                        icon="pi-receipt s-sm"
                        class="mb-3"
                    />
                    <div class="row p-0 mb-2">
                        <div class="col-md-6">
                            <Input
                                v-model="form.name"
                                @blur="v.form.name.$touch()"
                                :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Nome do completo <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="col-md-6">
                            <Input
                                v-model="form.username"
                                @blur="v.form.username.$touch()"
                                :error="v.form.username.$error ? v.form.username.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Login <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                    </div>
                    <div class="row p-0 mb-2">
                        <div class="col-md-6">
                            <Input
                                v-model="form.phone"
                                @blur="v.form.phone.$touch()"
                                :error="v.form.phone.$error ? v.form.phone.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Celular <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="col-md-6">
                            <Input
                                v-model="form.email"
                                label="E-mail"
                            >
                            </Input>
                        </div>
                    </div>
                    <div class="row p-0">
                        <Input 
                            v-model="form.cpf"
                            @blur="v.form.cpf.$touch()"
                            :error="v.form.cpf.$error ? v.form.cpf.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                CPF <span class="c-danger">*</span>
                            </template>
                        </Input>
                    </div>
                    <div class="row p-0 mt-2">
                        <DatePicker
                            v-model="form.birth_date"
                            label="Data de nascimento"
                        />
                    </div>
                    <div class="row mt-2">
                        <MultipleOptions
                            v-model="form.gender"
                            :hasSearch="false" 
                            type="radio"
                            height="auto"
                            optionBoxClasses="gap-2"
                            :options="[{id: 'M', name: 'Masculino'}, {id: 'F', name: 'Feminino'}, {id: 'O', name: 'Outro'}]"
                        />
                    </div>
                    <SectionTitle
                        title="Status e contato"
                        icon="pi-receipt s-sm"
                        class="mb-3"
                    />
                    <div class="col-12 mt-1">
                        <div class="w-100 rounded-3 m-auto b-bg-surface3 d-flex justify-content-between align-items-center py-2 px-2">
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
                    <SectionTitle
                        title="Acessos"
                        icon="pi-lock s-sm"
                        class="mt-3"
                    />
                    <MultiSelect
                        :options="options.roles"
                        v-model="form.roles"
                        @change="onSelectRole"
                    >

                    </MultiSelect>
                </TabPanel>
                <TabPanel header="Endereço">
                    <div class="row p-0 mb-2">
                        <Input
                            v-model="form.address.cep"
                            @blur="v.form.address.cep.$touch()"
                            :error="v.form.address.cep.$error ? v.form.address.cep.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                CEP <span class="c-danger">*</span>
                            </template>
                        </Input>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-7">
                            <Input
                                v-model="form.address.street"
                                @blur="v.form.address.street.$touch()"
                                :error="v.form.address.street.$error ? v.form.address.street.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Rua <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="col-md-5">
                            <Input
                                v-model="form.address.number"
                                @blur="v.form.address.number.$touch()"
                                :error="v.form.address.number.$error ? v.form.address.number.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Número <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <Input
                                v-model="form.address.neighborhood"
                                @blur="v.form.address.neighborhood.$touch()"
                                :error="v.form.address.neighborhood.$error ? v.form.address.neighborhood.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Bairro <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                    </div>
                    <div class="row p-0 mb-2">
                        <div class="col-md-6">
                            <Input
                                v-model="form.address.city"
                                @blur="v.form.address.city.$touch()"
                                :error="v.form.address.city.$error ? v.form.address.city.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Cidade <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="col-md-6">
                            <Input
                                v-model="form.address.state"
                                @blur="v.form.address.state.$touch()"
                                :error="v.form.address.state.$error ? v.form.address.state.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    Estado <span class="c-danger">*</span>
                                </template>
                            </Input>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <Input
                            v-model="form.address.complement"
                            label="Complemento"
                        >
                        </Input>
                    </div>
                </TabPanel>
                <TabPanel header="Permissões">
                    <ScrollPanel class="w-100">
                        <div style="height: 750px;">
                            <div v-for="module in options.modules" :key="module.id">
                            <SectionTitle
                                :title="module.name"
                                :icon="`${module.icon} title1`"
                                titleClass="title1-sm"
                            />
                            <div v-for="group in module.routeGroupes">
                                <span class="px-1 text-uppercase title3">{{ group.name }}</span>
                                <div class="px-3">
                                    <MultipleOptions
                                        v-model="form.permissions"
                                        :options="group.permissions"
                                        :hasSearch="false" 
                                        height="auto"
                                        optionLabel="description"
                                        optionValue="name"
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                    </ScrollPanel>
                </TabPanel>
            </TabView>
        </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>

<style>
.p-scrollpanel .p-scrollpanel-wrapper .p-scrollpanel-content {
    display: flex !important;
    gap: 5px;
}
</style>