import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';
import { Utils } from 'src/common';
import {
  GetMediaInput,
  useMediaList_GetMediaQuery,
  Stats,
  StringFilterByEnum,
  useMediaManager_GetMediaQuery,
  useMediaCountWidget_GetMediaQuery,
} from 'src/types/generated';

type DocumentBase = {
  _id: string;
};

interface IGetMediaContext<M extends DocumentBase> {
  media: M[];
  loading: boolean;
  stats?: Stats;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  searchValue?: string;
}

const GetMediaContext = createContext<IGetMediaContext<DocumentBase>>({
  media: [],
  loading: false,
  handleFetchMore: () => null,
  handleSearch: () => null,
});

export const useGetMediaContext = <M extends DocumentBase>() => {
  const context = useContext<IGetMediaContext<M>>(
    GetMediaContext as unknown as React.Context<IGetMediaContext<M>>,
  );

  if (!context) {
    throw Error('No Context Provider');
  }

  return context;
};

interface GetMediaProviderProps {
  children: ReactNode;
  getMediaInput: GetMediaInput;
  queryHook:
    | typeof useMediaList_GetMediaQuery
    | typeof useMediaManager_GetMediaQuery
    | typeof useMediaCountWidget_GetMediaQuery;
}

export const GetMediaProvider: FC<GetMediaProviderProps> = ({
  children,
  getMediaInput,
  queryHook,
}) => {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const { data, loading, fetchMore, refetch } = queryHook({
    variables: {
      getMediaInput,
    },
  });

  const stats = data?.getMedia.stats;
  // const media = data?.getMedia.data ?? [];

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

  const getMedia = () => {
    if (data?.getMedia && 'data' in data?.getMedia) {
      return data?.getMedia.data;
    }
    return [];
  };

  const getCursor = () => {
    if (data?.getMedia.stats && 'cursor' in data?.getMedia.stats) {
      return data.getMedia.stats.cursor;
    }
  };

  const media = getMedia();

  const value = useMemo(() => {
    const cursor = getCursor();
    const handleFetchMore = () => {
      fetchMore({
        variables: {
          getMediaInput: {
            ...getMediaInput,
            config: {
              pagination: {
                ...getMediaInput.config?.pagination,
                createdAt: getCursor(),
              },
            },
          },
        },
      });
    };

    return {
      media,
      loading,
      stats,
      handleFetchMore,
      handleSearch,
      searchValue,
    };
  }, [media, loading, stats, handleSearch, searchValue]);

  return (
    <GetMediaContext.Provider value={value}>
      {children}
    </GetMediaContext.Provider>
  );
};
