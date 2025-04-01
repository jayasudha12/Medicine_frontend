import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/medicine";

const MedicineApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ name: "", expiryDate: "", manufactureDate: "", chemicalContent: "", quantity: "", drugLicense: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    setMedicines(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/update/${editingId}`, form);
    } else {
      await axios.post(`${API_URL}/add`, form);
    }
    setForm({ name: "", expiryDate: "", manufactureDate: "", chemicalContent: "", quantity: "", drugLicense: "" });
    setEditingId(null);
    fetchMedicines();
  };

  const handleEdit = (medicine) => {
    setForm(medicine);
    setEditingId(medicine._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchMedicines();
  };

  return (
    <div>
      <h2>Medicine Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required />
        <input type="date" name="manufactureDate" value={form.manufactureDate} onChange={handleChange} required />
        <input type="text" name="chemicalContent" placeholder="Chemical Content" value={form.chemicalContent} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="text" name="drugLicense" placeholder="Drug License" value={form.drugLicense} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Add"} Medicine</button>
      </form>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine._id}>
            {medicine.name} - {medicine.expiryDate}
            <button onClick={() => handleEdit(medicine)}>Edit</button>
            <button onClick={() => handleDelete(medicine._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineApp;
