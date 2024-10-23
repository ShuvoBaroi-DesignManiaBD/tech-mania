// /* eslint-disable @typescript-eslint/no-explicit-any */
// import envConfig from "@/config/envConfig";
// import jwt, { JwtPayload } from "jsonwebtoken";

// export const jwtVerify = (token: string) => {
//   console.log(envConfig.jwt_access_secret);
//   try {
//     const decoded = jwt.verify(
//       token,
//       envConfig.jwt_access_secret as string
//     ) as JwtPayload;

//     console.log(decoded, "decoded");

//     return decoded;
//   } catch (error: any) {
//     console.log(error);
//     return null;
//   }
// };

