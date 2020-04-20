export class ApiConstants {

    public static GET_SERVICES: string = `/BY/api/v1/search/servicePageSearch`;
    public static GET_ALL_JD_SERVICES: string = `/BY/api/v1/search/justdialService`;
    public static GET_ALL_SERVICES: string = `/BY/api/v1/userProfile/services`;
    public static GET_SERVICE_CATEGORIES: string = `/BY/api/v1/userProfile/serviceCategories`;
    public static GET_JD_SERVICES_DETAIL: string = `/BY/api/v1/search/justdialServiceDetail`;
    public static GET_HOME_SEARCH_PAGES: string = `/BY/api/v1/homesearch/page`;
    public static USER_SIGNUP: string = `/BY/api/v1/users`;
    public static USER_LOGOUT: string = `/BY/api/v1/users/logout`;
    public static USER_PROFILE: string = `/BY/api/v1/userProfile`;
    public static IMAGE_UPLOAD: string = `/BY/api/v1/fileupload`;
    public static GET_DB_SERVICE_DETAIL: string = `/BY/api/v1/userProfile/serviceProvider`;
    public static GET_DB_SERVICE_REVIEWS: string = `/BY/api/v1/reviewRate/service`;
    public static ADD_LIKE_SERVICE_REVIEWS: string = `/BY/api/v1/reviewRate/service/likeUnlikeReview`;
    public static ADD_DB_SERVICE_REVIEWS: string = `/BY/api/v1/reviewRate/addServiceReview`;
    public static DELETE_DB_SERVICE_REVIEWS: string = `/BY/api/v1/reviewRate/deleteServiceReview`;
    public static ADD_DB_SERVICE_REPORT: string = `/BY/api/v1/userProfile/reportService`;
    public static ADD_SERVICE_RATEING: string = `/BY/api/v1/reviewRate/addServiceRating`;
    public static GET_SERVICE_RATEINGS: string = `/BY/api/v1/reviewRate/serviceRatings`;
    public static ADD_EVENT_REPORT: string = `/BY/api/v1/event/reportEvent`;
    public static EVENTS_SERVICES: string = `/BY/api/v1/event`;
    public static SEND_OTP: string = `/BY/api/v1/users/sendOtp`;
    public static RESEND_OTP: string = `/BY/api/v1/users/resendOtp`;
    public static LOGIN_OTP: string = `/BY/api/v1/users/otpLogin`;
    public static LOGIN_SOCIAL_USER: string = `/BY/api/v1/users/socialLogin`;
    public static DISCUSSIONS_SERVICES: string = `/BY/api/v1/discuss`;
    public static DISCUSSION_DETAIL: string = `/BY/api/v1/discussDetail`;
    public static DISCUSSION_LIKE: string = `/BY/api/v1/discussLike`;
    public static DISCUSSION_REPLY_LIKE: string = `/BY/api/v1/discussReplyLike`;
    public static MENU_SERVICES: string = `/BY/api/v1/menu`;
    public static PRODUCTS_SERVICES: string = `/BY/api/v1/product`;
    public static ASK_QUESTION_SERVICES: string = `/BY/api/v1/ask`;
}