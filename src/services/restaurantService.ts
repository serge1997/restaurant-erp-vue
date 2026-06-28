import baseService from "./baseService";

export default {
    ...baseService,
    modulePath: 'restaurants',
    serviceTitle: 'Restaurante',


    async storeFiles(form: any) {
        return this.create(form, `${this.modulePath}/files`)
    }
}