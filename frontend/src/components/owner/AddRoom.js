import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addNewRoom } from "../../redux/actions/roomAction";
import { clearRoomCreated } from "../../redux/slices/roomSlices";

const AddRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [floorSize, setFloorSize] = useState("");
  const [noOfBeds, setNoOfBeds] = useState("");
  const [amneties, setAmneties] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [minBookingDays, setMinBookingDays] = useState("");
  const [maxBookingDays, setMaxBookingDays] = useState("");

  const { isRoomCreated, error } = useSelector((state) => state.propertyState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyHandler = (e) => {
    e.preventDefault();
    const roomData = {
      roomName,
      floorSize,
      noOfBeds,
      amneties,
      rentPerDay,
      minBookingDays,
      maxBookingDays,
    };
    dispatch(addNewRoom(roomData));
  };

  useEffect(() => {
    if (isRoomCreated) {
      console.log("Room Created Successfully!!");
      dispatch(clearRoomCreated());
      navigate("/dashboard");
      return;
    }
    if (error) {
      return console.log(error);
    }
  }, [isRoomCreated, error, dispatch, navigate]);

  return (
    <div className="text-white w-full h-full flex items-center justify-center">
      <form
        onSubmit={propertyHandler}
        className="w-[35%] bg-neutral-700/40 rounded-xl py-14 px-14 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Room Name</label>
          <input
            id="name"
            type="text"
            placeholder="Room Name"
            className="p-2 rounded-md bg-white text-black"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="size">Floor Size</label>
          <input
            id="size"
            type="text"
            placeholder="Floor Size"
            className="p-2 rounded-md bg-white text-black"
            value={floorSize}
            onChange={(e) => setFloorSize(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="beds">No of Beds</label>
          <input
            id="beds"
            type="number"
            placeholder="No of Beds"
            className="p-2 rounded-md bg-white text-black"
            value={noOfBeds}
            onChange={(e) => setNoOfBeds(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amneties">Amneties</label>
          <input
            id="amneties"
            type="text"
            placeholder="Amneties"
            className="p-2 rounded-md bg-white text-black"
            value={amneties}
            onChange={(e) => setAmneties(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rent">Rents Per Day</label>
          <input
            id="rent"
            type="number"
            placeholder="Rents per day"
            className="p-2 rounded-md bg-white text-black"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="minBooking">Min. Booking Days</label>
          <input
            id="minBooking"
            type="number"
            placeholder="Minimum Booking days"
            className="p-2 rounded-md bg-white text-black"
            value={minBookingDays}
            onChange={(e) => setMinBookingDays(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="maxBooking">Max. Booking Days</label>
          <input
            id="maxBooking"
            type="number"
            placeholder="Maximum Booking days "
            className="p-2 rounded-md bg-white text-black"
            value={maxBookingDays}
            onChange={(e) => setMaxBookingDays(e.target.value)}
          />
        </div>
        <button className=" w-full p-2 my-4 rounded-3xl bg-blue-600 hover:bg-blue-500">
          Add Room
        </button>
      </form>
    </div>
  );
};
export default AddRoom;
