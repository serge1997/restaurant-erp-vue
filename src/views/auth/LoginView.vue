<template>
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9 left-box min-vh-100">
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
                        <div class="left-headline">
                            Gestão completa<br>para o seu <span>restaurante</span>
                        </div>
                        <div class="left-desc">
                            Controle pedidos, mesas, cozinha e caixa em um único sistema integrado e moderno.
                        </div>
                        <div class="features">
                            <div class="feature">
                                <div class="feature-ico">
                                    <svg viewBox="0 0 14 14" fill="none"><path d="M1.5 1.5h11v11h-11zM5 1.5v11M1.5 5h3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="feature-txt">Gestão de mesas e salas em tempo real</span>
                            </div>
                        <div class="feature">
                                <div class="feature-ico">
                                    <svg viewBox="0 0 14 14" fill="none"><path d="M2 11l2.5-2.5m0 0L7 6M4.5 8.5L7 6m0 0l4-4M7 6l2 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="2" r="1.5" fill="currentColor"/></svg>
                                </div>
                                <span class="feature-txt">Pedidos e KDS integrados à cozinha</span>
                            </div>
                        <div class="feature">
                            <div class="feature-ico">
                                <svg viewBox="0 0 14 14" fill="none"><path d="M7 1v4M7 9v4M1 7h4M9 7h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                            </div>
                            <span class="feature-txt">Controle de permissões por função</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 right-box min-vh-100">
                    <div class="right-panel">
                        <div id="form-state">
                            <div class="form-eyebrow">Acesso ao sistema</div>
                                <div class="form-title">Bem-vindo de volta</div>
                            <div class="form-sub">Entre com suas credenciais para continuar</div>
                        </div>
                    </div>
                    <div class="c-danger">
                        <small>{{ loginErrorResponse }}</small>
                    </div>
                    <div class="fg w-100">
                        <label class="fl">E-mail ou usuário</label>
                        <input v-model="form.username" type="text" id="f-email" placeholder="sergio49">
                        <div class="error-msg" id="err-email" style="display:none">
                        </div>
                    </div>

                    <div class="fg w-100">
                        <label class="fl">Senha</label>
                        <div class="input-wrap">
                            <input v-model="form.password" type="password" id="f-pass" placeholder="••••••••" />
                        </div>
                    </div>

                    <div class="w-100 btn-buttons d-flex gap-1 flex-column align-items-center justify-content-center p-2">
                        <Button 
                            label="Entrar no sistema"
                            class="login-button w-75 rounded-3 py-1"
                            :icon="`pi ${loginBtnIcon} s-xs px-1`"
                            :isDisable="isDisable"
                            @click="login"
                        />
                        <a class="title3 cursor-p" @click="$router.push({name: 'register'})">Criar conta</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./style.css"></style>
<script src="./script.ts"></script>