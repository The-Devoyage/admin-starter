import { CContainer } from '@coreui/react';
import { useRegisterAccountContext } from 'src/apollo/providers/accounts/mutations';
import { RegisterCard } from 'src/components/auth/register';

export const RegisterPageBody = () => {
  const { form, loading } = useRegisterAccountContext();

  return (
    <CContainer>
      <RegisterCard form={form} loading={loading} />
    </CContainer>
  );
};
