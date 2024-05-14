import Navbar from "../components/Navbar";
import AdminProductList from "../components/AdminProductList";
import React from "react";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </div>
  );
}

export default AdminHome;
