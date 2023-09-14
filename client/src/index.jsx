import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./Redux/store"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.StrictMode>  
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);


