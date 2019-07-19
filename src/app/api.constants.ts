import { environment } from 'src/environments/environment';

export class ApiConstants {

    public static GET_SERVICES: string = `${environment.apiBaseUrl}/v1/search/servicePageSearch`;
    public static USER_LOGIN: string = `${environment.apiBaseUrl}/v1/users/login`;
    public static USER_SIGNUP: string = `${environment.apiBaseUrl}/v1/users`;
    public static USER_LOGOUT: string = `${environment.apiBaseUrl}/v1/users/logout`;
    public static USER_PROFILE: string = `${environment.apiBaseUrl}/v1/userProfile`;


}
