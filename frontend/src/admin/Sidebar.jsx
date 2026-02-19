import { Link } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed lg:static z-50
        w-64 h-full bg-black text-white p-6
        transform transition-transform duration-300
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