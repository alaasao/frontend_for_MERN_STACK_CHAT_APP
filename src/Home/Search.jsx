import axios, { all } from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
const Search = ({ setShowSearch }) => {
  const [data, setData] = useState([]);
  const [allUsers, setAllusers] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/allusers`;
    axios
      .get(URL)
      .then((res) => setData(res.data.users))
      .catch((err) => toast.error(err.response.data.message));
  }, []);
  useEffect(() => {
    setAllusers(data)
  },[data])
  useEffect(() => {
  
    setAllusers(data.filter((e) => (e.name.toLocaleLowerCase().includes(searchKey))||e.email.toLocaleLowerCase().includes(searchKey)));
  }, [searchKey]);
  const navigate = useNavigate();
  return (
    <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full gap-[10px] bg-[#d1d5db91]  transition-all  origin-top duration-2000 " >
      <div className="flex items-center justify-between bg-white w-[600px] max-lg:w-[80%] h-[50px] rounded-lg">
        <input
          type="text"
          className="w-full h-full outline-none pl-[10px] "
          value={searchKey}
          placeholder="Enter the user's name"
          onChange={(e) => {
            setSearchKey(e.target.value.toLowerCase());
          }}
        />
        <div className="h-full w-[40px] flex justify-center items-center cursor-pointer hover:bg-[#d1d5db91] ">
          {" "}
          <CiSearch className="text-2xl font-semibold" />
        </div>
      </div>{" "}
      <div className="w-[600px] h-[600px] max-lg:w-[80%] bg-white rounded-lg overflow-y-scroll scrollbar  flex flex-col  p-[30px]"  >
        {allUsers.map((e) => {
          return (
            <SearchCard user={e} key={e._id} onClick={()=>setSearchShow(false)}/>
          )
        })}
      </div>
    </div>
  );
};

export default Search;
