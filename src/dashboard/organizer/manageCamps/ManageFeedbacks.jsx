import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { toast } from "react-hot-toast";

const ManageFeedbacks = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all feedbacks (pending + approved)
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback/manage"); 
      return res.data;
    },
  });

  // ✅ Approve feedback
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/feedback/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      toast.success("Feedback approved!");
    },
  });

  // ✅ Delete feedback
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/feedback/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      toast.success("Feedback deleted!");
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Manage Feedbacks
      </h1>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>User</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 text-base-content">
            {feedbacks.map((fb) => (
              <tr key={fb._id}>
                <td>
                  <div>
                    <p className="font-medium">{fb.participantName}</p>
                    <p className="text-sm opacity-70">{fb.participantEmail}</p>
                  </div>
                </td>
                <td>{fb.feedback}</td>
                <td>
                  {fb.approved ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
                <td className="flex gap-2">
                  {!fb.approved && (
                    <button
                      onClick={() => approveMutation.mutate(fb._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(fb._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFeedbacks;

