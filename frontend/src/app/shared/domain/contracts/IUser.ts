import { SubscriptionStatus } from '../enums/SubscriptionStatus';

interface ILimits {
  maxContents: number;
}

export interface IUser {
  subscription_status: SubscriptionStatus;
  free_trial: boolean;
  plan_name?: string;
  limits: ILimits;
  customer_id: string;
  is_confirmed: boolean;
  first_name: string;
  email: string;
  tenant_id: string;
}
