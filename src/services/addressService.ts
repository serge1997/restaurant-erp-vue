import baseService from "./baseService";

export default {
    ...baseService,
    modulePath: 'addresses',
    serviceTitle: '',

    async getByCep(cep: string) {
        return this.client.get(`${this.modulePath}/cep/${cep}`)
    },

    async getStates() {
        return this.client.get(`states?limit=1000&offset=0`)
    }
}