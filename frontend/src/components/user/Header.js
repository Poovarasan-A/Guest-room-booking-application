import { useDispatch, useSelector } from "react-redux";
import { loggedUser, updateUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  //   const id = "6676a7829256afedd8148516";
  const { user } = useSelector((state) => state.userState);

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

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  return (
    <div className="h-[4.5rem] w-full fixed top-0 left-0 text-white">
      <div className="h-full w-full flex items-center justify-end">
        <form onSubmit={hostHandler}>
          <button
            className="border-2 border-white p-2 mr-24 hover:bg-white/15"
            type="submit"
          >
            Become a host
          </button>
        </form>
      </div>
    </div>
  );
};
export default Header;
