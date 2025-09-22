import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.redirect(new URL("/login", req.url));

  if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}
