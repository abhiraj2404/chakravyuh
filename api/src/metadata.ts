/* eslint-disable */
export default async () => {
    const t = {
        ["./users/entities/user-profile.entity"]: await import("./users/entities/user-profile.entity"),
        ["./users/dto/user-profile-res.dto"]: await import("./users/dto/user-profile-res.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/dto/create-user.dto"), { "ICreateUserDto": { email: { required: false, type: () => String }, hashedPassword: { required: false, type: () => String }, fullName: { required: true, type: () => String }, role: { required: false, type: () => String }, githubId: { required: false, type: () => String }, googleId: { required: false, type: () => String }, emailVerified: { required: false, type: () => Boolean } }, "AdminCreateUserDto": { email: { required: false, type: () => String }, password: { required: false, type: () => String }, fullName: { required: true, type: () => String }, role: { required: false, type: () => String } } }], [import("./users/entities/user-profile.entity"), { "UserProfile": { profilePic: { required: false, type: () => String }, bio: { required: false, type: () => String }, personalSite: { required: false, type: () => String }, github: { required: false, type: () => String }, twitter: { required: false, type: () => String }, linkedin: { required: false, type: () => String }, insta: { required: false, type: () => String } } }], [import("./users/dto/update-profile.dto"), { "UpdateProfileDto": { fullName: { required: false, type: () => String }, profile: { required: false, type: () => t["./users/entities/user-profile.entity"].UserProfile } } }], [import("./users/dto/update-user.dto"), { "IUpdateUserDto": { emailVerified: { required: false, type: () => Boolean }, emailConfirmedAt: { required: false, type: () => Date } }, "AdminUpdateUserDto": {} }], [import("./mailer/dto/send-mail.dto"), { "SendMailDto": { recipients: { required: true, type: () => [String] }, subject: { required: true, type: () => String }, text: { required: true, type: () => String }, html: { required: false, type: () => String } } }], [import("./mailer/dto/send-template.dto"), { "SendTemplateDto": { username: { required: true, type: () => String }, templateType: { required: false, type: () => String } } }], [import("./users/dto/user-profile-res.dto"), { "UserProfileResDto": { _id: { required: true, type: () => Object }, fullName: { required: true, type: () => String }, profile: { required: true, type: () => t["./users/entities/user-profile.entity"].UserProfile } } }], [import("./auth/dto/login-user.dto"), { "LoginUserDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 128 } } }], [import("./auth/dto/register-user.dto"), { "RegisterUserDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 128 }, fullName: { required: true, type: () => String }, referrer: { required: false, type: () => String } } }], [import("./auth/dto/reset-password.dto"), { "ResetPasswordDto": { email: { required: true, type: () => String }, frontendBase: { required: true, type: () => String } } }], [import("./auth/dto/verify-reset-password.dto"), { "VerifyResetPasswordDto": { token: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 128 } } }], [import("./auth/dto/verify-email.dto"), { "VerifyEmailDto": { frontendBase: { required: true, type: () => String } } }], [import("./teams/dto/create-team.dto"), { "CreateTeamDto": {} }], [import("./teams/dto/update-team.dto"), { "UpdateTeamDto": {} }], [import("./challenges/dto/create-challenge.dto"), { "CreateChallengeDto": {} }], [import("./challenges/dto/update-challenge.dto"), { "UpdateChallengeDto": {} }], [import("./scores/dto/create-score.dto"), { "CreateScoreDto": {} }], [import("./scores/dto/update-score.dto"), { "UpdateScoreDto": {} }], [import("./challenges/entities/challenge.entity"), { "Challenge": {} }], [import("./scores/entities/score.entity"), { "Score": {} }], [import("./teams/entities/team.entity"), { "Team": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./mailer/mailer.controller"), { "MailerController": { "sendMail": {} } }], [import("./users/controllers/self.controller"), { "SelfUserController": { "updateProfile": {}, "getProfile": { type: t["./users/dto/user-profile-res.dto"].UserProfileResDto } } }], [import("./users/controllers/users.controller"), { "UsersController": { "create": { type: Object }, "findAll": { type: [Object] }, "update": { type: Object }, "remove": { type: Object } } }], [import("./auth/auth.controller"), { "AuthController": { "register": { type: Object }, "login": { type: Object }, "me": { type: Object }, "initPasswordReset": {}, "resetPassword": {}, "initEmailVerification": {}, "verifyEmail": {}, "logoutDevice": {} } }], [import("./teams/teams.controller"), { "TeamsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./challenges/challenges.controller"), { "ChallengesController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./scores/scores.controller"), { "ScoresController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};