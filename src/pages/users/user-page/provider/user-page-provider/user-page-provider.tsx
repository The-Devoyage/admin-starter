import {
  ReactNode,
  useEffect,
  createContext,
  FC,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';

interface IUserPageContext {
  user_id: User['_id'] | null;
  updateUserModalVisible: boolean;
  setUpdateUserModalVisible: Dispatch<SetStateAction<boolean>>;
  inviteUserModalVisible: boolean;
  setInviteUserModalVisible: Dispatch<SetStateAction<boolean>>;
  updateUserMembershipModalVisible: boolean;
  setUpdateUserMembershipModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const UserPageContext = createContext<IUserPageContext>({
  user_id: null,
  updateUserModalVisible: false,
  setUpdateUserModalVisible: () => null,
  inviteUserModalVisible: false,
  setInviteUserModalVisible: () => null,
  updateUserMembershipModalVisible: false,
  setUpdateUserMembershipModalVisible: () => null,
});

interface UserPageProviderProps {
  children: ReactNode;
}

export const UserPageProvider: FC<UserPageProviderProps> = ({ children }) => {
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);
  const [inviteUserModalVisible, setInviteUserModalVisible] = useState(false);
  const [
    updateUserMembershipModalVisible,
    setUpdateUserMembershipModalVisible,
  ] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id || !Utils.isValidObjectId(user_id)) {
      return navigate('/lost', { replace: true });
    }

    return undefined;
  }, [user_id, navigate]);

  const value = useMemo(
    () => ({
      user_id,
      updateUserModalVisible,
      setUpdateUserModalVisible,
      inviteUserModalVisible,
      setInviteUserModalVisible,
      updateUserMembershipModalVisible,
      setUpdateUserMembershipModalVisible,
    }),
    [
      user_id,
      updateUserModalVisible,
      setUpdateUserModalVisible,
      inviteUserModalVisible,
      setInviteUserModalVisible,
      updateUserMembershipModalVisible,
      setUpdateUserMembershipModalVisible,
    ],
  );

  return (
    <UserPageContext.Provider value={value}>
      {children}
    </UserPageContext.Provider>
  );
};
