import { useState } from 'react';
import { cilFile, cilImage } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CTooltip,
} from '@coreui/react';
import {
  PaginatedTable,
  PaginatedTableDataCell,
  PaginatedTableRow,
  Utils,
} from 'src/common';
import { MediaManagerModal } from '../media-manager-modal/media-manager-modal';
import { useGetMediaContext } from 'src/apollo/providers/media/queries';
import {
  MediaList_GetMediaQuery,
  useMediaManager_GetMediaQuery,
} from 'src/types/generated';
import { Providers } from 'src/apollo';

export const MediaList = () => {
  const [mediaManagerModalVisible, setMediaManagerVisible] = useState(false);
  const { media, loading, stats, handleFetchMore, handleSearch } =
    useGetMediaContext<MediaList_GetMediaQuery['getMedia']['data'][0]>();

  return (
    <>
      <CCard className="w-100 d-flex flex-grow-1">
        <CCardBody className="d-flex flex-column" style={{ height: '200px' }}>
          <PaginatedTable
            title="Media"
            stats={stats}
            loading={loading}
            foot={false}
            actions={{
              onHandleAction: () => setMediaManagerVisible(true),
              onHandleSearch: (v) => handleSearch(v),
              actionButtonLabel: <CIcon icon={cilFile} />,
            }}
            head={[
              {
                cell: 'Type',
                id: 'media_type',
              },
              { cell: 'Title', id: 'title' },
              { cell: 'Created', id: 'created_at' },
              { cell: 'Creator', id: 'creator' },
            ]}
            body={media.map((m) => (
              <PaginatedTableRow
                role="button"
                key={m._id}
                onClick={() => window.open(m.src, '_blank')}
              >
                <PaginatedTableDataCell>
                  <CTooltip content={m.mimetype}>
                    {m.mimetype.includes('image') ? (
                      <CIcon icon={cilImage} />
                    ) : (
                      <CIcon icon={cilFile} />
                    )}
                  </CTooltip>
                </PaginatedTableDataCell>
                <PaginatedTableDataCell>{m.title}</PaginatedTableDataCell>
                <PaginatedTableDataCell>
                  {Utils.Format.Date.toLocalDateString(m.createdAt)}
                </PaginatedTableDataCell>
                <PaginatedTableDataCell>
                  {Utils.Users.determineName(null, m.created_by)}
                </PaginatedTableDataCell>
              </PaginatedTableRow>
            ))}
          />
        </CCardBody>
        <CCardFooter className="d-flex justify-content-between">
          <CBadge color="secondary" className="align-self-center">
            {`${(stats?.total ?? 0) - (stats?.remaining ?? 0)}/
                  ${stats?.total ?? 0}`}
          </CBadge>
          <CButton
            onClick={() => handleFetchMore()}
            disabled={!stats?.remaining}
          >
            More
          </CButton>
        </CCardFooter>
      </CCard>
      <Providers.Media.Queries.GetMediaProvider
        queryHook={useMediaManager_GetMediaQuery}
        getMediaInput={{
          query: {},
          config: { pagination: { limit: 16, reverse: true } },
          transform: { resize: { width: 300, height: 200 } },
        }}
      >
        <MediaManagerModal
          visible={mediaManagerModalVisible}
          setVisible={setMediaManagerVisible}
        />
      </Providers.Media.Queries.GetMediaProvider>
    </>
  );
};
