import axios from "axios";
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

  const API_URL = "http://localhost:8000/api/admin/zones";
  const token =
    localStorage.getItem("token");
  // Lấy danh sách zone
  const fetchZones = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        await axios.put(
          API_URL,
          { ...formData, id: editingZone.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      await axios.delete(`${API_URL}?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchZones();
    } catch (error) {
      console.error("Error while delete zone:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Zones Managements</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>
        + Add zone
      </Button>

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

      {/* Modal thêm/sửa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingZone ? "Sửa Zone" : "Thêm Zone"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Tên Zone</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="code" className="mb-3">
              <Form.Label>Loại Zone</Form.Label>
              <Form.Select
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              >
                <option value="">-- Chọn loại zone --</option>
                <option value="park">Amusement Park</option>
                <option value="water">Water Park</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminZones;
