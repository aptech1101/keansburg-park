import { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig, getAuthHeaders } from "../../services/api";

const API_URL = `${apiConfig.baseURL}/admin/restaurants`;

interface Restaurant {
  id: number;
  zone_id: number;
  name: string;
  description: string;
  image_url: string;
  zone_name?: string;
}

const AdminRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Restaurant | null>(null);

  const authHeaders = getAuthHeaders();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, { headers: authHeaders });
      setRestaurants(res.data.data);
      setError(null);
    } catch (err) {
      setError("Error while fetching restaurants");
    } finally {
      setLoading(false);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(`${apiConfig.baseURL}/admin/zones`, { headers: authHeaders });
      setZones(res.data.data);
    } catch (err) {
      console.error("Error while fetching zones:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    fetchZones();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this restaurant?")) return;
    try {
      await axios.delete(`${API_URL}?id=${id}`, { headers: authHeaders });
      fetchRestaurants();
    } catch (error) {
      console.error("Error while deleting restaurant:", error);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await axios.put(API_URL, editing, { headers: authHeaders });
      } else {
        await axios.post(API_URL, editing, { headers: authHeaders });
      }
      setEditing(null);
      fetchRestaurants();
    } catch (error) {
      console.error("Error while saving restaurant:", error);
    }
  };

  if (loading) return <p className="text-center mt-3">Loading data...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Restaurants Managements</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() =>
          setEditing({ id: 0, zone_id: 0, name: "", description: "", image_url: "" })
        }
      >
        + Add restaurant
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Zone</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.zone_name}</td>
              <td>{r.name}</td>
              <td>{r.description}</td>
              <td>
                {r.image_url && (
                  <img src={r.image_url} alt={r.name} width={80} />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditing(r)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="card p-3 mt-4">
          <h5>{editing.id ? "Edit" : "Add"} Restaurant</h5>
          <div className="mb-3">
            <label className="form-label">Zone</label>
            <select
              className="form-select"
              value={editing.zone_id}
              onChange={(e) =>
                setEditing({ ...editing, zone_id: Number(e.target.value) })
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
          <input
            className="form-control mb-2"
            placeholder="Restaurant name"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Image URL"
            value={editing.image_url}
            onChange={(e) =>
              setEditing({ ...editing, image_url: e.target.value })
            }
          />
          <button className="btn btn-primary my-2" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditing(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;
