// src/routes/ParticipantRoutes.jsx
import { createBrowserRouter } from "react-router"; 
import MainLayout from "../layouts/MainLayout";
import Home from "../components/homepage/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/Register";
import SignIn from "../features/auth/SignIn";
import AvailableCamps from "../pages/AvailableCamps";
import CampDetails from "../features/camps/CampDetails";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../dashboard/participant/UserDashboard";


const ParticipantRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "camps",
        element: <AvailableCamps />,
      },
     {
      path:"/camp/:campId",
      element: <PrivateRoute>
        <CampDetails></CampDetails>
      </PrivateRoute>
     },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "join-us",
        element: <SignIn />,
      },
      {
        path:"UserDashboard",
        element : <PrivateRoute>
          <UserDashboard />
        </PrivateRoute>
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default ParticipantRoutes;
