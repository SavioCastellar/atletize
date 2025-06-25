import { getTranslations } from 'next-intl/server';
import { ISignUpIntl } from '../../domain/interfaces/ISignupIntl';

export const useSignupInternationalization = async () => {
  const internationalization = await getTranslations('Auth');

  //### SIGNUP ###
  const signupMetadataTitle = internationalization('signup.metadata.title');
  const signupTitle = internationalization('signup.title');
  const signupHeaderSubtitle = internationalization('signup.headerSubtitle');
  const signupSubtitleWithColor = internationalization(
    'signup.subtitleWithColor'
  );
  const signupSubtitle = internationalization('signup.subtitle');
  const signupRegisterSuccessMessage = internationalization(
    'signup.registerSuccessMessage'
  );
  const signupErrorRegisterTitle = internationalization(
    'signup.errors.register.title'
  );
  const signupErrorRegisterMessage = internationalization(
    'signup.errors.register.message'
  );
  const signupFormPlaceholderEmail = internationalization(
    'signup.form.placeholderEmail'
  );
  const signupFormPlaceholderPassword = internationalization(
    'signup.form.placeholderPassword'
  );
  const signupFormPlaceholderName = internationalization(
    'signup.form.placeholderName'
  );
  const signupFormPlaceholderConfirmPassword = internationalization(
    'signup.form.placeholderConfirmPassword'
  );

  const signupFormAlertWarningPassword = internationalization(
    'signup.form.alertWarningPassword'
  );
  const signupFormMessageOfPolicies = internationalization(
    'signup.form.messageOfPolicies'
  );
  const signupFormTermAndConditions = internationalization(
    'signup.form.terms&conditions'
  );
  const signupFormPrivacy = internationalization('signup.form.privacy');
  const signupFormButton = internationalization('signup.form.button');
  const signupFormAlreadyAccountMessage = internationalization(
    'signup.form.alreadyAccountMessage'
  );
  const signupFormAlreadyAccountButton = internationalization(
    'signup.form.alreadyAccountButton'
  );

  const signupFormLabelName = internationalization('signup.form.labelName');
  const signupFormLabelPassword = internationalization(
    'signup.form.labelPassword'
  );
  const signupFormLabelEmail = internationalization('signup.form.labelEmail');
  const signupFormLabelConfirmPassword = internationalization(
    'signup.form.labelConfirmPassword'
  );

  //### SIGNUP SUCCESS ###
  const signUpSuccessMetadataTitle = internationalization(
    'signUpSuccess.metadata.title'
  );
  const signUpSuccessTitle = internationalization('signUpSuccess.title');
  const signUpSuccessDescription = internationalization(
    'signUpSuccess.description'
  );
  const signUpSuccessTextButton = internationalization(
    'signUpSuccess.textButton'
  );

  const signUpSuccessIntl = {
    metadata: {
      title: signUpSuccessMetadataTitle,
    },
    title: signUpSuccessTitle,
    description: signUpSuccessDescription,
    textButton: signUpSuccessTextButton,
  };

  const signupIntl: ISignUpIntl = {
    metadata: {
      title: signupMetadataTitle,
    },
    title: signupTitle,
    headerSubtitle: signupHeaderSubtitle,
    subtitleWithColor: signupSubtitleWithColor,
    subtitle: signupSubtitle,
    registerSuccessMessage: signupRegisterSuccessMessage,
    errors: {
      register: {
        title: signupErrorRegisterTitle,
        message: signupErrorRegisterMessage,
      },
    },
    form: {
      labelName: signupFormLabelName,
      labelEmail: signupFormLabelEmail,
      labelPassword: signupFormLabelPassword,
      labelConfirmPassword: signupFormLabelConfirmPassword,
      placeholderEmail: signupFormPlaceholderEmail,
      placeholderPassword: signupFormPlaceholderPassword,
      placeholderConfirmPassword: signupFormPlaceholderConfirmPassword,
      placeholderName: signupFormPlaceholderName,
      alertWarningPassword: signupFormAlertWarningPassword,
      messageOfPolicies: signupFormMessageOfPolicies,
      termsAndConditions: signupFormTermAndConditions,
      privacy: signupFormPrivacy,
      button: signupFormButton,
      alreadyAccountMessage: signupFormAlreadyAccountMessage,
      alreadyAccountButton: signupFormAlreadyAccountButton,
    },
  };

  return {
    signupIntl,
    signUpSuccessIntl,
  };
};
