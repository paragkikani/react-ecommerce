import { useDispatch, useSelector } from "react-redux";
import Home from "./page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import Checkout from "./components/Checkout";
import ProductDetailsPage from "./page/ProductDetailsPage";
import Protected from "./components/Protected";
import CartPage from "./page/CartPage";
import { useEffect } from "react";
import { getCartAsync, selectCart } from "./redux/slice/cartSlice";
import { selectUser } from "./redux/slice/authSlice";
import PageNotFound from "./page/PageNotFound";
import SuccessOrder from "./page/SuccessOrder";
import MyOrderPage from "./page/MyOrderPage";
import ProfilePage from "./page/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
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
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <SuccessOrder />,
  },
  {
    path: "/my-order",
    element: <MyOrderPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const cart = useSelector(selectCart);
  useEffect(() => {
    if (userData) dispatch(getCartAsync(userData.id));
  }, [dispatch, userData]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
