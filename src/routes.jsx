import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";
import Single from "./pages/Single.jsx";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/demo", element: <Demo /> },
      { path: "/single/:theid", element: <Single /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/add", element: <AddContact /> },
      { path: "/edit/:id", element: <AddContact /> },
    ],
  },
]);

export default router;