import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import { Footer, Header, CookieBanner } from '../(landing-page)/components';
import { useLandingPageInternationalization } from '../(landing-page)/hooks/contents/useLandingPageInternationalization';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

interface ComplianceLayoutProps {
  children: ReactNode;
}

export default async function ComplianceLayout({
  children,
}: ComplianceLayoutProps) {
  const { headerIntl, footerIntl, cookieBannerIntl } =
    await useLandingPageInternationalization();

  return (
    <html lang='pt-br' className='antialiased'>
      <body className={poppins.className}>
        <Header withoutMenu={true} session={null} />
        {children}
        <CookieBanner intl={cookieBannerIntl} />
        <Footer />
      </body>
    </html>
  );
}
