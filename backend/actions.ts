export const AUTHENTICATE_USER = "AUTHENTICATE_USER";

export const registerUser = (username: string, password: string) => {
  return {
    type: AUTHENTICATE_USER,
    username,
    password
  };
};
