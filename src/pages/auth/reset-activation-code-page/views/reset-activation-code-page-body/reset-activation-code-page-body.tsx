import { CContainer } from '@coreui/react';
import { useResetActivationCodeContext } from 'src/apollo/providers/accounts/mutations';
import { ResetActivationCodeCard } from 'src/components/auth/reset-code';

export const ResetActivationCodePageBody = () => {
  const { form, loading } = useResetActivationCodeContext();

  return (
    <CContainer>
      <ResetActivationCodeCard form={form} loading={loading} />
    </CContainer>
  );
};
