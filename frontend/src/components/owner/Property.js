import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProperty,
  ownerProperties,
} from "../../redux/actions/propertyAction";
import { deleteRoom, getRooms } from "../../redux/actions/roomAction";
import { Link, useNavigate } from "react-router-dom";
import { clearPropertyDeleted } from "../../redux/slices/propertySlice";
import { TbFilePencil } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import { clearRoomDeleted } from "../../redux/slices/roomSlices";
import Swal from "sweetalert2";
import Loader from "../layouts/Loader";
import Header from "../user/Header";
import { loggedUser } from "../../redux/actions/userActions";

const Property = () => {
  const { user = {}, loading } = useSelector((state) => state.userState);
  const {
    properties = [],

    isPropertyDeleted,
  } = useSelector((state) => state.propertyState);
  const { rooms = [], isRoomDeleted } = useSelector((state) => state.roomState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyDeleteHandler = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Property?",
      icon: "warning",
      showCancelButton: true,
      background: "#1A1A1A",
      color: "#E6E6E6",
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Property has been deleted.",
          icon: "success",
          background: "#1A1A1A",
          color: "#E6E6E6",
        }).then(() => {
          dispatch(deleteProperty(id));
        });
      } else {
        console.log("Cancelled Deletion");
      }
    });
  };

  const roomDeleteHandler = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this room?",
      icon: "warning",
      showCancelButton: true,
      background: "#1A1A1A",
      color: "#E6E6E6",
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Room has been deleted.",
          icon: "success",
          background: "#1A1A1A",
          color: "#E6E6E6",
        }).then(() => {
          dispatch(deleteRoom(id));
        });
      } else {
        console.log("Cancelled Deletion");
      }
    });
  };

  const userId = user._id;

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.userType === "guest") {
      navigate("/");
    }

    dispatch(ownerProperties(userId));
    dispatch(getRooms());
    if (isPropertyDeleted) {
      dispatch(clearPropertyDeleted());
      return;
    }
    if (isRoomDeleted) {
      dispatch(clearRoomDeleted());
      return;
    }
  }, [dispatch, userId, isPropertyDeleted, isRoomDeleted, navigate, user]);

  const shouldHideProperties = true;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-5 px-10 text-white/90 min-h-screen">
          <Header hideProperties={shouldHideProperties} />
          <div className="mt-[4.5rem]">
            <div className="flex justify-between items-center pb-8 pt-4 mx-4">
              <h2 className="font-bold text-2xl">Property Details</h2>
            </div>
            <div className="flex flex-col gap-6">
              {properties &&
                properties.map((property) => (
                  <div
                    key={property._id}
                    className="w-full flex flex-col bg-white/10 rounded-3xl py-4 px-8"
                  >
                    <div className="w-full flex py-6">
                      <div className="w-[43%]">
                        <h2 className="font-bold text-2xl py-2 text-blue-400">
                          {property.propertyName}
                        </h2>
                        <div>
                          <b>Address : </b>
                          <p>
                            {property.address}, {property.city},{" "}
                            {property.state}, {property.country} -{" "}
                            {property.postalCode}
                          </p>
                          <p>Phone - {property.phoneNo}</p>
                        </div>
                      </div>
                      <div className="w-[43%]">
                        <p className="font-semibold text-lg">Description:</p>
                        <h2>{property.description}</h2>
                      </div>
                      <div className="flex flex-col gap-4 ml-14">
                        <Link
                          to={`/addroom/${property._id}`}
                          className="border-2 border-white/80 rounded-lg p-2 text-xs text-center hover:bg-white/15 hover:border-blue-500/80"
                        >
                          Add Room
                        </Link>
                        <Link
                          to={`/update/property/${property._id}`}
                          className="border-2 border-white/80 rounded-lg p-2 text-xs text-center hover:bg-white/15 hover:border-blue-500/80"
                        >
                          Update Property
                        </Link>
                        <button
                          className="border-2 border-white/80 rounded-lg p-2 text-xs text-center hover:bg-white/15 hover:border-blue-500/80"
                          onClick={(e) =>
                            propertyDeleteHandler(e, property._id)
                          }
                        >
                          Delete Property
                        </button>
                      </div>
                    </div>

                    {rooms
                      .filter((room) => room.property._id === property._id)
                      .map((room, index) => (
                        <div key={room._id} className="w-fullgap-2">
                          <hr className="my-2 border-white/20" />
                          <div className="flex">
                            <div className="w-[80%] py-2">
                              <h2 className="font-semibold text-xl py-2">
                                {index + 1}. {room.roomName}
                              </h2>
                              <div className="w-full">
                                <table className="w-full">
                                  <thead>
                                    <tr>
                                      <th className="p-2 text-center">
                                        Floor Size
                                      </th>
                                      <th className="p-2 text-center">
                                        No of Beds
                                      </th>
                                      <th className="p-2 text-center">
                                        No of Guests
                                      </th>
                                      <th className="p-2 text-center">
                                        Rent(Per day)
                                      </th>
                                      <th className="p-2 text-center">
                                        Min. Book days
                                      </th>
                                      <th className="p-2 text-center">
                                        Max. Book days
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="p-2 text-center">
                                        {room.floorSize}
                                      </td>
                                      <td className="p-2 text-center">
                                        {room.noOfBeds}
                                      </td>
                                      <td className="p-2 text-center">
                                        {room.noOfGuests}
                                      </td>
                                      <td className="p-2 text-center">
                                        {room.rentPerDay}
                                      </td>
                                      <td className="p-2 text-center">
                                        {room.minBookingDays}
                                      </td>
                                      <td className="p-2 text-center">
                                        {room.maxBookingDays}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="w-[90%] ml-10 mt-4">
                                  <b className=" text-lg">Amenities</b>
                                  <div className="flex flex-wrap gap-3 py-2 pt-4">
                                    {room.amenities.map((amenity) => (
                                      <span
                                        className="border-2 border-white/50 p-2 "
                                        key={amenity}
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-[20%] flex flex-col justify-around">
                              <div className="w-full flex justify-around">
                                <Link
                                  to={`/update/room/${room._id}`}
                                  className="border-2 border-blue-500/80 rounded-full p-2 text-xs text-center hover:bg-white/15"
                                >
                                  <TbFilePencil className="text-xl" />
                                </Link>
                                <button
                                  className="border-2 border-blue-500/80 rounded-full p-2 text-xs text-center hover:bg-white/15"
                                  onClick={(e) =>
                                    roomDeleteHandler(e, room._id)
                                  }
                                >
                                  <FaTrash className="text-lg" />
                                </button>
                              </div>
                              <div className="w-full h-[10rem] overflow-hidden rounded-lg">
                                <img
                                  src={
                                    room.images[0] || "/images/props-img.jpg"
                                  }
                                  alt="img"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Property;
