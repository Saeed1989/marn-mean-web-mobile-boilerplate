/* permission entity */
export interface Permission {
  roleName: string,
  resourceName: string,
  isAllowed: boolean,
  isDisabled: boolean,
}
