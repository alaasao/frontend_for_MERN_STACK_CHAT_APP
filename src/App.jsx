import { Outlet } from "react-router-dom";
import "./App.css";


import { Toaster } from "react-hot-toast";

function App() {
 
  return (
    <div className="h-full">
      <Toaster/>
       <main >
        <Outlet/>
       </main>
    </div>
  );
}

export default App;
