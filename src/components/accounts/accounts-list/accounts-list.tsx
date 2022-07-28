import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  PaginatedTable,
  PaginatedTableDataCell,
  PaginatedTableRow,
} from 'src/common';
import { useNavigate } from 'react-router-dom';
import { CBadge, CButton, CCard, CCardBody, CCardFooter } from '@coreui/react';
import { FC } from 'react';
import { Account, GetUsersResponse, Stats } from 'src/types/generated';

interface AccountsListProps {
  loading: boolean;
  stats?: Stats;
  handleSearch: (v: string) => void;
  handleFetchMore: () => void;
  setCreateAccountModalVisible: (v: boolean) => void;
  accounts: (Pick<Account, '_id' | 'email' | 'createdAt'> & {
    users: Pick<GetUsersResponse, 'stats'>;
  })[];
}

export const AccountsList: FC<AccountsListProps> = ({
  loading,
  stats,
  handleSearch,
  handleFetchMore,
  setCreateAccountModalVisible,
  accounts,
}) => {
  const navigate = useNavigate();

  return (
    <CCard className="w-100 d-flex flex-grow-1">
      <CCardBody className="d-flex flex-column" style={{ height: '200px' }}>
        <PaginatedTable
          head={[
            { cell: 'ID', id: 'id', className: 'd-none d-lg-block' },
            { cell: 'Email', id: 'email' },
            { cell: 'Created', id: 'created', className: 'd-none d-lg-block' },
            { cell: 'Users', id: 'users', className: 'text-center' },
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
              onClick={() => navigate(`/accounts/account?account_id=${a._id}`)}
            >
              <PaginatedTableDataCell className="d-none d-lg-block">
                {a._id}
              </PaginatedTableDataCell>
              <PaginatedTableDataCell>{a.email}</PaginatedTableDataCell>
              <PaginatedTableDataCell className="d-none d-lg-block">
                {new Date(a.createdAt).toDateString()}
              </PaginatedTableDataCell>
              <PaginatedTableDataCell className="text-center">
                {a.users.stats.total ?? '--'}
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
        <CButton onClick={() => handleFetchMore()} disabled={!stats?.remaining}>
          More
        </CButton>
      </CCardFooter>
    </CCard>
  );
};
