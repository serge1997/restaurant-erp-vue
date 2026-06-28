<template>
    <FileUpload 
        ref="fileUpload"
        :file-limit="filesLimit"
        @select="onFileSeletected"
    >
        <template #header="{chooseCallback, clearCallback, uploadCallback, files}">
            <Button class="rounded-circle py-2 px-2 border-blue-primary bg-primary-secondary" @click="onSelectFile(files)" icon="pi pi-file c-blue-primary"></Button>
            <Button @click="clearCallback()" class="rounded-circle py-2 px-2" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
        </template>
        <template #content="{files, removeFileCallback}">
            <div v-for="(file, index) in files" class="card p-0 mb-1 border-0">
                <div class="card-header border-0 bg-transparent d-flex justify-content-end p-0">
                    <Button @click="removeFileCallback(index)" class="rounded-circle py-1 px-1" icon="pi pi-times s-sm" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                </div>
                <div class="card-body rounded-3 d-flex align-items-center gap-2 px-2 bg-primary-secondary c-blue-primary p-0 py-1">
                    <div class="d-flex align-items-center">
                        <i :class="`pi ${!isImage(file) ? 'pi-file' : 'pi-image'} fs-5`"></i>
                    </div>
                   <div class="d-flex flex-column ">
                        <span class="s-md">Arquivo: <span class="cfw-sm">{{ file.name }}</span></span>
                        <span class="s-md">Tamanho: <span class="cfw-sm">{{ formatSize(file.size) }}</span></span>
                   </div>
                </div>
            </div>
        </template>
        <template #empty>
            <div @click="onSelectFile([])" class="d-flex align-items-center justify-content-center flex-column cursor-p">
                <i class="pi pi-cloud-upload border-gray-secondary c-blue-primary rounded-circle fs-1 text-400 border-400" />
                <p class="mb-0 bg-primary-secondary px-3 s-sm rounded-3 c-blue-primary">
                    <i class="pi pi-info-circle"></i>
                    Arastar e soltar o arquivo clicar no botao em cima.
                </p>
            </div>
        </template>
    </FileUpload>
</template>

<script lang="ts">
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        FileUpload
    },
    props: {
        filesLimit: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            files: [] as Array<File>,
            imageExtions: ['png', 'jpg', 'jpeg']
        }
    },

    methods: {
        async onSelectFile(files: Array<File>) {
            const fileUploadComponent = this.$refs.fileUpload as {choose: Function}
            fileUploadComponent.choose()
            this.files = files
        },
        formatSize(bytes: number) {
            const k = 1024;
            if (bytes === 0){
                return `0 KB`
            }
            const sizeInKB = Math.round(bytes / k)
            return `${sizeInKB} KB`
        },
        isImage(file: File): boolean {
            const extension = file.type.split('/')[1] as string
            console.log(extension)
            return this.imageExtions.includes(extension.trim())
        },
        onFileSeletected(uploaded: FileUploadSelectEvent){
            this.$emit('fileSelected', uploaded.files)
        }
    }
})
</script>