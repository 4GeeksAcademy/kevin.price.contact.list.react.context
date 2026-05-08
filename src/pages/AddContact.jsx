import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../main.jsx";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, createContact, updateContact } = useContext(Context);
  const isEditing = Boolean(id);

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const existing = store.contacts.find((c) => c.id === parseInt(id));
      if (existing) setForm({
        name: existing.name || "",
        email: existing.email || "",
        phone: existing.phone || "",
        address: existing.address || "",
      });
    }
  }, [id, store.contacts]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("El nombre es obligatorio."); return; }
    setLoading(true);
    try {
      if (isEditing) await updateContact(parseInt(id), form);
      else await createContact(form);
      navigate("/contacts");
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "560px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="card p-4">
        <h3 className="text-center mb-4">
          {isEditing ? "Editar contacto" : "Add a new contact"}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange}
            placeholder="Full Name" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="Enter email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            placeholder="Enter phone" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" value={form.address} onChange={handleChange}
            placeholder="Enter address" className="form-control" />
        </div>

        <button onClick={handleSubmit} disabled={loading} className="btn btn-primary w-100">
          {loading ? "Guardando..." : "save"}
        </button>

        <p className="text-center mt-3 mb-0">
          <span onClick={() => navigate("/contacts")}
            style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}>
            or get back to contacts
          </span>
        </p>
      </div>
    </div>
  );
};

export default AddContact;