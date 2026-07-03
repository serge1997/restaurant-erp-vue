import baseService from "./baseService"

export default {
    ...baseService,
    modulePath: 'cities',
    serviceTitle: '',

    async getByState(uf: string) {
        return this.client.get(`${this.modulePath}/state/${uf}`)
    }
}