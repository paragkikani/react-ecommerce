import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
}

export default Home;
