import { DatePicker, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRoom } from "../../redux/actions/roomAction";
import { getSingleProperty } from "../../redux/actions/propertyAction";
import moment from "moment";
import { newBooking, roombookings } from "../../redux/actions/bookingAction";
import Loader from "../layouts/Loader";
import Header from "./Header";
import toast from "react-hot-toast";
import { loggedUser } from "../../redux/actions/userActions";
import Footer from "../layouts/Footer";

const RoomDetails = () => {
  // Router hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Retriving datas from redux state
  const { room = {}, loading } = useSelector((state) => state.roomState);
  const { property = {} } = useSelector((state) => state.propertyState);
  const { user = {} } = useSelector((state) => state.userState);
  const { bookings = [], isBookingCreated } = useSelector(
    (state) => state.bookingState
  );

  //Property and room id to fetch datas
  const propertyId = room.property;
  const roomId = room._id;

  useEffect(() => {
    //Redirects to bookings page after successfull booking creation
    if (isBookingCreated) {
      toast.success(`Room booked successfully`);
      navigate("/bookings");
    }
    //Dispatch actions to fetch required data
    dispatch(loggedUser());
    dispatch(getSingleRoom(id));
    dispatch(getSingleProperty(propertyId));
    dispatch(roombookings(roomId));
  }, [dispatch, id, propertyId, roomId, isBookingCreated, navigate]);

  //Date Range picker config
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  // Booking calendar local states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // selected date disable function

  //Function to get dates between start and end dates
  const getDatesBetween = (start, end) => {
    let dates = [];
    let startDate = moment(start).startOf("day");
    const endDate = moment(end).startOf("day");
    while (startDate <= endDate) {
      dates.push(startDate.clone().format("YYYY-MM-DD"));
      startDate.add(1, "days");
    }
    return dates;
  };

  //Funciton to disable dates already booked by other users
  const disableDate = (current) => {
    if (current && current < moment().endOf("day")) {
      return true;
    }

    const disableDates = bookings.flatMap((booking) => {
      return getDatesBetween(booking.startDate, booking.endDate);
    });
    return disableDates.some((date) => current.isSame(date, "day"));
  };

  //Handle data selection in the range picker
  const handleSelect = (dates) => {
    const [startDate, endDate] = dates;

    //calculates duration in days and validate against min and max days
    const duration = moment.duration(endDate.diff(startDate)).asDays();
    if (duration < room.minBookingDays || duration > room.maxBookingDays) {
      message.error(
        `You can only book a min of ${room.minBookingDays} days and a max of ${room.maxBookingDays} days.`
      );
      return;
    }

    //Calculate total price based on selected dates and room rent per day
    const dayCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    const price = room.rentPerDay * dayCount;
    setStartDate(startDate);
    setEndDate(endDate);
    setTotalPrice(price);
  };

  //to calculate total no.of.dates selected
  const dayCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

  const handleBook = (e) => {
    e.preventDefault();

    const bookingData = {
      room: room._id,
      owner: property.owner._id,
      guest: user._id,
      property: propertyId,
      startDate,
      endDate,
      totalPrice,
    };

    //dispatching newBooking action to create new booking
    dispatch(newBooking(bookingData));
  };
  const shouldHideAddProperty = true;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white flex w-full p-10 tracking-wide">
          <Header hideAddProperty={shouldHideAddProperty} />
          <div className="px-20 mt-[4rem]">
            <h2 className="font-bold text-2xl">{room.roomName}</h2>
            {/* Images Container */}
            <div className="flex gap-5 w-full py-8">
              {room && room.images && room.images.length > 0 && (
                <>
                  {/* First Image - Larger */}
                  <div className="w-[55%] h-[25.5rem] overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Remaining Images - Smaller */}
                  <div className="w-[50%] flex flex-wrap gap-5">
                    {room.images.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="w-[18rem] h-[12rem] overflow-hidden"
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/*Room Details */}
            <div className="w-full flex gap-8 justify-between">
              <div>
                <h2 className="font-semibold text-2xl">
                  Place in {property?.city}, {property?.state}
                </h2>
                <p className="pt-2 text-white/80">
                  Beds - {room.noOfBeds}, Guests - {room.noOfGuests}, Floor size
                  - {room.floorSize}
                </p>
                <hr className="my-3 border-white/20" />
                <div className="py-3 flex items-center gap-4">
                  <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden bg-white">
                    <img
                      src={user?.images[0]}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <b className="text-lg capitalize">
                    Hosted by {property?.owner?.name}
                  </b>
                </div>
                <hr className="my-3 border-white/20" />
                <div>
                  <h3 className="py-2 font-bold text-lg">About this place</h3>
                  <p>{property.description}</p>
                </div>
                <hr className="my-3 border-white/20" />
                <div>
                  <h3 className="py-2 font-bold text-lg">
                    What this place offers
                  </h3>
                  <div className="flex flex-wrap gap-3 py-2 pt-4">
                    {room &&
                      room.amenities &&
                      room.amenities.map((amenity) => (
                        <span
                          className="border-2 border-white/50 p-2 "
                          key={amenity}
                        >
                          {amenity}
                        </span>
                      ))}
                  </div>
                </div>
                <hr className="my-3 border-white/20" />
              </div>
              <div>
                {/* Booking Card */}
                <div className="">
                  <h2 className="font-semibold text-xl py-3 text-center">
                    How long do you wanna stay?
                  </h2>
                  <form
                    onSubmit={handleBook}
                    className="w-[25rem] max-h-[35rem] bg-white/10 rounded-2xl p-6"
                  >
                    <div className="w-full flex">
                      <RangePicker
                        className="w-full p-3"
                        placeholder={["Check In", "Check Out"]}
                        onChange={handleSelect}
                        disabledDate={disableDate}
                        format={dateFormat}
                      />
                    </div>
                    <div className="w-full">
                      {dayCount > 1 ? (
                        <div className="flex flex-col gap-3">
                          <h4 className="pt-3 text-md font-semibold">
                            Rs.{room.rentPerDay} X {dayCount} nights
                          </h4>
                          <h3 className="text-lg font-semibold">
                            Total Price: {room.rentPerDay * dayCount}
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                      {dayCount > 0 ? (
                        <button
                          type="submit"
                          className="p-2 w-full bg-blue-600 rounded-lg my-4 font-semibold hover:bg-blue-600/80"
                        >
                          Book now
                        </button>
                      ) : (
                        <p className="p-2 w-full bg-blue-600 rounded-lg font-semibold my-4 hover:bg-blue-600/80 text-center cursor-pointer">
                          Check Availability
                        </p>
                      )}
                      <p className="text-xs text-center text-white/60">
                        You can only book a min of {room.minBookingDays} days
                        and a max of {room.maxBookingDays} days.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default RoomDetails;
