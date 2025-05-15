import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    terms: false,
    role: "vendor",
  });

  const handleSignInChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(signInData.email)) {
      alert("Invalid email format.");
      return;
    }
    if (signInData.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post("https://courses.codeseed.in/public/api/v1/login", signInData);
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(signUpData.email)) {
      alert("Invalid email format.");
      return;
    }

    if (!validatePhone(signUpData.phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    if (!validatePassword(signUpData.password)) {
      alert("Password must be 8+ characters, with uppercase, lowercase, digit, and special character.");
      return;
    }

    if (signUpData.password !== signUpData.password_confirmation) {
      alert("Passwords do not match.");
      return;
    }

    if (!signUpData.terms) {
      alert("You must agree to the terms.");
      return;
    }

    try {
      const response = await axios.post("https://courses.codeseed.in/public/api/v1/register", signUpData);
      alert("Registration successful! Please login.");
      setIsSignIn(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow border-0"
        style={{ maxWidth: isSignIn ? "400px" : "460px", width: "100%" }}
      >
        <h2 className="text-center text-primary mb-2">StayScape</h2>

        {isSignIn ? (
          <>
            <h4 className="text-center mb-1">Sign in to your account</h4>
            <p className="text-center text-muted mb-4">
              Or{" "}
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => setIsSignIn(false)}
              >
                create a new account
              </button>
            </p>

            <form onSubmit={handleSignInSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={signInData.email}
                  onChange={handleSignInChange}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold mb-0"
                  >
                    Password
                  </label>
                  <a href="#" className="small text-primary text-decoration-none">
                    Forgot your password?
                  </a>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  name="remember"
                  checked={signInData.remember}
                  onChange={handleSignInChange}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign in
              </button> 

              <div className="text-center position-relative my-3 text-muted">
                <div className="position-absolute top-50 start-0 w-100 border-top"></div>
                <span className="bg-light px-2 position-relative">
                  Or continue with
                </span>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                >
                  Facebook
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h4 className="text-center mb-1">Create your account</h4>
            <p className="text-center text-muted mb-4">
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => setIsSignIn(true)}
              >
                Sign in
              </button>
            </p>

            <form onSubmit={handleSignUpSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="first_name" className="form-label fw-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-control"
                    placeholder="John"
                    required
                    value={signUpData.first_name}
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="last_name" className="form-label fw-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-control"
                    placeholder="Doe"
                    required
                    value={signUpData.last_name}
                    onChange={handleSignUpChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="you@example.com"
                  required
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="9890909090"
                  required
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  required
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password_confirmation"
                  className="form-label fw-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="form-control"
                  required
                  value={signUpData.password_confirmation}
                  onChange={handleSignUpChange}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  name="terms"
                  required
                  checked={signUpData.terms}
                  onChange={handleSignUpChange}
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="text-decoration-none">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-decoration-none">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Create Account
              </button>

              <div className="text-center position-relative my-3 text-muted">
                <div className="position-absolute top-50 start-0 w-100 border-top"></div>
                <span className="bg-light px-2 position-relative">
                  Or sign up with
                </span>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                >
                  Facebook
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
