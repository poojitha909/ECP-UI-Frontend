
export interface User {
    id?: string;
    userName?: string;
    password?: string;
    email?: string;
    createdAt?: number;
    verificationCode?: string;
    verificationCodeExpiry?: number;
    socialSignOnId?: string;
    socialSignOnPlatform?: string;
    passwordCode?: string;
    passwordCodeExpiry?: any;
    userRoleId?: string;
    isActive?: string;
    userIdType?: number;
    userRegType?: number;
    phoneNumber?: any;
    userTags?: string[];
    permissions?: any[];
    hasProfile?: boolean;
}

export enum SocialAccount {
    GOOGLE = "google",
    FACEBOOK = 'facebook',
    MOBILE = "mobile"
}

export enum UserIdType {
    EMAIL = 0,
    MOBILE = 1
}

export interface UserProfile {
    id?: string;
    userId?: string;
    userTypes?: any[];
    basicProfileInfo?: BasicProfileInfo;
    individualInfo?: IndividualInfo;
    serviceProviderInfo?: ServiceProviderInfo;
    ratingPercentage?: number;
    ratingCount?: number;
    reviewCount?: number;
    createdAt?: number;
    systemTags?: any[];
    userTags?: any[];
    lastModifiedAt?: number;
    verified?: boolean;
    serviceBranches?: any[];
    facilities?: any[];
    featured?: boolean;
    reviewedByUser?: boolean;
    ratedByUser?: boolean;
}

interface ServiceProviderInfo {
    services?: any[];
    homeVisits?: boolean;
    website?: any;
    yearsExperience?: number;
    incorporationDate?: any;
    specialities?: any;
}

interface IndividualInfo {
    salutation?: any;
    lastName?: any;
    gender?: number;
    dob?: any;
    otherDates?: any;
    occupation?: any;
    emotionalIssues?: any;
    medicalIssues?: any;
    otherIssues?: any;
    maritalStatus?: any;
    hobbies?: any;
    otherHobbies?: any;
    interests?: any;
    otherInterests?: any;
    language?: any;
}

interface BasicProfileInfo {
    firstName?: string;
    profileImage?: any;
    primaryEmail?: any;
    secondaryEmails?: any[];
    primaryPhoneNo?: any;
    secondaryPhoneNos?: any[];
    description?: any;
    photoGalleryURLs?: any[];
    primaryUserAddress?: PrimaryUserAddress;
    otherAddresses?: any[];
    shortDescription?: any;
}

interface PrimaryUserAddress {
    streetAddress?: any;
    city?: any;
    zip?: any;
    locality?: any;
    country?: any;
}