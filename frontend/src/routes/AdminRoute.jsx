// src/routes/AdminRoute.js
import { Routes, Route } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";

import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import ProductsPage from "../admin/ProductsPage";

import OrdersPage from "../admin/OrdersPage";
import UsersPage from "../admin/UsersPage";
import CategoriesPage from "../admin/CategoriesPage";
import CouponsPage from "../admin/CouponsPage";
import ProductDetail from "../admin/ProductDetail";
import AddProduct from "../admin/AddProduct";
import AdminContacts from "../admin/AdminContacts";

const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="contacts" element={<AdminContacts />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
