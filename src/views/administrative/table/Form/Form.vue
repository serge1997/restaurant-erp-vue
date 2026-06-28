<template>
    <FormTemplate
        :title="getTitle()"
        :hasMenu="true"
        @on-clear-form="onClearForm"
        @submitData="onSubmit"
        :itemId="form.id"
    >
       <div class="col-12">
            <SectionTitle
                title="Identifiçao"
                icon="pi-receipt s-sm"
            />
            <div class="row mb-3">
                <div class="col-md-6 d-flex flex-column">
                    <label>Numero <span class="c-danger">*</span></label>
                    <InputNumber
                        v-model="form.number"
                        @blur="v.form.number.$touch()"
                    />
                    <span class="c-danger s-sm" v-if="v.form.number.$error">{{  v.form.number.$errors[0]?.$message  }}</span>
                </div>
                <div class="col-md-6 d-flex flex-column">
                    <label>Capacidade <span class="c-danger">*</span></label>
                    <InputNumber
                        v-model="form.capacity"
                        @blur="v.form.capacity.$touch()"
                    />
                    <span class="c-danger s-sm" v-if="v.form.capacity.$error">{{  v.form.capacity.$errors[0]?.$message  }}</span>
                </div>
            </div>
            <div class="row mb-3">
                <Select
                    v-model="form.room_id"
                    :options="options.rooms"
                    @hide="v.form.room_id.$touch()"
                    :error="v.form.room_id.$error ? v.form.room_id.$errors[0]?.$message : ''"
                >
                    <template #label>
                        Sala <span class="c-danger">*</span>
                    </template>
                </Select>
            </div>
            <div class="row mb-3">
                <Input 
                    label="Nome / identificaçao"
                    v-model="form.name"
                />
            </div>
            <SectionTitle
                title="Formato da mesa"
                icon="pi-circle s-sm"
            />
            <div class="row mb-3 d-flex align-items-center justify-content-between p-2">
                <div 
                    v-for="shape in shapes" 
                    class="w-30 option-icon-card d-flex flex-column cursor-p gap-1 justify-content-center align-items-center rounded-2 py-2 px-4"
                    :class="setSelectedShapeClass(shape)"
                    @click="selectedSchape(shape)"
                >
                    <span v-if="shape.shape"><i :class="`${shape.shape} fs-1 title3`"></i></span>
                    <span v-else style="width:55px;height:40px;display:flex;align-items:center;justify-content:center;">
                        <svg viewBox="0 0 28 20" fill="none"><rect x="2" y="2" width="25" height="17" rx="3" stroke="#7E959E" stroke-width="2"/></svg>
                    </span>
                    <span class="title3">{{ shape.name }}</span>
                </div>
            </div>
            <SectionTitle
                title="Status"
                icon="pi-unlock s-sm"
            />
            <div class="row">
                <Switch 
                    v-model="form.is_active"
                />
            </div>
       </div>
    </FormTemplate>
</template>

<script src="./script.ts"></script>