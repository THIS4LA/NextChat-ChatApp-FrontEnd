"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) router.replace("/");
  }, [token, router]);

  if (!token) return null;
  return children;
}
