import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CCardImage,
  CAlert,
  CCardHeader,
  CAlertHeading,
} from '@coreui/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Utils } from 'src/common';
import { Media, User } from 'src/types/generated';
import { UserOverviewCardLoading } from './user-overview-card-loading';

interface UserOverviewCardProps {
  loading: boolean;
  user:
    | (Pick<
        User,
        '_id' | 'first_name' | 'last_name' | 'about' | 'email' | 'updatedAt'
      > & { image?: Pick<Media, 'path'> | null })
    | null;
}

export const UserOverviewCard: FC<UserOverviewCardProps> = ({
  user,
  loading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = `/users/user?user_id=${user?._id}`;
  const currentPath = location.pathname + location.search;
  const isUserPage = currentPath === path;

  if (loading) {
    return <UserOverviewCardLoading />;
  }

  return (
    <CCard
      onClick={() => !isUserPage && navigate(path)}
      role={!isUserPage ? 'button' : undefined}
      style={{ minHeight: '100%' }}
    >
      <CRow className="h-100 g-0">
        <CCol sm={12} md={6} lg={4}>
          {user?.image?.path ? (
            <CCardImage src={user?.image?.path} />
          ) : (
            <CCardHeader
              className="h-100 d-flex justify-content-center align-items-center"
              style={{ borderBottom: 'none' }}
            >
              <CIcon icon={cilUser} size="4xl" />
            </CCardHeader>
          )}
        </CCol>
        <CCol md={6} lg={8}>
          <CCardBody
            className="d-flex flex-column justify-content-between"
            style={{ height: 200 }}
          >
            <CCardTitle>{Utils.Users.determineName(null, user)}</CCardTitle>
            {user?.about ? (
              <div style={{ height: '100%', overflow: 'auto' }}>
                <CCardText>{user.about}</CCardText>
              </div>
            ) : (
              <CAlert color="info h-100">
                <CAlertHeading>Missing Information</CAlertHeading>
                This user does not have an about section.
              </CAlert>
            )}
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  );
};
