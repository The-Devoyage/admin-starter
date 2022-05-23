import { roles } from 'src/common/data/roles';

export const toRoleName = (role: number) => {
  const roleName = roles.find((r) => r.value === role);
  return roleName;
};
