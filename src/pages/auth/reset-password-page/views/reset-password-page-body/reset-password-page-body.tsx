import { CContainer } from '@coreui/react';
import { useResetAccountPasswordContext } from 'src/apollo/providers/accounts/mutations';
import { ResetPasswordCard } from 'src/components/auth/reset-password';

export const ResetPasswordPageBody = () => {
  const { form, loading } = useResetAccountPasswordContext();

  return (
    <CContainer>
      <ResetPasswordCard form={form} loading={loading} />
    </CContainer>
  );
};
