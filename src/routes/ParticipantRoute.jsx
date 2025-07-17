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
import { OrganizerRoutes } from "./OrganizerRoute";
import AuthForm from "../components/common/AuthForm";
import UserAnalytics from "../dashboard/participant/UserAnalytics";
import RegisteredCamps from "../dashboard/participant/RegisteredCamps";
import FeedbackSection from "../Feedback/FeedbackSection";
import Analytics from "../dashboard/participant/Analytics";
import PaymentHistory from "../dashboard/participant/PaymentHistory";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import Profile from "../dashboard/participant/Profile";


const ParticipantRoute = createBrowserRouter([
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
      path:"/auth",
      element:<PrivateRoute>
        <AuthForm></AuthForm>
      </PrivateRoute>
      },
      {
  path: "userDashboard",
  element: <PrivateRoute><UserDashboard /></PrivateRoute>,
},
{
  path: "userDashboard/user-analytics",
  element: <UserAnalytics />,
},
{
  path: "userDashboard/analytics",
  element: <Analytics />,
},
{
  path: "userDashboard/feedback",
  element: <FeedbackSection />,
},
{
  path: "userDashboard/registered-camps",
  element: <RegisteredCamps />,
},
{
path:"/payment/success",
element:<PaymentSuccess />
},
{
  path:"/userDashboard/payment-history",
  element:<PrivateRoute>
    <PaymentHistory></PaymentHistory>
  </PrivateRoute>
},
{
  path: "userDashboard/profile",
  element: <Profile />,
},

      {
  path: "/userDashboard/participant/registered-camps",
  element: (
    <PrivateRoute>
      <RegisteredCamps />
    </PrivateRoute>
  ),
},

      {
      path:"/organizer/*",
      element:<OrganizerRoutes></OrganizerRoutes>
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default ParticipantRoute;
