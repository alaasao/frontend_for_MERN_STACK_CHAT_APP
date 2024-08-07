import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Home/Avatar";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosAdd } from "react-icons/io";
import { IoClose, IoSend } from "react-icons/io5";
import { FaAngleLeft, FaVideo } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import uploadFile from "../cloudinary/upload";
import moment from "moment/moment";

const Conversation = () => {
  const { userId } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    profilePic: "",
    _id: "",
    online: false,
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const socketConnection = useSelector((state) => state.user.socketConnection);
const [allMessages, setAllMessages] = useState([])
  useEffect(() => {
    
    
    setTimeout(() => {
      if (socketConnection?.connected) {
        socketConnection.emit("message-page", userId);
        socketConnection.emit("seen", userId);
        socketConnection.on("message", (data) => {
          setAllMessages(data)
        
        })
        socketConnection.emit("seen", userId);
        socketConnection.on("message-user", (data) => {
          setData(data);
        });
        socketConnection.on("message data", (data) => {
     
          setAllMessages(data)
          
        })
        socketConnection.emit("seen", userId);
      }
    }, 30);
  }, [userId, socketConnection?.connected, socketConnection]);
  const [uploadImage, setUploadImage] = useState({ url: "" });
  const [uploadVideo, setUploadVideo] = useState({ url: "" });
  const handleImages = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setUploadImage({ url: URL.createObjectURL(file) });
      console.log(uploadImage);
      const img = await uploadFile(file);

      setUploadImage({ url: img.url });
      setLoading(false);
    }
  };
  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setUploadVideo({ url: URL.createObjectURL(file) });
      console.log(uploadImage);
      const video = await uploadFile(file);
console.log(video)
      setUploadVideo({ url: video.url });
      setLoading(false);
    }
  };
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user= useSelector(state=>state.user)
  const handleSendMessage = (e)=>{
    e.preventDefault()

    if(uploadImage.url || uploadVideo.url || message.text){
      if(socketConnection){
        socketConnection.emit('new message',{
          sender : user._id,
          receiver : userId,
          text : message.text,
          imageUrl : uploadImage.url,
          videoUrl : uploadVideo.url,
          msgByUser : user._id
        })
        setMessage({
          text : "",
          imageUrl : "",
          videoUrl : ""
        })
        setUploadImage({ url: "" })
        setUploadVideo({ url: "" })
        setAddOpen(false)
      }
    }
  }
  const currentMessage = useRef(null)

  useEffect(() => {
    
    if (currentMessage.current) {
        
          currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
      }
  },[allMessages])

  return (
    <div className="flex flex-col w-full h-full min-h-screen ">
      <header className="w-full h-[90px] max-md:h-[60px] bg-white flex justify-between px-[20px] items-center ">
        <div className="flex gap-[20px] items-center ">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <Avatar url={data.profilePic} width={"70px"} id={data._id} />
          <div className="flex flex-col gap-[3px] ">
            <div className="text-xl font-bold">{data.name}</div>
            <div className="">
              {data.online ? (
                <span className="text-[#00acb4]">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <SlOptionsVertical className="text-2xl" />
        </div>
      </header>
      <div className="h-[calc(100vh-120px)]   bg-contain  bg-[url('../assets/wallpaper.png')]  overflow-y-scroll scrollbar">
        <div className="flex flex-col w-full gap-2 p-2 " ref={currentMessage}>
          {allMessages.map((msg,index) => {
            return <div className={`${msg.msgByUser === user._id ? "self-end bg-[#b0cdc6]" : "self-start bg-white "} p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md`} key={index + msg.text}>
             <div className='relative w-full'>
                              {
                                msg?.imageUrl && (
                                  <img 
                                    src={msg?.imageUrl}
                                    className='w-full h-full '
                                  />
                                )
                              }
                              {
                                msg?.videoUrl && (
                                  <video
                                    src={msg.videoUrl}
                                    className='object-scale-down w-full h-full'
                                    controls
                                  />
                                )
                              }
                            </div>
                            <p className='px-2'>{msg.text}</p>
                            <p className='ml-auto text-xs w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                          
            </div>
          })}
        </div>
        {(uploadImage.url !== "" ||uploadVideo.url!=="") && (
          <div className="sticky w-full h-full bg-[#7b7d8161] flex justify-center items-center bottom-0  z-[5]">
            <div className="w-[50%] h-[70%] absolute bg-white flex flex-wrap gap-[20px] p-[30px] ">
              <div
                className="absolute top-0 right-0 text-2xl text-red-700 translate-y-[-50%] translate-x-[50%] bg-white rounded-full flex justify-center items-center  cursor-pointer"
                onClick={() => {
                  if (uploadImage.url !== "") {setUploadImage({ url: "" })}else{setUploadVideo({ url: "" })}
                  
                }}
              >
                <IoClose className="" />
              </div>
              <div className="relative w-full h-full">
                {loading && (
                  <div className="absolute flex items-center justify-center w-full h-full bg-[#f1f5f96e]">
                    <div className="loader"></div>
                  </div>
                )}
              
                {uploadImage.url !== "" ? <img src={uploadImage.url} className="w-full h-full" /> : <video src={uploadVideo.url} className="w-full h-full" controls></video>}
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="w-full h-[90px] max-md:h-[60px] bg-white flex items-center px-[20px] ">
        <div className="relative text-5xl cursor-pointer">
          {addOpen && (
            <div className="absolute bg-white w-[150px] h-[120px] top-0 translate-y-[-100%] shadow-lg rounded-lg z-[100] flex flex-col p-[20px] justify-between ">
              <div className="">
                <label
                  htmlFor="image"
                  className="text-xl cursor-pointer flex gap-[10px] items-center"
                >
                  {" "}
                  <MdInsertPhoto className="text-2xl cursor-pointer text-[#35a0ad]" />{" "}
                  Image
                </label>{" "}
                <input
                  type="file"
                  id="image"
                  name="profile_pic"
                  className="hidden px-2 py-1 bg-slate-100 focus:outline-primary"
                  onChange={handleImages}
                />
              </div>
              <div className="">
              <label
                  htmlFor="video"
                  className="text-xl cursor-pointer flex gap-[10px] items-center"
                >
                  {" "}
                  <FaVideo className="text-2xl cursor-pointer " />{" "}
                  Video
                </label>{" "}
                <input
                  type="file"
                  id="video"
             
                  className="hidden px-2 py-1 bg-slate-100 focus:outline-primary"
                  onChange={handleVideo}
                />
              </div>
            </div>
          )}
          <IoIosAdd
            onClick={() => {
              setAddOpen((prev) => !prev);
            }}
          />
        </div>
        <input
          type="text"
          className="w-full h-full outline-none pl-[20px] flex-grow-[2] "
          placeholder="Type a message"
          value={message.text}
          onChange={(e) => {
            setMessage({ ...message, text: e.target.value });
          }}
        />
        <button className="text-4xl text-[#35a0ad] cursor-pointer">
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default Conversation;
