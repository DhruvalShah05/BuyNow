import { useEffect, useState } from "react";
import api from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await api.delete(`/users/${id}`);
    setUsers(prev => prev.filter(user => user._id !== id));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-3 text-left border-b">Name</th>
              <th className="px-4 py-3 text-left border-b">Email</th>
              <th className="px-4 py-3 text-center border-b">Role</th>
              <th className="px-4 py-3 text-center border-b">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;