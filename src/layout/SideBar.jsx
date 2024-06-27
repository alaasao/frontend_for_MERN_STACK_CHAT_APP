import { useLocation } from "react-router-dom"
import { AiFillMessage } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import Update from "../Home/Update";
const SideBar = () => {
    const { pathname } = useLocation()
    const hide = pathname.includes("register") || pathname.includes("login")
    const user = useSelector((state) => state.user)
    const [showUpdate, setShowUpdate] = useState(false)
    const [track, setTrack] = useState(true)
    useEffect(() => {
        setShowUpdate(prev=>!prev)
    },[track])
  return (
      <div className={`${hide ? "hidden" : ""} h-full flex w-[400px] min-h-screen`}>
          
          <div className="w-[70px] h-full flex flex-col justify-between min-h-screen py-[20px] cursor-pointer">
              <div className="h-[140px]  grid grid-rows-2">
                  <div className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl">
                      <AiFillMessage/>
                  </div>
                  <div className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl">
                      <HiUserAdd/>
                  </div>
                
              </div>
              <div className="h-[140px] grid grid-rows-2 cursor-pointer">
                      <div className="flex items-center justify-center " onClick={()=>setShowUpdate(!showUpdate)}>
                          <img src={user.profilePic} alt="" className="w-[40px] h-[40px] rounded-full" />
                  </div>
                  <div className="flex items-center justify-center hover:bg-slate-300 text-[#3D4A5F] text-2xl" >
                  <CiLogout />

                  </div>
                  </div>
          </div>
          <div className="w-full h-full min-h-screen bg-white">
              <div className="">Messages</div>
          </div>
          {
              showUpdate && <Update track={track} setTrack={setTrack}  />
          }
    </div>
  )
}

export default SideBar
