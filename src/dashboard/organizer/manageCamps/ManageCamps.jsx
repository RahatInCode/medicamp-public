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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [formData, setFormData] = useState({
    campName: "",
    campFees: "",
    dateTime: "",
    location: "",
    healthcareProfessional: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    const delayDebounce = setTimeout(() => {
      axiosSecure
        .get("/camps", {
          params: { organizerEmail: user.email, search, sortBy, page, limit },
        })
        .then((res) => {
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

  const confirmDelete = (camp) => {
    setSelectedCamp(camp);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCamp) return;
    setDeleteLoading(true);
    try {
      await axiosSecure.delete(`/camps/delete-camp/${selectedCamp._id}`);
      toast.success("Camp deleted!");
      setCamps((prev) => prev.filter((c) => c._id !== selectedCamp._id));
      setShowDeleteModal(false);
      setSelectedCamp(null);
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openUpdateModal = (camp) => {
    setSelectedCamp(camp);
    setFormData({
      campName: camp.campName || "",
      campFees: camp.campFees || "",
      dateTime: camp.dateTime || "",
      location: camp.location || "",
      healthcareProfessional: camp.healthcareProfessional || "",
      description: camp.description || "",
      image: camp.image || "",
    });
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCamp) return;

    setUpdateLoading(true);
    try {
      const {
        campName,
        campFees,
        dateTime,
        location,
        healthcareProfessional,
        description,
        image,
      } = formData;

      if (
        !campName ||
        !campFees ||
        !dateTime ||
        !location ||
        !healthcareProfessional ||
        !description ||
        !image
      ) {
        toast.error("All fields are required");
        setUpdateLoading(false);
        return;
      }

      const updatedData = {
        campName,
        campFees,
        dateTime,
        location,
        healthcareProfessional,
        description,
        image,
      };

      const res = await axiosSecure.put(
        `/camps/update-camp/${selectedCamp._id}`,
        updatedData
      );

      toast.success("Camp updated successfully!");

      setCamps((prev) =>
        prev.map((camp) =>
          camp._id === selectedCamp._id ? res.data.updated : camp
        )
      );

      setShowUpdateModal(false);
      setSelectedCamp(null);
    } catch (err) {
      toast.error("Update failed: " + err.message);
      console.error("Update error:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (authLoading)
    return <p className="p-6">Loading user info...</p>;
  if (!user?.email)
    return <p className="p-6">Please login to manage camps.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">🎯 Manage Your Camps</h2>

      {/* Search & Sort */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered bg-base-100 text-base-content border-base-300 w-full sm:w-64"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered bg-base-100 text-base-content border-base-300 w-full sm:w-48"
        >
          <option value="createdAt">Sort by Latest</option>
          <option value="campName">Sort by Name</option>
          <option value="dateTime">Sort by Date</option>
        </select>
      </div>

      {/* Camps Table */}
      <div className="overflow-x-auto bg-base-100 text-base-content shadow rounded-lg border border-base-300">
        {loading ? (
          <p className="p-6 text-center">Loading camps...</p>
        ) : camps.length === 0 ? (
          <p className="p-6 text-center">No camps found.</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Healthcare Pro</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.campName}</td>
                  <td>{camp.dateTime}</td>
                  <td>{camp.location}</td>
                  <td>{camp.healthcareProfessional}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openUpdateModal(camp)}
                        className="btn btn-sm btn-primary"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(camp)}
                        className="btn btn-sm btn-error"
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
        <div className="join flex justify-center mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`join-item btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-ghost"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Dialog.Panel className="bg-base-100 text-base-content p-6 rounded-lg max-w-sm w-full shadow-xl border border-base-300">
            <Dialog.Title className="text-lg font-semibold text-error">
              ⚠️ Confirm Delete
            </Dialog.Title>
            <p className="text-sm mt-2 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedCamp?.campName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn bg-base-200 text-base-content border-base-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`btn btn-error ${deleteLoading ? "loading" : ""}`}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Dialog.Panel className="bg-base-100 text-base-content p-6 rounded-lg max-w-lg w-full shadow-xl border border-base-300">
            <Dialog.Title className="text-xl font-semibold mb-4">
              ✏️ Update Camp
            </Dialog.Title>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {Object.entries(formData).map(([key, value]) => (
                <input
                  key={key}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  className="input input-bordered bg-base-100 text-base-content border-base-300 w-full"
                  required
                  type={key === "campFees" ? "number" : key === "dateTime" ? "datetime-local" : "text"}
                />
              ))}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="btn bg-base-200 text-base-content border-base-300"
                  disabled={updateLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className={`btn btn-primary ${updateLoading ? "loading" : ""}`}
                >
                  {updateLoading ? "Updating..." : "Update Camp"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}





