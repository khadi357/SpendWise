import { useContext } from "react";
import { ToastsContext } from "../context/ToastsContext";

export const useToasts = () => useContext(ToastsContext);