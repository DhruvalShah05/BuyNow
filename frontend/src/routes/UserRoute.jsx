import { Routes, Route } from "react-router-dom";

import Signin from "../pages/Sigin";
import Signup from "../pages/Sigup";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import Profile from "../pages/Profile";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import CancelOrder from "../pages/CancelOrder";
import ProductPage from "../pages/ProductPage";
import Checkout from "../pages/Checkout";
import ProductsPage from "../pages/ProductsPage";
import BlogPage from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";

function UserRoute() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />


        {/* User pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cancellations" element={<CancelOrder />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        
      </Routes>

      

      <Footer />
    </>
  );
}

export default UserRoute;
