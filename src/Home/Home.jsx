import axios from "axios"
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const Home = () => {
  const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user`;
  const user = useSelector((state) => state.user)
  useEffect(() => {
    console.log("jj",user)
  },[user])
  const dispatch=useDispatch()
  useEffect(() => {
    axios.get(URL, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }).then((res)=> {
 dispatch(setUser(res.data.user))
    }).catch(err => {
      console.log(err)
    })
  },[])

  return (
    <div className="bg-[#E0E7EE]">
 
    </div>
  )
}

export default Home
