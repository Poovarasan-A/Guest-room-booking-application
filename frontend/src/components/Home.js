import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/actions/roomAction";
import { getProperties } from "../redux/actions/propertyAction";
import Header from "./user/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const { rooms } = useSelector((state) => state.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(null));
    dispatch(getProperties(null));
  }, [dispatch]);

  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="flex gap-10">
        {rooms &&
          rooms.map((room) => (
            <Link
              to={`/roomdetails/${room._id}`}
              key={room._id}
              className="w-[15rem] h-[20rem] bg-white rounded-2xl overflow-hidden text-black"
            >
              <div className=" w-full h-[15rem]">
                <img
                  src={room.images[0] || "/images/props-img.jpg"}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2">
                <h2>
                  {room.property.state},{room.property.city}
                </h2>
                <b>Rs.{room.rentPerDay}</b>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Home;
