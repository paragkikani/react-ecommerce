import { useDispatch, useSelector } from "react-redux";
import Home from "./page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import CartPage from "./page/CartPage";
import Checkout from "./components/Checkout";
import ProductDetailsPage from "./page/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product-details",
    element: <ProductDetailsPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.product.counter);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
