import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderByUserAsync,
  selectUserOrders,
} from "../redux/slice/orderSlice";
import { selectUser } from "../redux/slice/authSlice";

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userOrder = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchOrderByUserAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      <h3 className="text-2xl mb-3">My Orders</h3>
      {userOrder &&
        userOrder.map((order) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
            <div className="pt-8 ">
              <h1 className="text-3xl mb-2 tracking-tight text-gray-900">
                Order # {order.id}
              </h1>
              <div className="flow-root  p-3">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((cart) => (
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
                              Qty : {cart.quntity}
                            </label>
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
                <p>
                  {order.items.reduce((qty, x) => x.quntity + qty, 0)} Items
                </p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Price</p>
                <p>
                  $
                  {order.items.reduce(
                    (price, x) => x.price * x.quntity + price,
                    0,
                  )}
                  .00
                </p>
              </div>
              {order.adress && (
                <div>
                  <h3 className="font-bold">Address</h3>
                  <div className="min-w-0   py-1 border-gray-200 border-[1px]">
                    <div className="p-1 flex justify-between gap-x-6">
                      <div className="flex min-w-0 gap-x-4 ">
                        <div className="min-w-0 flex-auto ">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.adress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.adress.street}, {order.adress.city},
                            {order.adress.state}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          phone: {order.adress.phone}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          pincode: {order.adress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default Orders;
