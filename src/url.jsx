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
    GetUploadList : base_url + "v1/minimumTax/admin/adminUpload/getUploadedDocuments/",
    UploadDocuments : base_url + "v1/minimumTax/admin/adminUpload/uploadDocByAdmin/",
    DeleteUploads : base_url + "v1/minimumTax/admin/adminUpload/deleteUploadedDocument/",

    // File Info
    GetFileInfo : base_url + "v1/minimumTax/admin/memberStatus/getMemberStatusHistory/",
    CreateFileInfo : base_url + "v1/minimumTax/admin/memberStatus/createMemberStatus/",

    // Pay
    GetPayList : base_url + "v1/minimumTax/admin/pay/getPaymentHistory/",
    PayAmount : base_url + "v1/minimumTax/admin/pay/addPayment/",

    // Referrals
    GetReferalReport : base_url + "v1/minimumTax/admin/referrals/getReferralsReport",
    ViewReferalMember : base_url + "v1/minimumTax/admin/referrals/getReferralReportByMember/",
    RefereeSendEmailOtp : base_url + "v1/minimumTax/admin/referrals/sendReferralEmailOtp",
    RefereeVerifyEmailOtp : base_url + "v1/minimumTax/admin/referrals/verifyReferralEmailOtp",

    // Referee
    GetRefereeReport : base_url + "v1/minimumTax/admin/referrals/getRefereeReport",
    ExportRefereeReport : base_url + "v1/minimumTax/admin/referrals/exportRefereeReport",
    UpdateRefereeReport : base_url + "v1/minimumTax/admin/referrals/updateRefereeReport/",

    // Client Search 
    GetClientSearch : base_url + "v1/minimumTax/admin/clientSearch/getClientSearch",

    // Query List
    GetQueryList : base_url + "v1/minimumTax/admin/queryList/getAllQueries",
    ReplyQuery : base_url + "v1/minimumTax/admin/queryList/replyQuery/",

    // Client Stage
    GetClientStage : base_url + "v1/minimumTax/admin/stage/getMemberStages",
}