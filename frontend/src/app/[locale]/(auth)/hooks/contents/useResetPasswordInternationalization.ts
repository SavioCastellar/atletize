import { getTranslations } from 'next-intl/server';

export const useResetPasswordInternationalization = async () => {
  const internationalization = await getTranslations('Auth');

  //### RESET PASSWORD ###
  const resetPasswordMetadataTitle = internationalization(
    'resetPassword.metadata.title'
  );
  const resetPasswordTitle = internationalization('resetPassword.title');
  const resetPasswordHeaderSubtitle = internationalization(
    'resetPassword.headerSubtitle'
  );
  const resetPasswordSubtitleWithColor = internationalization(
    'resetPassword.subtitleWithColor'
  );
  const resetPasswordSubtitle = internationalization('resetPassword.subtitle');
  const resetPasswordFormPassword = internationalization(
    'resetPassword.form.password'
  );
  const resetPasswordFormConfirmPassword = internationalization(
    'resetPassword.form.confirmPassword'
  );
  const resetPasswordFormLabelPassword = internationalization(
    'resetPassword.form.labelPassword'
  );
  const resetPasswordFormLabelConfirmPassword = internationalization(
    'resetPassword.form.labelConfirmPassword'
  );
  const resetPasswordFormLabelWarningPassword = internationalization(
    'resetPassword.form.labelWaningPassword'
  );
  const resetPasswordFormButton = internationalization(
    'resetPassword.form.button'
  );
  const resetPasswordFormLogin = internationalization(
    'resetPassword.form.login'
  );
  const resetPasswordResetPasswordSuccessMessage = internationalization(
    'resetPassword.resetPasswordSuccessMessage'
  );
  const resetPasswordErrorResetPasswordTitle = internationalization(
    'resetPassword.errors.resetPassword.title'
  );
  const resetPasswordErrorResetPasswordMessage = internationalization(
    'resetPassword.errors.resetPassword.message'
  );

  const resetPasswordIntl = {
    metadata: {
      title: resetPasswordMetadataTitle,
    },
    title: resetPasswordTitle,
    headerSubtitle: resetPasswordHeaderSubtitle,
    subtitleWithColor: resetPasswordSubtitleWithColor,
    subtitle: resetPasswordSubtitle,
    form: {
      password: resetPasswordFormPassword,
      confirmPassword: resetPasswordFormConfirmPassword,
      labelPassword: resetPasswordFormLabelPassword,
      labelConfirmPassword: resetPasswordFormLabelConfirmPassword,
      labelWarningPassword: resetPasswordFormLabelWarningPassword,
      button: resetPasswordFormButton,
      login: resetPasswordFormLogin,
    },
    resetPasswordSuccessMessage: resetPasswordResetPasswordSuccessMessage,
    errors: {
      resetPassword: {
        title: resetPasswordErrorResetPasswordTitle,
        message: resetPasswordErrorResetPasswordMessage,
      },
    },
  };

  return {
    resetPasswordIntl,
  };
};
