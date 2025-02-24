import { myHttp } from "../../utils/interceptors";

export interface userInfoType {
  id: number;
  account: string;
  username?: string;
  email?: string;
  auth: number;
}

// 查询所有用户
export const queryUsersApi = (data: {
  username?: string;
  account?: string;
  auth?: number | string;
}) =>
  myHttp<{ users: userInfoType[]; total: number }>("user/queryAllUser", data);

// 添加用户
export const addUserApi = (data: {
  account: string;
  password: string;
  auth: number;
}) => myHttp("user/register", data);

// 封禁或解封用户
export const banUserApi = (data: { id: number; status: number }) =>
  myHttp("user/updateUser", data);
