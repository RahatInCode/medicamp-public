import { Navigate, Outlet, Routes, Route } from "react-router"  // react-router-dom, NOT react-router
import { useContext } from "react"
import { AuthContext } from "../features/auth/AuthContext"
import { useQuery } from "@tanstack/react-query"
import axiosSecure from "../api/axiosSecure"
import OrganizerDashboard from "../dashboard/organizer/OrganizerDashboardLayout"
import ManageCamps from "../dashboard/organizer/ManageCamps"


const OrganizerRoute = () => {
  const { user } = useContext(AuthContext)

  const { data: userData, isLoading, isError } =useQuery({
  queryKey: ["userRole", user?.email],
  queryFn: async () => {
    if (!user?.email) throw new Error("No user email")
    const res = await axiosSecure.get(`/users/${user.email}`)
    return res.data
  },
  enabled: !!user?.email,
  retry: false,
})


  if (isLoading) return <p>Loading...</p>
  if (isError || !userData?.role || userData.role !== "organizer") {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

const OrganizerRoutes = () => {
  return (
    <Routes>
      <Route element={<OrganizerRoute />}>
        <Route path="dashboard" element={<OrganizerDashboard />} />
        <Route path="manageCamps" element={<ManageCamps />} />
        {/* Add more organizer routes here */}
      </Route>
    </Routes>
  )
}

export { OrganizerRoutes, OrganizerRoute }



