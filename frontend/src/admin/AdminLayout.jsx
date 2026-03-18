import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:ml-64">

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