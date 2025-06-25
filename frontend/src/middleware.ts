import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
