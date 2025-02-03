import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
