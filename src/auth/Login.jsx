import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../redux/userSlice";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
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
  const navigate = useNavigate();

  const [showpass, setShowpass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`;

    axios.post(URL, data, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin':'*', 
            'Content-Type': 'application/json'
        }
    })
      .then((res) => {
          toast.success("user loged in");
 
        dispatch(setToken(res.data.token))
        localStorage.setItem("token",res.data.token)
          navigate("/")
      })
      .catch((err) => {
  
        toast.error(err.response.data.msg);
      });
    };
   

  return (
    <div className=" h-full w-full  flex py-[50px] justify-center max-md:py-[20px] ">
      <form
        onSubmit={handleSubmit}
        className="w-[600px] h-calc-100%-100px max-md:w-[80%] bg-white  py-[15px] rounded-lg shadow-md flex flex-col justify-evenly items-center px-[1%] max-md:px-[3%] gap-[50px] max-md:gap-[20px]"
      >
        <h1 className="text-xl font-medium">Welcome to Chat App</h1>

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

        <button
          type="submit"
          className="w-full h-[50px] bg-[#017F91] flex justify-center items-center text-white rounded-lg font-bold text-xl"
        >
          {" "}
          Login
        </button>
        <div className="flex justify-center w-full">
          {" Don't "}have an account ?{" "}
          <Link to="/register" className="font-bold ml-[2px]">
            {" "}
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
