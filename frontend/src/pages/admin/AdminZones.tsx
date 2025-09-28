import axios from "axios";
import { apiConfig, getAuthHeaders } from "../../services/api";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

interface Zone {
  id: number;
  name: string;
  description: string;
  code: string;
}

const AdminZones: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
  });

  const API_URL = `${apiConfig.baseURL}/admin/zones`;
  const token = localStorage.getItem("token");
  // Lấy danh sách zone
  const fetchZones = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, { headers: getAuthHeaders() });
      setZones(res.data.data || []);
    } catch (error) {
      console.error("Error while fetching zone:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  // Mở modal + set form
  const handleShowModal = (zone?: Zone) => {
    if (zone) {
      setEditingZone(zone);
      setFormData({
        name: zone.name,
        description: zone.description,
        code: zone.code,
      });
    } else {
      setEditingZone(null);
      setFormData({
        name: "",
        description: "",
        code: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Thêm hoặc sửa zone
  const handleSave = async () => {
    try {
      if (editingZone) {
        await axios.put(API_URL, { ...formData, id: editingZone.id }, { headers: getAuthHeaders() });
      } else {
        await axios.post(API_URL, formData, { headers: getAuthHeaders() });
      }
      fetchZones();
      handleCloseModal();
    } catch (error) {
      console.error("Error while saving zone:", error);
    }
  };

  // Xoá zone
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you want to delete this zone?")) return;
    try {
      await axios.delete(`${API_URL}?id=${id}`, { headers: getAuthHeaders() });
      fetchZones();
    } catch (error) {
      console.error("Error while delete zone:", error);
    }
  };

  return (
    <div className="container mt-4 admin-zones admin-table admin-form admin-modal admin-pagination">
      <h2 className="mb-3">Zones Managements</h2>
      {/* Add new disabled per request */}

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Zone name</th>
              <th>Zone type</th>
              <th>Zone description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.id}>
                <td>{zone.id}</td>
                <td>{zone.name}</td>
                <td>{zone.code}</td>
                <td>{zone.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(zone)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(zone.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/edit modal removed per request */}
    </div>
  );
};

export default AdminZones;
