import { useLocation } from "react-router-dom"

const Nav = () => {
  const  {pathname}  = useLocation()
  const show = pathname.includes("register") || pathname.includes("login")

  return (
    <div className={`w-screen flex justify-center items-center h-[120px] bg-white shadow-2xl max-md:h-[80px] ${show?"":"hidden"}`}>
      <img src="../../assets/logo.png" alt="" className="h-[80px] max-md:h-[50px] " />
    </div>
  )
}

export default Nav
