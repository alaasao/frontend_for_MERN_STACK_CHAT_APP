
import { Link } from 'react-router-dom'

const SearchCard = ({user,onClick}) => {
    return (
        <Link to={("/"+user._id)} className="w-full h-[90px] flex gap-[20px] border-b-[1px] hover:border-[#008DA5] hover:border-[2px] items-center px-[5px] cursor-pointer  py-[20px]  "  onClick={onClick} >
          <img src={user.profilePic} alt="" className="w-[70px] h-[70px] rounded-full " />
          <div className="flex flex-col gap-[5px] ">
            <div className="text-xl">{user.name}</div>
            <div className="">{user.email}</div>
          </div>
        </Link>
      )
}

export default SearchCard
