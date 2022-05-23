import {
  CPlaceholder,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

export const MembershipsListLoading = () => (
  <CTable responsive borderless small className="text-center">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell>Status</CTableHeaderCell>
        <CTableHeaderCell>Owner</CTableHeaderCell>
        <CTableHeaderCell>Role</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell>
          <CPlaceholder animation="glow">
            <CPlaceholder xs={12} />
          </CPlaceholder>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
);
