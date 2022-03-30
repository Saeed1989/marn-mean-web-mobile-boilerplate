/* permission entity */
export interface Permission {
  id: string;
  roleName: string,
  resourceName: string,
  isAllowed: boolean,
  isDisabled: boolean,
}
