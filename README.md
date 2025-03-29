EmployWise Assignment

It is a React.js application for managing users with authentication, searching, editing, and deleting functionality using the ReqRes API.

-> Table of Contents
Tech Stack

Features

Installation & Setup

Project Structure

Step-by-Step Guide

Assumptions & Considerations

Known Issues

License

Contact


-> Tech Stack
Frontend: React.js (Vite), Tailwind CSS

State Management: React Context API

API: ReqRes API (https://reqres.in/)

Notifications: React Toastify

Routing: React Router

-> Features
1.> User Authentication: Login with static credentials
2.> User List: Fetch users from ReqRes API
3.> Search Functionality: Find users by name or email
4.> Edit Users: Update user details
5.> Delete Users: Remove users from the list
6.> Pagination: Navigate between user pages
7.> Toast Notifications: Real-time feedback messages

-> Installation & Setup
1.> Clone the Repository
sh
Copy
Edit
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_PROJECT.git
cd YOUR_PROJECT
2.> Install Dependencies
sh
Copy
Edit
npm install
3.> Run the Project
sh
Copy
Edit
npm run dev
The app will start on http://localhost:5173/.

-> Project Structure
css
Copy
Edit
GlobalGroupwareAssignment/
│── src/
|   |
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Users.jsx
│   │   ├── EditUser.jsx
│   │   ├── UserContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│── public/
│
│── package.json
│── README.md


-> Step-by-Step Guide
1.> Login Page (LoginForm.jsx)
The login page uses a mock API from ReqRes.

The credentials used are:

makefile
Copy
Edit
Email: eve.holt@reqres.in  
Password: cityslicka  
On successful login:

The token is stored in localStorage.

Notifications comes through React-toastify.

The user is redirected to the Users page.

If the login fails, an error message appears.

Code Snippet
js
Copy
Edit
const handleLogin = async(e)=> {
    e.preventDefault();
    try {
        //send post request to the api endpoint
        const response = await axios.post("https://reqres.in/api/login", { 
          email,
          password,
        });
        // if login successfull store the token.
        localStorage.setItem("token", response.data.token);
        //show success notification.
        toast.success("Login Sucessfull",{ autoClose: 2000 })
        setTimeout(() => {
            navigate("/users");
          }, 2000);
      } catch (err) {
        setError("Invalid credentials!");
        toast.error("Invalid credentials!", { autoClose: 2000 });
    }
    
  }

2.> Users Page (Users.jsx)
Fetching Users:

Users are fetched from the ReqRes API.

Data is stored in the state.

Users can be searched and deleted.

Search Feature:

Filters users based on name or email.

Search occurs when the search button is clicked.

Code Snippet for Search Button
js
Copy
Edit
<button
  onClick={handleSearch}
  className="p-3 bg-green-500 text-gray-700 rounded-md hover:bg-gray-400 transition"
>
  Search
</button>;
3.> Editing a User (EditUser.jsx)
Clicking Edit redirects to the Edit User Page.

Users can update their first name, last name, emai and Profile Images also.

Since the ReqRes API does not support updating users, changes are made locally.

Code Snippet
js
Copy
Edit
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
4.> Deleting a User
Clicking Delete removes the user from the UI.

The delete request is sent to the API, but since it's a mock API, the change isn't persistent.

Code Snippet
js
Copy
Edit
const handleDelete = async (id) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    setDeletedUsers((prevDeleted) => new Set([...prevDeleted, id]));
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    toast.success("User deleted successfully!", { autoClose: 2000 });
  } catch (err) {
    toast.error("Failed to delete user!", { autoClose: 2000 });
  }
};
5.> Pagination
Next and Previous buttons allow navigation between pages.

Users are fetched dynamically.

Code Snippet
js
Copy
Edit
<button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
  Prev
</button>

-> Assumptions & Considerations
. Authentication: The login uses ReqRes API. The token is stored in localStorage.
. User Deletion: Since ReqRes is a mock API, deleting a user only updates the UI.
. User Updates: The edit function only modifies the frontend state.
. Error Handling: Uses React Toastify for API failures.

-> Known Issues
User updates are not persistent due to the limitations of the mock API.

Deleting a user does not actually remove it from the backend.

-> License
This project is for learning purposes. Feel free to modify and use it.

-> Contact
If you have any questions, feel free to reach out via email -> hy700793@gmail.com.