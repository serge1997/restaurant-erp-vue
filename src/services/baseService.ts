import client from "@/shared/http/client"
import type { Paginate } from "@/shared/http/paginate"
import paginateToQueryUrl from "@/shared/http/paginate"
import type { HttpResponse } from "@/shared/http/response"
import { useNotify } from "@/shared/utility/notify"

export default {
    modulePath: '',
    serviceTitle: '',
    client: client,
   
    async getOne<T>(id: number): Promise<HttpResponse<T>> {
        const req = await client.get<T>(`${this.modulePath}/${id}`)
        return req
    },

    async getAll<T>(params: Paginate): Promise<HttpResponse<Array<T>>> {
        const toQueryUrl = paginateToQueryUrl(params)
        const completeUrl = `${this.modulePath}?${toQueryUrl}`
        const response = await client.get<Array<T>>(completeUrl)
        return response
    },
    async create<T>(form: any, path?: string):Promise<HttpResponse<T>> {
        const response = await client.post<T>(`${path||this.modulePath}`, form)
        return response
    },
    async update(form: any):Promise<HttpResponse<any>> {
        const response = await client.put(`${this.modulePath}`, form)
        return response
    },

    async delete(id: number):Promise<HttpResponse<any>> {
        const response = await client.delete(`${this.modulePath}/${id}`)
        return response
    }

}