import { CRow } from '@coreui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Providers } from 'src/apollo';
import { ACCOUNT_PAGE_GET_ACCOUNTS } from 'src/apollo/providers/accounts/queries/get-accounts-provider/operations';
import { Utils } from 'src/common';
import { StringFilterByEnum } from 'src/types/generated';
import { AccountPageBottom, AccountPageTop } from './views';

const AccountPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const account_id = params.get('account_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!account_id || !Utils.isValidObjectId(account_id)) {
      return navigate('/lost', { replace: true });
    }
    return undefined;
  }, [account_id, navigate]);

  if (!account_id) {
    return null;
  }

  return (
    <Providers.Accounts.Queries.GetAccountsProvider
      query={{
        documentNode: ACCOUNT_PAGE_GET_ACCOUNTS,
        variables: {
          getAccountsInput: {
            query: {
              _id: [
                { string: account_id, filterBy: StringFilterByEnum.Objectid },
              ],
            },
          },
          getUsersInput: {
            query: {},
            config: {
              pagination: { limit: 100 },
            },
          },
        },
      }}
    >
      <CRow className="mb-3">
        <AccountPageTop account_id={account_id} />
      </CRow>
      <CRow className="mb-3">
        <AccountPageBottom account_id={account_id} />
      </CRow>
    </Providers.Accounts.Queries.GetAccountsProvider>
  );
};

export default AccountPage;
