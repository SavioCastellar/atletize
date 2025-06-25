export interface IResetPasswordIntl {
  metadata: {
    title: string,
  },
  title: string,
  headerSubtitle: string,
  subtitleWithColor: string,
  subtitle: string,
  form: {
    password: string;
    confirmPassword: string;
    labelPassword: string;
    labelConfirmPassword: string;
    labelWarningPassword: string;
    button: string;
    login: string;
  };
  resetPasswordSuccessMessage: string;
  errors: {
    resetPassword: {
      title: string;
      message: string;
    };
  };
}
