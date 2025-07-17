import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { AuthContext } from "../../../features/auth/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Check, X, Loader2 } from "lucide-react";

export default function ManageRegistered() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRegistrations = async () => {
    const res = await axiosSecure.get(`/participantRegistrations/organizer/${user.email}`);
    return res.data;
  };

  const {
    data: registrations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: fetchRegistrations,
    enabled: !!user?.email,
    onError: () => toast.error("Failed to fetch registrations"),
  });

  const confirmMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/participantRegistrations/${id}/confirm`),
    onSuccess: () => {
      toast.success("Registration confirmed");
      queryClient.invalidateQueries(["registrations"]);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/participantRegistrations/${id}/by-organizer`);
    },
    onSuccess: () => {
      toast.success("Registration cancelled");
      queryClient.invalidateQueries(["registrations"]);
    },
    onError: () => toast.error("Failed to cancel registration"),
  });

  const handleCancel = (id, disabled) => {
    if (disabled) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (authLoading) return <p className="p-6">Loading user info...</p>;
  if (!user?.email) return <p className="p-6">Please login to view registered participants.</p>;
  if (isLoading) return <p className="p-6">Loading registrations...</p>;
  if (isError) return <p className="p-6">Error loading registrations.</p>;
  if (registrations.length === 0) return <p className="p-6">No participants registered yet.</p>;

  // Pagination logic
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRegistrations = registrations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">📋 Manage Registered Participants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 text-left">Camp</th>
              <th className="p-3 text-left">Participant</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Payment</th>
              <th className="p-3 text-center">Confirm</th>
              <th className="p-3 text-center">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((reg) => {
              const isPaid = reg.paymentStatus === "Paid";
              const isConfirmed = reg.confirmationStatus === "Confirmed";
              const disableCancel = isPaid && isConfirmed;

              return (
                <tr key={reg._id} className="border-t hover:bg-slate-50">
                  <td className="p-3 font-medium text-gray-900">{reg.campName}</td>
                  <td className="p-3 text-gray-900">{reg.participantName}</td>
                  <td className="p-3 text-gray-900">{reg.participantEmail}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-xs ${
                        isPaid ? "bg-green-500 text-white" : "bg-yellow-400 text-black"
                      }`}
                    >
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {reg.confirmationStatus === "Pending" ? (
                      <button
                        onClick={() => confirmMutation.mutate(reg._id)}
                        disabled={confirmMutation.isLoading}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {confirmMutation.isLoading ? (
                          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    ) : (
                      <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                        Confirmed
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleCancel(reg._id, disableCancel)}
                      disabled={disableCancel}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-4 text-sm">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}



