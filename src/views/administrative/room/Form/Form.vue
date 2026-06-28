<template>
    <FormTemplate
        :title="getTitle()"
        @submitData="onSubmit"
        @on-clear-form="onClearForm"
        :itemId="form.id"
    >
        <div class="row p-0">
            <SectionTitle
                title="Identificaçao"
                icon="pi-receipt s-sm"
            />
            <div class="col-md-12 mb-2">
                <Input
                    v-model="form.name"
                    @blur="v.form.name.$touch()"
                    :error="v.form.name.$error ? v.form.name.$errors[0]?.$message : ''"
                >
                    <template #label>
                        Nome da sala <span class="c-danger">*</span>
                    </template>
                </Input>
            </div>
            <div class="col-md-12 mb-2">
                <Textarea
                    label="Descriçao"
                    v-model="form.description"
                />
            </div>
            <div class="row mb-3">
                <div class="col-md-6 d-flex align-items-center">
                   <Select 
                        v-model="form.room_type_id"
                        class="w-100"
                        label="Tipo da sala"
                        :options="options.roomTypes"
                   />
                </div>
               <div class="col-md-6 d-flex flex-column">
                    <label>Capacidade <span class="c-danger">*</span></label>
                    <InputNumber
                        v-model="form.capacity"
                        @blur="v.form.capacity.$touch()"
                    />
                    <small class="text-danger px-1 s-sm" v-if="v.form.capacity.$error ">{{ v.form.capacity.$errors[0]?.$message }}</small>
               </div>
            </div>
            <div class="col-md-12 mb-2 d-flex align-items-center">
                    <Switch 
                        v-model="form.is_active"
                    />
            </div>
            <div class="row mb-3">
                <SectionTitle
                    title="Cor de identificaçao"
                    icon="pi-palette s-sm"
                />

                <div class="col-md-12">
                    <ColorPicker 
                        @set-color="setSeverity"
                        ref="colorPicker"
                        :form="form"
                    />
                </div>
            </div>
            <div class="row">
                <SectionTitle
                    title="Icon de identificaçao"
                    icon="pi-circle s-sm"
                />
                <IconPicker 
                    @setIcon="setIcon"
                    ref="iconPicker"
                    :form="form"
                />
            </div>
        </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>