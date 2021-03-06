import { CCol, CRow } from '@coreui/react';
import { Providers } from 'src/apollo';
import { AccountCountWidget } from 'src/components/accounts';
import { WelcomeCard } from 'src/components/dashboard/welcome-card';
import { MediaCountWidget } from 'src/components/media/media-count-widget';
import { UserCountWidget } from 'src/components/users';
import {
  DateFilterByEnum,
  HistoryFilterIntervalEnum,
  OperatorFieldConfigEnum,
  useMediaCountWidget_GetMediaQuery,
} from 'src/types/generated';
import dayjs from 'dayjs';

const Dashboard = () => (
  <CRow>
    <CCol lg={8}>
      <WelcomeCard />
    </CCol>
    <CCol lg={4}>
      <AccountCountWidget />
      <UserCountWidget />
      <Providers.Media.Queries.GetMediaProvider
        queryHook={useMediaCountWidget_GetMediaQuery}
        getMediaInput={{
          config: {
            history: { interval: [HistoryFilterIntervalEnum.Month] },
          },
          query: {
            createdAt: [
              {
                filterBy: DateFilterByEnum.Gte,
                date: dayjs(`1/1/${dayjs().year()}`).toDate(),
                groups: ['media_widget.and'],
                operator: OperatorFieldConfigEnum.And,
              },
              {
                filterBy: DateFilterByEnum.Lt,
                date: dayjs(`1/1/${dayjs().year() + 1}`).toDate(),
                groups: ['media_widget.and'],
                operator: OperatorFieldConfigEnum.And,
              },
            ],
          },
        }}
      >
        <MediaCountWidget />
      </Providers.Media.Queries.GetMediaProvider>
    </CCol>
  </CRow>
);

export default Dashboard;
