import React from "react";
import { Link, NavLink } from "react-router";
import Container from "../Utility/Container";
import { Heart } from "lucide-react";
import { useTheme } from "../Providers/ThemeProvider";
import { useAuth } from "../Providers/AuthContext";

const Navbar = () => {
  const { user, setUser, logoutUser, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active-underline" : "")}
      >
        {children}
      </NavLink>
    </li>
  );

  const links = (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/all-reviews">All Reviews</NavItem>
      <NavItem to="/my-reviews">My Reviews</NavItem>
      <NavItem to="/create-review">Create Review</NavItem>
      <NavItem to="/favorites">
        <Heart size={18} className="text-accent" /> Favorites
      </NavItem>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <NavLink
              to="/"
              className="flex items-center text-xl text-[32px] font-bold"
            >
              <img src="/FoodLover.png" alt="" className="w-15" />
              Food<span className="text-gradient">Lover</span>
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex justify-center items-center">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="mr-4">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                  className="theme-controller"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-7 w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            {!loading && user ? (
              <div className="flex items-center gap-5 dropdown-end">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className=" m-1">
                    <Link
                      to="/profile"
                      className="tooltip tooltip-left"
                      data-tip={user?.displayName || user.username || "Profile"}
                    >
                      <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src={user.photoURL || user.photoUrl} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <NavLink to="/my-reviews">My Reviews</NavLink>
                    </li>
                    <li>
                      <NavLink to="/create-review">Add Review</NavLink>
                    </li>
                    <li
                      className="hover:bg-red-100 hover:text-red-600"
                      onClick={handleLogout}
                    >
                      <a>LogOut</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="md:flex items-center hidden text-gradient font-semibold space-x-2">
                <NavLink to="/auth/login" className="btn btn-outline-gradient">
                  Login
                </NavLink>
                <NavLink to="/auth/register" className="btn btn-primary">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
