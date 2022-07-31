import { FC, ReactNode } from 'react';
import { Providers } from 'src/apollo';

interface CreateUserProviderProps {
  children: ReactNode;
}

export const CreateUserProvider: FC<CreateUserProviderProps> = ({
  children,
}) => {
  return (
    <Providers.Users.Mutations.CreateUserProvider
      createUserInput={{ payload: { email: '' } }}
    >
      {children}
    </Providers.Users.Mutations.CreateUserProvider>
  );
};
