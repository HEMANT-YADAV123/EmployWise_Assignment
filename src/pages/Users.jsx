import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
            />
            <div className="text-center mt-4">
              <h5 className="text-lg font-semibold">{user.first_name} {user.last_name}</h5>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => navigate(`/edit/${user.id}`)}
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-800 text-gray-700 hover:text-white rounded-md disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;
