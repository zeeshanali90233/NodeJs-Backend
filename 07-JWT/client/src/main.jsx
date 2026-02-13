import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Products from "./pages/Products/Products.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </BrowserRouter>,
);
