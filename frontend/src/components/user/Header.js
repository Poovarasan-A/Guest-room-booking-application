import { useDispatch, useSelector } from "react-redux";
import {
  loggedUser,
  logoutUser,
  updateUser,
} from "../../redux/actions/userActions";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const { user, isAuthenticated } = useSelector((state) => state.userState);

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
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  return (
    <div
      className="h-[6rem] w-full fixed top-0 left-0 text-white inset-0"
      ref={menuRef}
    >
      <div className="h-full w-full flex items-center justify-end gap-8 px-32">
        {user && userType === "owner" ? (
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
              <Link to="" className="py-2 font-semibold hover:bg-neutral-200">
                My Profile
              </Link>
              <Link to="" className="py-2 font-semibold hover:bg-neutral-200">
                My Bookings
              </Link>
              <hr />
              <button
                onClick={() => logoutHandler}
                className="py-2 font-semibold hover:bg-neutral-200 text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="py-2 px-8 bg-blue-600 hover:bg-blue-600/80 rounded-full"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
