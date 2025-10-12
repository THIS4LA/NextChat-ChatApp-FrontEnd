"use client";
import RecentMessages from "./page.js";
import Chat from "./[id]/page.js";
import ProtectedRoute from "../../../components/ProtectedRoute.js";

export default function MessagesLayout() {
  return (
    <ProtectedRoute>
      <div className="w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-1/3">
            <RecentMessages />
          </div>

          <div className="w-2/3">
            <Chat />
          </div>
        </div>

        <div className="md:hidden w-full h-full">
          <RecentMessages />
        </div>
      </div>
    </ProtectedRoute>
  );
}
