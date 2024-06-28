import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/actions/roomAction";
import { getProperties } from "../redux/actions/propertyAction";
import Header from "./user/Header";
import { Link } from "react-router-dom";
import Loader from "./layouts/Loader";
import Footer from "./layouts/Footer";

const Home = () => {
  const { rooms, loading } = useSelector((state) => state.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(null));
    dispatch(getProperties(null));
  }, [dispatch]);

  const shouldHideAddProperty = true;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-white w-full min-h-screen flex flex-col mt-[6.5rem] px-10">
          <Header hideAddProperty={shouldHideAddProperty} />
          <div className="flex gap-10 flex-wrap justify-around items-start">
            {rooms &&
              rooms.map((room) => (
                <Link
                  to={`/roomdetails/${room._id}`}
                  key={room._id}
                  className="w-[15rem] h-[20rem] bg-white rounded-2xl overflow-hidden text-black"
                >
                  <div className=" w-full h-[14rem]">
                    <img
                      src={room.images[0] || "/images/props-img.jpg"}
                      alt="room"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="py-2 px-3">
                    <h2 className="font-semibold truncate">
                      {room.property.city},{room.property.state}
                    </h2>
                    <p>{room.roomName}</p>
                    <b>Rs.{room.rentPerDay}/night</b>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default Home;
