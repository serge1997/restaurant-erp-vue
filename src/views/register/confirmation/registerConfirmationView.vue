<script setup lang="ts">
import Dialog from 'primevue/dialog';
import preRegistrationService from '@/services/preRegistrationService';
import { useNotify } from '@/shared/utility/notify';
import { handleError } from '@/shared/utility/utils';
import type { PreRegistrationProps } from '@/types/preRegistration/preRegistration';
import { required } from '@/validators';
import useVuelidate from '@vuelidate/core';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const notify = useNotify()
const form = reactive({
    id: 0,
    password: null,
    password_confirmation: null,
    gender: null
})
const visibleResendTokenModal = ref(false)
const preRegistration = ref<PreRegistrationProps>()
const validationRules = computed(() => ({
    password: {required},
    password_confirmation: {required},
    gender: {required}
}))
const v$ = useVuelidate(validationRules, form)
const options = {
    genders: [
        {value: "M", label: "Masculino"},
        {value: "F", label: "Feminino"},
        {value: "O", label: "Outro"},
    ]
}
const visibleGenericResultDialog = ref(false)
const visibleResultTemplate = ref(false)
const resultTitle = ref("")
const resultContent = ref("")
const apiCallIsSuccess = ref(false)

const getPreRegistration = async (token: string) => {
    try{
        visibleGenericResultDialog.value = false
        const { data } = await preRegistrationService.getByToken(token)
        preRegistration.value = data
        form.id = preRegistration.value.id
        if (preRegistration.value.confirmation_token_expired){
            visibleResendTokenModal.value = true
        }
        apiCallIsSuccess.value = true
    }catch(err) {
        handleError(err, notify)
        resultTitle.value = "Url invalido"
        resultContent.value = "Realiza o seu cadastro para continuar."
        apiCallIsSuccess.value = false
        visibleResultTemplate.value = true
        visibleGenericResultDialog.value = true
    }
    //populate
}
const submitPreRegistrationConfirmation = async () => {
    try{
        await preRegistrationService.confirmation(form)
        resultTitle.value = "Registro confirmado com successo !"
        resultContent.value = ""
        apiCallIsSuccess.value = true
        visibleResultTemplate.value = true
        visibleGenericResultDialog.value = true
    }catch(err) {
        handleError(err, notify)
    }
}
const regenerateConfirmationToken = async () => {
    try{
        const request = await preRegistrationService.regenerateConfirmationToken(form.id)
        resultTitle.value = "Novo link enviado !"
        resultContent.value = "Verifique seu email para confirmar o seu cadastro."
        apiCallIsSuccess.value = true
        visibleResultTemplate.value = true
    }catch(err){
        handleError(err, notify)
    }
}
onMounted( async () => {
    const token  = route.params.token
    if (!token || !token.length) {
        return
    }
   await getPreRegistration(token.toString())
})
</script>

