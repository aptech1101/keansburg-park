import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig, getAuthHeaders, toBackendUrl } from "../../services/api";
import { Alert, Button, Form, Modal, Pagination, Spinner, Table } from "react-bootstrap";


const API_URL = `${apiConfig.baseURL}/admin/restaurants`;
const ZONES_API_URL = `${apiConfig.baseURL}/admin/zones`;
const UPLOAD_API_URL = `${apiConfig.baseURL}/admin/upload`;

interface RestaurantRaw {
  id: number;
  zone_id: number | null;
  name: string;
  description: string;
  image_url: string;
  zone_name?: string;
  category?: string;
  features?: string[] | string | null;
  details?: string | null;
}

interface RestaurantView {
  id: number;
  zone_id: number | null;
  name: string;
  description: string;
  image_url: string;
  zone_name?: string;
  category?: string;
  features: string[];
  details?: string;
}

type RestaurantForm = Omit<RestaurantView, "id" | "zone_name"> & {
  featuresInput?: string; // Thêm field để lưu input string tạm thời
};

interface Zone {
  id: number;
  name: string;
  code: string;
  description?: string;
}

const AdminRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantView[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [form, setForm] = useState<RestaurantForm>({
    zone_id: 0,
    name: "",
    description: "",
    image_url: "",
    category: "",
    features: [],
    featuresInput: "",
    details: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const authHeaders = getAuthHeaders();

  const toFeaturesArray = (features: unknown): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) {
      return features
        .map(String)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }
    if (typeof features === "string") {
      try {
        const parsed = JSON.parse(features);
        if (Array.isArray(parsed)) {
          return parsed
            .map(String)
            .map(s => s.trim())
            .filter(s => s.length > 0);
        }
      } catch {}
      return features
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }
    return [];
  };

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(API_URL, { headers: authHeaders });
      const raw: RestaurantRaw[] = res.data?.data || [];
      const normalized = raw.map((r) => ({
        ...r,
        features: toFeaturesArray(r.features as any),
      })) as RestaurantView[];
      setRestaurants(normalized);
    } catch (err) {
      console.error("Error fetching restaurants", err);
      setRestaurants([]);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONES_API_URL, { headers: authHeaders });
      setZones(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching zones", err);
      setZones([]);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RestaurantView | null>(null);
  

  useEffect(() => {
    fetchRestaurants();
    fetchZones();
  }, []);

  const uploadImage = async (): Promise<string> => {
    if (!file) return form.image_url;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "restaurant");
    const res = await axios.post(UPLOAD_API_URL, formData, {
      headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
    });
    return res.data?.url || "";
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!form.name.trim()) {
        setMessage({ type: 'error', text: 'Name is required.' });
        setTimeout(() => setMessage({ type: null, text: '' }), 5000);
        return;
      }

      // Clean up features data before submit
      const cleanedFeatures = Array.isArray(form.features) 
        ? form.features
            .map(f => String(f).trim())
            .filter(f => f.length > 0)
        : [];

      let imageUrl = form.image_url;
      if (file) imageUrl = await uploadImage();

      const payload = {
        ...form,
        zone_id: form.zone_id === 0 ? null : form.zone_id,
        image_url: imageUrl,
        features: cleanedFeatures
      };

      if (editingId) {
        await axios.put(API_URL, { ...payload, id: editingId }, { headers: authHeaders });
        setMessage({ type: "success", text: "Restaurant updated successfully!" });
      } else {
        await axios.post(API_URL, payload, { headers: authHeaders });
        setMessage({ type: "success", text: "Restaurant added successfully!" });
      }

      fetchRestaurants();
      setForm({ zone_id: 0, name: "", description: "", image_url: "", category: "", features: [], featuresInput: "", details: "" });
      setFile(null);
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    } catch (err) {
      console.error("Error saving restaurant", err);
      setMessage({ type: "error", text: "Error saving restaurant. Please try again." });
      setTimeout(() => setMessage({ type: null, text: "" }), 5000);
    }
  };

  const handleEdit = (r: RestaurantView) => {
    const featuresArray = toFeaturesArray(r.features as any);
    setForm({
      zone_id: r.zone_id,
      name: r.name,
      description: r.description,
      image_url: r.image_url,
      category: r.category || "",
      features: featuresArray,
      featuresInput: featuresArray.join(", "),
      details: r.details || "",
    });
    setFile(null);
    setEditingId(r.id);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this restaurant?")) return;
    try {
      await axios.delete(`${API_URL}?id=${id}`, { headers: authHeaders });
      setMessage({ type: "success", text: "Restaurant deleted successfully!" });
      fetchRestaurants();
      setTimeout(() => setMessage({ type: null, text: "" }), 3000);
    } catch (err) {
      console.error("Error deleting restaurant", err);
      setMessage({ type: "error", text: "Error deleting restaurant. Please try again." });
      setTimeout(() => setMessage({ type: null, text: "" }), 5000);
    }
  };

  const filteredRestaurants = restaurants.filter((r) => {
    if (selectedZone === "all") return true;
    const zoneName = (r.zone_name || "").toLowerCase();
    if (selectedZone === "amusement") return zoneName.includes("amusement");
    if (selectedZone === "water") return zoneName.includes("water");
    return true;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRestaurants = filteredRestaurants.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedZone]);

  return (
    <div className="container mt-4 admin-restaurants admin-table admin-form admin-modal admin-pagination">
      <style>{`
        .admin-restaurants .form-control,
        .admin-restaurants .form-select,
        .admin-restaurants textarea {
          border: 2px solid #e9ecef;
          box-shadow: none;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .admin-restaurants .form-control:focus,
        .admin-restaurants .form-select:focus,
        .admin-restaurants textarea:focus {
          border-color: #3CBEEE;
          box-shadow: 0 0 0 0.2rem rgba(60,190,238,.15);
        }
        /* Ngăn layout shift khi hover highlight từ theme khác */
        .admin-restaurants .card,
        .admin-restaurants .card:hover,
        .admin-restaurants table,
        .admin-restaurants table:hover,
        .admin-restaurants .table,
        .admin-restaurants .table:hover {
          transform: translate(0) !important;
          top: auto !important;
          left: auto !important;
          position: static !important;
        }
        .admin-restaurants .table thead th,
        .admin-restaurants .table tbody td {
          transition: none !important;
        }
      `}</style>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Restaurants Management</h2>
        <button className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close form" : "+ Add restaurant"}
        </button>
      </div>
        {/* Zone Filter Buttons */}
      <div className="mb-3">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${selectedZone === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedZone('all')}
          >
            All Zones
          </button>
          <button
            type="button"
            className={`btn ${selectedZone === 'amusement' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedZone('amusement')}
          >
            Amusement Park
          </button>
          <button
            type="button"
            className={`btn ${selectedZone === 'water' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedZone('water')}
          >
            Water Park
          </button>
        </div>
      </div>
      
      {/* Messages */}
      {message.type && (
        <div className={`alert alert-${message.type === "success" ? "success" : "danger"} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: null, text: "" })}></button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div ref={formRef} className="card p-4 mb-4 shadow-sm">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Zone</label>
              <select
                className="form-select"
                value={form.zone_id || 0}
                onChange={(e) => setForm({ ...form, zone_id: Number(e.target.value) })}
              >
                <option value={0}>-- Pick Zone (optional) --</option>
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Restaurant name</label>
              <input type="text" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Add Image</label>
              <input type="file" className="form-control" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {form.image_url && !file && (
                <img src={toBackendUrl(form.image_url)} alt="preview" style={{ width: "100px", marginTop: "8px" }} />
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Category</label>
              <input type="text" className="form-control" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>

            <div className="col-12 col-md-8">
              <label className="form-label fw-bold">Features (comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Family-friendly, Outdoor seating, Vegetarian options"
                value={form.featuresInput || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Lưu input string để user có thể nhập dấu phẩy tự do
                  setForm({
                    ...form,
                    featuresInput: inputValue,
                  });
                }}
                onBlur={(e) => {
                  // Xử lý cuối cùng khi user rời khỏi field
                  const inputValue = e.target.value;
                  const features = inputValue
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);
                  setForm({
                    ...form,
                    features: features,
                    featuresInput: inputValue,
                  });
                }}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Description</label>
              <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Details</label>
              <textarea className="form-control" rows={3} value={form.details || ""} onChange={(e) => setForm({ ...form, details: e.target.value })} />
            </div>

            <div className="col-12 text-end">
              <button className={`btn ${editingId ? "btn-warning" : "btn-primary"}`} onClick={handleSubmit}>
                {editingId ? "Update" : "Add new"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
<div className="card shadow-sm">
  
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Zone</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Features</th>
            <th>Details</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRestaurants.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.zone_name || r.zone_id || "-"}</td>
              <td>{r.name}</td>
              <td>{r.description?.length > 20 ? r.description.substring(0, 20) + "..." : r.description}</td>
              <td>{r.category || ""}</td>
              <td>{(() => {
                if (!r.features || !Array.isArray(r.features)) return "";
                const validFeatures = r.features.filter(f => f && typeof f === 'string' && f.trim().length > 0);
                if (validFeatures.length === 0) return "";
                const text = validFeatures.join(", ");
                return text.length > 20 ? text.substring(0, 20) + "..." : text;
              })()}</td>
              <td>{r.details && r.details?.length > 20 ? r.details.substring(0, 20) + "..." : r.details}</td>
              <td>{r.image_url && <img src={toBackendUrl(r.image_url)} alt={r.name} style={{ width: "80px" }} className="img-thumbnail" />}</td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={() => { setSelectedItem(r); setShowModal(true); }}>
                  Detail
                </Button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(r)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {paginatedRestaurants.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-muted">
                {filteredRestaurants.length === 0 ? "No restaurants found for the selected zone." : "No restaurants available."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    
  </div>
</div>

{/* Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" scrollable>
  <Modal.Header closeButton>
    <Modal.Title>{selectedItem?.name || "Restaurant Detail"}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedItem && (
      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <p><strong>ID:</strong> {selectedItem.id}</p>
        <p><strong>Zone:</strong> {selectedItem.zone_name || selectedItem.zone_id}</p>
        <p><strong>Name:</strong> {selectedItem.name}</p>
        <p><strong>Description:</strong> {selectedItem.description}</p>
        <p><strong>Category:</strong> {selectedItem.category}</p>
        <p>
          <strong>Features:</strong>{" "}
          {(() => {
            if (!selectedItem.features || !Array.isArray(selectedItem.features)) return "None";
            const validFeatures = selectedItem.features.filter(f => f && typeof f === 'string' && f.trim().length > 0);
            return validFeatures.length > 0 ? validFeatures.join(", ") : "None";
          })()}
        </p>
        <p><strong>Details:</strong> {selectedItem.details}</p>
        {selectedItem.image_url && <img src={toBackendUrl(selectedItem.image_url)} alt={selectedItem.name} className="img-fluid mt-3 rounded" />}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default AdminRestaurants;
