import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import axios from "axios";

function EditUser() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(selectedUser || {});

  if (!selectedUser) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${userData.id}`, userData);
      setSelectedUser(userData);
      navigate("/users");
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md transition"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/users")}
            className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
