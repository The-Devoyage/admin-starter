import {
  CBadge,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CPlaceholder,
  CRow,
  CSpinner,
} from '@coreui/react';
import { UserOverviewCardLoading } from 'src/components/users/user-overview-card/user-overview-card-loading';

export const AccountOverviewCardLoading = () => (
  <CCard>
    <CRow className="g-0">
      <CCol md={4}>
        <CCardBody>
          <CPlaceholder
            component={CCardTitle}
            animation="glow"
            className="d-flex justify-content-between mb-3"
          >
            <CPlaceholder lg={8} size="lg" />
            <CBadge color="primary" className="align-self-center">
              <CSpinner size="sm" className="me-1" />
              Users
            </CBadge>
          </CPlaceholder>
          <CRow className="mb-3">
            <CCol>ID</CCol>
            <CCol>
              <CPlaceholder
                component={CCardText}
                animation="glow"
                className="d-flex justify-content-end"
              >
                <CPlaceholder lg={12} />
              </CPlaceholder>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>Email</CCol>
            <CCol>
              <CPlaceholder
                component={CCardText}
                animation="glow"
                className="d-flex justify-content-end"
              >
                <CPlaceholder lg={7} />
              </CPlaceholder>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>Created</CCol>
            <CCol>
              <CPlaceholder
                component={CCardText}
                animation="glow"
                className="d-flex justify-content-end"
              >
                <CPlaceholder lg={3} />
              </CPlaceholder>
            </CCol>
          </CRow>
          <CRow className="mb-3 text-left">
            <CCol>Last Updated</CCol>
            <CCol>
              <CPlaceholder
                component={CCardText}
                animation="glow"
                className="d-flex justify-content-end"
              >
                <CPlaceholder lg={3} />
              </CPlaceholder>
            </CCol>
          </CRow>
        </CCardBody>
      </CCol>
      <CCol md={8}>
        <CCardBody className="h-100 d-flex flex-column justify-content-center">
          <UserOverviewCardLoading />
        </CCardBody>
      </CCol>
    </CRow>
  </CCard>
);
