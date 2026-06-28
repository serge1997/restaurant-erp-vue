export interface Paginate {
    limit?: number
    offset?: number
    search?: ''
    query?: any
}

export default function paginateToQueryUrl(paginate: Paginate): string {
    const customQuery = paginate.query ?? {is_active: true}
    const all = {limit: paginate.limit ?? 1000, offset: paginate.offset ?? 0, search: paginate.search ?? '', ...customQuery}
    let urlString = ""
    Object.keys(all).forEach(k => {
        if (Array.isArray(all[k])) {
            const ArrQueryString = all[k].map(v => `${k}[]=`+ encodeURIComponent(v)).join("&")
            urlString += ArrQueryString + "&"
        }else{
            if(all[k] === null){
                urlString += `${k}=&`
            }else{
                urlString += `${k}=${all[k]}&`
            }
        }
    })
    return urlString
}