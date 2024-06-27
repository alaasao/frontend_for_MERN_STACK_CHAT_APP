import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./layout/Nav.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SideBar from "./layout/SideBar.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Nav />
      <SideBar/>
      <App />
    </BrowserRouter>
  </Provider>
);
