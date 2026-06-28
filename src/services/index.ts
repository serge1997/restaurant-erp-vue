import type { Paginate } from "@/shared/http/paginate";
import type { HttpResponse } from "@/shared/http/response";

export interface Service {
    serviceTitle: string,
    modulePath: string,
    getOne<T>(id: number): Promise<HttpResponse<T>>
    getAll<T>(paginate: Paginate): Promise<HttpResponse<Array<T>>>
    create(form: any): Promise<HttpResponse<any>>
    update(form: any): Promise<HttpResponse<any>>
    delete(id: number): Promise<HttpResponse<any>>
}