
export interface PageParam {
    p: number,
    s: number,
    term: string
}

export interface JDserviceParam {
    category?: string;
    catID?: string;
    max?: number;
    pageNo?: number;
}