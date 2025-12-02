import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import Header from "../Header";
import HomeLayout from "../layouts/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: Header },
    ]
  }
]);



