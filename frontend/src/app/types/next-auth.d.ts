import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    token_type: string;
    user?: User;
    email: string;
  }
  interface User {
    email?: string | null;
    stayConnected?: boolean;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    user?: User;
    iat?: number;
    jti?: string;
  }
}
