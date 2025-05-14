import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "vendor",
  });

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      role: "vendor",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.first_name.trim()) return "First name is required.";
      if (!formData.last_name.trim()) return "Last name is required.";
      if (!/^\d{10}$/.test(formData.phone))
        return "Phone number must be 10 digits.";
      if (formData.password !== formData.password_confirmation)
        return "Passwords do not match.";
    }

    if (!formData.email.trim()) return "Email is required.";
    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      return "Invalid email format.";

    if (!formData.password.trim()) return "Password is required.";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(formData.password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(formData.password))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(formData.password))
      return "Password must contain at least one number.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const url = isLogin
      ? "https://courses.codeseed.in/public/api/v1/login"
      : "https://courses.codeseed.in/public/api/v1/register";

    try {
      const res = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.user?.email);
        localStorage.setItem("userName", res.data.user?.name);
        toast.success(`Welcome back, ${res.data.user?.name || "User"}!`);
        navigate("/dashboard");
      } else {
        toast.success("Registration successful! Please log in.");
        toggleMode();
      }
    } catch (err) {
      if (err.response) {
        const errors =
          err.response.data.errors ||
          err.response.data.message ||
          "Something went wrong.";
        if (typeof errors === "object") {
          Object.values(errors).forEach((error) => toast.error(error));
        } else {
          toast.error(errors);
        }
      } else {
        toast.error("Network Error. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit} className="mt-3">
          {!isLogin && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <input
                type="password"
                name="password_confirmation"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <div className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="btn btn-link p-0">
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
