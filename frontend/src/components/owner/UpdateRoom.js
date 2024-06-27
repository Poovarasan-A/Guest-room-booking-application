import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRoom, updateRoom } from "../../redux/actions/roomAction";
import { BsTrash } from "react-icons/bs";
import { MdFileUpload } from "react-icons/md";
import { clearRoomUpdated } from "../../redux/slices/roomSlices";

const UpdateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [floorSize, setFloorSize] = useState("");
  const [noOfBeds, setNoOfBeds] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [rentPerDay, setRentPerDay] = useState("");
  const [minBookingDays, setMinBookingDays] = useState("");
  const [maxBookingDays, setMaxBookingDays] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesDeleted, setImagesDeleted] = useState(false);

  const { isRoomUpdated, error, room } = useSelector(
    (state) => state.roomState
  );
  const { user } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const onImagesChange = (e) => {
    const images = Array.from(e.target.files);

    images.forEach((image) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, image]);
        }
      };

      reader.readAsDataURL(image);
    });
  };

  /* AMENITIES */

  const handleAmenityChange = (event) => {
    const { value } = event.target;
    if (amenities.includes(value)) {
      setAmenities(amenities.filter((item) => item !== value));
    } else {
      setAmenities([...amenities, value]);
    }
  };

  const propertyHandler = (e) => {
    e.preventDefault();
    const roomData = {
      roomName,
      floorSize,
      noOfBeds,
      noOfGuests,
      amenities,
      rentPerDay,
      minBookingDays,
      maxBookingDays,
      imagesDeleted,
    };

    // Combine productData and imageData into one FormData object
    const combinedData = new FormData();
    for (const key in roomData) {
      combinedData.append(key, roomData[key]);
    }

    images.forEach((image) => {
      combinedData.append("images", image);
    });
    dispatch(updateRoom(id, combinedData));
  };

  //remove image while uploading

  const removeImage = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesDeleted(true);
  };

  useEffect(() => {
    if (user && user.userType === "guest") {
      navigate("/");
    }
    if (isRoomUpdated) {
      console.log("Room Updated Successfully!!");
      dispatch(clearRoomUpdated());
      navigate("/property");
      return;
    }
    if (error) {
      return console.log(error);
    }
    dispatch(getSingleRoom(id));
  }, [isRoomUpdated, error, dispatch, navigate, id, user]);

  useEffect(() => {
    if (room) {
      setRoomName(room.roomName);
      setFloorSize(room.floorSize);
      setNoOfBeds(room.noOfBeds);
      setNoOfGuests(room.noOfGuests);
      setRentPerDay(room.rentPerDay);
      setMinBookingDays(room.minBookingDays);
      setMaxBookingDays(room.maxBookingDays);
      setAmenities(room.amenities);
      setImagesPreview(room.images);
    }
  }, [room]);

  return (
    <div className="text-white w-full min-h-screen flex flex-col items-center mb-14 tracking-wider">
      <h2 className="font-semibold text-2xl my-8">
        Share some basics about your room
      </h2>
      <form
        onSubmit={propertyHandler}
        className="w-[90%] bg-neutral-700/40 rounded-xl py-10 px-14 flex flex-col items-center gap-2"
      >
        <div className="flex w-full justify-evenly gap-x-12 py-2">
          {/* 1st half */}
          <div className="w-[45%] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Room Name</label>
              <input
                id="name"
                type="text"
                placeholder="Room Name"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="size">Floor Size</label>
              <input
                id="size"
                type="text"
                placeholder="Floor Size"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={floorSize}
                onChange={(e) => setFloorSize(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-3">
              <div className="w-full flex flex-col gap-3">
                <label htmlFor="beds">No of Beds</label>
                <input
                  id="beds"
                  type="number"
                  placeholder="No of Beds"
                  className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                  value={noOfBeds}
                  onChange={(e) => setNoOfBeds(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <label htmlFor="guests">No of Guets</label>
                <input
                  id="guests"
                  type="number"
                  placeholder="No of Guests"
                  className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                  value={noOfGuests}
                  onChange={(e) => setNoOfGuests(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* 2nd half */}
          <div className="w-[45%] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="rent">Rents Per Day</label>
              <input
                id="rent"
                type="number"
                placeholder="Rents per day"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={rentPerDay}
                onChange={(e) => setRentPerDay(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="minBooking">Min. Booking Days</label>
              <input
                id="minBooking"
                type="number"
                placeholder="Minimum Booking days"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={minBookingDays}
                onChange={(e) => setMinBookingDays(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="maxBooking">Max. Booking Days</label>
              <input
                id="maxBooking"
                type="number"
                placeholder="Maximum Booking days "
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={maxBookingDays}
                onChange={(e) => setMaxBookingDays(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Amenities */}
        <div className="flex w-full gap-x-12 justify-evenly">
          <div className="w-[45%]">
            <label htmlFor="maxBooking">Amenities</label>
            <div className="p-5 my-4 border-2 w-full flex gap-4  border-gray-200 rounded-lg">
              <div className="flex w-full justify-around">
                {/* First half */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="wifi"
                      value="Wifi"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Wifi")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="tv"
                      value="TV"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("TV")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="tv">TV</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="ac"
                      value="Air Conditioning"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Air Conditioning")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="ac">Air Conditioning</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="kitchen"
                      value="Kitchen"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Kitchen")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="kitchen">Kitchen</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="workspace"
                      value="Workspace"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Workspace")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="workspace">Workspace</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="kit"
                      value="First aid kit"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("First aid kit")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="kit">First aid kit</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="heater"
                      value="Room heater"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Room heater")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="heater">Room heater</label>
                  </div>
                </div>
                {/* Second half */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="balcony"
                      value="Balcony"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Balcony")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="balcony">Balcony</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="micro"
                      value="Microwave"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Microwave")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="micro">Microwave</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="tub"
                      value="Bath tub"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Bath tub")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="tub">Bath tub</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="iron"
                      value="Iron"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Iron")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="iron">Iron</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="washing"
                      value="Washing machine"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Washing machine")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="washing">Washing machine</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="security"
                      value="Security camera"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Security camera")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="security">Security camera</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="fridge"
                      value="Fridge"
                      className="cursor-pointer accent-blue-600"
                      checked={amenities.includes("Fridge")}
                      onChange={handleAmenityChange}
                    />
                    <label htmlFor="fridge">Fridge</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Images Uploading */}
          <div className="w-[45%]">
            <label htmlFor="maxBooking">Property Images</label>

            <div className="p-5 my-4 border-2 w-full flex gap-4  border-gray-200 rounded-lg">
              <div className="w-full flex flex-wrap gap-2">
                <label
                  htmlFor="uploadImg"
                  className="w-[6rem] min-h-[4rem] flex flex-col items-center justify-center border-2 rounded-md border-dashed border-gray-300 cursor-pointer"
                >
                  <input
                    type="file"
                    id="uploadImg"
                    className=" hidden"
                    accept="image/*"
                    multiple
                    onChange={onImagesChange}
                  />
                  <span className="text-blue-500 text-xs underline cursor-pointer">
                    <MdFileUpload className="text-lg" />
                  </span>
                  <p className="text-[9px] text-gray-400 pt-1">
                    jpeg, jpg or png
                  </p>
                </label>
                {imagesPreview.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-[6rem] h-[4rem] overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={""}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-3 right-2 bg-black p-1.5 rounded-full"
                      onClick={() => removeImage(image)}
                    >
                      <BsTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end px-5">
          <button className=" w-[12%] p-2 mt-5 rounded-lg bg-blue-600 hover:bg-blue-500">
            Update Room
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateRoom;
