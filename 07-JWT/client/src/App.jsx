import "./App.css";
import { NavLink } from "react-router";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavLink
        to={"/login"}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: "200px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <h2>Login</h2>
        <p>Already have an account? Click here to login.</p>
      </NavLink>
      <NavLink
        to={"/signup"}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: "200px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => handleNavigate("/signup")}
      >
        <h2>Signup</h2>
        <p>New here? Click here to create an account.</p>
      </NavLink>
    </div>
  );
}

export default App;
