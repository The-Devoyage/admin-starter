import { useContext } from 'react';
import { MediaManagerModal } from 'src/components/media/media-manager-modal/media-manager-modal';
import { MediasPageContext } from '../provider/medias-page-provider';

export const MediasPageModals = () => {
  const { mediaManagerModalVisible, setMediaManagerModalVisible } =
    useContext(MediasPageContext);

  return (
    <MediaManagerModal
      visible={mediaManagerModalVisible}
      setVisible={setMediaManagerModalVisible}
    />
  );
};
