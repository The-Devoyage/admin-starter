import { CContainer } from '@coreui/react';
import { useVerifyAccountEmailContext } from 'src/apollo/providers/accounts/mutations';
import { VerifyEmailCard } from 'src/components/auth/verify-email';

export const VerifyEmailPageBody = () => {
  const { form, loading } = useVerifyAccountEmailContext();

  return (
    <CContainer>
      <VerifyEmailCard form={form} loading={loading} />
    </CContainer>
  );
};
