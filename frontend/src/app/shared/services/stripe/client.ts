'use server';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2024-04-10',
  typescript: true,
});
