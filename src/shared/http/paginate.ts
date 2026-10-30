export interface Paginate {
    limit?: number
    offset?: number
    search?: ''
    query?: any
    orderBy?: string
    direction?: string
}

export default function paginateToQueryUrl(paginate: Paginate): string {
    const customQuery = paginate.query ? paginate.query : {is_active: true}
    const all = {limit: paginate.limit ?? 1000, offset: paginate.offset ?? 0, search: paginate.search ?? '', ...customQuery}
    if(paginate.orderBy) {
        all.orderBy = paginate.orderBy
    }
    if(paginate.direction) {
        all.direction = paginate.direction
    }
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