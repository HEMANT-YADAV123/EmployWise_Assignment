EmployWise Assignment
 
A React.js application for managing users, with features like user listing, search, delete, and edit functionality using the ReqRes API.

=> Tech Stack
Frontend: React.js (Vite), Tailwind CSS

State Management: React Context API

API: ReqRes API

Notifications: React Toastify

Routing: React Router

=> Features
1. User Authentication: Login with static credentials
2. User List: Fetch users from ReqRes API
3. Search Functionality: Find users by name or email
4. Edit Users: Update user details
5. Delete Users: Remove users from the list
6. Pagination: Navigate between user pages
7. Toast Notifications: Real-time feedback messages

=> Installation & Setup
1️. Clone the Repository
sh
Copy
Edit

git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_PROJECT.git

cd YOUR_PROJECT

2️. Install Dependencies
sh
Copy
Edit
npm install
3️. Run the Project
sh
Copy
Edit

npm run dev

The app will start on http://localhost:5173/.

=> How to Use
Login:

Use the credentials:

sh
Copy
Edit

Email: eve.holt@reqres.in  

Password: cityslicka  

After successful login, you’ll be redirected to the Users page.

Users Page:

View the list of users.

Search for a user using the search bar.

Edit user details.

Delete a user (with confirmation).

Pagination:

Navigate between pages using the Next and Prev buttons.

=> Assumptions & Considerations
Authentication: The login uses ReqRes API, which is a mock API. The token is stored in localStorage for session persistence.

User Deletion: Since ReqRes is a mock API, deleting a user only updates the UI and does not persist on the server.

User Updates: The edit function only modifies the frontend state, as the ReqRes API does not support user updates.

Error Handling: Includes toast notifications for API failures.

=> Known Issues
User updates are not persistent due to the limitations of the mock API.

Deleting a user does not actually remove it from the backend.

=> License
This project is for learning purposes. Feel free to modify and use it.

=> Want to Contribute?
Fork the repo

Create a new branch

Make your changes

Submit a pull request

=> Contact

If you have any questions, feel free to reach out via [hy700793@gmail.com].
