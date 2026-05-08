import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import storeReducer, { initialStore } from "./store.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";

export const Context = React.createContext(null);

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "mi_agenda";

const Main = () => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const loadContacts = async () => {
    try {
      let resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
      if (resp.status === 404) {
        await fetch(`${BASE_URL}/agendas/${AGENDA}`, { method: "POST" });
        dispatch({ type: "SET_CONTACTS", payload: [] });
        return;
      }
      const data = await resp.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error("Error cargando contactos:", err);
    }
  };

  const createContact = async (contactData) => {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    if (!resp.ok) throw new Error("Error al crear");
    await loadContacts();
  };

  const updateContact = async (id, contactData) => {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    if (!resp.ok) throw new Error("Error al actualizar");
    await loadContacts();
  };

  const deleteContact = async (id) => {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Error al eliminar");
    await loadContacts();
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <Context.Provider value={{ store, dispatch, loadContacts, createContact, updateContact, deleteContact }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);