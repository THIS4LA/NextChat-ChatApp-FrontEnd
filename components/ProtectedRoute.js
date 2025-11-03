"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simulate waiting for Redux hydration
    if (typeof token === "undefined") return;

    if (!token) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
  }, [token, router]);

  if (isChecking) return <ScaleLoader color="#00B879" />;
  return children;
}
