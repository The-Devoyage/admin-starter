import { CFormSelect } from '@coreui/react';
import { FC } from 'react';
import { roles } from 'src/common/data';

interface UserRoleSelectProps {
  value: number;
  handleChange: (role: number) => void;
}

export const UserRoleSelect: FC<UserRoleSelectProps> = ({
  value,
  handleChange,
}) => (
  <CFormSelect
    name="role"
    value={value}
    onChange={(e) => handleChange(parseInt(e.currentTarget.value))}
  >
    {roles.map((r) => (
      <option key={r.value} value={r.value}>
        {r.label}
      </option>
    ))}
  </CFormSelect>
);
