import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig, getAuthHeaders, toBackendUrl } from "../../services/api";

const API_URL = `${apiConfig.baseURL}/admin/gallery`;
const UPLOAD_API_URL = `${apiConfig.baseURL}/admin/upload`;

interface GalleryRaw {
  id: number;
  title: string;
  description?: string;
  image_url: string;
}

interface GalleryView extends GalleryRaw {}
type GalleryForm = Omit<GalleryView, "id">;

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryView[]>([]);
  const [form, setForm] = useState<GalleryForm>({
    title: "",
    description: "",
    image_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  const authHeaders = getAuthHeaders();

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL, { headers: authHeaders });
      setItems(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching gallery", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const uploadImage = async (): Promise<string> => {
    if (!file) return form.image_url; // giữ link cũ nếu không upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "gallery"); // để backend phân loại thư mục
    const res = await axios.post(
      UPLOAD_API_URL,
      formData,
      { headers: { ...authHeaders, "Content-Type": "multipart/form-data" } }
    );
    return res.data?.url || "";
  };

  const handleSubmit = async () => {
    try {
      // Upload ảnh trước nếu có
      const imageUrl = await uploadImage();
      
      if (!imageUrl) {
        setMessage({ type: "error", text: "Image is required" });
        setTimeout(() => setMessage({ type: null, text: "" }), 5000);
        return;
      }

      // Gửi dữ liệu JSON đến API
      const data: any = {
        title: form.title,
        description: form.description || "",
        image_url: imageUrl,
      };

      if (editingId) {
        data.id = editingId;
        await axios.put(API_URL, data, { headers: authHeaders });
        setMessage({ type: "success", text: "Gallery item updated successfully!" });
      } else {
        await axios.post(API_URL, data, { headers: authHeaders });
        setMessage({ type: "success", text: "Gallery item added successfully!" });
      }

      fetchItems();
      setForm({ title: "", description: "", image_url: "" });
      setFile(null);
      setEditingId(null);
      setShowForm(false);

      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    } catch (err) {
      console.error("Error saving gallery", err);
      setMessage({ type: "error", text: "Error saving gallery. Please try again." });
      setTimeout(() => setMessage({ type: null, text: "" }), 5000);
    }
  };

  const handleEdit = (item: GalleryView) => {
    setForm({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
    });
    setEditingId(item.id);
    setFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this gallery item?")) return;
    try {
      await axios.delete(`${API_URL}?id=${id}`, { headers: authHeaders });
      setMessage({ type: "success", text: "Gallery item deleted successfully!" });
      fetchItems();
      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    } catch (err) {
      console.error("Error deleting gallery", err);
      setMessage({ type: "error", text: "Error deleting gallery. Please try again." });
      setTimeout(() => setMessage({ type: null, text: "" }), 5000);
    }
  };

  return (
    <div className="container mt-4 admin-gallery admin-table admin-form admin-modal admin-pagination">
      <div className="container mt-4 admin-gallery admin-table admin-form admin-modal admin-pagination">
      <style>{`
        .admin-gallery .form-control,
        .admin-gallery .form-select,
        .admin-gallery textarea {
          border: 2px solid #e9ecef;
          box-shadow: none;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .admin-gallery .form-control:focus,
        .admin-gallery .form-select:focus,
        .admin-gallery textarea:focus {
          border-color: #3CBEEE;
          box-shadow: 0 0 0 0.2rem rgba(60,190,238,.15);
        }
        .admin-gallery .card,
        .admin-gallery .card:hover,
        .admin-gallery table,
        .admin-gallery table:hover,
        .admin-gallery .table,
        .admin-gallery .table:hover {
          transform: translate(0) !important;
          top: auto !important;
          left: auto !important;
          position: static !important;
        }
        .admin-gallery .table thead th,
        .admin-gallery .table tbody td {
          transition: none !important;
        }
      `}</style>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gallery Management</h2>
        <button
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close form" : "+ Add image"}
        </button>
      </div>

      {/* Messages */}
      {message.type && (
        <div
          className={`alert alert-${message.type === "success" ? "success" : "danger"} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: null, text: "" })}></button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="card p-4 mb-4 shadow-sm">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>

            <div className="col-md-8">
              <label className="form-label fw-bold">Description</label>
              <input
                type="text"
                className="form-control"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter description..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Upload Image</label>
              <input type="file" className="form-control" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {form.image_url && !file && (
                <img
                  src={toBackendUrl(form.image_url)}
                  alt="preview"
                  style={{ width: "120px", marginTop: "8px" }}
                  className="img-thumbnail"
                />
              )}
            </div>

            <div className="col-12 text-end">
              <button className={`btn ${editingId ? "btn-warning" : "btn-primary"}`} onClick={handleSubmit}>
                {editingId ? "Update" : "Add new"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="card shadow-sm">
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th style={{ width: "120px" }}>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th style={{ width: "120px" }} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image_url && (
                    <img
                      src={toBackendUrl(item.image_url)}
                      alt={item.title}
                      style={{ width: "100px", height: "70px", objectFit: "cover" }}
                      className="rounded"
                    />
                  )}
                </td>
                <td className="fw-bold">{item.title}</td>
                <td className="text-muted">{item.description}</td>
                <td className="text-center" style={{ whiteSpace: "nowrap" }}>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No images in gallery.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminGallery;
