import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSelectedProductsAsync,
  selectProduct,
} from "../redux/slice/productListSlice";

function AdminEditProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  const [imagesHolder, setImagesHolder] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(fetchSelectedProductsAsync(params.id));
  }, [dispatch]);

  useEffect(() => {
    setValue("title", product.title);
    setValue("description", product.description);
    setValue("thumbnail", product.thumbnail);
    setImagesHolder([]);
    product.images.map((x, index) => {
      setValue("images" + index, product.images[index]);
      setImagesHolder((prevVal) => [...prevVal, index]);
    });

    setValue("thumbnail", product.thumbnail);
    setValue("thumbnail", product.thumbnail);
    setValue("thumbnail", product.thumbnail);
    setValue("thumbnail", product.thumbnail);
  }, [product]);
  /*
    "title": "iPhone X",
  "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
  "price": 899,
  "discountPercentage": 17.94,
  "rating": 4.44,
  "stock": 34,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
  "images": [

  */

  return (
    <div>
      AdminEditProduct
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <form
          noValidate
          className="bg-white p-5 pt-10"
          onSubmit={handleSubmit((data) => {
            //addAdress(data);
            // reset();
          })}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Product Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("title", {
                      required: "name is required",
                    })}
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description", {
                      required: "description is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                     focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {
                <div className="sm:col-span-4">
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Images
                  </label>
                  <div className="mt-2">
                    {
                      //product.images.map((x, index) => (
                      Array.from(
                        { length: imagesHolder.length },
                        (_, index) => (
                          <div className="relative flex ">
                            <div className="w-full">
                              <input
                                {...register("images" + index, {
                                  required: "images is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 
                           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                            sm:text-sm sm:leading-6"
                              />
                            </div>
                            <button
                              onClick={() => {
                                console.log("ubd", index);
                                setImagesHolder((prev) =>
                                  prev.filter((x, i) => i !== index),
                                );
                              }}
                              className="rounded-md bg-red-600 ml-2 px-3 py-2 text-sm font-semibold 
                      text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-red-600">
                              Remove
                            </button>
                          </div>
                        ),
                      )
                    }
                    <button
                      onClick={() =>
                        setImagesHolder([...imagesHolder, imagesHolder.length])
                      }
                      className="rounded-md bg-indigo-600 my-2 px-3 py-2 text-sm font-semibold 
                      text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Add Image
                    </button>
                  </div>
                </div>
              }

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
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;
