import OrganizerProfile from "./components/organizer/OrganizerProfile";
import AddCamp from "./components/organizer/AddCamp";
import ManageCamps from "./components/organizer/ManageCamps";
import ManageRegistered from "./components/organizer/ManageRegistered";



function AppRoutes() {
  return (
    <Routes>
      {/* Organizer protected routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute role="organizer" />}>
          <Route path="/organizer" element={<OrganizerDashboardLayout />}>
            <Route index element={<OrganizerProfile />} />
            <Route path="profile" element={<OrganizerProfile />} />
            <Route path="add-camp" element={<AddCamp />} />
            <Route path="manage-camps" element={<ManageCamps />} />
            <Route path="manage-registered" element={<ManageRegistered />} />
          </Route>
        </Route>
      </Route>

      {/* Your other routes here */}
    </Routes>
  );
}

export default AppRoutes;

