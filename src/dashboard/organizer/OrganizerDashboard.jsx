// OrganizerDashboard.jsx (or inside a page/component that uses your layout)
import React from 'react'
import Notifications from './Notifications'
import Stats from './Stats'
import OrganizerProfile from './OrganizerProfile'
import OrganizerDashboardLayout from './OrganizerDashboardLayout'

const OrganizerDashboard = () => (
  <OrganizerDashboardLayout>
    <div className="p-6 space-y-6">
      <Notifications />
      <Stats />
      <OrganizerProfile />
    </div>
  </OrganizerDashboardLayout>
)

export default OrganizerDashboard

