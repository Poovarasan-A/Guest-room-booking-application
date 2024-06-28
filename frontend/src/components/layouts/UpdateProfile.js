import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { loggedUser, updateUser } from "../../redux/actions/userActions";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Header from "../user/Header";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesDeleted, setImagesDeleted] = useState(false);

  //Dispatch Hook used to dispatch actions from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //useSelectoe hooks allows to extract data from redux store state
  const { user, loading } = useSelector((state) => state.userState);

  //Handle file input changes
  const onImagesChange = (e) => {
    // converts files object into array
    const images = Array.from(e.target.files);
    //for each image new instance reader is created
    images.forEach((image) => {
      const reader = new FileReader();
      //onload is a eventHandler
      reader.onload = () => {
        if (reader.readyState === 2) {
          //updates a state by appending new image preview url
          setImages((oldArray) => [...oldArray, image]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      //reads the content of image as data URL
      reader.readAsDataURL(image);
    });
  };

  const profileHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      mobile,
      imagesDeleted,
    };
    // Combine productData and imageData into one FormData object
    const combinedData = new FormData();
    // for loop iterate over each property  in formData object and append its value to combinedData
    for (const key in formData) {
      combinedData.append(key, formData[key]);
    }
    // iterates over an array of images and append each image to combinedData under the images
    images.forEach((image) => {
      combinedData.append("images", image);
    });
    // dispacthes an action and sending propertyId and datas

    dispatch(updateUser(id, combinedData));
    navigate("/profile");
  };

  const removeImage = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesDeleted(true);
  };

  // Fetching Logged user details on page loads
  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setImagesPreview(user.images);
    }
  }, [user]);

  const shouldHideAddProperty = true;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-white">
          <Header hideAddProperty={shouldHideAddProperty} />
          <div className="text-white w-full h-screen flex items-center justify-start relative mt-[3rem]">
            <div className="absolute z-0 inset-0">
              <img src="/images/bg.jpg" alt="bg" />
              <div className="absolute inset-0 bg-black/80"></div>
            </div>
            <div className="w-[60%] bg-neutral-900/95 rounded-2xl px-[5rem] py-[1.5rem] flex flex-col gap-3 z-10  ml-[10rem]">
              <div className="flex items-center gap-2">
                <IoIosArrowDroprightCircle className="text-xl text-blue-500" />
                <h2 className="font-semibold text-2xl"> Update Profile</h2>
              </div>
              <div className="flex p-10 gap-[8rem] items-center">
                {/* profile */}
                <div className="flex flex-col items-center gap-16">
                  <div className="w-[16rem] h-[16rem] rounded-full overflow-hidden bg-white">
                    <img
                      src={imagesPreview || "/images/default_avatar.png"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="uploadImg"
                    className="py-2 px-4 border-2 border-dashed rounded-full hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                    onClick={() => removeImage()}
                  >
                    <input
                      type="file"
                      id="uploadImg"
                      className=" hidden"
                      accept="image/*"
                      multiple
                      onChange={onImagesChange}
                    />
                    <HiMiniPencilSquare />
                    Change Avatar
                  </label>
                </div>
                {/* Profile details */}
                <form onSubmit={profileHandler} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      id="mobile"
                      type="number"
                      placeholder="Mobile Number"
                      className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 rounded-lg  text-white bg-transparent border-[1px]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" w-full p-2 my-4 rounded-3xl bg-blue-600 hover:bg-blue-500"
                  >
                    Save
                  </button>
                  {/* Link to navigate if user wants to create new account  */}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UpdateProfile;
