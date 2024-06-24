import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../../redux/actions/userActions";

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
      console.log(`welcome ${name}! `);
      navigate("/");
      return;
    }
    if (error) {
      return console.log(error);
    }
  }, [isAuthenticated, name, error, navigate]);

  return (
    <div className="text-white w-full h-full flex items-center justify-center">
      <form
        onSubmit={registerHandler}
        className="w-[35%] bg-neutral-700/40 rounded-xl py-14 px-14 flex flex-col gap-2"
      >
        <h2 className="font-bold text-2xl py-4">Create new account</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="p-2 rounded-md bg-white text-black"
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
            className="p-2 rounded-md bg-white text-black"
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
            className="p-2 rounded-md bg-white text-black"
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
            className="p-2 rounded-md bg-white text-black"
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
