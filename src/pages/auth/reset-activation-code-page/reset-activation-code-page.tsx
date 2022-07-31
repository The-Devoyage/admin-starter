import { ResetActivationCodePageRootProvider } from './provider';
import { ResetActivationCodePageBody } from './views';

export const ResetActivationCodePage = () => (
  <ResetActivationCodePageRootProvider>
    <ResetActivationCodePageBody />
  </ResetActivationCodePageRootProvider>
);
