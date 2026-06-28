export interface HttpResponse<T> {
    message: string
    code: number
    data: T
    meta?: any
}