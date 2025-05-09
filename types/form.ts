export type TSignUpFormError = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export type TManagerLoginFormError = {
  email?: string[];
  password?: string[];
};

export type TUserLoginFormError = {
  id?: string[];
  name?: string[];
};

export type TRegistFormError = {
  name?: string[];
  id?: string[];
  elderPhone?: string[];
  guardPhone?: string[];
  elderadress?: string[];
};
