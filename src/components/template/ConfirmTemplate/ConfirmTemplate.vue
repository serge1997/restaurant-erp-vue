<template>
    <ConfirmDialog :group="group"  :style="{ width:'20em'}">
        <template #container="{ message, rejectCallback }">
            <div class="d-flex flex-column align-items-center py-5 surface-overlay border-round">
                <div class="confirm-icon-circle bg-green-primary d-flex justify-content-center align-items-center rounded-circle">
                    <i class="pi pi-question fs-2"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-1">{{ message.header }}</span>
                <p class="mb-0 px-2">{{ message.message }}</p>
                <div class="d-flex btn-button align-items-center gap-2 mt-4">
                    <Button label="Confirmar" @click="$emit('acceptCallback')" class="btn-green-primary"></Button>
                    <Button label="Cancel" outlined @click="rejectCallback" class="btn-white-primary"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>
</template>

<script>
import { defineComponent } from "vue"
import ConfirmDialog from 'primevue/confirmdialog';
export default defineComponent({
    name: "ConfirmTemplate",
    components: {
        ConfirmDialog
    },

    props: {
        group: {
            type: String,
            default: 'global'
        }
    },
    data(){
        return {

        }
    }
})
</script>