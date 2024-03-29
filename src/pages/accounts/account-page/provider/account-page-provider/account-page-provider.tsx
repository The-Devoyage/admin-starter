import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Utils } from 'src/common';
import { Account } from 'src/types/generated';

interface IAccountPageContext {
  createUserModalVisible: boolean;
  setCreateUserModalVisible: Dispatch<SetStateAction<boolean>>;
  inviteUserModalVisible: boolean;
  setInviteUserModalVisible: Dispatch<SetStateAction<boolean>>;
  account_id: Account['_id'] | null;
}

export const AccountPageContext = createContext<IAccountPageContext>({
  createUserModalVisible: false,
  setCreateUserModalVisible: () => null,
  inviteUserModalVisible: false,
  setInviteUserModalVisible: () => null,
  account_id: null,
});

interface AccountPageProviderProps {
  children: ReactNode;
}

export const AccountPageProvider: FC<AccountPageProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const account_id = params.get('account_id');
  const navigate = useNavigate();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [inviteUserModalVisible, setInviteUserModalVisible] = useState(false);

  useEffect(() => {
    if (!account_id || !Utils.isValidObjectId(account_id)) {
      return navigate('/lost', { replace: true });
    }
  }, [account_id, navigate]);

  const value = useMemo(
    () => ({
      createUserModalVisible,
      setCreateUserModalVisible,
      inviteUserModalVisible,
      setInviteUserModalVisible,
      account_id,
    }),
    [
      createUserModalVisible,
      setCreateUserModalVisible,
      inviteUserModalVisible,
      setInviteUserModalVisible,
      account_id,
    ],
  );

  if (!account_id) {
    return null;
  }

  return (
    <AccountPageContext.Provider value={value}>
      {children}
    </AccountPageContext.Provider>
  );
};
