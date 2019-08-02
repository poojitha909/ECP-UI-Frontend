
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
}

export enum SocialAccount {
    GOOGLE = "google",
    FACEBOOK = 'facebook'
}