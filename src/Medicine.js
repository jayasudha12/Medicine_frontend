import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicineManagement = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [editingId, setEditingId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState({
    name: '',
    expiryDate: '',
    manufactureDate: '',
    chemicalContent: '',
    quantity: 1,
    drugLicense: '',
    category: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login');
    } else {
      fetchMedicines();
    }
  }, [userId, token, navigate]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/donorMedicine/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMedicines([...response.data]);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error fetching medicines');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineDetails({ ...medicineDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMedicineDetails({ ...medicineDetails, image: file });
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.entries(medicineDetails).forEach(([key, value]) => {
      if (key === 'image') {
        if (value) formData.append('file', value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (editingId) {
        await axios.put(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/update/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `https://medicine-expiry-8lj5.onrender.com/api/medicine/add/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      await fetchMedicines();
      setMedicineDetails({
        name: '',
        expiryDate: '',
        manufactureDate: '',
        chemicalContent: '',
        quantity: 1,
        drugLicense: '',
        category: '',
        image: null,
      });
      setImagePreview(null);
      setEditingId(null);
      document.getElementById('imageInput').value = '';
    } catch (error) {
      console.error('Submit error:', error);
      setError(editingId ? 'Error updating medicine' : 'Error adding medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/getOne/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const {
        name,
        expiryDate,
        manufactureDate,
        chemicalContent,
        quantity,
        drugLicense,
        category,
        imageUrl,
      } = response.data;

      setMedicineDetails({
        name,
        expiryDate: expiryDate.slice(0, 10),
        manufactureDate: manufactureDate.slice(0, 10),
        chemicalContent,
        quantity,
        drugLicense,
        category,
        image: null,
      });

      setImagePreview(imageUrl);
      setEditingId(id);
      document.getElementById('imageInput').value = '';
    } catch (error) {
      console.error('Edit fetch error:', error);
      setError('Error fetching medicine details');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://medicine-expiry-8lj5.onrender.com/api/medicine/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMedicines();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error deleting medicine');
    }
  };

  return (
    <div style={{ padding: '40px', background: '#e8f5e9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1b5e20', marginBottom: '40px', fontSize: '32px' }}>
        Donate Your Medicines
      </h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            flex: '1',
            minWidth: '350px',
            maxWidth: '500px',
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(76, 175, 80, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
          }}
        >
          <h2 style={{ color: '#2e7d32', marginBottom: '20px', textAlign: 'center' }}>
            {editingId ? 'Edit Medicine' : 'Add Medicine'}
          </h2>

          {[
            ['Name', 'name', 'text'],
            ['Expiry Date', 'expiryDate', 'date'],
            ['Manufacture Date', 'manufactureDate', 'date'],
            ['Chemical Content', 'chemicalContent', 'text'],
            ['Quantity', 'quantity', 'number'],
            ['Drug License', 'drugLicense', 'text'],
            ['Category', 'category', 'text'],
          ].map(([label, name, type]) => (
            <div key={name} style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#1b5e20' }}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={medicineDetails[name]}
                onChange={handleInputChange}
                required
                min={type === 'number' ? 1 : undefined}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #a5d6a7',
                  fontSize: '14px',
                  backgroundColor: '#f9fff9',
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#1b5e20' }}>
              Image
            </label>
            <input
              id="imageInput"
              type="file"
              name="image"
              onChange={handleImageChange}
              required={!editingId}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #a5d6a7',
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: '10px', width: '100%', maxHeight: '200px', borderRadius: '10px' }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#43a047',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : editingId ? 'Update Medicine' : 'Add Medicine'}
          </button>
        </form>

        <div style={{
          flex: '1',
          minWidth: '350px',
          maxWidth: '500px',
          padding: '30px',
          borderRadius: '20px',
          background: 'rgba(76, 175, 80, 0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          overflowY: 'auto',
          maxHeight: '650px'
        }}>
          <h2 style={{ color: '#1b5e20', marginBottom: '20px', textAlign: 'center' }}>Donated Medicines</h2>

          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                padding: '15px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <img
                src={medicine.imageUrl}
                alt={medicine.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#2e7d32' }}>{medicine.name}</h3>
                <p style={{ margin: '2px 0' }}><strong>Qty:</strong> {medicine.quantity}</p>
                <p style={{ margin: '2px 0' }}><strong>EXP:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                <p style={{ margin: '2px 0' }}><strong>Category:</strong> {medicine.category}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <FaEdit
                  title="Edit"
                  onClick={() => handleEdit(medicine._id)}
                  style={{
                    fontSize: '20px',
                    color: '#f9a825',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#fffde7',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <FaTrash
                  title="Delete"
                  onClick={() => handleDelete(medicine._id)}
                  style={{
                    fontSize: '20px',
                    color: '#e53935',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ffebee',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineManagement;