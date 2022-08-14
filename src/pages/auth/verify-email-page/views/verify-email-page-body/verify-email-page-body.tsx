import { CContainer } from '@coreui/react';
import { VerifyEmailCard } from 'src/components/auth/verify-email';
import { Hooks } from '@the-devoyage/orions-arrow';

export const VerifyEmailPageBody = () => {
  const { form, loading } = Hooks.Accounts.useVerifyAccountEmailContext();

  return (
    <CContainer>
      <VerifyEmailCard form={form} loading={loading} />
    </CContainer>
  );
};
