import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="text-white w-full h-full flex flex-col items-center justify-center">
      <Sidebar />
      <div className=" text-2xl">Dashboard | Under Construction</div>
      <div className="flex gap-14">
        <Link to="/property">Properties</Link>
        <Link to="/add/property">Add Property</Link>
      </div>
    </div>
  );
};
export default Dashboard;
