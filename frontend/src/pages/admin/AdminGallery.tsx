import axios from "axios";
import { useEffect, useState } from "react";
import { apiConfig, getAuthHeaders } from "../../services/api";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image_url: "",
  });
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);


  // Fetch items
  const fetchItems = () => {
    axios
      .get(`${apiConfig.baseURL}/admin/gallery`, {
        headers: getAuthHeaders(),
      })
      .then((res) => setItems(res.data.data)) // lấy data chuẩn
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add
  const addItem = () => {
    axios
      .post(
        `${apiConfig.baseURL}/api/admin/gallery`,
        newItem,
        { headers: getAuthHeaders() }
      )
      .then(() => {
        fetchItems();
        setNewItem({ title: "", description: "", image_url: "" });
      })
      .catch((err) => console.error(err));
  };

  // Update
  const updateItem = () => {
    if (!editItem) return;
    axios
      .put(
        `${apiConfig.baseURL}/api/admin/gallery`,
        editItem,
        { headers: getAuthHeaders() }
      )
      .then(() => {
        fetchItems();
        setEditItem(null);
      })
      .catch((err) => console.error(err));
  };

  // Delete
  const deleteItem = (id: number) => {
    if (!window.confirm("Are you sure to delete this image?")) return;
    axios
      .delete(`${apiConfig.baseURL}/api/admin/gallery?id=${id}`, {
        headers: getAuthHeaders(),
      })
      .then(() => fetchItems())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gallery Management</h2>

      {/* Form thêm mới */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Add New Image</h5>
          <input
            type="text"
            placeholder="Title"
            className="form-control mb-2"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="form-control mb-2"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="form-control mb-2"
            value={newItem.image_url}
            onChange={(e) =>
              setNewItem({ ...newItem, image_url: e.target.value })
            }
          />
          <button className="btn btn-primary" onClick={addItem}>
            Add Image
          </button>
        </div>
      </div>

      {/* Form update */}
      {editItem && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Edit Image</h5>
            <input
              type="text"
              className="form-control mb-2"
              value={editItem.title}
              onChange={(e) =>
                setEditItem({ ...editItem, title: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              value={editItem.image_url}
              onChange={(e) =>
                setEditItem({ ...editItem, image_url: e.target.value })
              }
            />
            <button className="btn btn-success me-2" onClick={updateItem}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditItem(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table hiển thị */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditItem(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGallery;
