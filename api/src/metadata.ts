/* eslint-disable */
export default async () => {
  const t = {
    ['./users/entities/user-profile.entity']: await import(
      './users/entities/user-profile.entity'
    ),
    ['./challenges/challenges.schema']: await import(
      './challenges/challenges.schema'
    ),
    ['./users/dto/user-profile-res.dto']: await import(
      './users/dto/user-profile-res.dto'
    ),
    ['./teams/teams.schema']: await import('./teams/teams.schema'),
    ['./scores/scores.schema']: await import('./scores/scores.schema'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./users/dto/create-user.dto'),
          {
            ICreateUserDto: {
              email: { required: false, type: () => String },
              hashedPassword: { required: false, type: () => String },
              fullName: { required: true, type: () => String },
              role: { required: false, type: () => String },
              ug: { required: true, type: () => Number },
              emailVerified: { required: false, type: () => Boolean },
              isActive: { required: false, type: () => Boolean },
            },
            AdminCreateUserDto: {
              email: { required: false, type: () => String },
              password: { required: false, type: () => String },
              fullName: { required: true, type: () => String },
              role: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./users/entities/user-profile.entity'),
          {
            UserProfile: {
              profilePic: { required: false, type: () => String },
              bio: { required: false, type: () => String },
              personalSite: { required: false, type: () => String },
              github: { required: false, type: () => String },
              twitter: { required: false, type: () => String },
              linkedin: { required: false, type: () => String },
              insta: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./users/dto/update-profile.dto'),
          {
            UpdateProfileDto: {
              fullName: { required: false, type: () => String },
              profile: {
                required: false,
                type: () =>
                  t['./users/entities/user-profile.entity'].UserProfile,
              },
            },
          },
        ],
        [
          import('./users/dto/update-user.dto'),
          {
            IUpdateUserDto: {
              emailVerified: { required: false, type: () => Boolean },
              emailConfirmedAt: { required: false, type: () => Date },
              role: { required: false, type: () => String },
            },
            AdminUpdateUserDto: {},
          },
        ],
        [
          import('./mailer/dto/send-mail.dto'),
          {
            SendMailDto: {
              recipients: { required: true, type: () => [String] },
              subject: { required: true, type: () => String },
              text: { required: true, type: () => String },
              html: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./mailer/dto/send-template.dto'),
          {
            SendTemplateDto: {
              username: { required: true, type: () => String },
              templateType: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./users/dto/user-profile-res.dto'),
          {
            UserProfileResDto: {
              _id: { required: true, type: () => Object },
              fullName: { required: true, type: () => String },
              profile: {
                required: true,
                type: () =>
                  t['./users/entities/user-profile.entity'].UserProfile,
              },
            },
          },
        ],
        [
          import('./auth/dto/login-user.dto'),
          {
            LoginUserDto: {
              email: { required: true, type: () => String },
              password: {
                required: true,
                type: () => String,
                minLength: 8,
                maxLength: 128,
              },
            },
          },
        ],
        [
          import('./auth/dto/register-user.dto'),
          {
            RegisterUserDto: {
              email: { required: true, type: () => String },
              password: {
                required: true,
                type: () => String,
                minLength: 8,
                maxLength: 128,
              },
              fullName: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/reset-password.dto'),
          {
            ResetPasswordDto: {
              email: { required: true, type: () => String },
              frontendBase: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/verify-reset-password.dto'),
          {
            VerifyResetPasswordDto: {
              token: { required: true, type: () => String },
              password: {
                required: true,
                type: () => String,
                minLength: 8,
                maxLength: 128,
              },
            },
          },
        ],
        [
          import('./auth/dto/verify-email.dto'),
          {
            VerifyEmailDto: {
              frontendBase: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./teams/dto/create-team.dto'),
          {
            CreateTeamDto: {
              name: {
                required: true,
                type: () => String,
                minLength: 1,
                maxLength: 20,
              },
            },
          },
        ],
        [
          import('./teams/dto/join-team.dto'),
          { JoinTeamDto: { code: { required: true, type: () => String } } },
        ],
        [import('./teams/dto/update-team.dto'), { UpdateTeamDto: {} }],
        [
          import('./scores/dto/create-score.dto'),
          {
            CreateScoreDto: {
              team: { required: true, type: () => String },
              challenge: { required: true, type: () => String },
              score: {
                required: true,
                type: () => Number,
                minimum: 0,
                maximum: 1,
              },
            },
          },
        ],
        [
          import('./scores/dto/update-score.dto'),
          {
            UpdateScoreDto: {
              score: {
                required: true,
                type: () => Number,
                minimum: 0,
                maximum: 1,
              },
            },
          },
        ],
        [
          import('./challenges/dto/create-challenge.dto'),
          {
            CreateChallengeDto: {
              no: { required: true, type: () => Number },
              title: { required: true, type: () => String },
              summary: { required: true, type: () => String },
              tags: { required: true, type: () => [String] },
              description: { required: true, type: () => String },
              hints: {
                required: true,
                type: () => [t['./challenges/challenges.schema'].Hint],
              },
              startTime: { required: true, type: () => Date },
              endTime: { required: true, type: () => Date },
              submissionVerificationMode: {
                required: true,
                enum: t['./challenges/challenges.schema'].VerificationKind,
              },
              flag: { required: false, type: () => String },
              flags: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./challenges/dto/update-challenge.dto'),
          { UpdateChallengeDto: {} },
        ],
        [
          import('./challenges/dto/flag-submission.dto'),
          {
            FlagSubmissionDto: {
              challengeId: { required: true, type: () => String },
              flag: { required: true, type: () => String },
            },
          },
        ],
        [import('./challenges/entities/challenge.entity'), { Challenge: {} }],
        [import('./scores/entities/score.entity'), { Score: {} }],
        [import('./teams/entities/team.entity'), { Team: {} }],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./mailer/mailer.controller'),
          { MailerController: { sendMail: {} } },
        ],
        [
          import('./users/controllers/self.controller'),
          {
            SelfUserController: {
              updateProfile: {},
              getProfile: {
                type: t['./users/dto/user-profile-res.dto'].UserProfileResDto,
              },
            },
          },
        ],
        [
          import('./users/controllers/users.controller'),
          {
            UsersController: {
              create: { type: Object },
              findAll: { type: [Object] },
              update: { type: Object },
              remove: { type: Object },
            },
          },
        ],
        [
          import('./auth/auth.controller'),
          {
            AuthController: {
              register: { type: Object },
              login: { type: Object },
              me: { type: Object },
              initPasswordReset: {},
              resetPassword: {},
              initEmailVerification: {},
              verifyEmail: {},
              logoutDevice: {},
            },
          },
        ],
        [
          import('./teams/teams.controller'),
          {
            TeamsController: {
              create: { type: t['./teams/teams.schema'].Team },
              join: { type: t['./teams/teams.schema'].Team },
              my: { type: t['./teams/teams.schema'].Team },
              findAll: { type: [t['./teams/teams.schema'].Team] },
              findAllIds: { type: String },
              findOne: { type: t['./teams/teams.schema'].Team },
              update: { type: t['./teams/teams.schema'].Team },
              remove: { type: t['./teams/teams.schema'].Team },
            },
          },
        ],
        [
          import('./challenges/challenges.controller'),
          {
            ChallengesController: {
              create: { type: t['./challenges/challenges.schema'].Challenge },
              findAll: {
                type: [t['./challenges/challenges.schema'].Challenge],
              },
              findOne: { type: t['./challenges/challenges.schema'].Challenge },
              myDone: { type: [t['./challenges/challenges.schema'].Challenge] },
              myTodo: { type: t['./challenges/challenges.schema'].Challenge },
              verifySubmission: { type: Boolean },
              setScoreViaKey: { type: t['./scores/scores.schema'].Score },
              update: { type: t['./challenges/challenges.schema'].Challenge },
              remove: { type: t['./challenges/challenges.schema'].Challenge },
            },
          },
        ],
        [
          import('./scores/scores.controller'),
          {
            ScoresController: {
              create: { type: t['./scores/scores.schema'].Score },
              findAll: { type: [t['./scores/scores.schema'].Score] },
              findOne: { type: t['./scores/scores.schema'].Score },
              remove: { type: t['./scores/scores.schema'].Score },
            },
          },
        ],
      ],
    },
  };
};
