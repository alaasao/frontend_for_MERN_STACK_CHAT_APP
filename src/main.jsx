import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Nav from "./layout/Nav.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import router from "./routes/routes.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <Nav />

      <App />
    </RouterProvider>
  </Provider>
);
