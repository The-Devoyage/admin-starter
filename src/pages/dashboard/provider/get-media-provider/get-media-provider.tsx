import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import {
  DateFilterByEnum,
  HistoryFilterIntervalEnum,
  OperatorFieldConfigEnum,
} from 'src/types/generated';
import dayjs from 'dayjs';
import { MEDIA_COUNT_WIDGET_GET_MEDIA } from '../../operations';

interface GetMediaProviderProps {
  children: ReactNode;
}
export const GetMediaProvider: FC<GetMediaProviderProps> = ({ children }) => {
  return (
    <Providers.Media.Queries.GetMediaProvider
      query={{
        documentNode: MEDIA_COUNT_WIDGET_GET_MEDIA,
        variables: {
          getMediaInput: {
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
          },
        },
      }}
    >
      {children}
    </Providers.Media.Queries.GetMediaProvider>
  );
};