<template>
    <div class="container d-flex justify-content-center">
        <div class="col-md-10 d-flex justify-content-center">
            <div class="card bg-transparent border-0 col-md-5">
                <div class="card-body">
                    <form @submit="submitPreRegistrationConfirmation" class="d-flex flex-column align-items-center justify-content-center min-vh-100">
                        <div class="form-top w-100">
                            <div class="ct-brand">
                                <div class="ct-mark">
                                    <i class="pi pi-th-large" style="font-size:13px;color:#fff" aria-hidden="true"></i>
                                </div>
                                <span class="ct-name">Resto<span>ERP</span></span>
                            </div>
                            <div class="ct-ico">
                                <i class="pi pi-thumbs-up" style="font-size:22px;color:#5DCAA5" aria-hidden="true"></i>
                            </div>
                            <p class="ct-title">Confirme seu cadastro</p>
                            <p class="ct-sub">Defina sua senha e finalize a criação da sua conta</p>
                            <div class="ct-user">
                                <div class="ct-av">{{ preRegistration?.account_responsable_avatar }}</div>
                                <div>
                                    <div class="ct-uname">{{ preRegistration?.account_responsable_name }}</div>
                                    <div class="ct-uemail">{{ preRegistration?.account_responsable_email }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="w-100 mb-2">
                            <Input
                                v-model="form.password"
                                placeholder="Digite sua senha"
                                @blur="v$.password.$touch()"
                                :error="v$.password.$error ? v$.password.$errors[0]?.$message : ''"
                                 type="password"
                            >
                                <template #label>
                                    Senha <span class="text-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="w-100">
                            <Input
                                v-model="form.password_confirmation"
                                placeholder="Confirme a sua senha"
                                @blur="v$.password_confirmation.$touch()"
                                :error="v$.password_confirmation.$error ? v$.password_confirmation.$errors[0]?.$message : ''"
                                type="password"
                            >
                                <template #label>
                                    Confirme a Senha <span class="text-danger">*</span>
                                </template>
                            </Input>
                        </div>
                        <div class="w-100">
                            <CardMultipleOptions
                                :options="options.genders"
                                v-model="form.gender"
                                height="auto"
                                scrollHeight="auto"
                                optionLabel="label"
                                optionValue="value"
                                type="radio"
                            >
                                <template #label>
                                    <label>Genero <span class="text-danger">*</span></label>
                                </template>
                            </CardMultipleOptions>
                        </div>
                        <div class="w-100 btn-button">
                            <Button 
                                class="btn-green-primary w-100 d-flex justify-content-center" 
                                label="Confirmar o cadastro" 
                                @click="submitPreRegistrationConfirmation"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Dialog 
        v-model:visible="visibleGenericResultDialog" 
        modal :style="{width: '25rem'}"
        closeIcon=" "
    >
        <ResultTemplate
            v-if="visibleResultTemplate"
            :isSucess="apiCallIsSuccess"
            :title="resultTitle"
            :content="resultContent" 
        >
                <template #actions>
                    <div class="btn-button mt-2">
                        <Button 
                            class="btn-green-primary" 
                            label="Ir na tela de login" 
                            @click="$router.push({name: 'login'})"
                        />
                    </div>
                </template>
            </ResultTemplate>
    </Dialog>
    <Dialog 
        v-model:visible="visibleResendTokenModal" 
        modal :style="{width: '25rem'}"
        closeIcon=" "
    >
        <template #header></template>
        <div class="w-100 resend-dialog">
            <ResultTemplate
                v-if="visibleResultTemplate"
                :isSuccess="apiCallIsSuccess"
                :title="resultTitle"
                :content="resultContent" 
            >
                <template #actions>
                    <div class="btn-button mt-2">
                        <Button 
                            class="btn-green-primary" 
                            label="Ir na tela de login" 
                            @click="$router.push({name: 'login'})"
                        />
                    </div>
                </template>
            </ResultTemplate>
            <div v-if="!visibleResultTemplate" class="header d-flex flex-column align-items-center justify-content-center">
                <div class="h-icon d-flex justify-content-center align-items-center position-relative">
                    <i class="pi pi-stopwatch"></i>
                    <div class="position-absolute h-icon-times d-flex align-items-center justify-content-center">
                        <i class="pi pi-times text-white"></i>
                    </div>
                </div>
                <div class="h-title p-1">
                    <h5>Link expirado</h5>
                </div>
                <div class="h-desc title3 text-center p-3">
                    O link de confirmação que você acessou expirou. Links de confirmação são válidos por <strong>24 horas</strong> por segurança.
                </div>
            </div>
            <div  v-if="!visibleResultTemplate" class="body">
                <div class="content p-1 px-2 d-flex gap-2 align-items-center b-bg-surface3 rounded-3">
                    <i class="pi pi-envelope"></i>
                    <span>Solicite um novo link e verifique sua caixa de entrada em <strong>{{ preRegistration?.account_responsable_email }}</strong>.</span>
                </div>
            </div>
        </div>
        <template v-if="!visibleResultTemplate" #footer>
            <div class="w-100 d-flex flex-column gap-2 btn-button">
                <Button 
                    class="btn-green-primary d-flex justify-content-center" 
                    label="Reenviar novo link" 
                    icon="pi pi-send s-sm"
                    @click.prevent="regenerateConfirmationToken"
                />
                <Button 
                    class="btn-white-primary d-flex justify-content-center" 
                    label="Ir na tela de login" 
                    icon="pi pi-times s-sm"
                    @click="$router.push({name: 'login'})"
                />
            </div>
        </template>
    </Dialog>
</template>

<style src="./style.css"></style>