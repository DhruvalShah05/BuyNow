import { Link } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-black text-white p-6 z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-5">
        <li><Link to="/admin" onClick={() => setOpen(false)}>Dashboard</Link></li>
        <li><Link to="/admin/users" onClick={() => setOpen(false)}>Users</Link></li>
        <li><Link to="/admin/products" onClick={() => setOpen(false)}>Products</Link></li>
        <li><Link to="/admin/orders" onClick={() => setOpen(false)}>Orders</Link></li>
        <li><Link to="/admin/categories" onClick={() => setOpen(false)}>Categories</Link></li>
        <li><Link to="/admin/contacts" onClick={() => setOpen(false)}>Contacts</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;