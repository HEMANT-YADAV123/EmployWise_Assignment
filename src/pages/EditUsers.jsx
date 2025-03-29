import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditUser = () => {
  const { selectedUser, setSelectedUser } = useUserContext();//take the global state.
  const navigate = useNavigate();
  const [userData, setUserData] = useState(selectedUser || {});
  const [selectedImage, setSelectedImage] = useState(null);

  if (!selectedUser) {
    navigate("/");
    return null;
  }

  //handle input field change.
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //handle image change.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  //handle the submit functionality.
  const handleSubmit = async () => {
    try {
      const updatedUser = { ...userData };
      if (selectedImage) {
        updatedUser.avatar = selectedImage;
      }
      await axios.put(`https://reqres.in/api/users/${userData.id}`, updatedUser);
      setSelectedUser(updatedUser);
      // Success notification
        toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  
      setTimeout(() => navigate("/users"), 2000); // Delay navigation to show toast.
    } catch (err) {
      console.error("Error updating user", err);

      // Error notification
        toast.error("Failed to update user. Try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Edit User
        </h2>

        {/* Profile Image*/}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={selectedImage || userData.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md hover:opacity-80 transition"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </label>
          <p className="text-gray-500 text-sm mt-2">Click to change image</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition cursor-pointer"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/users")}
            className="px-6 py-3 text-white cursor-pointer bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition"
          >
            Cancel
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditUser;
