import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { AuthContext } from "../../../features/auth/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { X, Loader2 } from "lucide-react";

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
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-base-content">
        📋 Manage Registered Participants
      </h2>
      <div className="overflow-x-auto bg-base-100 border border-base-300 shadow rounded-lg">
        <table className="table table-zebra w-full text-base-content">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Camp</th>
              <th>Participant</th>
              <th>Email</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Confirm</th>
              <th className="text-center">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((reg) => {
              const isPaid = reg.paymentStatus === "Paid";
              const isConfirmed = reg.confirmationStatus === "Confirmed";
              const disableCancel = isPaid && isConfirmed;

              return (
                <tr key={reg._id} className="hover:bg-base-200">
                  <td className="font-medium">{reg.campName}</td>
                  <td>{reg.participantName}</td>
                  <td>{reg.participantEmail}</td>
                  <td className="text-center">
                    <span className={`badge ${isPaid ? "badge-success" : "badge-warning"}`}>
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    {reg.confirmationStatus === "Pending" ? (
                      <button
                        onClick={() => confirmMutation.mutate(reg._id)}
                        disabled={confirmMutation.isLoading}
                        className={`btn btn-sm btn-primary ${
                          confirmMutation.isLoading ? "loading" : ""
                        }`}
                      >
                        {confirmMutation.isLoading ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    ) : (
                      <span className="badge badge-success">Confirmed</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCancel(reg._id, disableCancel)}
                      disabled={disableCancel}
                      className="btn btn-sm btn-error disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
      <div className="join flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`join-item btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-ghost"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}




