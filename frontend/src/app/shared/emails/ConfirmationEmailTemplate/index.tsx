import React from 'react';

interface ConfirmationEmailProps {
  firstName: string;
  email: string;
  confirmationUrl: string;
  domain: string;

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
  domain,
}: ConfirmationEmailProps) => {
  return (
    <div style={stylesSheet.container}>
      <header style={{ ...stylesSheet.header, textAlign: 'center' }}>
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
          <a href={`mailto:suporte@${domain}`} style={stylesSheet.link}>
            {intlEmail.textWarningMessageLink}
          </a>
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <img
          src='https://docs.justlaunch.com.br/logo.svg'
          alt='logo do Just Launch'
          style={stylesSheet.logo}
        />
        <p style={{ marginTop: '16px', fontSize: '12px' }}>
          ©2024 Just Launch
        </p>
      </div>

      <div style={{ ...stylesSheet.footer, textAlign: 'left' }}>
        <p style={{ fontSize: '12px' }}>
          {intlEmail.beforeFooter} {email} {intlEmail.afterFooter}
          <a href={`mailto:suporte@${domain}`} style={stylesSheet.link}>
            {intlEmail.textFooterLink}
          </a>
        </p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          {intlEmail.textLogin}
          <a href={`https://${domain}/signin`} style={stylesSheet.link}>
            https://{domain}/signin
          </a>
        </p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          <a href={`https://${domain}/privacy`} style={stylesSheet.link}>
            {intlEmail.textPrivacy}
          </a>{' '}
          •
          <a
            href={`https://${domain}/terms&conditions`}
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
  header: {
    backgroundColor: '#2563eb',
    padding: '20px',
    color: 'white',
    borderRadius: '8px 8px 0 0',
    fontWeight: 700,
    fontSize: '35px',
    lineHeight: '125%',
  },
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
    color: '#eff6ff',
  },
  titleSpan: {
    color: '#dbeafe',
  },
  content: {
    padding: '20px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease-in-out',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  logo: {
    width: '51px',
    margin: '0 auto',
  },
  footer: {
    backgroundColor: '#F9FAFB',
    padding: '20px',
    fontSize: '12px',
    borderRadius: '0 0 8px 8px',
  },
};

export default ConfirmationEmailTemplate;
