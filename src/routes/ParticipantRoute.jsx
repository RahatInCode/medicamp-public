import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/homepage/Home";
import AvailableCamps from "../features/camps/AvailableCamps";
import NotFound from "../pages/NotFound";

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
      
    ],
  },

 
  {
    path: "*",
    Component: NotFound, // No layout will be wrapped around it
  },
]);
