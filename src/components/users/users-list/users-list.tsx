import { cilImage, cilPlus, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
} from '@coreui/react';
import {
  PaginatedTable,
  PaginatedTableRow,
  PaginatedTableDataCell,
} from 'src/common/tables';
import { useNavigate } from 'react-router-dom';
import { User, Stats, Media } from 'src/types/generated';
import { FC } from 'react';

interface UsersListProps {
  users: (Pick<User, '_id' | 'first_name' | 'last_name' | 'email' | 'phone'> & {
    image?: Pick<Media, 'path'> | null;
  })[];
  stats?: Stats;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  loading: boolean;
  setCreateUserModalVisible: (v: boolean) => void;
}

export const UsersList: FC<UsersListProps> = ({
  users,
  stats,
  handleFetchMore,
  handleSearch,
  loading,
  setCreateUserModalVisible,
}) => {
  const navigate = useNavigate();

  return (
    <CCard className="w-100 d-flex flex-grow-1">
      <CCardBody className="d-flex flex-column" style={{ height: '200px' }}>
        <PaginatedTable
          title="Users"
          loading={loading}
          foot={false}
          actions={{
            onHandleSearch: handleSearch,
            onHandleAction: () => setCreateUserModalVisible(true),
            actionButtonLabel: <CIcon icon={cilPlus} />,
            onRequestMore: handleFetchMore,
          }}
          stats={stats}
          head={[
            { cell: <CIcon icon={cilImage} size="lg" />, id: 'icon' },
            { cell: 'First', id: 'first_name' },
            { cell: 'Last', id: 'last_name' },
            { cell: 'Email', id: 'email' },
            { cell: 'Phone', id: 'phone' },
          ]}
          body={users.map((u) => (
            <PaginatedTableRow
              role="button"
              key={u._id}
              onClick={() => navigate(`/users/user?user_id=${u._id}`)}
            >
              <PaginatedTableDataCell>
                <CAvatar src={u.image?.path} color="primary">
                  <CIcon icon={cilUser} style={{ color: 'white' }} />
                </CAvatar>
              </PaginatedTableDataCell>
              <PaginatedTableDataCell>
                {u.first_name ?? '--'}
              </PaginatedTableDataCell>
              <PaginatedTableDataCell>
                {u.last_name ?? '--'}
              </PaginatedTableDataCell>
              <PaginatedTableDataCell>{u.email ?? '--'}</PaginatedTableDataCell>
              <PaginatedTableDataCell>{u.phone ?? '--'}</PaginatedTableDataCell>
            </PaginatedTableRow>
          ))}
        />
      </CCardBody>
      <CCardFooter className="d-flex justify-content-between">
        <CBadge color="secondary" className="align-self-center">
          {`${(stats?.total ?? 0) - (stats?.remaining ?? 0)}/
                  ${stats?.total ?? 0}`}
        </CBadge>
        <CButton onClick={() => handleFetchMore()} disabled={!stats?.remaining}>
          More
        </CButton>
      </CCardFooter>
    </CCard>
  );
};
