---> Project Name – EmployWise Assignment


A React-based User Management System that allows users to log in, view users, edit user details, delete users, and paginate through data. It uses React, TailwindCSS, Axios, and React Router for seamless navigation and API handling.





----> Features
. User Authentication (Login)
. Fetching User Data from API
. Searching Users by Name or Email
. Editing User Details
. Deleting Users
. Pagination for Better UX
. Toast Notifications using react-toastify



---> Tech Stack

Frontend: React, TailwindCSS, React Router

State Management: React Hooks (useState, useEffect, useContext)

API Handling: Axios

UI Enhancements: React Toastify

Backend API: ReqRes API (Fake API for testing)


---> Installation & Setup


To set up the project locally, follow these steps:

1️ Clone the Repository


git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git


2️  Navigate to the Project Folder


cd YOUR_REPO_NAME


3️ Install Dependencies


npm install


4️ Start the Development Server

npm run dev

The app will now be running at http://localhost:5173 🚀.

---> Authentication (Login)

Users must log in using the following test credentials:


Email: eve.holt@reqres.in

Password: cityslicka

This will generate a token stored in localStorage.

---> Project Structure


 src
 
 ┣  
 ┣  pages
 
 ┃ ┣  LoginForm.jsx
 
 ┃ ┣  Users.jsx
 
 ┃ ┣  UserContext.jsx
   |- EditUser.jsx
 |
 
 ┣  App.jsx
 
 ┣  main.jsx


  Code Snippets


---> Login Functionality


const handleLogin = async (e) => {

  e.preventDefault();
  
  try {
  
    const response = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/users");
    toast.success("Login successful!");
    
  }
  catch (err) {
  
    toast.error("Invalid credentials!");
  }
};

---> Fetching Users with Pagination

const fetchUsers = async () => {
  try {
  
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    setUsers(response.data.data);
    setTotalPage(response.data.total_pages);
  } catch (err) {
  
    toast.error("Failed to fetch users!");
  }
};

---> Delete User Function


const handleDelete = async (id) => {
  try {
  
    await axios.delete(`https://reqres.in/api/users/${id}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  } catch (err) {
  
    toast.error("Failed to delete user!");
  }
};

---> Assumptions & Considerations

- Authentication: The login uses ReqRes API. The token is stored in localStorage.
  
- User Deletion: Since ReqRes is a mock API, deleting a user only updates the UI.

- User Updates: The edit function only modifies the frontend state.

- Error Handling: Uses React Toastify for API failures.

---> Known Issues

User updates are not persistent due to the limitations of the mock API.

Deleting a user does not actually remove it from the backend.


Thanks for visiting ...

