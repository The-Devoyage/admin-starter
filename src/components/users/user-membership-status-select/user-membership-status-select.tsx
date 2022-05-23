import { CFormSelect } from '@coreui/react';
import { FC } from 'react';
import { MembershipStatusEnum } from 'src/types/generated';

interface UserMembershipStatusSelectProps {
  value: MembershipStatusEnum;
  handleChange: (status: MembershipStatusEnum) => void;
}

export const UserMembershipStatusSelect: FC<
  UserMembershipStatusSelectProps
> = ({ handleChange, value }) => (
  <CFormSelect
    name="role"
    value={value}
    onChange={(e) =>
      handleChange(e.currentTarget.value as MembershipStatusEnum)
    }
  >
    <option
      key={MembershipStatusEnum.Pending}
      value={MembershipStatusEnum.Pending}
    >
      {MembershipStatusEnum.Pending}
    </option>
    <option
      key={MembershipStatusEnum.Active}
      value={MembershipStatusEnum.Active}
    >
      {MembershipStatusEnum.Active}
    </option>
    <option
      key={MembershipStatusEnum.Revoked}
      value={MembershipStatusEnum.Revoked}
    >
      {MembershipStatusEnum.Revoked}
    </option>
    <option
      key={MembershipStatusEnum.Inactive}
      value={MembershipStatusEnum.Inactive}
    >
      {MembershipStatusEnum.Inactive}
    </option>
  </CFormSelect>
);
