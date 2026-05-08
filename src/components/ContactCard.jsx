import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main.jsx";

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const initials = contact.name
    ? contact.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  const handleDelete = async () => {
    await deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3 p-3 border-bottom">
        {/* Avatar */}
        <div style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#cfe2ff", display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: "500", fontSize: "16px",
          color: "#084298", flexShrink: 0,
        }}>
          {initials}
        </div>

        {/* Datos */}
        <div className="flex-grow-1">
          <p className="fw-semibold mb-1">{contact.name}</p>
          <p className="text-muted small mb-0">📍 {contact.address || "—"}</p>
          <p className="text-muted small mb-0">📞 {contact.phone || "—"}</p>
          <p className="text-muted small mb-0">✉️ {contact.email || "—"}</p>
        </div>

        {/* Acciones */}
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary"
            onClick={() => navigate(`/edit/${contact.id}`)}>
            ✏️
          </button>
          <button className="btn btn-sm btn-outline-danger"
            onClick={() => setShowModal(true)}>
            🗑️
          </button>
        </div>
      </div>

      {/* Modal Bootstrap */}
      {showModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Eliminar contacto?</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                Vas a eliminar a <strong>{contact.name}</strong>. Esta acción no se puede deshacer.
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;