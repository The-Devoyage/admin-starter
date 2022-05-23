import {
  CPlaceholder,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CCardFooter,
  CButton,
  CCardText,
} from '@coreui/react';

export const UserDetailsCardLoading = () => (
  <CCard>
    <CCardHeader>User Details</CCardHeader>
    <CCardBody>
      <CRow className="mb-3">
        <CCol>ID:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>First Name:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={4} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>Last Name:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={5} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>Email:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={9} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>Phone:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={6} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>Last Updated:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={5} />
          </CPlaceholder>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>Created:</CCol>
        <CCol>
          <CPlaceholder component={CCardText} animation="glow">
            <CPlaceholder xs={5} />
          </CPlaceholder>
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter className="d-flex justify-content-end">
      <CButton disabled>Edit User Details</CButton>
    </CCardFooter>
  </CCard>
);
