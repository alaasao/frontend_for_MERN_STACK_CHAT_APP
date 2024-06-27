import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import uploadFile from "../cloudinary/upload";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const [uploadPhoto, setUploadPhoto] = useState();
  const [showpass, setShowpass] = useState(false);
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
    setUploadPhoto("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/register`;

    await axios
      .post(
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
        toast.success("account created");
        dispatch(setToken(res.data.token));
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[600px] max-md:w-[80%] mx-auto mt-[30px] bg-white  py-[15px] rounded-lg shadow-md flex flex-col justify-evenly items-center px-[1%] max-md:px-[3%] gap-[50px] max-md:gap-[20px]"
    >
      <h1 className="text-xl font-medium">Welcome to Chat App</h1>
      <div className="w-full">
        <label htmlFor="name" className="mb-[5px]">
          Name :
        </label>
        <input
          type="text"
          className="w-full h-[50px] bg-[#e0e7ee90] outline-none  pl-[8px]"
          name="name"
          id="name"
          value={data.name}
          onChange={handleOnChange}
          placeholder="Enter the Name"
        />
      </div>
      <div className="w-full">
        <label htmlFor="email" className="mb-[5px]">
          Email :
        </label>
        <input
          type="email"
          className="w-full h-[50px] bg-[#e0e7ee90] outline-none pl-[8px]"
          name="email"
          id="email"
          value={data.email}
          onChange={handleOnChange}
          placeholder="Enter the Email"
        />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="mb-[5px]">
          Password :
        </label>
        <div className="flex relative w-full h-[50px]">
          <input
            name="password"
            id="password"
            type={`${showpass ? "text" : "password"}`}
            onChange={handleOnChange}
            className=" w-full pl-[8px] outline-none bg-[#e0e7ee90]"
            placeholder="Entrez votre mot de passe "
          />
          {showpass ? (
            <FaEyeSlash
              className={`absolute top-1/2 -translate-y-1/2 right-[9px] cursor-pointer `}
              onClick={() => {
                setShowpass((prev) => !prev);
              }}
            />
          ) : (
            <FaEye
              className={`absolute top-1/2 -translate-y-1/2 right-[9px] cursor-pointer `}
              onClick={() => {
                setShowpass((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full gap-1">
        <label htmlFor="profile_pic">
          Photo :
          <div className="flex items-center justify-center h-20 border rounded cursor-pointer bg-slate-200 hover:border-primary">
            <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
              {uploadPhoto?.display_name || "Upload profile photo"}
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

      <button
        type="submit"
        className="w-full h-[50px] bg-[#017F91] flex justify-center items-center text-white rounded-lg font-bold text-xl"
      >
        {" "}
        Register
      </button>
      <div className="flex justify-center w-full">
        Already have an account ?{" "}
        <Link to={"/login"} className="font-bold ml-[2px]">
          {" "}
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
