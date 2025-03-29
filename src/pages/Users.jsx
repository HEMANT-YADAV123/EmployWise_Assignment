import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./UserContext";

const Users = () => {
  const { setSelectedUser, selectedUser } = useUserContext();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [deletedUsers, setDeletedUsers] = useState(new Set()); // Track deleted users
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [page, selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      let updatedUsers = response.data.data;

      if (selectedUser) {
        updatedUsers = updatedUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
      }

      // Filter out deleted users
      updatedUsers = updatedUsers.filter((user) => !deletedUsers.has(user.id));

      setUsers(updatedUsers);
      setTotalPage(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);

      // Update deleted users state
      setDeletedUsers((prevDeleted) => new Set([...prevDeleted, id]));

      // Remove from UI immediately
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Users</h2>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={user.avatar}
                alt={`${user.first_name}'s Avatar`}
                className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
              />
              <div className="text-center mt-4">
                <h5 className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </h5>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      navigate(`/edit-user/${user.id}`);
                    }}
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users available.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Prev
        </button>

        <span className="self-center text-amber-400 font-semibold">
          Page {page} of {totalPage}
        </span>

        <button
          onClick={() => setPage((prev) => (prev < totalPage ? prev + 1 : prev))}
          disabled={page >= totalPage}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
