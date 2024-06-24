import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/actions/roomAction";
import { getProperties } from "../redux/actions/propertyAction";

const Home = () => {
  const { rooms } = useSelector((state) => state.roomState);
  const { properties } = useSelector((state) => state.propertyState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(null));
    dispatch(getProperties(null));
  }, [dispatch]);

  return (
    <div className="text-white w-full h-full flex flex-col items-center justify-center">
      <div className="text-2xl">Home | Under Construction</div>
      <div className="flex gap-10">
        {rooms &&
          rooms.map((room) => (
            <div
              key={room._id}
              className="w-[15rem] h-[20rem] bg-white rounded-2xl overflow-hidden text-black"
            >
              <div className=" w-full">
                <img src="/images/props-img.jpg" alt="room" className="" />
              </div>
              {properties &&
                properties.map((property) => (
                  <div className="p-2">
                    <h2>
                      {property.state},{property.city}
                    </h2>
                    <b>Rs.{room.rentPerDay}</b>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
