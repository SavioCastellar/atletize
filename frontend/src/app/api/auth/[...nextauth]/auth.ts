import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../supabase/client';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
        stayConnected: { label: 'stayConnected', type: 'checkbox' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (error || !data) return null;

        const timestamp = data.session.expires_at as number;

        const expires_at =
          credentials?.stayConnected === 'false'
            ? Math.floor((Date.now() + 60 * 60 * 1000) / 1000) // 1 hour
            : timestamp;

        const session = {
          id: data.session.user.id,
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: expires_at,
          token_type: data.session.token_type,
          user: {
            email: data.session.user.email,
            name: data.session.user.user_metadata.name,
            id: data.session.user.id,
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          },
        };

        return session;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        user = token.user;
        return { ...token, ...user };
      }

      const expireAt = token.expires_at as number;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      if (currentTimeInSeconds > expireAt) {
        throw new Error('Token expired');
      }

      return { ...token, ...user };
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      session.user = token.user;
      return session;
    },
  },
};

export { nextAuthOptions };
