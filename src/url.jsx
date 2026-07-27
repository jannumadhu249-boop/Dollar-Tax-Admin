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


    // Years
    GetYears : base_url + "v1/minimumTax/admin/years/getYears",
    GetCurrentYear : base_url + "v1/minimumTax/admin/years/getCurrentYear",

    // All Registred
    GetAllRegistred : base_url + "v1/minimumTax/admin/registeredMembers/getRegisteredMembers",
    SendEmailOtp : base_url + "v1/minimumTax/admin/registeredMembers/sendViewEmailOtp",
    VerifyEmailOtp : base_url + "v1/minimumTax/admin/registeredMembers/verifyViewEmailOtp",
    SendContactOtp : base_url + "v1/minimumTax/admin/registeredMembers/sendViewContactOtp",
    VerifyContactOtp : base_url + "v1/minimumTax/admin/registeredMembers/verifyViewContactOtp",
    ExportCurrentYear : base_url + "v1/minimumTax/admin/registeredMembers/exportCurrentYearMembers",
    ExportPerivousYear : base_url + "v1/minimumTax/admin/registeredMembers/exportPreviousMembers",

    // Member View
    GetMemberView : base_url + "v1/minimumTax/admin/memberView/member/",
    SendContactOtp : base_url + "v1/minimumTax/admin/registeredMembers/sendViewContactOtp",
    VerifyContactOtp : base_url + "v1/minimumTax/admin/registeredMembers/verifyViewContactOtp",

    // Bank Details
    CreateBankDetails : base_url + "v1/minimumTax/admin/memberBank/addBankDetails/",
    UpdateBankDetails : base_url + "v1/minimumTax/admin/memberBank/updateBankDetails/",

    // Upload Documents
    UploadDocuments : base_url + "v1/minimumTax/admin/adminUpload/uploadDocByAdmin/",

    // File Info
    GetFileInfo : base_url + "v1/minimumTax/admin/memberStatus/getMemberStatusHistory/",
    CreateFileInfo : base_url + "v1/minimumTax/admin/memberStatus/createMemberStatus/",
}