import type { PreRegistrationProps } from "@/types/preRegistration/preRegistration";
import baseService from "./baseService";

export default {
    ...baseService,
    modulePath: 'preRegistrations',
    serviceTitle: 'Relizar o cadastro',

    getByToken(token?: string) {
        return this.client.get<PreRegistrationProps>(`${this.modulePath}/listByToken/${token}`)
    },

    confirmation(form: object) {
        return this.client.put(`${this.modulePath}/confirmation`, form)
    },
    regenerateConfirmationToken(id: number) {
        return this.client.put(`${this.modulePath}/regenerateConfirmationToken/${id}`, null)
    }
}