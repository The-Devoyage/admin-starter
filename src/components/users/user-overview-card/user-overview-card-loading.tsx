import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CPlaceholder,
  CCardHeader,
} from '@coreui/react';

export const UserOverviewCardLoading = () => (
  <CCard>
    <CRow className="g-0">
      <CCol md={4}>
        <CCardHeader
          className="h-100 d-flex justify-content-center align-items-center"
          style={{ borderBottom: 'none' }}
        >
          <CIcon icon={cilUser} size="4xl" />
        </CCardHeader>
      </CCol>
      <CCol md={8}>
        <CCardBody className="h-100 d-flex flex-column justify-content-between">
          <div className="mb-3">
            <CPlaceholder component={CCardTitle} animation="glow">
              <CPlaceholder lg={4} size="lg" />
            </CPlaceholder>
            <CPlaceholder component={CCardText} animation="glow">
              <CPlaceholder lg={10} />
              <CPlaceholder lg={12} />
              <CPlaceholder lg={11} />
              <CPlaceholder lg={10} />
              <CPlaceholder lg={8} />
            </CPlaceholder>
          </div>

          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder lg={4} size="sm" />
          </CPlaceholder>
        </CCardBody>
      </CCol>
    </CRow>
  </CCard>
);
