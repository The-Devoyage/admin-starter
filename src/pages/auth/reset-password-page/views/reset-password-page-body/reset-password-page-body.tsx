import { CContainer } from '@coreui/react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { ResetPasswordCard } from 'src/components/auth/reset-password';

export const ResetPasswordPageBody = () => {
  const { form, loading } = Hooks.Accounts.useResetAccountPasswordContext();

  return (
    <CContainer>
      <ResetPasswordCard form={form} loading={loading} />
    </CContainer>
  );
};
