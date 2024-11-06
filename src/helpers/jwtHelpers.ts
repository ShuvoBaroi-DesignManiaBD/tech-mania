/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const jwtVerify = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      envConfig.jwt_access_secret as string
    ) as JwtPayload;

    console.log(decoded, "decoded");

    return decoded;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const decode = (token: string) => {
  const decoded = jwtDecode(token) as JwtPayload;

  return decoded;
};
