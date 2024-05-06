import { Link, Navigate } from "react-router-dom";
import {
  removeFromCartAsync,
  selectCart,
  updateCartAsync,
} from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Cart() {
  const carts = useSelector(selectCart);
  const dispatch = useDispatch();

  function removeCart(e, id) {
    dispatch(removeFromCartAsync(id));
  }

  function handleQuantityChange(e, item) {
    dispatch(updateCartAsync({ ...item, quntity: +e.target.value }));
  }

  return (
    <>
      {carts.length > 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
          <div className="pt-8 ">
            <h1 className="text-3xl mb-2 tracking-tight text-gray-900">Cart</h1>
            <div className="flow-root  p-3">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {carts.map((cart) => (
                  <li key={cart.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={cart.thumbnail}
                        alt={cart.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a>{cart.title}</a>
                          </h3>
                          <p className="ml-4"> ${cart.price}.00</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex text-gray-500">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Qty
                          </label>
                          <div className="ml-5">
                            <select
                              value={cart.quntity}
                              onChange={(e) => handleQuantityChange(e, cart)}>
                              {[1, 2, 3, 4, 5, 6].map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex">
                          <button
                            onClick={(e) => removeCart(e, cart.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{carts.reduce((price, x) => x.quntity + price, 0)} Items</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                ${carts.reduce((price, x) => x.price * x.quntity + price, 0)}.00
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" replace={true}></Navigate>
      )}
    </>
  );
}

export default Cart;
