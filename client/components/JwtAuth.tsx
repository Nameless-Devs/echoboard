"use client";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

type DecodedToken = {
  exp: number;
};

const JwtAuth = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const existingToken = Cookies.get("JwtToken");

  const isTokenExpired = !existingToken || checkIfTokenExpired(existingToken);

  if (token && (isTokenExpired || !existingToken)) {
    const tokenString = Array.isArray(token) ? token[0] : token;
    Cookies.set("JwtToken", tokenString, { expires: 1 });
  }

  function checkIfTokenExpired(token: string) {
    const decodedToken: DecodedToken = jwtDecode(token);
    if (!decodedToken) {
      return true;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
  }

  return null;
};

export default JwtAuth;
