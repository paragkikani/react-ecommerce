import React from "react";
import ProductDetails from "../components/ProductDetails";
import Navbar from "../components/Navbar";

function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
}

export default ProductDetailsPage;
