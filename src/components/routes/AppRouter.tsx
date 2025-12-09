import { createHashRouter } from "react-router";
import Home from "../pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import SingleProduct from "../pages/SingleProduct";
import AuthLayout from "../layouts/AuthLayout";
import Auth from "../pages/login/Auth";
import Cart from "../pages/Cart";

export const router = createHashRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: SingleProduct },
    ]
  },
  {
    path: "cart",
    Component: HomeLayout,
    children: [
      { index: true, Component: Cart },
    ]
  },
  {
    path: "login",
    Component: AuthLayout,
    children: [
      { index: true, Component: Auth },
    ]
  },
  {
    path: "*",
    Component: HomeLayout
  }
]);



