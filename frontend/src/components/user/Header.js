import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../../redux/actions/userActions";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaHome } from "react-icons/fa";

const Header = ({ hideProperties, hideAddProperty }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const menuRef = useRef();

  const { user = {}, isAuthenticated } = useSelector(
    (state) => state.userState
  );

  const userType = "owner";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hostHandler = (e) => {
    e.preventDefault();
    const userData = {
      userType,
    };
    dispatch(updateUser(user._id, userData));
    navigate("/add/property");
  };

  const logoutHandler = () => {
    dispatch(logoutUser);
    setIsLogout(true);
  };

  useEffect(() => {
    if (isLogout && !isAuthenticated) {
      window.location.reload();
    }
  }, [isLogout, isAuthenticated]);

  return (
    <div
      className="h-[6rem] w-full fixed top-0 left-0 text-white inset-0 bg-black/90 z-20"
      ref={menuRef}
    >
      <div className="h-full w-full flex items-center justify-between gap-8 px-32">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <FaHome className="text-white text-3xl" />
          <h2 className="text-3xl flex">
            <p className="text-blue-500">𝐠𝐮𝐞𝐬𝐭</p>
            <p className="text-white">𝐒𝐭𝐚𝐲</p>
          </h2>
        </Link>
        <div className="flex items-center gap-8">
          {!hideAddProperty && (
            <Link
              to="/add/property"
              className="border-2 border-white/80 rounded-lg p-2 text-sm  hover:bg-white/15 hover:border-blue-500/80"
            >
              Add New Property
            </Link>
          )}
          {!hideProperties && (
            <div>
              {user && user.userType === "owner" ? (
                <Link
                  to="/property"
                  className=" bg-blue-600 py-2 px-6 rounded-3xl  hover:bg-blue-600/80"
                >
                  Your Propeties
                </Link>
              ) : (
                <form onSubmit={hostHandler}>
                  <button
                    className="border-2 border-white py-2 px-6 rounded-3xl  hover:bg-white/15"
                    type="submit"
                  >
                    Become a host
                  </button>
                </form>
              )}
            </div>
          )}
          {user && isAuthenticated ? (
            <div className="relative">
              {/* navigation */}
              <div className="mx-4 border-2 border-white w-[6rem] rounded-full p-1 flex items-center justify-between">
                <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-white"></div>
                <div
                  className="pr-1 cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <CgMenuRightAlt className="text-white text-[2rem]" />
                </div>
              </div>
              {/* Dropdown */}
              <div
                className={`absolute w-[12rem] bg-white top-16 right-4 rounded-xl text-black text-center flex flex-col z-0 overflow-hidden 
            
            ${showMenu ? "opacity-100" : "opacity-0"}
            `}
              >
                <Link
                  to="/profile"
                  className="py-2 font-semibold hover:bg-neutral-200"
                >
                  My Profile
                </Link>
                <Link
                  to="/bookings"
                  className="py-2 font-semibold hover:bg-neutral-200"
                >
                  My Bookings
                </Link>
                <hr />
                <button
                  onClick={() => logoutHandler()}
                  className="py-2 font-semibold hover:bg-neutral-200 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="py-2 px-8 bg-blue-500 hover:bg-blue-500/80 rounded-full"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
