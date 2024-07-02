import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser, setOnline, setSocketConnection } from "../redux/userSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import io from "socket.io-client";

const Home = () => {
  const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user`;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(URL, {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);
  useEffect(() => {
    const socketConnection = io.connect(
      import.meta.env.VITE_REACT_APP_BACKEND_URL,
      {
        auth: {
          token: localStorage.getItem("token"),
        },
      }
    );
    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnline(data));
    });
    dispatch(setSocketConnection(socketConnection));
    return () => {
      socketConnection.disconnect();
    };
  }, []);
  const home = useLocation().pathname === "/";
  return (
    <div className="flex w-full h-full">
  <section className={`bg-white ${!home && "hidden"} lg:block max-lg:w-full `}>
           <SideBar/>
        </section>

      <div className={`${home && "hidden"} w-full`}>
        <Outlet />
      </div>
      <div
        className={` w-full   min-h-screen   flex-col justify-center items-center gap-[10px] ${
          home ? "flex" : "hidden"
        } max-lg:hidden`}
      >
        <img src="../assets/logo.png" alt="" className="w-[300px]" />
        <div className="text-xl   text-[#3D4A5F]">
          Select user to send message
        </div>
      </div>
    </div>
  );
};

export default Home;
