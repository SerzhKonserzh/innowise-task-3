import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Header from "../Header";
import HomeLayout from "../layouts/HomeLayout";
import SingleProduct from "../pages/SingleProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: SingleProduct },
    ]
  },
  {
    path: "*",
    Component: HomeLayout
  }
]);



