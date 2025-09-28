import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig, getAuthHeaders } from "../../services/api";

const API_URL = `${apiConfig.baseURL}/admin/tickets`;
const ZONE_API = `${apiConfig.baseURL}/admin/zones`;

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
      const res = await axios.get(API_URL, { headers: getAuthHeaders() });
      setTickets(res.data.data);
    } catch (err) {
      console.error("Error while getting tickets:", err);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONE_API, { headers: getAuthHeaders() });
      setZones(res.data.data);
    } catch (err) {
      console.error("Error while getting zones:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(API_URL, { ...form, id: editId }, { headers: getAuthHeaders() });
      } else {
        await axios.post(API_URL, form, { headers: getAuthHeaders() });
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
      await axios.delete(`${API_URL}?id=${id}`, { headers: getAuthHeaders() });
      fetchTickets();
    } catch (err) {
      console.error("Error while deleting ticket:", err);
    }
  };

  return (
    <div className="container mt-4 admin-tickets admin-table admin-form admin-modal admin-pagination">
      <h2 className="mb-4">Tickets Managements</h2>

      {/* Add/edit form removed per request */}

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
