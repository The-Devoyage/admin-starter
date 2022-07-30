import { useLoginAccountContext } from 'src/apollo/providers/accounts/mutations';
import { LoginCard } from 'src/components/auth/login';

export const LoginPageBody = () => {
  const { form, loading } = useLoginAccountContext();

  return <LoginCard form={form} loading={loading} />;
};
