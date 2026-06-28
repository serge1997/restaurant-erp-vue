import type { AuthResponse } from "@/types/auth/Auth";
import baseService from "./baseService";
import type { HttpResponse } from "@/shared/http/response";

export default {
    ...baseService,
    modulePath: 'auth',

    async login(form: any): Promise<HttpResponse<AuthResponse>> {
        return await this.create<AuthResponse>(form, `${this.modulePath}/login`)
    }
}