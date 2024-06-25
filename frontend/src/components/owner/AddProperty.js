import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProperty } from "../../redux/actions/propertyAction";
import { clearPropertyCreated } from "../../redux/slices/propertySlice";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [description, setDescription] = useState("");

  const { isPropertyCreated, error, property } = useSelector(
    (state) => state.propertyState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyHandler = (e) => {
    e.preventDefault();
    const propertyData = {
      propertyName,
      address,
      city,
      state,
      country,
      postalCode,
      phoneNo,
      description,
    };
    dispatch(addNewProperty(propertyData));
  };

  useEffect(() => {
    if (isPropertyCreated) {
      console.log("Property Created Successfully!!");
      dispatch(clearPropertyCreated());
      navigate(`/addroom/${property._id}`);
      return;
    }
    if (error) {
      return console.log(error);
    }
  }, [isPropertyCreated, error, dispatch, navigate, property]);

  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center tracking-wider">
      <h2 className="font-semibold text-2xl my-8">
        Where's your property located?
      </h2>
      <form
        onSubmit={propertyHandler}
        className="w-[90%] bg-neutral-700/40 rounded-xl py-10 px-14 flex flex-col items-center gap-2"
      >
        <div className="flex w-full justify-evenly gap-x-12 py-2">
          {/* 1st half */}
          <div className="w-[45%] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Property name</label>
              <input
                id="name"
                type="text"
                placeholder="Property Name"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="address">Street Address</label>
              <input
                id="address"
                type="text"
                placeholder="Apartment, Street, Lane, etc."
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="City"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="State"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          {/* 2nd half */}
          <div className="w-[45%] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="post">Postal code</label>
              <input
                id="post"
                type="number"
                placeholder="Postal Code"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="contact">Property contact</label>
              <input
                id="contact"
                type="number"
                placeholder="Landline or Mobile"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                placeholder="Description"
                className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px] border-white/20 "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end px-5">
          <button className=" w-[12%] p-2 mt-5 rounded-lg bg-blue-600 hover:bg-blue-500">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProperty;
