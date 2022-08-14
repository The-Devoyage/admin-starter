import { CContainer } from '@coreui/react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { RegisterCard } from 'src/components/auth/register';

export const RegisterPageBody = () => {
  const { form, loading } = Hooks.Accounts.useRegisterAccountContext();

  return (
    <CContainer>
      <RegisterCard form={form} loading={loading} />
    </CContainer>
  );
};
