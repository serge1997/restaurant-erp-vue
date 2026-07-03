<template>
    <FormTemplate
        :title="getTitle()"
        :itemId="form.id"
        @on-clear-form="onClearForm"
        @submitData="onSubmit"
    >
        <div class="row" style="padding-bottom: 4rem;">
            <Divider align="left">
                <small style="margin: 0;" class="c-gray-primary">Dados Gerais</small>
            </Divider>
            <div class="col-md-12 mb-2">
                <Input
                    placeholder="Digite o nome fantasia da rede"
                    v-model="form.name"
                    @blur="v.form.name.$touch()"
                    :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                >
                    <template #label>
                        <span>Nome fantasia<span class="text-danger">*</span></span>
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
                        <span>Razao social<span class="text-danger">*</span></span>
                    </template>
                </Input>
            </div>
            <div class="col-md-12 mb-2">
                <Input
                    placeholder="Digite o CPF / CNPJ"
                    v-model="form.cpf_cnpj"
                    @blur="v.form.cpf_cnpj.$touch()"
                    :error="v.form.cpf_cnpj.$error ? v.form.cpf_cnpj.$errors[0]?.$message : ''"
                >
                    <template #label>
                        <span>CPF / CNPJ<span class="text-danger">*</span></span>
                    </template>
                </Input>
            </div>
            <Divider align="left">
                <small style="margin: 0;" class="c-gray-primary">Contatos</small>
            </Divider>
            <div class="col-md-12 mb-2">
                <Input
                    placeholder="Digite o email"
                    v-model="form.email"
                    label="E-mail"
                />
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o contato"
                            v-model="form.phone"
                            @blur="v.form.phone.$touch()"
                            :error="v.form.phone.$error ? v.form.phone.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                <span>Contato<span class="text-danger">*</span></span>
                            </template>
                        </Input>
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o contato comcercial"
                            v-model="form.comercial_contact"
                            label="Contato comercial"
                        />
                    </div>
                </div>
            </div>
            <Divider align="left">
                <small style="margin: 0;" class="c-gray-primary">Dados do responsavel da conta</small>
            </Divider>
            <div class="col-md-12">
                <Input
                    placeholder="Digite o nome do responsavel"
                    v-model="form.account_responsable_name"
                    @blur="v.form.account_responsable_name.$touch()"
                    :error="v.form.account_responsable_name.$error ? v.form.account_responsable_name.$errors[0]?.$message : ''"
                >
                    <template #label>
                        <span>Nome completo<span class="text-danger">*</span></span>
                    </template>
                </Input>
            </div>
            <div class="col-md-12 mt-2 mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o contato"
                            v-model="form.account_responsable_phone"
                            @blur="v.form.account_responsable_phone.$touch()"
                            :error="v.form.account_responsable_phone.$error ? v.form.account_responsable_phone.$errors[0]?.$message : ''"
                        >
                            <template #label>
                                <span>Contato<span class="text-danger">*</span></span>
                            </template>
                        </Input>
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o email"
                            v-model="form.account_responsable_email"
                            label="E-mail"
                        />
                    </div>
                </div>
            </div>

            <Divider align="left">
                <small style="margin: 0;" class="c-gray-primary">Endereço</small>
            </Divider>
            <div class="col-md-12 mb-2">
                <Input
                    placeholder="Digite o cep"
                    v-model="form.address.cep"
                    label="CEP"
                    @blur="searchAddressByCep"
                />
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite a rua/evenida..."
                            v-model="form.address.street"
                            label="Rua"
                        />
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o bairro..."
                            v-model="form.address.neighborhood"
                            label="Bairro"
                        />
                    </div>
                </div>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <Select
                            placeholder="Informe o estado"
                            v-model="form.address.state"
                            :options="options.states"
                            option-value="uf"
                            label="UF"
                            @hide="onStateChange"
                        />
                    </div>
                    <div class="col-md-6">
                        <Select
                            placeholder="Informe a cidade"
                            v-model="form.address.city_id"
                            :options="options.cities"
                            label="Cidade"
                        />
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o numero"
                            v-model="form.address.number"
                            label="Numero"
                        />
                    </div>
                    <div class="col-md-6">
                        <Input
                            placeholder="Digite o complemento"
                            v-model="form.address.complement"
                            label="Complemento"
                        />
                    </div>
                </div>
            </div>
        </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>