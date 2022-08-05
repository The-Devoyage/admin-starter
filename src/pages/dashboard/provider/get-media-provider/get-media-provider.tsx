import { FC, ReactNode } from 'react';
import { Providers } from 'src/apollo';
import {
  DateFilterByEnum,
  HistoryFilterIntervalEnum,
  OperatorFieldConfigEnum,
  useMediaCountWidget_GetMediaQuery,
} from 'src/types/generated';
import dayjs from 'dayjs';

interface GetMediaProviderProps {
  children: ReactNode;
}
export const GetMediaProvider: FC<GetMediaProviderProps> = ({ children }) => {
  return (
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
      {children}
    </Providers.Media.Queries.GetMediaProvider>
  );
};
