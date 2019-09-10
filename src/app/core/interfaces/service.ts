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
    basicProfileInfo?: BasicProfileInfo;
    featured?: boolean;
    ratedByUser?: boolean;
    lastModifiedAt?: string;
    userTypes?: number[];
    ratingCount?: number;
    individualInfo?: IndividualInfo;
    userId?: string;
    serviceProviderInfo?: ServiceProviderInfo;
    createdAt?: string;
    serviceBranches?: any[];
    reviewCount?: number;
    systemTags?: SystemTag[];
    userTags?: string[];
    ratingPercentage?: number;
    id?: string;
    facilities?: any[];
    reviewedByUser?: boolean;
}

export interface PrimaryUserAddress {
    zip: string;
    country: string;
    city: string;
    streetAddress: string;
    locality: string;
}

export interface PhotoGalleryURL {
    titleImage: string;
    original: string;
    thumbnailImage: string;
}


export interface ProfileImage {
    titleImage: string;
    original: string;
    thumbnailImage: string;
}

export interface BasicProfileInfo {
    firstName: string;
    secondaryEmails: any[];
    primaryUserAddress: PrimaryUserAddress;
    otherAddresses: any[];
    photoGalleryURLs: PhotoGalleryURL[];
    description: string;
    secondaryPhoneNos: any[];
    profileImage: ProfileImage;
    primaryEmail: string;
    primaryPhoneNo: string;
}

export interface IndividualInfo {
    gender: number;
}

export interface ServiceProviderInfo {
    website: string;
    homeVisits: boolean;
    yearsExperience: number;
    services: string[];
}

export interface SystemTag {
    name: string;
    description: string;
    id: string;
    type: number;
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
    city: string;
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

export interface JDCategory {
    category_name: string;
    national_catid: string;
}


