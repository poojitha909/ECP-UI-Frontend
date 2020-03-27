
export interface PageParam {
    p: number,
    s: number,
    term?: string,
    catid?: number,
    catName?:string
}

export interface JDserviceParam {
    category?: string;
    catID?: string;
    max?: number;
    pageNo?: number;
    isFeatured?: boolean;
    dir?: number;
}