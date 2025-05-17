import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createJWT = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
};

export const verifyJWT = async (token: string) => {
  const { payload } = await jwtVerify(token, secret);
  return payload;
};
