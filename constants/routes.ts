export const MANAGER_BASE_URL = "/manager/main";
export const USER_BASE_URL = "/user";

export function getUserBaseUrl(userId: string) {
  return `/user/${userId}`;
}

export const MANAGER_AUTH_ROUTES = {
  LOGIN: "/managerlogin",
  SIGN_UP: "/managersignup",
};

export const USER_AUTH_ROUTES = {
  LOGIN: "/userlogin",
};

export const CHAT_ROUTES = {
  CONVERSATIONS: "/c",
};

export const SUBJECT_ROUTES = {
  SUBJECT: "/c",
};

export const MANAGER_PUBLIC_ROUTES = [
  MANAGER_AUTH_ROUTES.LOGIN,
  MANAGER_AUTH_ROUTES.SIGN_UP,
];

export const USER_PUBLIC_ROUTES = [USER_AUTH_ROUTES.LOGIN];
