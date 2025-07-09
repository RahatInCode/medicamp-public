import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/homepage/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/Register";
import SignIn from "../features/auth/SignIn";
import AvailableCamps from "../pages/AvailableCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "camps",
        Component: AvailableCamps,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "join-us",
        element: <SignIn />
      }
    ],
  },

 
  {
    path: "*",
    Component: NotFound, 
  },
]);
