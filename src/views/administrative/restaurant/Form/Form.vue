<template>
    <FormTemplate
        :title="title"
        :form="form"
        :dataEdit="dataEdit"
        @submitData="storeRestaurant"
        @on-clear-form="onClearForm"
        :saveBtnLabel="submitButtonLabel"
    >
    <TabView v-model:active-index="formPanelIndex">
        <TabPanel header="Cadastro">
            <div class="row">
                <Divider align="left">
                    <small style="margin: 0;" class="c-gray-primary">Dados Gerais</small>
                </Divider>
                <div class="col-md-12 mb-2">
                    <Input
                    placeholder="Digite o nome do restaurante"
                    v-model="form.name"
                    @blur="v.form.name.$touch()"
                    :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            <span>Nome <span class="text-danger">*</span></span>
                        </template>
                    </Input>
                </div>
                <div class="col-md-12 mb-2">
                    <Input
                        placeholder="Digite a razao social"
                        v-model="form.corporate_name"
                        @blur="v.form.corporate_name.$touch()"
                        :error="v.form.corporate_name.$error ? v.form.corporate_name.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            <span>Razao social <span class="text-danger">*</span></span>
                        </template>
                    </Input>
                </div>
                <div class="row mb-2">
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o endreço"
                            v-model="form.address"
                            @blur="v.form.address.$touch()"
                            :error="v.form.address.$error ? v.form.address.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                <span>Endereço <span class="text-danger">*</span></span>
                            </template>
                        </Input>
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o numero"
                            v-model="form.number"
                            @blur="v.form.number.$touch()"
                            :error="v.form.number.$error ? v.form.number.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                <span>Numero <span class="text-danger">*</span></span>
                            </template>
                        </Input>
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <Input
                        placeholder="Digite o CPF / CNPJ"
                        v-model="form.corporate_registration"
                        @blur="v.form.corporate_registration.$touch()"
                        :error="v.form.corporate_registration.$error ? v.form.corporate_registration.$errors[0]?.$message : ''"
                    >
                        <template #label>
                            <span>CPF / CNPJ <span class="text-danger">*</span></span>
                        </template>
                    </Input>
                </div>
                <div class="col-md-12 mb-2">
                    <Switch
                        v-model="form.is_active"
                        label="Ativo"
                    >
                    </Switch>
                </div>
                <div class="row mb-2">
                    <Divider align="left">
                        <small class="c-gray-primary">Contatos</small>
                    </Divider>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o email"
                            v-model="form.email"
                        >
                            <template #label>
                                <span>E-mail</span>
                            </template>
                        </Input>
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o numero de telephone"
                            v-model="form.phone"
                            @blur="v.form.phone.$touch()"
                            :error="v.form.phone.$error ? v.form.phone.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                <span>Celular <span class="text-danger">*</span></span>
                            </template>
                        </Input>
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <Divider align="left">
                        <small style="margin: 0;" class="c-gray-primary">Controle de custos</small>
                    </Divider>
                <div class="row">
                        <div class="col-md-6">
                            <InputMask
                                placeholder="00.00%"
                                v-model="form.fix_margim"
                            >
                                <template #label>
                                    <span>Margem fixa</span>
                                </template>
                            </InputMask>
                        </div>
                        <div class="col-md-6">
                            <InputMask
                                placeholder="00.00%"
                                v-model="form.loss_margim"
                            >
                                <template #label>
                                    <span>Margem de perda</span>
                                </template>
                            </InputMask>
                        </div>
                </div>
                <div class="row">
                        <div class="col-md-6">
                            <InputMask
                                placeholder="00.00%"
                                v-model="form.variable_margim"
                            >
                                <template #label>
                                    <span>Margem variavel</span>
                                </template>
                            </InputMask>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <Switch
                        v-model="form.enable_technical_sheet"
                        label="Habilitar ficha técnica"
                    >
                    </Switch>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Arquivos">
            <div class="col-md-12 mb-2">
                <label class="p-1">Logo</label>
                <InputFileUpload 
                    v-model="form.logo"
                    @fileSelected="loadImage"
                />
            </div>
            <div class="col-md-12">
                <label class="p-1">Ceritificado digital</label>
                <InputFileUpload 
                    v-model="form.logo"
                    @fileSelected="loadImage"
                />
            </div>
        </TabPanel>
        <TabPanel header="Dados fiscais">
        </TabPanel>
    </TabView>
    </FormTemplate>
</template>

<script src="./script.ts"></script>