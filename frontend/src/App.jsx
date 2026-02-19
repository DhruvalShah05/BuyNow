import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* User routes (default) */}
        <Route path="/*" element={<UserRoute />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
