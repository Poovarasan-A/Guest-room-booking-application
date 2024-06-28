import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-[12rem] bg-white/15">
      <div className="w-full h-[70%] flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <FaHome className="text-white text-3xl" />
          <h2 className="text-3xl flex">
            <p className="text-blue-500">𝐠𝐮𝐞𝐬𝐭</p>
            <p className="text-white">𝐒𝐭𝐚𝐲</p>
          </h2>
        </Link>
      </div>
      <hr />
      <div className="w-full h-[30%] flex items-center justify-center">
        <p className="flex gap-2 items-center text-white">
          Designed by{" "}
          <img src="/images/sign.png" className="w-[5rem] invert" alt="sign" />{" "}
          @ 2024
        </p>
      </div>
    </div>
  );
};
export default Footer;
