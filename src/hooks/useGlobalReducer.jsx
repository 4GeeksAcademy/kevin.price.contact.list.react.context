import { useContext } from "react";
import { Context } from "../main.jsx";

const useGlobalReducer = () => useContext(Context);

export default useGlobalReducer;