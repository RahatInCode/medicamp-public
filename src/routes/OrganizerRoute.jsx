// src/routes/OrganizerRoute.jsx
import { createBrowserRouter } from "react-router";
import OrganizerLayout from "../dashboard/organizer/OrganizerLayout";
import OrganizerDashboard from "../dashboard/organizer/OrganizerDashboard";
import PrivateRoute from "../components/PrivateRoute";

const organizerRouter = createBrowserRouter([
  {
    path: "/organizer",
    element: (
      <PrivateRoute allowedRole="organizer">
        <OrganizerLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <OrganizerDashboard />,
      },
      // 👉 You can add more organizer-only pages here (like camp creation, reports, etc.)
    ],
  },
]);

export default organizerRouter;
