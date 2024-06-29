import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import uploadFile from "../cloudinary/upload";
import axios from "axios";
import toast from "react-hot-toast";

import { setUser } from "../redux/userSlice";

const Update = ({setShowUpdate}) => {
  const [data, setData] = useState(useSelector((state) => state.user));
  const [uploadPhoto, setUploadPhoto] = useState({ url: data.profilePic });
  const dispatch=useDispatch()
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto({ display_name: "wait for photo to upload" });
    const final = await uploadFile(file);

    setUploadPhoto(final);

    setData((preve) => {
      return {
        ...preve,
        profilePic: uploadPhoto?.url,
      };
    });
  };
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto({ url: data.profilePic });
    };
    const submit = async() => {
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/updateuser`;

        await axios
          .put(
            URL,
            {
              ...data,
              profilePic: uploadPhoto?.url,
            },
            {
              withCredentials: true,
              headers: {
                  'Access-Control-Allow-Origin': '*', 
                  'Content-Type': 'application/json'
              }
          }
          )
          .then((res) => {
            toast.success("account updated");

          dispatch(setUser(res.data.user))
       
            setShowUpdate(prev=>!prev)
          })
          .catch((err) => {
            toast.error(err.response.data.msg);
          })
    }
  return (
    <div className="absolute z-10 flex items-center justify-center w-full h-full bg-[#d1d5db91]  transition-all  origin-top duration-2000 ">
      <div className="w-[500px] h-[350px] bg-white flex flex-col rounded-lg py-[50px] px-[20px]">
        <p className="text-xl font-bold">Profile Details</p>
        <div className="w-full mt-[8px]">
          <label htmlFor="name" className="mb-[10px]">
            Name :
          </label>
          <input
            type="text"
            className="w-full h-[50px]  outline-[#008DA5]  pl-[8px] mt-[10px]"
            name="name"
            id="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Enter the Name"
          />
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <label htmlFor="profile_pic" className="mt-[10px] cursor-pointer">
            Photo :
            <div className="flex items-center gap-[5px]  my-[10px]">
              <img
                src={uploadPhoto.url}
                className="w-[40px] h-[40px] rounded-full"
              />
              <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                {uploadPhoto?.display_name || "Change profile photo"}
              </p>
              {uploadPhoto?.display_name && (
                <button
                  className="ml-2 text-lg hover:text-red-600"
                  onClick={handleClearUploadPhoto}
                >
                  <IoClose />
                </button>
              )}
            </div>
          </label>

          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="hidden px-2 py-1 bg-slate-100 focus:outline-primary"
            onChange={handleUploadPhoto}
          />
              </div>
              <div className="w-full h-[1px] border border-b-gray-100 mt-[10px]"></div>
              <div className="flex items-center justify-end gap-[8px] mt-[10px] cursor-pointer">
                  <div className="flex justify-center items-center border border-[#008DA5] text-[#008DA5] rounded-lg h-[40px] w-[80px]  " onClick={()=> {setShowUpdate(prev=>!prev)} }>Cancel</div>
                  <div className="flex justify-center items-center  bg-[#008DA5] text-white rounded-lg h-[40px] w-[80px]  " onClick={submit}>Save</div>
            
              </div>
             </div>
    </div>
  );
};

export default Update;
