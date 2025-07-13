import { useEffect, useState, useContext } from "react";
import axiosSecure from "../../../api/axiosSecure";
import { AuthContext } from "../../../features/auth/AuthContext";
import toast from "react-hot-toast";

export default function ManageRegistered() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/participantRegistrations/organizer/${user.email}`)
      .then((res) => {
        setRegistrations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch registrations");
        setLoading(false);
        console.error("Error fetching registrations:", err);
      });
  }, [user?.email]);

  if (authLoading) return <p className="p-6">Loading user info...</p>;
  if (!user?.email)
    return <p className="p-6">Please login to view registered participants.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Registered Participants</h2>

      {loading ? (
        <p>Loading registrations...</p>
      ) : registrations.length === 0 ? (
        <p>No participants registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Camp Name</th>
                <th className="p-3">Participant</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{reg.campName}</td>
                  <td className="p-3">{reg.participantName}</td>
                  <td className="p-3">{reg.participantEmail}</td>
                  <td className="p-3">{reg.age}</td>
                  <td className="p-3">{reg.phone}</td>
                  <td className="p-3">{reg.gender}</td>
                  <td className="p-3">{reg.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

