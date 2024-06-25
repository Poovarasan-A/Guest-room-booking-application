import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, user } = useSelector(
    (state) => state.userState
  );

  const registerHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`welcome ${user.name}! `);
      navigate("/");
      return;
    }
    if (error) {
      return console.log(error);
    }
  }, [isAuthenticated, user, error, navigate]);

  return (
    <div className="text-white w-full h-screen flex items-center justify-center">
      <form
        onSubmit={registerHandler}
        className="w-[35%] bg-neutral-700 bg-opacity-40 rounded-xl py-14 px-14 flex flex-col gap-2"
      >
        <h2 className="font-bold text-2xl py-4">Login to continue</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email or Mobile number</label>
          <input
            id="email"
            type="text"
            placeholder="Email or Mobile number"
            className="p-2 rounded-sm text-black"
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
            className="p-2 rounded-sm text-black"
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
            &nbsp;signUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
