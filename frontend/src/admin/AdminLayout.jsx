import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 p-4 sm:p-6">

        {/* Mobile Top Bar */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;