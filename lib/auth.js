import { jwtVerify } from "jose";

export async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    return payload; // e.g. { userId: "123", role: "admin" }
  } catch (err) {
    return null; // invalid or expired
  }
}
