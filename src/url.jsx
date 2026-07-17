const base_url = "http://187.127.143.141:4000/"

export const URLS = {

    Base : base_url ,
    ImageUrl : base_url,


    // Authentication
    Login : base_url + "v1/minimumTax/admin/auth/login",
    LoginVerification : base_url + "v1/minimumTax/admin/auth/verifyLoginOtp",
    ChangePassword : base_url + "v1/minimumTax/admin/auth/change-password",

    // Forgot Password
    GenerateOtp : base_url + "v1/minimumTax/admin/auth/generateForgotPasswordOtp",
    VerifyOtp : base_url + "v1/minimumTax/admin/auth/verifyForgotPasswordOtp",
    ResetPassword : base_url + "v1/minimumTax/admin/auth/resetPassword",
}