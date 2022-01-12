/* user entity */
export interface User {
    firstName: string,
    lastName: string,
    accessToken: string;
    type: string;
    currentAuthority: string,
}
