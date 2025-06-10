import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full"> {/* Cambiado h-full por min-h-screen */}
      <main className="flex-1 p-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}