import React, { useState } from "react";
import Cart from "./Cart";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartAsync,
  resetCartAsync,
  selectCart,
  updateCartAsync,
} from "../redux/slice/cartSlice";
import { useForm } from "react-hook-form";
import { selectUser, updateUserAsync } from "../redux/slice/authSlice";
import { placeOrderAsync, selectCurrentOrder } from "../redux/slice/orderSlice";

function Checkout() {
  const carts = useSelector(selectCart);
  const user = useSelector(selectUser);
  const order = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectPayment, setSelectedPayment] = useState("cash");

  const handleSelectedAddress = (e, index) => {
    setSelectedAddress(user.addresses[index]);
  };
  const handleSelectedPayment = (e) => {
    setSelectedPayment(e.target.value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function removeCart(e, id) {
    dispatch(removeFromCartAsync(id));
  }

  function handleQuantityChange(e, item) {
    dispatch(updateCartAsync({ ...item, quntity: +e.target.value }));
  }

  function addAdress(address) {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
  }

  function totalAmount() {
    return carts.reduce((price, x) => x.price * x.quntity + price, 0);
  }
  function totalItems() {
    return carts.reduce((price, x) => x.quntity + price, 0);
  }
  function handleOrder() {
    const order = {
      user: user,
      items: carts,
      adress: selectedAddress,
      payment: selectPayment,
      orderStatus: "order Placed",
    };
    // order place
    dispatch(placeOrderAsync(order));

    // cart khali
    dispatch(resetCartAsync(user.id));
    // success page redirect
  }
  return (
    <>
      {!carts.length && <Navigate to="/" replace={true}></Navigate>}
      {order && <Navigate to={"order-success/" + order.id}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              noValidate
              className="bg-white p-5 pt-10"
              onSubmit={handleSubmit((data) => {
                addAdress(data);
                reset();
              })}>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is required",
                        })}
                        id="first-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "street is required",
                        })}
                        id="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "state is required",
                        })}
                        id="region"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pincode", {
                          required: "pincode is required",
                        })}
                        id="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add Address
                  </button>
                </div>
              </div>

              <div>
                <legend className="text-sm font-semibold text-gray-900">
                  Addresses
                </legend>
                <p className="mt-1 text-sm text-gray-600">
                  Choose delivery Address or Add new-address
                </p>
                <ul role="list" className="divide-y divide-gray-100">
                  {user.addresses.map((address, index) => (
                    <div>
                      <label htmlFor="adress">
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-3">
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={(e) => handleSelectedAddress(e, index)}
                              name="adress"
                              type="radio"
                              className="h-4 w-4 mt-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.street}, {address.city},{address.state}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              phone: {address.phone}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              pincode: {address.pincode}
                            </p>
                          </div>
                        </li>
                      </label>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose payment option
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          onChange={(e) => handleSelectedPayment(e)}
                          checked={selectPayment === "cash"}
                          value="cash"
                          id="cash"
                          name="payment"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          onChange={(e) => handleSelectedPayment(e)}
                          value="card"
                          checked={selectPayment === "card"}
                          id="card-payment"
                          name="payment"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card-payment"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          card payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 ">
            <div className="mx-auto max-w-7xl px-2   bg-white">
              <div className="pt-8 ">
                <h1 className="text-3xl mb-2 tracking-tight text-gray-900">
                  Cart
                </h1>
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
                                  onChange={(e) =>
                                    handleQuantityChange(e, cart)
                                  }>
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
                  <p>{totalItems()} Items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount()}.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border 
                    border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white 
                    shadow-sm hover:bg-indigo-700">
                    Order Now
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
