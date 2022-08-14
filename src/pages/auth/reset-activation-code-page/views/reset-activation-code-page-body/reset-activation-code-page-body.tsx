import { CContainer } from '@coreui/react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { ResetActivationCodeCard } from 'src/components/auth/reset-code';

export const ResetActivationCodePageBody = () => {
  const { form, loading } = Hooks.Accounts.useResetActivationCodeContext();

  return (
    <CContainer>
      <ResetActivationCodeCard form={form} loading={loading} />
    </CContainer>
  );
};
