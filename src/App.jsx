import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./auth/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Home/Home";
import Login from "./auth/Login";
function App() {
  const routes = [
    {
      link: "/register",
      component: Register ,
    },
    {
      link: "/login",
      component: Login ,
    },
    {
      link: "/",
      component: Home ,
    },
  ];
  return (
    <div className="">
            <Toaster position="bottom_center" />
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.link} element={<route.component />} key={index}  />
        ))}
      </Routes>
    </div>
  );
}

export default App;
