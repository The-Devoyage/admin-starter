import { FC } from 'react';
import Select, { Props } from 'react-select';

export const ReactSelect: FC<Props> = (props) => {
  const customStyles = {};

  return (
    <Select
      {...props}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
        },
      })}
    />
  );
};
