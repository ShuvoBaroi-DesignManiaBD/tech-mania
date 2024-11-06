import { decode } from "jsonwebtoken";

const verifyToken = (token: string) => {
    return decode(token);
    // return jwtVerify(token);
    
};

export default verifyToken;