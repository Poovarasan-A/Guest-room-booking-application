import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import toast from "react-hot-toast";
import { clearLoginErr } from "../../redux/slices/userSlices";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, user } = useSelector(
    (state) => state.userState
  );
  //function to handle login
  const loginHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`welcome ${user.name}! `, {
        position: "top-center",
      });
      navigate("/");
      return;
    }
    if (error && error.message) {
      toast.error(error.message, {
        position: "top-center",
      });
      dispatch(clearLoginErr()); // ensures clearing of error which already showed
    }
  }, [isAuthenticated, user, error, navigate, dispatch]);

  return (
    <div className="text-white w-full h-screen flex items-center justify-end relative">
      <div className="absolute top-12 left-20 z-20">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <FaHome className="text-white text-3xl" />
          <h2 className="text-3xl flex">
            <p className="text-blue-500">𝐠𝐮𝐞𝐬𝐭</p>
            <p className="text-white">𝐒𝐭𝐚𝐲</p>
          </h2>
        </Link>
      </div>
      <div className="absolute z-0 inset-0">
        <img src="/images/bg.jpg" alt="bg" />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <form
        onSubmit={loginHandler}
        className="w-[32%] bg-neutral-900/95 rounded-2xl py-14 px-10 flex flex-col gap-3 z-10  mr-[10rem]"
      >
        <h2 className="font-bold text-2xl py-4">Login to continue</h2>
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email or Mobile number</label>
          <input
            id="email"
            type="text"
            placeholder="Email or Mobile number"
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className=" w-full p-2 my-4 rounded-3xl bg-blue-600 hover:bg-blue-500"
        >
          Login
        </button>
        <p>
          New user?
          <Link to="/register" className="text-blue-600">
            &nbsp;Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
