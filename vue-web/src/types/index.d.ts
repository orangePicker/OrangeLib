export interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
  time: string;
}

export interface userInfoType {
  id: number;
  account: string;
  username?: string;
  email?: string;
  auth: number;
  // token?: string;
}
