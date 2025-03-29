import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa"; 

const Users = () => {
  const { setSelectedUser, selectedUser } = useUserContext();//state form context.
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [deletedUsers, setDeletedUsers] = useState(new Set());
  const navigate = useNavigate();

//   check the token and if token exist then fetch users otherwise navogate to login page.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [page, selectedUser]);

  //fetch the users using the api endpoint.
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);

      toast.success('Users fetched Successfully',{autoClose:1000})
      let updatedUsers = response.data.data;

      if (selectedUser) {
        updatedUsers = updatedUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
      }
//filter the users apart from deleted users 
      updatedUsers = updatedUsers.filter((user) => !deletedUsers.has(user.id));

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Show all users initially
      setTotalPage(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users", err);
      toast.error("Failed to fetch users!", { autoClose: 2000 });
    }
  };

  //handle delete functionality.
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setDeletedUsers((prevDeleted) => new Set([...prevDeleted, id]));//update the deteteState
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));//update the filterState.
      toast.success("User deleted successfully!", { autoClose: 2000 });//display notifications.
    } catch (err) {
      console.error("Error deleting user", err);
      toast.error("Failed to delete user!", { autoClose: 2000 });
    }
  };

  //function to handle search.
  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredUsers(users);
    } else {
      const searchQuery = search.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchQuery) ||
            user.last_name.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery)
        )
      );
    }
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Users</h2>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* users cards in grid form */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-5 transform transition hover:scale-105"
            >
              <img
                src={user.avatar}
                alt={`${user.first_name}'s Avatar`}
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
              />
              <div className="text-center mt-4">
                <h5 className="text-lg font-semibold text-gray-800">
                  {user.first_name} {user.last_name}
                </h5>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      navigate(`/edit-user/${user.id}`);
                    }}
                    className="px-4 py-2 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
        >
          Prev
        </button>

        <span className="self-center text-blue-500 font-semibold">
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

      <ToastContainer />
    </div>
  );
};

export default Users;
