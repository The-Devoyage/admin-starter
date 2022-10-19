import { InMemoryCache } from '@apollo/client';
import { Stats } from 'src/types/generated';

interface PaginatedResponse {
  data: [];
  stats: Stats;
  __ref: unknown;
}

const mergeCursorPagination = (
  existing: PaginatedResponse | undefined,
  incoming: PaginatedResponse,
) => {
  let data: PaginatedResponse[] = [
    ...(existing?.data ?? []),
    ...(incoming.data ?? []),
  ];

  data = data.filter(
    (value, index: number, self) =>
      index === self.findIndex((t) => t.__ref === value.__ref),
  );

  const result = { ...incoming, data };

  return result;
};

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    HistoricStats: {
      keyFields: false,
    },
    Query: {
      fields: {
        getAccounts: {
          keyArgs: ['getAccountsInput', ['query']],
          merge: mergeCursorPagination,
        },
        getUsers: {
          keyArgs: ['getUsersInput', ['query']],
          merge: mergeCursorPagination,
        },
        getMedia: {
          keyArgs: ['getMediaInput', ['query', 'transform']],
          merge: mergeCursorPagination,
        },
      },
    },
    Media: {
      keyFields: ['_id', 'src'],
    },
  },
});
