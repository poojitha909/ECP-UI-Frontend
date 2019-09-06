import { environment } from 'src/environments/environment';

export class ApiConstants {

    public static GET_SERVICES: string = `${environment.apiBaseUrl}/v1/search/servicePageSearch`;
    public static GET_ALL_SERVICES: string = `${environment.apiBaseUrl}/v1/search/justdialService`;
    public static GET_JD_SERVICES_DETAIL: string = `${environment.apiBaseUrl}/v1/search/justdialServiceDetail`;
    public static USER_LOGIN: string = `${environment.apiBaseUrl}/v1/users/login`;
    public static USER_SIGNUP: string = `${environment.apiBaseUrl}/v1/users`;
    public static USER_LOGOUT: string = `${environment.apiBaseUrl}/v1/users/logout`;
    public static USER_PROFILE: string = `${environment.apiBaseUrl}/v1/userProfile`;
    public static EVENTS_SERVICES: string = `${environment.apiBaseUrl}/v1/event`;
    public static SEND_OTP: string = `${environment.apiBaseUrl}/v1/users/sendOtp`;
    public static RESEND_OTP: string = `${environment.apiBaseUrl}/v1/users/resendOtp`;
    public static VERIFY_OTP: string = `${environment.apiBaseUrl}/v1/users/verifyOtp`;
    public static DISCUSSIONS_SERVICES: string = `${environment.apiBaseUrl}/v1/discuss`;
    public static DISCUSSION_DETAIL: string = `${environment.apiBaseUrl}/v1/discussDetail`;
    public static DISCUSSION_LIKE: string = `${environment.apiBaseUrl}/v1/discussLike`;
    public static DISCUSSION_REPLY_LIKE: string = `${environment.apiBaseUrl}/v1/discussReplyLike`;
    public static MENU_SERVICES: string = `${environment.apiBaseUrl}/v1/menu`;
}
