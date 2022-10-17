import { CAccordionHeader } from '@coreui/react';
import { CAccordionHeaderProps } from '@coreui/react/dist/components/accordion/CAccordionHeader';
import { FC, ReactNode } from 'react';

interface FormAccordionHeaderProps extends CAccordionHeaderProps {
  children: ReactNode;
  invalid: () => boolean;
}

export const FormAccordionHeader: FC<FormAccordionHeaderProps> = ({
  children,
  invalid,
  ...props
}) => (
  <CAccordionHeader
    {...props}
    style={{ border: invalid() ? '1px solid red' : undefined }}
  >
    {children}
  </CAccordionHeader>
);
