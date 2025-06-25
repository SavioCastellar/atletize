export interface ISignInIntl {
  metadata: {
    title: string,
  },
  title: string,
  subtitle: string,
  errors: {
    auth: {
      title: string;
      message: string;
    };
    resetPassword: {
      title: string;
      message: string;
    };
    invalidMail: string;
  };
  authSuccessMessage: string;
  resetPasswordSuccessMessage: string;
  form: {
    email: string;
    password: string;
    stayConnected: string;
    forgotPassword: string;
    button: string;
    noAccount: string;
    register: string;
  };
  popup: {
    title: string;
    subtitle: string;
    button: string;
  };
}
