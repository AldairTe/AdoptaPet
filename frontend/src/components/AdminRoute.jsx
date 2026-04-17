import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function AdminRoute({ children }) {
  const user = getCurrentUser();
  if (!user || user.tipo !== "administrador") return <Navigate to="/login" replace />;
  return children;
}
