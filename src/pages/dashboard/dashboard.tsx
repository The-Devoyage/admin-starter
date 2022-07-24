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
import { ACCOUNT_COUNT_WIDGET_GET_ACCOUNTS } from 'src/apollo/providers/accounts/queries/get-accounts-provider/operations';

const Dashboard = () => (
  <CRow>
    <CCol lg={8}>
      <WelcomeCard />
    </CCol>
    <CCol lg={4}>
      <Providers.Accounts.Queries.GetAccountsProvider
        query={{
          documentNode: ACCOUNT_COUNT_WIDGET_GET_ACCOUNTS,
          variables: {
            getAccountsInput: {
              config: {
                history: { interval: [HistoryFilterIntervalEnum.Month] },
              },
              query: {
                createdAt: [
                  {
                    filterBy: DateFilterByEnum.Gte,
                    date: dayjs(`1/1/${dayjs().year()}`).toDate(),
                    groups: ['account_widget.and'],
                    operator: OperatorFieldConfigEnum.And,
                  },
                  {
                    filterBy: DateFilterByEnum.Lt,
                    date: dayjs(`1/1/${dayjs().year() + 1}`).toDate(),
                    groups: ['account_widget.and'],
                    operator: OperatorFieldConfigEnum.And,
                  },
                ],
              },
            },
          },
        }}
      >
        <AccountCountWidget />
      </Providers.Accounts.Queries.GetAccountsProvider>
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
