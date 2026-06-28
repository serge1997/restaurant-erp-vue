import axios from "./axios";
import type { HttpResponse } from "./response";


export default {
    domaine: 'http://localhost:8000/api',

    async get<T>(path: string): Promise<HttpResponse<T>> {
       const {data} = await axios.get<HttpResponse<T>>(`${this.domaine}/${path}`);
       return data
    },
    async post<T>(path: string, payload: any): Promise<HttpResponse<T>> {
        const response = await axios.post<HttpResponse<T>>(`${this.domaine}/${path}`, payload)
        return response.data
    },
    async put<T>(path: string, payload: any): Promise<HttpResponse<T>> {
        const response = await axios.put<HttpResponse<T>>(`${this.domaine}/${path}`, payload)
        return response.data
    },
    async delete(path: string): Promise<any> {
        const response = await axios.delete(`${this.domaine}/${path}`)
        return response.data
    },
    async patch<T>(path: string, payload: any): Promise<HttpResponse<T>> {
        const response = await axios.patch<HttpResponse<T>>(`${this.domaine}/${path}`, payload)
        return response.data
    }, 
    async pdf<T>(path: string, name: string): Promise<void> {
        const request = await axios.get(`${this.domaine}/${path}`, {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(
            new Blob([request.data], {type: 'application/pdf'})
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${name}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        window.URL.revokeObjectURL(url)
     }, 
}