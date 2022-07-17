import { FC, ReactNode, createContext, useMemo } from 'react';
import { Utils } from 'src/common';
import {
  GetMediaInput,
  MediasPage_GetMediaQuery,
  useMediasPage_GetMediaQuery,
  Stats,
  StringFilterByEnum,
} from 'src/types/generated';

interface IMediasPageProviderContext {
  media: MediasPage_GetMediaQuery['getMedia']['data'] | [];
  loading: boolean;
  stats?: Pick<Stats, 'total' | 'remaining'>;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
}

export const MediasPageProviderContext =
  createContext<IMediasPageProviderContext>({
    media: [],
    loading: false,
    handleFetchMore: () => null,
    handleSearch: () => null,
  });

interface MediasPageProviderProps {
  children: ReactNode;
  getMediaInput: GetMediaInput;
}

export const MediasPageProvider: FC<MediasPageProviderProps> = ({
  children,
  getMediaInput,
}) => {
  const { data, loading, fetchMore, refetch } = useMediasPage_GetMediaQuery({
    variables: {
      getMediaInput,
    },
  });

  const stats = data?.getMedia.stats;
  const media = data?.getMedia.data ?? [];

  const handleSearch = (v: string) => {
    if (v) {
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
      refetch({
        getMediaInput,
      });
    }
  };

  const value = useMemo(() => {
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

    return { media, loading, stats, handleFetchMore, handleSearch };
  }, [loading, media]);

  return (
    <MediasPageProviderContext.Provider value={value}>
      {children}
    </MediasPageProviderContext.Provider>
  );
};
