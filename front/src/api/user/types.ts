export type UserDTO = {
  userId: number;
};

export interface MyInfo {
  userId: number;
  userName: string;
  userType: "USER" | "QUIT";
  email: string;
  userDecp: string;
  informable: "TRUE" | "FALSE";
}

export interface EditMyInfo extends MyInfo {
  createdAt: string;
  updatedAt: string;
}

export interface EditMyInfoParams {
  userName: string;
  userType: "USER" | "QUIT";
  userDecp: string;
  informable: "TRUE" | "FALSE";
}

export type UserInfo = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
  subscribed: boolean;
};
