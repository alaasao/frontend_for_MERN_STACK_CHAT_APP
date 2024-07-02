import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ url, width,id }) => {
    const isOnline = useSelector(state => state.user.online).includes(id)

  return (
    <div className='relative'>
          <img src={url} alt="" className={`  rounded-full w-[${width}] h-[${width}]  `} />
       {isOnline &&  <div className='bg-green-600 rounded-full w-[15px] h-[15px] right-0 absolute z-10 top-[70%]'></div>}   
    </div>
  )
}

export default Avatar
