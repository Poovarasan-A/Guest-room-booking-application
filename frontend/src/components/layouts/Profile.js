import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useEffect } from "react";
import { loggedUser } from "../../redux/actions/userActions";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Header from "../user/Header";

const Profile = () => {
  //Dispatch Hook used to dispatch actions from redux
  const dispatch = useDispatch();
  //useSelectoe hooks allows to extract data from redux store state
  const { user, loading } = useSelector((state) => state.userState);
  // Fetching Logged user details on page loads
  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

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
                <h2 className="font-semibold text-2xl">Profile</h2>
              </div>
              <div className="flex p-10 gap-[8rem] items-center">
                {/* profile */}
                <div className="flex flex-col items-center gap-16">
                  <div className="w-[16rem] h-[16rem] rounded-full bg-white">
                    <img
                      src="/images/default_avatar.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="py-2 px-4 border-2 border-dashed rounded-full hover:bg-white/10 flex items-center gap-2">
                    <HiMiniPencilSquare />
                    Change Avatar
                  </button>
                </div>
                {/* Profile details */}
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <b className="text-xl">Name</b>
                      <p className="text-white/80">{user.name}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b className="text-xl">Email</b>
                      <p className="text-white/80">{user.email}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b className="text-xl">Phone Number</b>
                      <p className="text-white/80">{user.mobile}</p>
                    </div>
                  </div>
                  <div>
                    <button className="py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/15">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
