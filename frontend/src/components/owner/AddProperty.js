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

  const { isPropertyCreated, error } = useSelector(
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
      navigate("/add/room");
      return;
    }
    if (error) {
      return console.log(error);
    }
  }, [isPropertyCreated, error, dispatch, navigate]);

  return (
    <div className="text-white w-full h-full flex flex-col items-center justify-center">
      <h2 className="font-semibold text-xl my-8">
        Tell us about your property
      </h2>
      <form
        onSubmit={propertyHandler}
        className="w-[70%] bg-neutral-700/40 rounded-xl py-10 px-14 flex flex-col items-center gap-2"
      >
        <div className="flex w-full justify-evenly gap-12 py-2">
          {/* 1st half */}
          <div className="w-[45%] flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Property name</label>
              <input
                id="name"
                type="text"
                placeholder="Property Name"
                className="p-2 rounded-md bg-white text-black"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Address"
                className="p-2 rounded-md bg-white text-black"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="City"
                className="p-2 rounded-md bg-white text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="State"
                className="p-2 rounded-md bg-white text-black"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          {/* 2nd half */}
          <div className="w-[45%] flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                className="p-2 rounded-md bg-white text-black"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="post">Postal code</label>
              <input
                id="post"
                type="number"
                placeholder="Postal Code"
                className="p-2 rounded-md bg-white text-black"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact">Property contact</label>
              <input
                id="contact"
                type="number"
                placeholder="Landline or Mobile"
                className="p-2 rounded-md bg-white text-black"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                placeholder="Description"
                className="p-2 rounded-md bg-white text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className=" w-[20%] p-2 mt-10 rounded-3xl bg-blue-600 hover:bg-blue-500">
          Add Property
        </button>
      </form>
    </div>
  );
};
export default AddProperty;
