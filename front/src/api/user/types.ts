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

export type DeleteUserInfo = {
  userId: number;
  userName: string;
  userType: "USER" | "QUIT";
  email: string;
};

export type UserInfo = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
  subscribed: boolean;
};

export type FollowerListDTO = {
  userId: number;
  page?: number;
  size?: number;
};

export type Follower = {
  userId: number;
  userName: string;
  sendCnt: number;
  recvCnt: number;
  userDecp: string;
  subscribed: boolean;
};

export type FollowerList = {
  users: Follower[];
};
