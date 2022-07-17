import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { Utils } from 'src/common';
import {
  GetMediaInput,
  MediaManager_GetMediaQuery,
  Stats,
  StringFilterByEnum,
  useMediaManager_GetMediaQuery,
} from 'src/types/generated';

interface IMediaManagerProviderContext {
  media: MediaManager_GetMediaQuery['getMedia']['data'] | [];
  loading: boolean;
  stats?: Pick<Stats, 'total' | 'remaining'>;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  searchValue?: string;
}

export const MediaManagerProviderContext =
  createContext<IMediaManagerProviderContext>({
    media: [],
    loading: false,
    handleFetchMore: () => null,
    handleSearch: () => null,
  });

interface MediaManagerProviderProps {
  children: ReactNode;
  getMediaInput: GetMediaInput;
}

export const MediaManagerProvider: FC<MediaManagerProviderProps> = ({
  children,
  getMediaInput,
}) => {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const { data, loading, fetchMore, refetch } = useMediaManager_GetMediaQuery({
    variables: { getMediaInput },
  });
  const media = data?.getMedia.data ?? [];
  const stats = data?.getMedia.stats;

  const handleSearch = (v: string) => {
    if (v) {
      setSearchValue(v);
      const keyWords = v.split(' ').filter((k) => k !== '');

      const _id = [];
      const created_by = [];

      for (const k of keyWords) {
        if (Utils.isValidObjectId(k)) {
          _id.push({ string: k, filterBy: StringFilterByEnum.Objectid });
          created_by.push({ string: k, filterBy: StringFilterByEnum.Objectid });
        }
      }

      if (keyWords.length > 0 && keyWords[0] !== '') {
        refetch({
          getMediaInput: {
            query: {
              _id,
              path: keyWords.map((k) => ({
                string: k,
                filterBy: StringFilterByEnum.Regex,
              })),
              title: keyWords.map((k) => ({
                string: k,
                filterBy: StringFilterByEnum.Regex,
              })),
              mimetype: keyWords.map((k) => ({
                string: k,
                filterBy: StringFilterByEnum.Regex,
              })),
              created_by,
            },
          },
        });
      }
    } else {
      setSearchValue(undefined);
      refetch({
        getMediaInput,
      });
    }
  };

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        getMediaInput: {
          ...getMediaInput,
          config: {
            pagination: {
              ...getMediaInput.config?.pagination,
              createdAt: data?.getMedia.stats.cursor,
            },
          },
        },
      },
    });
  };

  const value = useMemo(
    () => ({
      handleSearch,
      handleFetchMore,
      media,
      stats,
      loading,
      searchValue,
    }),
    [handleSearch, handleFetchMore, stats, media, loading, searchValue],
  );

  return (
    <MediaManagerProviderContext.Provider value={value}>
      {children}
    </MediaManagerProviderContext.Provider>
  );
};
