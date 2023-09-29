import jwtDecode from "jwt-decode";

type decodedToken = {
  sub: string;
};

type jwtCookie = {
  [x: string]: any;
};

export const getUserSubjectFromCookie = (cookies: jwtCookie) => {
  const tokenValue = cookies.token;
  if (!tokenValue) {
    return null;
  }

  const decodedToken: decodedToken = jwtDecode(tokenValue);
  return decodedToken.sub;
};