import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./app/layout/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
