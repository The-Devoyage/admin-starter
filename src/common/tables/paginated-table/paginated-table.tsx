import { FC, ReactNode, useEffect, useState } from 'react';
import {
  CAlert,
  CAlertHeading,
  CButton,
  CCol,
  CTableFoot,
  CContainer,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react';
import styled from 'styled-components';
import { Stats } from 'src/types/generated';
import { Loading } from 'src/common/loading';
import { useDebounce } from 'src/common/utils/use-debounce';

//TODO: Separate this file into multiple components
interface HeadCell {
  id: string;
  cell: ReactNode | string;
  className?: string;
}

interface PaginatedTableProps {
  title?: string;
  head: HeadCell[];
  body: ReactNode;
  foot?: boolean | ReactNode;
  loading: boolean;
  stats?: Pick<Stats, 'total' | 'remaining'>;
  actions?: PaginatedTableActionsProps;
  empty?: { header: string; message: string };
}

interface PaginatedTableActionsProps {
  onHandleSearch: (v: string) => void;
  onHandleAction: () => void;
  actionButtonLabel: string | ReactNode;
  onRequestMore?: () => void;
}

export const PaginatedTableLoading: FC = () => (
  <CContainer className="d-flex flex-grow-1 h-100 justify-content-center align-items-center">
    <Loading />
  </CContainer>
);

export const PaginatedTableHead: FC<{ headCells: HeadCell[] }> = ({
  headCells,
}) => (
  <CTableHead>
    <CTableRow>
      {headCells.map((h) => (
        <CTableHeaderCell key={h.id} className={h.className}>
          {h.cell}
        </CTableHeaderCell>
      ))}
    </CTableRow>
  </CTableHead>
);

export const PaginatedTableFoot: FC<{
  onRequestMore?: () => void;
  stats?: Pick<Stats, 'total' | 'remaining'>;
  colSpan: number;
  loading: boolean;
}> = ({ onRequestMore, stats, colSpan, loading }) => (
  <CTableFoot>
    <CTableRow>
      <CTableDataCell colSpan={colSpan}>
        <div className="d-flex justify-content-between align-items-center">
          <CBadge color="secondary">
            {`${(stats?.total ?? 0) - (stats?.remaining ?? 0)}}/${
              stats?.total ?? 0
            }`}
          </CBadge>
          <CButton
            color="primary"
            onClick={onRequestMore}
            disabled={!stats?.remaining || loading}
          >
            More
          </CButton>
        </div>
      </CTableDataCell>
    </CTableRow>
  </CTableFoot>
);

export const PaginatedTableSearch: FC<{
  onChange: (v: string) => void;
  loading: boolean;
}> = ({ onChange, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <CFormInput
      placeholder="search"
      disabled={loading}
      onChange={(e) => setSearchTerm(e.currentTarget.value)}
    />
  );
};

export const PaginatedTableActions: FC<{
  actions: PaginatedTableActionsProps;
  loading: boolean;
}> = ({ actions, loading }) => (
  <CRow className="justify-content-between">
    <CCol lg={4} md={5} sm={8} xs={10} className="mb-3">
      <PaginatedTableSearch
        onChange={actions.onHandleSearch}
        loading={loading}
      />
    </CCol>
    <CCol lg={1} sm={2} xs={2} className="mb-3">
      <CButton
        color="primary"
        onClick={actions.onHandleAction}
        className="w-100"
        disabled={loading}
      >
        {actions.actionButtonLabel}
      </CButton>
    </CCol>
  </CRow>
);

export const PaginatedTableEmptyMessage: FC<{
  colSpan: number;
  noItemsAlert?: { header: string; message: string };
}> = ({ colSpan, noItemsAlert }) => (
  <CTableBody>
    <CTableRow>
      <CTableDataCell colSpan={colSpan}>
        <CAlert color="success">
          <CAlertHeading>
            {noItemsAlert?.header ?? 'Nothing here yet...'}
          </CAlertHeading>
          {noItemsAlert?.message ?? 'Add some items to get started.'}
        </CAlert>
      </CTableDataCell>
    </CTableRow>
  </CTableBody>
);

export const PaginatedTableBody = styled(CTableBody)``;

export const PaginatedTableRow = styled(CTableRow)`
  cursor: pointer;
`;

export const PaginatedTableDataCell = styled(CTableDataCell)`
  vertical-align: middle;
`;

export const PaginatedTable: FC<PaginatedTableProps> = ({
  loading,
  body,
  stats,
  head,
  actions,
  title,
  empty,
  foot = true,
}) => (
  <>
    {title && (
      <CContainer>
        <h1 className="text-center my-3">{title}</h1>
      </CContainer>
    )}
    {actions && <PaginatedTableActions actions={actions} loading={loading} />}
    {loading ? (
      <PaginatedTableLoading />
    ) : (
      <CTable hover={(stats?.total ?? -1) > 0} responsive borderless>
        <PaginatedTableHead headCells={head} />
        {(stats?.total ?? -1) > 0 ? (
          <CTableBody>{body}</CTableBody>
        ) : (
          <PaginatedTableEmptyMessage
            colSpan={head.length}
            noItemsAlert={empty}
          />
        )}
        {foot === true && (
          <PaginatedTableFoot
            loading={loading}
            stats={stats}
            onRequestMore={actions?.onRequestMore}
            colSpan={head.length}
          />
        )}
        {!!foot && typeof foot !== 'boolean' ? foot : null}
      </CTable>
    )}
  </>
);
