// import { DatePicker } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleRoom } from "../../redux/actions/roomAction";
import { getSingleProperty } from "../../redux/actions/propertyAction";

const RoomDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { room = {} } = useSelector((state) => state.roomState);
  const { property = {} } = useSelector((state) => state.propertyState);
  const propertyId = room.property;

  useEffect(() => {
    dispatch(getSingleRoom(id));
    dispatch(getSingleProperty(propertyId));
  }, [dispatch, id, propertyId]);

  //   const { RangePicker } = DatePicker;
  //   const dateFormat = "DD/MM/YYYY";

  //   Booking calendar
  //   const [date, setDate] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: new Date(),
  //       key: "selection",
  //     },
  //   ]);

  //   const handleSelect = (range) => {
  //     setDate([range.selection]);
  //   };

  return (
    <div className="min-h-screen text-white flex w-full p-10">
      <div className="px-20">
        <h2 className="font-bold text-2xl">{room.roomName}</h2>
        {/* Images Container */}
        <div className="flex gap-5 w-full py-8">
          {room && room.images && room.images.length > 0 && (
            <>
              {/* First Image - Larger */}
              <div className="w-[50%] h-[25.5rem] overflow-hidden">
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
        {/* Details */}
        <div className="w-full">
          <h2 className="font-semibold text-xl">
            Place in {property?.city},{property?.state}
          </h2>
          <hr className="my-3" />
          <div className="py-3">
            <b>Owner Name</b>
          </div>
          <hr className="my-3" />
        </div>
      </div>

      {/* Booking Card */}
      {/* <div>
        <h2 className="font-semibold text-xl py-3">
          How long do you wanna stay?
        </h2>
        <div className="w-[25rem] h-[35rem] bg-white/10 rounded-2xl p-6">
          <div className="w-full flex">
            <RangePicker
              className="w-full p-3"
              placeholder={["Check In", "Check Out"]}
              onChange={handleSelect}
              format={dateFormat}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default RoomDetails;
