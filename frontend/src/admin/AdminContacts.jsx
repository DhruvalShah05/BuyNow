import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data } = await api.get("/contact");
    setContacts(data);
  };

  const handleReply = async () => {
    await api.put(`/contact/${selected._id}/reply`, {
      reply: replyText,
    });

    setReplyText("");
    setSelected(null);
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/contact/${id}`);
    fetchContacts();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Contact Messages
      </h2>

      <div className="bg-white rounded-xl shadow-sm">
        {contacts.map((contact) => (
          <div key={contact._id} className="border-b p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <div>
                <p className="font-semibold">
                  {contact.user?.name || contact.name}
                </p>
                <p className="text-sm text-gray-500">
                  {contact.user?.email || contact.email}
                </p>
              </div>

              <span
                className={`mt-2 sm:mt-0 px-3 py-1 text-xs rounded-full ${
                  contact.status === "new"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {contact.status}
              </span>
            </div>

            <p className="mb-4">{contact.message}</p>

            {contact.adminReply && (
              <div className="bg-green-50 p-4 rounded mb-4">
                <p className="text-green-700 font-medium">
                  Admin Reply:
                </p>
                <p>{contact.adminReply}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelected(contact)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Reply
              </button>

              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h3 className="font-semibold mb-3">
              Reply to {selected.name}
            </h3>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows="4"
              className="w-full bg-gray-100 p-3 rounded-lg"
            />

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleReply}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;