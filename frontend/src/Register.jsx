import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  width: "500px",
  maxWidth: "90%",
  margin: "60px auto",
  padding: "40px",
  background: "white",
  borderRadius: "15px",
  boxSizing: "border-box",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  boxSizing: "border-box",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;