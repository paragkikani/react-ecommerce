import React from "react";
import Navbar from "../components/Navbar";
import Orders from "../components/Orders";

function MyOrderPage() {
  return (
    <div>
      <Navbar>
        <Orders />
      </Navbar>
    </div>
  );
}

export default MyOrderPage;
