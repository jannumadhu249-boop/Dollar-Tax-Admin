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

    // Dashboard Content
    GetDashboardContent    : base_url + "v1/minimumTax/admin/dashboardContent/getDashboardContents",
    CreateDashboardContent : base_url + "v1/minimumTax/admin/dashboardContent/addDashboardContent",
    GetByIdDashboardContent : base_url + "v1/minimumTax/admin/dashboardContent/getDashboardContentById/",
    UpdateDashboardContent : base_url + "v1/minimumTax/admin/dashboardContent/updateDashboardContent/",
    DeleteDashboardContent : base_url + "v1/minimumTax/admin/dashboardContent/deleteDashboardContent/",

    // Role Access
    GetRoles    : base_url + "v1/minimumTax/admin/role/getRoles",
    GetActiveRoles : base_url + "v1/minimumTax/admin/role/getActiveRoles",
    CreateRole  : base_url + "v1/minimumTax/admin/role/addRole",
    GetByIdRole : base_url + "v1/minimumTax/admin/role/getRoleById/",
    UpdateRole  : base_url + "v1/minimumTax/admin/role/updateRole/",
    DeleteRole  : base_url + "v1/minimumTax/admin/role/deleteRole/",

    // Staff
    GetStaff    : base_url + "v1/minimumTax/admin/staff/getStaff",
    CreateStaff : base_url + "v1/minimumTax/admin/staff/addStaff",
    GetByIdStaff : base_url + "v1/minimumTax/admin/staff/getStaffById/",
    UpdateStaff : base_url + "v1/minimumTax/admin/staff/updateStaff/",
    DeleteStaff : base_url + "v1/minimumTax/admin/staff/deleteStaff/",

    // Leads
    GetLeads     : base_url + "v1/minimumTax/admin/leads/getLeads",
    AddLead      : base_url + "v1/minimumTax/admin/leads/addLead",
    GetLeadById  : base_url + "v1/minimumTax/admin/leads/getLeadById/",
    UpdateLead   : base_url + "v1/minimumTax/admin/leads/updateLead/",

    // Leads Follow Up
    GetFollowUpLead : base_url + "v1/minimumTax/admin/followUp/getLeadFollowUps/",
    CreateFollowUpLead : base_url + "v1/minimumTax/admin/followUp/addFollowup/",
    UpdateFollowUpLead : base_url + "v1/minimumTax/admin/followUp/updateFollowup/",

    // Notes
    GetNotes : base_url + "v1/minimumTax/admin/notes/getNotes",
    CreateNotes : base_url + "v1/minimumTax/admin/notes/addNote",
    GetByIdNotes : base_url + "v1/minimumTax/admin/notes/getNoteById/",
    UpdateNotes : base_url + "v1/minimumTax/admin/notes/updateNote/",
    DeleteNotes : base_url + "v1/minimumTax/admin/notes/deleteNote/",

}