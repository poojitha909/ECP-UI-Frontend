export interface Service {
    vertical_name?: string;
    opstring?: any;
    attr_data?: any;
    distance?: string;
    position_flag?: string;
    city?: string;
    linefive?: string;
    NewAddress?: string;
    action_node?: string;
    idxno?: number;
    discount_Offer?: string;
    lon?: string;
    vertical?: any[];
    video?: string;
    type?: string;
    shopfront?: number;
    sharedt_url?: string;
    paidStatus?: string;
    totalReviews?: string;
    ishotel?: number;
    Jadoopic?: string;
    newaddcolor?: string;
    wpnumber?: string[];
    totJdReviews?: string;
    lat?: string;
    area?: string;
    thumbnail?: string;
    vertical_data?: any[];
    cancall?: number;
    docid?: string;
    verified?: string;
    VNumber?: string;
    compRating?: string;
    an?: any;
    rateThis?: string;
    mappointer?: string;
    favflag?: number;
    name?: string;
    opennow?: number;
    newadd?: string;
}

export interface ServiceDetail {
    name: string;
    email: string;
    mobile: string;
    contact: string;
    website: string;
    rating: string;
    address: string;
    HoursOfOperation: string;
    Reviews: Review[];
    disp_pic: string;
    tag_cname: string;
    userimage: string;
    verified: string;
    city:string;
    seo_dt: SeoDt;
}

export interface Review {
    act_time: string;
    reviewer_name: string;
    review_text: string;
    review_rate: string;
    reviewer_mobile: string;
    reviewer_photo: string;
    time: string;
    reviewer_email: string;
}

export interface SeoDt {
    title: string;
    key: string;
    desc: string;
}


