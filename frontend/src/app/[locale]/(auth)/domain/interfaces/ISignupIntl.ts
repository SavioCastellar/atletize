export interface ISignUpIntl {
  metadata: {
    title: string,
  },
  title: string,
  headerSubtitle: string,
  subtitleWithColor: string,
  subtitle: string,
  registerSuccessMessage: string;
  errors: {
    register: {
      title: string;
      message: string;
    };
  };
  form: {
    labelName: string;
    labelEmail: string;
    labelPassword: string;
    labelConfirmPassword: string;
    placeholderEmail: string;
    placeholderPassword: string;
    placeholderName: string;
    placeholderConfirmPassword: string;
    alertWarningPassword: string;
    messageOfPolicies: string;
    termsAndConditions: string;
    privacy: string;
    button: string;
    alreadyAccountMessage: string;
    alreadyAccountButton: string;
  };
}
