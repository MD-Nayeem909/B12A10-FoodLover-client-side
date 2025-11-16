import React, { useContext, useState } from "react";
import Container from "../Utility/Container";
import { NavLink, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../Providers/AuthContext";
import axios from "axios";
import api from "../Utility/axios";

const Register = () => {
  const { createUser, googleSignIn, updateUserData } = useAuth();
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentLocation = location.state?.from?.pathname || "/";

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePhotoURLChange = (e) => {
    setPhotoURL(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }
    try {
      api
        .post("/auth/signup", {
          username,
          email,
          password,
          photoURL,
        })
        .then((response) => {
          Navigate(currentLocation, { replace: true });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Container>
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-4 mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mt-6 mb-3">Register Now!</h2>
          <span>
            Already have an account?{" "}
            <NavLink to="/auth/login" className="text-gradient">
              Login Now
            </NavLink>
          </span>
        </div>
        <form onSubmit={handleRegister} className="card-body ">
          <fieldset className="fieldset">
            <div>
              <label className="label mb-2">Name</label>
              <input
                type="text"
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Your Name"
                onChange={handleUsernameChange}
                required
                value={username}
              />
            </div>
            <div>
              <label className="label mb-2">Image-URL</label>
              <input
                type="text"
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Image URL...."
                onChange={handlePhotoURLChange}
                value={photoURL}
              />
            </div>
            <div>
              <label className="label mb-2">Email</label>
              <input
                type="email"
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="enter your email"
                onChange={handleEmailChange}
                required
                value={email}
              />
            </div>
            <div className="relative">
              <label className="label mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                required
                value={password}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 z-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label className="label mb-2">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Enter your password"
                onChange={handleConfirmPasswordChange}
                required
                value={confirmPassword}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 z-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="btn btn-primary mt-4">Register</button>
          </fieldset>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-[45%] h-px bg-gray-200"></span>
            <span className="font-semibold">OR</span>
            <span className="w-[45%] h-px bg-gray-200"></span>
          </div>
          <button onClick={handleGoogleSignIn} className="btn mt-4">
            <FcGoogle size={25} />
            Sign In With Google
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
