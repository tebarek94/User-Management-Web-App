import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle form submission to create a new user
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { username, email };

    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error creating user:", data.error);
        } else {
          alert("User created successfully!");
          setUsers([...users, { id: data.userId, username, email }]);
          setUsername("");
          setEmail("");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
