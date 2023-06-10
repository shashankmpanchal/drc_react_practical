import React from "react";
import { useSelector } from "react-redux";

export let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const state = useSelector((state) => state.store);
  let value = { state };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
