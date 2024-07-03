import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import Avatar from "../Home/Avatar";
import { FaImage, FaVideo } from "react-icons/fa";

const SideBar = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const [showUpdate, setShowUpdate] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [convos, setConvos] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (socketConnection?.connected && user?._id) {
        socketConnection.emit("sidebar", user._id);

        socketConnection.on("conversation", (data) => {
          const conversationUserData = data.map((conversationUser, index) => {
            if (
              conversationUser?.sender?._id === conversationUser?.receiver?._id
            ) {
              return {
                ...conversationUser,
                userDetails: conversationUser?.sender,
              };
            } else if (conversationUser?.receiver?._id !== user?._id) {
              return {
                ...conversationUser,
                userDetails: conversationUser.receiver,
              };
            } else {
              return {
                ...conversationUser,
                userDetails: conversationUser.sender,
              };
            }
          });

          setConvos(conversationUserData);
        });
    
      }
    }, 30);
  }, [user, socketConnection, socketConnection?.connected]);
  useEffect(() => {
    console.log(convos);
  }, [convos]);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const navigate = useNavigate();
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
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={` h-full flex lg:w-[400px] min-h-screen max-lg:w-full`}>
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
            <Avatar url={user.profilePic} width={"40px"} id={user._id} />
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
        <div className="w-full h-[calc(100vh-90px)] overflow-x-hidden overflow-y-scroll scrollbar ">
          {convos.length === 0 && (
            <div className="flex flex-col items-center w-full h-full pt-[50px]">
              <GoArrowUpLeft className="text-6xl text-[#3D4A5F] font-bold" />
              <div className="text-center px-[5px]">
                Explore users to start Conversations with
              </div>
            </div>
          )}
          {convos.map((conv, index) => {
          console.log(conv)
            return (
              <NavLink
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 px-2 py-3 border-b rounded cursor-pointer border-b-[#E5E7EB] hover:border-primary hover:bg-slate-100"
              >
                <div>
                  <Avatar url={conv?.userDetails?.profilePic} width={"40px"} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ellipsis line-clamp-1">
                    {conv?.userDetails?.name}
                  </h3>
           {  conv.lastMsg &&     <div className="flex items-center gap-1 text-xs text-slate-500">
                    <div
                      className={`flex items-center gap-1 ${
                        conv.lastMsg?.seen && "font-bold"
                      }`}
                    >
                      {conv?.lastMsg?.imageUrl && (
                        <div
                          className={`flex items-center gap-1 ${
                            !conv.lastMsg.seen && "font-bold"
                          }`}
                        >
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div
                          className={`flex items-center gap-1 ${
                            conv.lastMsg.seen && "font-bold"
                          }`}
                        >
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-ellipsis line-clamp-1 ${
                        !conv.lastMsg.seen && "font-bold"
                      }`}
                    >
                      {conv?.lastMsg?.text}
                    </p>
                  </div>}
                </div>
                {conv.unSeenMsg > 0 && (
                  <p className="flex items-center justify-center w-6 h-6 p-1 ml-auto text-xs font-semibold text-white rounded-full bg-[#0093A5]">
                    {conv?.unSeenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
      {showUpdate && <Update setShowUpdate={setShowUpdate} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
};

export default SideBar;
