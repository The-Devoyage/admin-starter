import { cilCheckCircle, cilCircle, cilX, cilXCircle } from '@coreui/icons';
import { roles } from 'src/common/data';
import { MembershipStatusEnum } from 'src/types/generated';
import { Utils } from '..';

export const determineColor = (status?: MembershipStatusEnum | null) => {
  switch (status) {
    case MembershipStatusEnum.Active:
      return 'success';
    case MembershipStatusEnum.Pending:
      return 'warning';
    case MembershipStatusEnum.Revoked:
      return 'danger';
    case MembershipStatusEnum.Inactive:
      return 'secondary';
    default:
      return 'primary';
  }
};

export const determineIcon = (status?: MembershipStatusEnum | null) => {
  switch (status) {
    case MembershipStatusEnum.Active:
      return cilCheckCircle;
    case MembershipStatusEnum.Pending:
      return cilCircle;
    case MembershipStatusEnum.Revoked:
      return cilXCircle;
    case MembershipStatusEnum.Inactive:
      return cilX;
    default:
      return 'primary';
  }
};

export const determineRoleName = (role: number) => {
  const name = Utils.Format.String.humanizeString(
    roles.find((r) => r.value === role)?.label ?? 'n/a',
  ).toLowerCase();
  return name;
};
