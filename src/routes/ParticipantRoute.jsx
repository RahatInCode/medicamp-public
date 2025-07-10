import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/homepage/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/Register";
import SignIn from "../features/auth/SignIn";
import AvailableCamps from "../pages/AvailableCamps";
import CampDetails from "../features/camps/CampDetails";

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
  path: "/camp/:campId",
  Component: CampDetails,
  loader: async ({ params }) => {
    const response = await fetch(`http://localhost:3000/availableCamps/${params.campId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch camp details");
    }
    return response.json();
  },
},

      {
        path: "register",
        Component: Register,
      },
      {
        path: "join-us",
        Component: SignIn,
      }
    ],
  },

 
  {
    path: "*",
    Component: NotFound, 
  },
]);
