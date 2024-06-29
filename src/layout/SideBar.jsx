import { useLocation, useNavigate } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import Update from "../Home/Update";
import { GoArrowUpLeft } from "react-icons/go";
import Search from "../Home/Search";
import axios from "axios";
import toast from "react-hot-toast";
import { setToken, setUser } from "../redux/userSlice";

const SideBar = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const [showUpdate, setShowUpdate] = useState(false);
  const [conversations, setConversations] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => { }, []);
    const navigate=useNavigate()
  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
          toast.success("user logged out");
          dispatch(setUser({}));
          dispatch(setToken(""));
          navigate("/login")
          
          
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={` h-full flex w-[400px] min-h-screen`}>
      <div className="w-[70px] h-full flex flex-col justify-between min-h-screen py-[20px] cursor-pointer">
        <div className="h-[140px]  grid grid-rows-2">
          <div className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl">
            <AiFillMessage />
          </div>
          <div
            className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <HiUserAdd />
          </div>
        </div>
        <div className="h-[140px] grid grid-rows-2 cursor-pointer">
          <div
            className="flex items-center justify-center "
            onClick={() => setShowUpdate(!showUpdate)}
          >
            <img
              src={user.profilePic}
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
          <div
            className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl"
            onClick={logout}
          >
            <CiLogout />
          </div>
        </div>
      </div>
      <div className="w-full h-full min-h-screen bg-white">
        <div className="h-[90px] max-md:h-[80px] w-full flex items-center font-bold text-xl pl-[20px] border-b-[2px] ">
          Messages
        </div>
        <div className="w-full h-[calc(100vh-90px)] overflow-x-hidden overflow-y-scroll scollbar ">
          {conversations.length === 0 && (
            <div className="flex flex-col items-center w-full h-full pt-[50px]">
              <GoArrowUpLeft className="text-6xl text-[#3D4A5F] font-bold" />
              <div className="text-center px-[5px]">
                Explore users to start Conversations with
              </div>
            </div>
          )}
        </div>
      </div>
      {showUpdate && <Update setShowUpdate={setShowUpdate} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
};

export default SideBar;
