// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import envConfig from "@/config/envConfig";
// // import jwt, { JwtPayload } from "jsonwebtoken";
// // import { jwtDecode } from "jwt-decode";

// import { JwtPayload } from "jsonwebtoken";
// import { jwtDecode } from "jwt-decode";

// // export const jwtVerify = (token: string) => {
// //   console.log(envConfig.jwt_access_secret);
// //   try {
// //     const decoded = jwt.verify(
// //       token,
// //       envConfig.jwt_access_secret as string
// //     ) as JwtPayload;

// //     console.log(decoded, "decoded");

// //     return decoded;
// //   } catch (error: any) {
// //     console.log(error);
// //     return null;
// //   }
// // };

// // export const decode = (token: string) => {
// //   const decoded = jwtDecode(token) as JwtPayload;

// //   return decoded;
// // };


// export const decode = (token: string) => {
//   try {
//     const decoded = jwtDecode<{role: 'user' | 'admin'} & JwtPayload>(token);
//     return decoded;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };