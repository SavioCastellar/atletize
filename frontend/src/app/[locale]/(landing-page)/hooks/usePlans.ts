import { IUser } from '@/app/shared/domain/contracts/IUser';
import { SubscriptionStatus } from '@/app/shared/domain/enums/SubscriptionStatus';
import { useEffect, useState, useCallback } from 'react';

export const usePlans = (user: IUser, locale: string) => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [billingPortal, setBillingPortal] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const userWithoutPlan =
    user.subscription_status === SubscriptionStatus.PENDING ||
    user.subscription_status === SubscriptionStatus.CANCELED;

  const fetchUrls = useCallback(async () => {
    const newUrls: Record<string, string> = {};

    const plans = [{ name: 'Starter' }, { name: 'Pro' }];

    const promises = plans.map(async (plan) => {
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        body: JSON.stringify({
          plan: plan.name,
          customer: user.customer_id,
          locale,
        }),
      });
      const data = await response.json();

      newUrls[plan.name] = data.url;
    });

    await Promise.all(promises);

    setUrls(newUrls);
    setLoading(false);
  }, [locale, user.customer_id]);

  const fetchBillingPortal = useCallback(async () => {
    const response = await fetch('/api/stripe/update-billing', {
      method: 'POST',
      body: JSON.stringify({
        customer: user.customer_id,
      }),
    });
    const data = await response.json();

    setBillingPortal(data.url);
    setLoading(false);
  }, [user.customer_id]);

  useEffect(() => {
    if (userWithoutPlan) {
      fetchUrls().then().catch(console.error);
    } else {
      fetchBillingPortal().then().catch(console.error);
    }
  }, [fetchBillingPortal, fetchUrls, user.customer_id, userWithoutPlan]);

  return {
    loading,
    urls,
    billingPortal,
    userWithoutPlan,
  };
};
