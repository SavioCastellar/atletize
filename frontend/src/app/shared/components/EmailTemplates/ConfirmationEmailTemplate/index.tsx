import React from 'react';

interface ConfirmationEmailProps {
  firstName: string;
  email: string;
  confirmationUrl: string;

  intlEmail: {
    headerTitle: string;
    title: string;
    hello: string;
    message: string;
    textLink: string;
    warningMessage: string;
    textWarningMessageLink: string;
    beforeFooter: string;
    afterFooter: string;
    textFooterLink: string;
    textLogin: string;
    textPrivacy: string;
    textTerms: string;
  };
}

export const ConfirmationEmailTemplate: React.FC<
  Readonly<ConfirmationEmailProps>
> = ({
  firstName,
  email,
  confirmationUrl,
  intlEmail,
}: ConfirmationEmailProps) => {
  return (
    <div style={stylesSheet.container}>
      <header
        style={{
          backgroundColor: '#7F56D9',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          borderRadius: '8px 8px 0 0',
          fontWeight: 700,
          fontSize: '35px',
          lineHeight: '125%',
        }}
      >
        <h2 style={stylesSheet.title}>
          {intlEmail.headerTitle}
          <br />
          <span style={stylesSheet.titleSpan}>{intlEmail.title}</span>
        </h2>
      </header>

      <div style={stylesSheet.content}>
        <p>
          <strong>
            {intlEmail.hello}
            {firstName}
          </strong>
        </p>
        <p>{intlEmail.message}</p>
        <div style={{ textAlign: 'center' }}>
          <a href={confirmationUrl} style={stylesSheet.button}>
            {intlEmail.textLink}
          </a>
        </div>
        <p>
          {intlEmail.warningMessage}
          <a href='mailto:suporte@justlaunch.com.br' style={stylesSheet.link}>
            {intlEmail.textWarningMessageLink}
          </a>
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <img
          src='https://tllaeaskzbwwlivrilza.supabase.co/storage/v1/object/public/public-storage/favicon.png'
          alt='logo da Just-Launch'
          style={stylesSheet.logo}
        />
        <p style={{ marginTop: '16px', fontSize: '12px' }}>
          ©2024 Just Launch
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#F9FAFB',
          padding: '20px',
          textAlign: 'left',
          fontSize: '12px',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <p style={{ fontSize: '12px' }}>
          {intlEmail.beforeFooter} {email} {intlEmail.afterFooter}
          <a href='mailto:suporte@justlaunch.com.br' style={stylesSheet.link}>
            {intlEmail.textFooterLink}
          </a>
        </p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          {intlEmail.textLogin}
          <a href='https://justlaunch.com.br/signin' style={stylesSheet.link}>
            https://justlaunch.com.br/signin
          </a>
        </p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          <a href='https://justlaunch.com.br/privacy' style={stylesSheet.link}>
            {intlEmail.textPrivacy}
          </a>{' '}
          •
          <a
            href='https://justlaunch.com.br/terms&conditions'
            style={stylesSheet.link}
          >
            {intlEmail.textTerms}
          </a>
        </p>
      </div>
    </div>
  );
};

const stylesSheet = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#fff',
    color: '#101828',
    maxWidth: '600px',
    margin: '50px auto',
    borderRadius: '8px',
    padding: '20px',
    overflow: 'hidden',
  },
  title: {
    marginBottom: '0.5rem',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#F4EBFF',
  },
  titleSpan: {
    color: '#E9D7FE',
  },
  content: {
    padding: '20px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#7F56D9',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease-in-out',
  },
  link: {
    color: '#7C3AED',
    textDecoration: 'none',
  },
  logo: {
    width: '51px',
    margin: '0 auto',
  },
};

export default ConfirmationEmailTemplate;
