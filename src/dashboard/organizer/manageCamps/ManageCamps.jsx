import { useState, useEffect, useContext } from "react";
import { Dialog } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import axiosSecure from "../../../api/axiosSecure";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../features/auth/AuthContext";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageCamps() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [camps, setCamps] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [selectedCamp, setSelectedCamp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    const delayDebounce = setTimeout(() => {
      axiosSecure
        .get("/camps", {
          params: { organizerEmail: user.email, search, sortBy, page, limit },
        })
        .then((res) => {
          // Expecting { camps: [...], total: number }
          setCamps(res.data.camps || res.data);
          setTotal(res.data.total || res.data.length || 0);
        })
        .catch((err) => {
          toast.error("Failed to load camps");
          console.error("Error fetching camps:", err);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [user?.email, search, sortBy, page, limit]);

  const totalPages = Math.ceil(total / limit);

  // Open modal and select camp to delete
  const confirmDelete = (camp) => {
    setSelectedCamp(camp);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCamp) return;
    setDeleteLoading(true);
    try {
      await axiosSecure.delete(`/camps/delete-camp/${selectedCamp._id}`);
      toast.success("Camp deleted!");
      setCamps((prev) => prev.filter((c) => c._id !== selectedCamp._id));
      setShowModal(false);
      setSelectedCamp(null);
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (authLoading)
    return <p className="p-6 text-gray-800">Loading user info...</p>;
  if (!user?.email)
    return <p className="p-6 text-gray-800">Please login to manage camps.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen text-gray-900">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        🎯 Manage Your Camps
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-2 rounded-md w-full sm:w-64 text-gray-800"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded-md w-full sm:w-48 text-gray-800"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Sort by Latest</option>
          <option value="campName">Sort by Name</option>
          <option value="dateTime">Sort by Date</option>
        </select>
      </div>

      {/* Camps Table */}
      <div className="overflow-x-auto shadow rounded-md bg-gray-50 border border-gray-200">
        {loading ? (
          <p className="p-6 text-center text-gray-700">Loading camps...</p>
        ) : camps.length === 0 ? (
          <p className="p-6 text-center text-gray-700">No camps found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Healthcare Pro
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {camps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-100">
                  <td className="px-4 py-3">{camp.campName}</td>
                  <td className="px-4 py-3">{camp.dateTime}</td>
                  <td className="px-4 py-3">{camp.location}</td>
                  <td className="px-4 py-3">{camp.healthcareProfessional}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/update-camp/${camp._id}`)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(camp)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-1 rounded-md border ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-800"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl text-gray-900">
            <Dialog.Title className="text-lg font-semibold text-red-600">
              ⚠️ Confirm Delete
            </Dialog.Title>
            <p className="text-sm mt-2 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedCamp?.campName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border text-gray-800 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`px-4 py-2 rounded-md text-white ${
                  deleteLoading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } transition`}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}



