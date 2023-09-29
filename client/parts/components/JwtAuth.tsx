"use client";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const JwtAuth = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  if (token) {
    const tokenString = Array.isArray(token) ? token[0] : token;
    Cookies.set("JwtToken", tokenString, { expires: 1 });
  }

  return (<></>)
};

export default JwtAuth;