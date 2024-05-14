import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectUser } from "../redux/slice/authSlice";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(logoutAsync(user.id));
  }, []);

  return <>{!user && <Navigate to="/" replace={true}></Navigate>}</>;
}

export default LogoutPage;
