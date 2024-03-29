import { Hooks } from '@the-devoyage/orions-arrow';
import { LoginCard } from 'src/components/auth/login';

export const LoginPageBody = () => {
  const { form, loading } = Hooks.Accounts.useLoginAccount();

  return <LoginCard form={form} loading={loading} />;
};
