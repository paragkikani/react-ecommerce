import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slice/authSlice";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const user = useSelector(selectUser);

  return (
    <>
      {user.access === "admin" ? (
        <>{children}</>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </>
  );
}

export default AdminProtected;
