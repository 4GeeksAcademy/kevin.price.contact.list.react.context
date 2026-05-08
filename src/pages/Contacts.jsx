import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main.jsx";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container" style={{ maxWidth: "720px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mis Contactos</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}
        >
          + Add new contact
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        {store.contacts.length === 0 ? (
          <p className="text-center text-muted p-5">
            No hay contactos. ¡Agrega el primero!
          </p>
        ) : (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;