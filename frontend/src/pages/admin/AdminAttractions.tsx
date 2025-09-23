import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig, getAuthHeaders } from "../../services/api";

const API_URL = `${apiConfig.baseURL}/admin/attractions`;
const ZONES_API_URL = `${apiConfig.baseURL}/admin/zones`;

interface Attraction {
  id: number;
  zone_id: number;
  name: string;
  description: string;
  image_url: string;
  zone_name?: string;
}

interface Zone {
  id: number;
  name: string;
  code: string;
  description?: string;
}

const AdminAttractions: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [form, setForm] = useState<Omit<Attraction, "id">>({
    zone_id: 0,
    name: "",
    description: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const authHeaders = getAuthHeaders();

  const fetchAttractions = async () => {
    try {
      const res = await axios.get(API_URL, { headers: authHeaders });
      setAttractions(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching attractions", err);
      setAttractions([]);
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

  useEffect(() => {
    fetchAttractions();
    fetchZones();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(API_URL, { ...form, id: editingId }, { headers: authHeaders });
    } else {
      await axios.post(API_URL, form, { headers: authHeaders });
    }
    fetchAttractions();
    setForm({ zone_id: 0, name: "", description: "", image_url: "" });
    setEditingId(null);
  };

  const handleEdit = (attraction: Attraction) => {
    setForm({
      zone_id: attraction.zone_id,
      name: attraction.name,
      description: attraction.description,
      image_url: attraction.image_url,
    });
    setEditingId(attraction.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this attraction?")) return;
    await axios.delete(`${API_URL}?id=${id}`, { headers: authHeaders });
    fetchAttractions();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Attractions Managements</h2>

      {/* Form nhập */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Zone</label>
            <select
              className="form-select"
              value={form.zone_id}
              onChange={(e) =>
                setForm({ ...form, zone_id: Number(e.target.value) })
              }
            >
              <option value={0}>-- Pick Zone --</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Attraction name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Attraction name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Attraction description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="col-12 text-end">
            <button
              className={`btn ${editingId ? "btn-warning" : "btn-primary"}`}
              onClick={handleSubmit}
            >
              {editingId ? "Update" : "Add new"}
            </button>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Zone</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attractions.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.zone_name || a.zone_id}</td>
                  <td>{a.name}</td>
                  <td>{a.description}</td>
                  <td>
                    {a.image_url && (
                      <img
                        src={a.image_url}
                        alt={a.name}
                        style={{ width: "80px" }}
                        className="img-thumbnail"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(a.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {attractions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    There are no attraction yet.
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

export default AdminAttractions;
