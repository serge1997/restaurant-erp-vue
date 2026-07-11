<template>
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 left-box min-vh-100" style="">
                    <div class="left-panel">
                        <div class="brand">
                            <div class="brand-mark">
                                <svg viewBox="0 0 18 18" fill="none">
                                <rect x="1" y="1" width="7" height="7" rx="2" fill="white"/>
                                <rect x="10" y="1" width="7" height="7" rx="2" fill="white" opacity=".5"/>
                                <rect x="1" y="10" width="7" height="7" rx="2" fill="white" opacity=".5"/>
                                <rect x="10" y="10" width="7" height="7" rx="2" fill="white" opacity=".3"/>
                                </svg>
                            </div>
                            <span class="brand-name">Resto<span>ERP</span></span>
                        </div>
                    </div>
                    <div class="left-content d-flex flex-column">
                        <div class="rl-steps" id="left-steps">
                            <div 
                                v-for="step in steps" 
                                class="step-item cursor-p" id="ls-0"
                                :class="stepOnClass(step.step)"
                            >
                                <div v-if="!stepIsCompleted(step.step)" class="si-circle">{{ step.step }}</div>
                                <div v-else class="si-circle"><i class="pi pi-check s-sm"></i></div>
                                <div class="si-info">
                                    <div class="si-label">{{ step.title }}</div>
                                    <div class="si-desc">{{ step.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 d-flex flex-column register-form-side bg-white">
                    <div v-if="isCurrentStep(1)">
                        <div class="border-bottom d-flex justify-content-between p-2">
                            <div>
                                <div class="form-tab-title">Inicio</div>
                                <div class="form-tab-desc">Gerencia um ou mais estabelicimento</div>
                            </div>
                            <div class="d-flex align-items-center">
                               <span class="title3">{{ currentStep }} de {{ maxSteps }}</span>
                            </div>
                        </div>
                        <div class="col-md-12 p-2">
                            <CardMultipleOptions
                                :options="options?.optionMultipleRestaurant"
                                height="auto"
                                scrollHeight="auto"
                                v-model="form.is_chain"
                                type="radio"
                            />
                        </div>
                    </div>
                    <div v-if="isCurrentStep(2)" class="resposable-data">
                        <div class="border-bottom d-flex justify-content-between p-2">
                            <div>
                                <div class="form-tab-title">Sua conta</div>
                                <div class="form-tab-desc">Comece com seus dados pessoais de acesso</div>
                            </div>
                            <div class="d-flex align-items-center">
                               <span class="title3">{{ currentStep }} de {{ maxSteps }}</span>
                            </div>
                        </div>
                        <Divider align="left">
                            <small style="margin: 0;" class="c-gray-primary">Dados do responsavel da conta</small>
                        </Divider>
                        <div class="col-md-12 mb-2">
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
                        <div class="col-md-12">
                            <Input
                                placeholder="Digite o seu CPF"
                                v-model="form.account_responsable_country_registration_number"
                                @blur="v.form.account_responsable_country_registration_number.$touch()"
                                :error="v.form.account_responsable_country_registration_number.$error ? v.form.account_responsable_country_registration_number.$errors[0]?.$message : ''"
                            >
                                <template #label>
                                    <span>CPF<span class="text-danger">*</span></span>
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
                                        @blur="v.form.account_responsable_email.$touch()"
                                        :error="v.form.account_responsable_email.$error ? v.form.account_responsable_email.$errors[0]?.$message : ''"
                                    >
                                        <template #label>
                                            <span>E-mail<span class="text-danger">*</span></span>
                                        </template>
                                    </Input>
                                </div>
                            </div>
                        </div>

                        <Divider align="left">
                            <small style="margin: 0;" class="c-gray-primary">Endereço</small>
                        </Divider>
                        <div class="col-md-12 mb-2">
                            <Input
                                placeholder="Digite o cep"
                                v-model="form.account_responsable_address.cep"
                                label="CEP"
                                @blur="searchAddressByCep"
                            />
                        </div>
                        <div class="col-md-12 mb-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite a rua/evenida..."
                                        v-model="form.account_responsable_address.street"
                                        label="Rua"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite o bairro..."
                                        v-model="form.account_responsable_address.neighborhood"
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
                                        v-model="form.account_responsable_address.state"
                                        :options="options.states"
                                        option-value="uf"
                                        label="UF"
                                        @hide="onStateChange"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <Select
                                        placeholder="Informe a cidade"
                                        v-model="form.account_responsable_address.city_id"
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
                                        v-model="form.account_responsable_address.number"
                                        label="Numero"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite o complemento"
                                        v-model="form.account_responsable_address.complement"
                                        label="Complemento"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isCurrentStep(3)" style="height: 100%;" class="">
                        <div class="border-bottom d-flex justify-content-between p-2">
                            <div>
                                <div class="form-tab-title">Dados da empresa</div>
                                <div class="form-tab-desc">Informe os dados da empresa ou grupo</div>
                            </div>
                            <div class="d-flex align-items-center">
                               <span class="title3">{{ currentStep }} de {{ maxSteps }}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center d-none">
                            <div class="hint-box mt-3">
                                <i class="pi pi-info-circle" aria-hidden="true"></i>
                                <p>Se você possui mais de um restaurante, cadastre aqui os dados da sua empresa ou grupo. Para restaurante único, use os dados do próprio restaurante.</p>
                            </div>
                        </div>
                       <ScrollPanel class="pb-5">
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
                                    <span>CNPJ<span class="text-danger">*</span></span>
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
                            <small style="margin: 0;" class="c-gray-primary">Endereço</small>
                        </Divider>
                        <div class="col-md-12 mb-2">
                            <Input
                                placeholder="Digite o cep"
                                v-model="form.address.cep"
                                @blur="searchAddressByCep"
                            >
                                <template #label>
                                    <span>CEP<span class="text-danger">*</span></span>
                                </template>
                            </Input>
                        </div>
                        <div class="col-md-12 mb-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite a rua/evenida..."
                                        v-model="form.address.street"
                                    >
                                        <template #label>
                                            <span>Rua<span class="text-danger">*</span></span>
                                        </template>
                                    </Input>
                                </div>
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite o bairro..."
                                        v-model="form.address.neighborhood"
               
                                    >
                                        <template #label>
                                            <span>Bairro<span class="text-danger">*</span></span>
                                        </template>
                                    </Input>
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
                                        @hide="onStateChange"
                                    >
                                        <template #label>
                                            <span>Estado<span class="text-danger">*</span></span>
                                        </template>
                                    </Select>
                                </div>
                                <div class="col-md-6">
                                    <Select
                                        placeholder="Informe a cidade"
                                        v-model="form.address.city_id"
                                        :options="options.cities"
                                    >
                                        <template #label>
                                            <span>Cidade<span class="text-danger">*</span></span>
                                        </template>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <Input
                                        placeholder="Digite o numero"
                                        v-model="form.address.number"
                                    >
                                        <template #label>
                                            <span>Numero<span class="text-danger">*</span></span>
                                        </template>
                                    </Input>
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
                    </ScrollPanel>
                    </div>
                    <div class="p-2" v-if="isCurrentStep(4)">
                        <div class="border-bottom d-flex justify-content-between p-2 mb-3">
                            <div>
                                <div class="form-tab-title">Seu Plano</div>
                                <div class="form-tab-desc">Escholhe um plano</div>
                            </div>
                            <div class="d-flex align-items-center">
                               <span class="title3">{{ currentStep }} de {{ maxSteps }}</span>
                            </div>
                        </div>
                        <div class="plan-grid" id="plan-grid">
                            <div class="plan-card" onclick="selectPlan(1)">
                            <div class="plan-name">Trial</div>
                            <div style="margin-top:6px">
                                <span class="plan-price">Grátis</span>
                                <div class="plan-period">por 14 dias</div>
                            </div>
                            <div class="plan-features">
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>1 restaurante</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Pedidos e mesas</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Cardápio básico</div>
                                <div class="pf" style="opacity:.4"><i class="ti ti-x" aria-hidden="true"></i>Estoque</div>
                                <div class="pf" style="opacity:.4"><i class="ti ti-x" aria-hidden="true"></i>Relatórios</div>
                            </div>
                            </div>
                            <div class="plan-card on" onclick="selectPlan(1)">
                            <div class="plan-badge">Mais popular</div>
                            <div class="plan-name">Básico</div>
                            <div style="margin-top:6px">
                                <span class="plan-price">R$ 149</span>
                                <div class="plan-period">por mês</div>
                            </div>
                            <div class="plan-features">
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>1 restaurante</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Pedidos e mesas</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Cardápio completo</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Controle de estoque</div>
                                <div class="pf" style="opacity:.4"><i class="ti ti-x" aria-hidden="true"></i>Relatórios avançados</div>
                            </div>
                            </div>
                            <div class="plan-card" onclick="selectPlan(1)">
                            <div class="plan-name">Premium</div>
                            <div style="margin-top:6px">
                                <span class="plan-price">R$ 299</span>
                                <div class="plan-period">por mês</div>
                            </div>
                            <div class="plan-features">
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Múltiplos restaurantes</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Tudo do básico</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Relatórios avançados</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>NFC-e integrado</div>
                                <div class="pf"><i class="ti ti-check" aria-hidden="true"></i>Suporte prioritário</div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isCurrentStep(5)" class="confirmation">
                        <div class="border-bottom d-flex justify-content-between p-2 mb-3">
                            <div>
                                <div class="form-tab-title">Confirmaçao</div>
                                <div class="form-tab-desc">Revise as informaçoes antes de criar sua conta</div>
                            </div>
                            <div class="d-flex align-items-center">
                               <span class="title3">{{ currentStep }} de {{ maxSteps }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <div class="summary-card">
                                <div class="sc-head">
                                    <i class="pi pi-user s-md" aria-hidden="true"></i>
                                    <span class="sc-head-title">Conta</span>
                                </div>
                                <div class="sc-body">
                                    <div class="sc-row">
                                        <span class="sc-key">Nome</span>
                                        <span class="sc-val" id="s-name">{{ form.account_responsable_name }}</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">E-mail</span>
                                        <span class="sc-val" id="s-email">{{ form.account_responsable_email }}</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">Usuário</span>
                                        <span class="sc-val" id="s-user">{{ form.account_responsable_email }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-card">
                                <div class="sc-head">
                                    <i class="pi pi-building s-md" aria-hidden="true"></i>
                                    <span class="sc-head-title">Empresa</span>
                                </div>
                                <div class="sc-body">
                                    <div class="sc-row">
                                        <span class="sc-key">Nome</span>
                                        <span class="sc-val" id="s-company">{{ form.name }}</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">CNPJ</span>
                                        <span class="sc-val" id="s-cnpj">{{ form.cpf_cnpj }}</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">E-mail</span>
                                        <span class="sc-val" id="s-comp-email">{{ form.email }}</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">Endereço</span>
                                        <span class="sc-val" id="s-comp-email">{{ form.address.street }} - {{ form.address.number }}/{{form.address.cep}} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-card">
                                <div class="sc-head">
                                    <i class="pi pi-credit-card s-md" aria-hidden="true"></i>
                                    <span class="sc-head-title">Planos</span>
                                </div>
                                <div class="sc-body">
                                    <div class="sc-row">
                                        <span class="sc-key">Nome</span>
                                        <span class="sc-val" id="s-rest">—</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">Cidade</span>
                                        <span class="sc-val" id="s-city">—</span>
                                    </div>
                                    <div class="sc-row">
                                        <span class="sc-key">Plano</span>
                                        <span class="sc-val" id="s-plan">Básico</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hint-box d-none">
                                <i class="ti ti-shield-check" aria-hidden="true"></i>
                                <p>Ao confirmar você concorda com os Termos de Uso e Política de Privacidade. Seus dados estão protegidos e não serão compartilhados com terceiros.</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="isCurrentStep(maxSteps+1)" class="d-flex flex-column align-items-center justify-content-center p-5">
                        <div class="ts-ico">
                            <svg viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="ts-title">Cadastro realizado!</div>
                        <div class="scs-desc">Um e-mail de confirmaçao foi enviado a <b>{{ form.account_responsable_email }} </b>. Clique no link enviado para realizar o login.</div>
                    </div>
                    <div v-if="!stepsAreConcluded" style="bottom: 0px; z-index: 999;" class="col-md-8 px-4 d-non bg-white shadow-sm position-fixed btn-button">
                        <div class="gap-2 d-flex py-2 justify-content-end">
                            <div>
                                <span class="login-link">Já tem conta? <a @click="$router.push({name: 'login'})">Fazer login</a></span>
                            </div>
                            <Button 
                                class="btn-white-primary bg-white" 
                                label="Voltar" 
                                icon="pi pi-angle-left s-sm"
                                iconPosition="left"
                                @click="previousStep"
                            />
                            <Button 
                                v-if="!isCurrentStep(maxSteps)"
                                class="btn-green-primary d-flex justify-content-center" 
                                label="Proximo" 
                                icon="pi pi-angle-right s-sm"
                                @click.prevent="nextFromStep"
                            />
                            <Button 
                                v-else
                                class="btn-green-primary d-flex justify-content-center" 
                                label="Criar conta" 
                                icon="pi pi-check s-sm"
                                @click.prevent="submitResgiter"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>