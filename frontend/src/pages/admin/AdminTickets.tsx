import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8000/api/admin/tickets";
const ZONE_API = "http://localhost:8000/api/admin/zones";

interface Ticket {
  id: number;
  zone_id: number;
  weekday_price: string;
  weekend_price: string;
  description: string;
  zone_name?: string;
}

interface Zone {
  id: number;
  name: string;
  code: string;
  description?: string;
}

const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [form, setForm] = useState<Omit<Ticket, "id">>({
    zone_id: 0,
    weekday_price: "",
    weekend_price: "",
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTickets();
    fetchZones();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.data);
    } catch (err) {
      console.error("Error while getting tickets:", err);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONE_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setZones(res.data.data);
    } catch (err) {
      console.error("Error while getting zones:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          API_URL,
          { ...form, id: editId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTickets();
      setForm({ zone_id: 0, weekday_price: "", weekend_price: "", description: "" });
      setEditId(null);
    } catch (err) {
      console.error("Error while save ticket:", err);
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setForm({
      zone_id: ticket.zone_id,
      weekday_price: ticket.weekday_price,
      weekend_price: ticket.weekend_price,
      description: ticket.description,
    });
    setEditId(ticket.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this ticket?")) return;
    try {
      await axios.delete(`${API_URL}?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTickets();
    } catch (err) {
      console.error("Error while deleting ticket:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tickets Managements</h2>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={form.zone_id}
              onChange={(e) =>
                setForm({ ...form, zone_id: parseInt(e.target.value) })
              }
              required
            >
              <option value={0}>-- Pick Zone --</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Weekday Price"
              value={form.weekday_price}
              onChange={(e) => setForm({ ...form, weekday_price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Weekend Price"
              value={form.weekend_price}
              onChange={(e) => setForm({ ...form, weekend_price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-primary" type="submit">
              {editId ? "Update" : "Add new"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Zone</th>
            <th>Weekday Price</th>
            <th>Weekend Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.zone_name || 'Unknown Zone'}</td>
              <td>{t.weekday_price}</td>
              <td>{t.weekend_price}</td>
              <td>{t.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(t)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(t.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTickets;
