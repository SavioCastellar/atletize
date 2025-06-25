'use client';
import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';
import { ICookieBannerIntl } from '../domain/interfaces/ICookieBannerIntl';

interface CookieBannerProps {
  intl: ICookieBannerIntl;
}

export function CookieBanner({ intl }: CookieBannerProps) {
  return (
    <>
      <CookieConsent
        location='bottom'
        buttonText={intl?.acceptButton}
        cookieName='cookieConsent'
        style={{
          background: 'rgba(37, 99, 235, 0.8)',
          backdropFilter: 'saturate(180%) blur(5px)',
          color: '#fff',
          maxWidth: '850px',
          borderRadius: '0px 10px 0px 0px',
          fontSize: '15px',
          alignItems: 'center',
          zIndex: 9999999,
        }}
        declineButtonText={intl?.refuseButton}
        declineButtonStyle={{
          background: 'none',
          color: '#fff',

          fontSize: '14px',
          borderRadius: '10px',
          border: '1px solid #fff',
        }}
        enableDeclineButton
        buttonStyle={{
          background: '#fff',
          color: '#2563eb',
          fontSize: '16px',
          borderRadius: '10px',
          fontWeight: 600,
        }}
        expires={150}
      >
        {intl?.content}
        <span style={{ fontSize: '12px' }}>
          <Link href='/cookies'> {intl?.moreInfo}</Link>
        </span>
      </CookieConsent>
    </>
  );
}
