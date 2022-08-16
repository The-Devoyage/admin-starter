import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface IMediasPageContext {
  mediaManagerModalVisible: boolean;
  setMediaManagerModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const MediasPageContext = createContext<IMediasPageContext>({
  mediaManagerModalVisible: false,
  setMediaManagerModalVisible: () => null,
});

interface MediasPageProviderProps {
  children: ReactNode;
}

export const MediasPageProvider: FC<MediasPageProviderProps> = ({
  children,
}) => {
  const [mediaManagerModalVisible, setMediaManagerModalVisible] =
    useState(false);
  const value = useMemo(
    () => ({ mediaManagerModalVisible, setMediaManagerModalVisible }),
    [mediaManagerModalVisible, setMediaManagerModalVisible],
  );

  return (
    <MediasPageContext.Provider value={value}>
      {children}
    </MediasPageContext.Provider>
  );
};
