import { FC } from 'react';
import Select, { Props } from 'react-select';

interface ReactSelectProps extends Props {
  invalid?: string;
}

export const ReactSelect: FC<ReactSelectProps> = ({ invalid, ...props }) => (
  <>
    <Select
      {...props}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: invalid ? 'red' : undefined,
          '&:hover': {
            borderColor: invalid ? 'red' : undefined,
          },
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
        },
      })}
    />
    {invalid && <small style={{ color: 'red' }}>{invalid}</small>}
  </>
);
