import React, { useState } from "react";
import Button from '@mui/material/Button';
import Home from "./components/pages/home/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );
}