import { getTranslations } from 'next-intl/server';
import { ISignInIntl } from '../../domain/interfaces/ISignInIntl';

export const useSigninInternationalization = async () => {
  const internationalization = await getTranslations('Auth');

  //### SIGNIN ###
  const signinMetadataTitle = internationalization('signin.metadata.title');
  const signinTitle = internationalization('signin.title');
  const signinSubtitle = internationalization('signin.subtitle');
  const signinErrorAuthTitle = internationalization('signin.errors.auth.title');
  const signinErrorAuthMessage = internationalization(
    'signin.errors.auth.message'
  );
  const signinErrorResetPasswordTitle = internationalization(
    'signin.errors.resetPassword.title'
  );
  const signinErrorResetPasswordMessage = internationalization(
    'signin.errors.resetPassword.message'
  );
  const signinErrorInvalidMail = internationalization(
    'signin.errors.invalidMail'
  );
  const signinAuthSuccessMessage = internationalization(
    'signin.authSuccessMessage'
  );
  const signinResetPasswordSuccessMessage = internationalization(
    'signin.resetPasswordSuccessMessage'
  );
  const signinFormEmail = internationalization('signin.form.email');
  const signinFormPassword = internationalization('signin.form.password');
  const signinFormStayConnected = internationalization(
    'signin.form.stayConnected'
  );
  const signinFormForgotPassword = internationalization(
    'signin.form.forgotPassword'
  );
  const signinFormButton = internationalization('signin.form.button');
  const signinFormNoAccount = internationalization('signin.form.noAccount');
  const signinFormRegister = internationalization('signin.form.register');
  const signinPopupTitle = internationalization('signin.popup.title');
  const signinPopupSubtitle = internationalization('signin.popup.subtitle');
  const signinPopupButton = internationalization('signin.popup.button');

  const signinIntl: ISignInIntl = {
    metadata: {
      title: signinMetadataTitle,
    },
    title: signinTitle,
    subtitle: signinSubtitle,
    errors: {
      auth: {
        title: signinErrorAuthTitle,
        message: signinErrorAuthMessage,
      },
      resetPassword: {
        title: signinErrorResetPasswordTitle,
        message: signinErrorResetPasswordMessage,
      },
      invalidMail: signinErrorInvalidMail,
    },
    authSuccessMessage: signinAuthSuccessMessage,
    resetPasswordSuccessMessage: signinResetPasswordSuccessMessage,
    form: {
      email: signinFormEmail,
      password: signinFormPassword,
      stayConnected: signinFormStayConnected,
      forgotPassword: signinFormForgotPassword,
      button: signinFormButton,
      noAccount: signinFormNoAccount,
      register: signinFormRegister,
    },
    popup: {
      title: signinPopupTitle,
      subtitle: signinPopupSubtitle,
      button: signinPopupButton,
    },
  };

  return {
    signinIntl,
  };
};
