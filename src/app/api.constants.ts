
export class ApiConstants {
    public static BASE_URL = location.href.indexOf('localhost')>-1?'http://localhost:8080':'';
    public static GET_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/search/servicePageSearch`;
    public static GET_ALL_JD_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/search/justdialService`;
    public static GET_ALL_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/services`;
    public static GET_SERVICE_CATEGORIES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/serviceCategories`;
    public static GET_JD_SERVICES_DETAIL: string = `${ApiConstants.BASE_URL}/BY/api/v1/search/justdialServiceDetail`;
    public static GET_HOME_SEARCH_PAGES: string = `${ApiConstants.BASE_URL}/BY/api/v1/homesearch/page`;
    public static USER_SIGNUP: string = `${ApiConstants.BASE_URL}/BY/api/v1/users`;
    public static USER_LOGOUT: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/logout`;
    public static USER_PROFILE: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile`;
    public static IMAGE_UPLOAD: string = `${ApiConstants.BASE_URL}/BY/api/v1/fileupload`;
    public static GET_LINK_INFO: string = `${ApiConstants.BASE_URL}/BY/api/v1/discuss/getLinkInfo`;
    public static GET_LANGUAGES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/languages`;
    public static GET_HOBBIES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/hobbies`;
    public static GET_INTERESTAREAS: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/interestAreas`;
    public static GET_HEALTHCHALLENGES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/healthChallenges`;
    public static GET_EMOTIONALCHALLENGES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/emotionalChallenges`;
    public static GET_OTHERCHALLENGES: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/otherChallenges`;
    public static GET_DB_SERVICE_DETAIL: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/serviceProvider`;
    public static GET_DB_SERVICE_REVIEWS: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/service`;
    public static ADD_LIKE_SERVICE_REVIEWS: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/service/likeUnlikeReview`;
    public static ADD_DB_SERVICE_REVIEWS: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/addServiceReview`;
    public static DELETE_DB_SERVICE_REVIEWS: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/deleteServiceReview`;
    public static ADD_DB_SERVICE_REPORT: string = `${ApiConstants.BASE_URL}/BY/api/v1/userProfile/reportService`;
    public static ADD_SERVICE_RATEING: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/addServiceRating`;
    public static GET_SERVICE_RATEINGS: string = `${ApiConstants.BASE_URL}/BY/api/v1/reviewRate/serviceRatings`;
    public static ADD_EVENT_REPORT: string = `${ApiConstants.BASE_URL}/BY/api/v1/event/reportEvent`;
    public static EVENTS_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/event`;
    public static SEND_OTP: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/sendOtp`;
    public static RESEND_OTP: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/resendOtp`;
    public static LOGIN_OTP: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/otpLogin`;
    public static LOGIN_SOCIAL_USER: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/socialLogin`;
    public static DISCUSSIONS_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/discuss`;
    public static DISCUSSION_DETAIL: string = `${ApiConstants.BASE_URL}/BY/api/v1/discussDetail`;
    public static DISCUSSION_LIKE: string = `${ApiConstants.BASE_URL}/BY/api/v1/discussLike`;
    public static DISCUSSION_REPLY_LIKE: string = `${ApiConstants.BASE_URL}/BY/api/v1/discussReplyLike`;
    public static MENU_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/menu`;
    public static PRODUCTS_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/product`;
    public static ASK_QUESTION_SERVICES: string = `${ApiConstants.BASE_URL}/BY/api/v1/ask`;
    public static VALIDATE_EMAIL_PRESENCE: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/validateEmailPresence`;
    public static VALIDATE_PHONE_NUMBER_PRESENCE: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/vaidateMobileNumberPresence`;
    public static MERGE_ACCOUNTS: string = `${ApiConstants.BASE_URL}/BY/api/v1/users/mergeAccounts`;
    
}
