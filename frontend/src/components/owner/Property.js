import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../redux/actions/propertyAction";
import { getRooms } from "../../redux/actions/roomAction";
import { Link } from "react-router-dom";

const Property = () => {
  const { properties } = useSelector((state) => state.propertyState);
  const { rooms } = useSelector((state) => state.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperties());
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <div className="py-5 px-8 text-white min-h-screen">
      <Sidebar />
      <div className="ml-[15rem]">
        <div className="flex justify-between items-center pb-8 pt-4 mx-4">
          <h2 className="font-bold text-2xl">Property Details</h2>
          <div className="flex gap-6">
            <Link
              to="/add/property"
              className="border-2 border-white/80 rounded-lg p-2 text-sm"
            >
              Add Property
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {properties &&
            properties.map((property) => (
              <div
                key={property._id}
                className="w-full flex flex-col bg-white/10 rounded-3xl py-4 px-8"
              >
                <div className="w-full flex py-6">
                  <div className="w-[45%]">
                    <h2 className="font-bold text-2xl py-2">
                      {property.propertyName}
                    </h2>
                    <div>
                      <b>Address : </b>
                      <p>
                        {property.address}, {property.city}, {property.state},{" "}
                        {property.country} - {property.postalCode}
                      </p>
                      <p>Phone - {property.phoneNo}</p>
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <h2>{property.description}</h2>
                  </div>
                  <div>
                    <Link
                      to={`/addroom/${property._id}`}
                      className="border-2 border-white/80 rounded-lg p-2 text-sm"
                    >
                      Add Room
                    </Link>
                  </div>
                </div>

                {rooms
                  .filter((room) => room.property._id === property._id)
                  .map((room, index) => (
                    <div key={room._id} className="w-full">
                      <hr className="my-2 border-white/20" />
                      <h2 className="font-semibold text-xl py-2">
                        {index + 1}. {room.roomName}
                      </h2>
                      <div className="flex py-2">
                        <div className="w-full">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="p-2 text-center">Floor Size</th>
                                <th className="p-2 text-center">No of Beds</th>
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
                          <div className="w-full ml-10 mt-4">
                            <b className=" text-lg">Amenities</b>
                            <div className="flex flex-wrap gap-3 py-2 pt-4">
                              {room.amenities.map((amenity) => (
                                <span className="border-2 border-white/50 p-2 ">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-[20%] rounded-lg overflow-hidden">
                          <img
                            src={room.images[0] || "/images/props-img.jpg"}
                            alt="img"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Property;
