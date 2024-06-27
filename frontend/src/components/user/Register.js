import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../../redux/actions/userActions";
import toast from "react-hot-toast";
import { clearLoginErr } from "../../redux/slices/userSlices";
import { FaHome } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.userState);

  const registerHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      mobile,
      password,
    };
    dispatch(newUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`welcome ${name}! `);
      navigate("/");
      return;
    }
    if (error) {
      toast.error(error);
      dispatch(clearLoginErr());
    }
  }, [isAuthenticated, name, error, navigate, dispatch]);

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
        onSubmit={registerHandler}
        className="w-[32%] bg-neutral-900/95 rounded-2xl py-10 px-10 flex flex-col gap-3 z-10  mr-[10rem]"
      >
        <h2 className="font-bold text-2xl pb-4">Create new account</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            type="number"
            placeholder="Mobile Number"
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
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
            className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className=" w-full p-2 my-4 rounded-3xl bg-blue-600 hover:bg-blue-500"
        >
          SignUp
        </button>
        <p>
          Have an account?
          <Link to="/login" className="text-blue-600">
            &nbsp;Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
