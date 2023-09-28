"use client";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const JwtAuth = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  if (token) {
    const tokenString = Array.isArray(token) ? token[0] : token;
    Cookies.set("myTokenCookie", tokenString, { expires: 1 });
  }

  return (
    <div> {token} </div>
  )
};

export default JwtAuth;