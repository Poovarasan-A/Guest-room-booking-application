import { useDispatch, useSelector } from "react-redux";
import { guestRoomBookings } from "../../redux/actions/bookingAction";
import { useEffect } from "react";
import Header from "./Header";
import { loggedUser } from "../../redux/actions/userActions";
import Loader from "../layouts/Loader";

const MyBookings = () => {
  const dispatch = useDispatch();

  //retrive bookings data for guest booked
  const { bookings = [], loading } = useSelector((state) => state.bookingState);
  const { user = {} } = useSelector((state) => state.userState);

  const userId = user?._id;

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(guestRoomBookings(userId));
    }
  }, [dispatch, userId]);

  const shouldHideAddProperty = true;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-5 px-10 w-full text-white/90 min-h-screen">
          <Header hideAddProperty={shouldHideAddProperty} />
          {bookings.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <p className="text-white text-xl"> No bookings</p>
            </div>
          ) : (
            <div className="mt-[5rem] px-10">
              <h2 className="font-bold text-xl">My Bookings</h2>
              {/* Bookings card */}
              <div className="w-full flex flex-wrap gap-6">
                {bookings &&
                  bookings.map((booking) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    return (
                      <div
                        className="w-[30%] bg-white/10 rounded-3xl p-4 my-8"
                        key={booking._id}
                      >
                        <div className=" w-full h-[15rem] rounded-xl overflow-hidden">
                          <img
                            src={
                              booking.room?.images?.[0] ||
                              "/images/props-img.jpg"
                            }
                            alt="room"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="px-2">
                          <h2 className="font-semibold text-lg pt-2 capitalize">
                            {booking.room?.roomName}
                          </h2>
                          <h2 className=" text-md text-white/70 pt-2">
                            {booking.property?.city}, {booking.property?.state}
                          </h2>
                          <p className="pt-2">
                            Check In - {startDate.toDateString().slice(3)}
                          </p>
                          <p className="pt-2">
                            Check Out - {endDate.toDateString().slice(3)}
                          </p>
                          <p className="pt-2 font-semibold text-lg">
                            Total Price - Rs.{booking.totalPrice}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default MyBookings;
