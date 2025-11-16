import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Container from "../Utility/Container";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../Providers/AuthContext";
import toast from "react-hot-toast";
import passwordValidation from "../Utility/passwordValidation";
import axios from "axios";
import api from "../Utility/axios";

const Login = () => {
  const { user, setUser, googleSignIn, setLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValidation(password)) {
      return toast.error(
        "Password must be at least 6 characters long and contain at least one letter and one number."
      );
    }

    try {
      api
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          const token = res.data.token;
          if (token) {
            localStorage.setItem("token", token);
            setUser(res.data.user);
            setLoading(false);
          } else {
            alert("No token received");
          }
          Navigate(currentLocation, { replace: true });
        });
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (user) {
      Navigate(currentLocation, { replace: true });
    }
  }, [user, Navigate, currentLocation]);

  return (
    <Container>
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mt-6 mb-3">Login</h2>
          <span>
            Don't have an account?{" "}
            <NavLink to="/auth/register" className="text-gradient">
              Register Now
            </NavLink>
          </span>
        </div>
        <form onSubmit={handleSubmit} className="card-body ">
          <fieldset className="fieldset">
            <div>
              <label className="label">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label className="label">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 bg-base-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-7 text-gray-500 hover:text-gray-700 z-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>

              <div>
                <Link className="link link-hover">Forgot password?</Link>
              </div>
            </div>
            <button className="btn btn-primary mt-4">Sign In</button>
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

export default Login;
