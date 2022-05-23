import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Providers } from 'src/apollo';
import {
  PaginatedTable,
  PaginatedTableDataCell,
  PaginatedTableRow,
} from 'src/common';
import { useNavigate } from 'react-router-dom';
import { CBadge, CButton, CCard, CCardBody, CCardFooter } from '@coreui/react';

export const AccountsList = () => {
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.RegisterProviderContext.Consumer>
      {({ setCreateAccountModalVisible }) => (
        <Providers.Accounts.Queries.AccountsPageProviderContext.Consumer>
          {({ accounts, loading, stats, handleSearch, handleFetchMore }) => (
            <CCard className="w-100 d-flex flex-grow-1">
              <CCardBody
                className="h-100 d-flex flex-column"
                style={{ height: 200 }}
              >
                <PaginatedTable
                  head={[
                    { cell: 'ID', id: 'id' },
                    { cell: 'Email', id: 'email' },
                    { cell: 'Users', id: 'users' },
                    { cell: 'Created', id: 'created' },
                  ]}
                  loading={loading}
                  foot={false}
                  stats={stats}
                  title="Accounts"
                  actions={{
                    onHandleSearch: handleSearch,
                    onRequestMore: handleFetchMore,
                    onHandleAction: () => setCreateAccountModalVisible(true),
                    actionButtonLabel: <CIcon icon={cilPlus} />,
                  }}
                  body={accounts.map((a) => (
                    <PaginatedTableRow
                      key={a._id}
                      role="button"
                      onClick={() =>
                        navigate(`/accounts/account?account_id=${a._id}`)
                      }
                    >
                      <PaginatedTableDataCell>{a._id}</PaginatedTableDataCell>
                      <PaginatedTableDataCell>{a.email}</PaginatedTableDataCell>
                      <PaginatedTableDataCell>
                        {a.users.stats.total ?? '--'}
                      </PaginatedTableDataCell>
                      <PaginatedTableDataCell>
                        {new Date(a.createdAt).toDateString()}
                      </PaginatedTableDataCell>
                    </PaginatedTableRow>
                  ))}
                />
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CBadge color="secondary" className="align-self-center">
                  {`${(stats?.total ?? 0) - (stats?.remaining ?? 0)}/${
                    stats?.total ?? 0
                  }`}
                </CBadge>
                <CButton
                  onClick={() => handleFetchMore()}
                  disabled={!stats?.remaining}
                >
                  More
                </CButton>
              </CCardFooter>
            </CCard>
          )}
        </Providers.Accounts.Queries.AccountsPageProviderContext.Consumer>
      )}
    </Providers.Accounts.Mutations.RegisterProviderContext.Consumer>
  );
};
