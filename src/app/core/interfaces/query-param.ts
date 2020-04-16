
export interface PageParam {
    p: number,
    s: number,
    term?: string,
    catid?: number,
    parentCatid?:string
}

export interface serviceParam {
    term?: string,
    parentCatid?:string
    catId?: string;
    max?: number;
    pageNo?: number;
    isFeatured?: boolean;
    dir?: number;
}