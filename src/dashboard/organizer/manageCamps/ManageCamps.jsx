import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import axiosSecure from "../../../api/axiosSecure";
import { useNavigate } from "react-router";

export default function ManageCamps() {
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email; // adjust if different
  const [camps, setCamps] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch camps
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      axiosSecure
        .get(`/camps/organizer/${userEmail}`, {
          params: { search, sortBy, page, limit },
        })
        .then((res) => {
          setCamps(res.data.camps);
          setTotal(res.data.total);
        })
        .catch(() => toast.error("Failed to load camps"));
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search, sortBy, page, limit, userEmail]);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = () => {
    axiosSecure
      .delete(`/delete-camp/${selectedCamp?._id}`)
      .then(() => {
        toast.success("Camp deleted!");
        setCamps((prev) => prev.filter((c) => c._id !== selectedCamp._id));
        setShowModal(false);
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">🎯 Manage Your Camps</h2>

      {/* Search & Sort */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          className="border p-2 rounded w-64"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Sort by Latest</option>
          <option value="campName">Sort by Name</option>
          <option value="dateTime">Sort by Date</option>
        </select>
      </div>

      {/* Camps Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Location</th>
              <th className="p-3">Healthcare Pro</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No camps found.
                </td>
              </tr>
            ) : (
              camps.map((camp) => (
                <tr key={camp._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{camp.campName}</td>
                  <td className="p-3">{camp.dateTime}</td>
                  <td className="p-3">{camp.location}</td>
                  <td className="p-3">{camp.healthcareProfessional}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/update-camp/${camp._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCamp(camp);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border ${
                page === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white p-6 rounded shadow max-w-sm w-full">
            <Dialog.Title className="text-lg font-bold mb-4">
              Confirm Delete
            </Dialog.Title>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedCamp?.campName}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

