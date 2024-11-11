import { useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import { RootState } from "../../app/store";
import { SavedProduct } from "../../common/types";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  calculateOriginalPrice,
  roundOffNumber,
} from "../../utils/calculation";
import Order from "./components/Order";

export default function Cart() {
  const { cartItems } = useSelector((state: RootState) => state.common),
    navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return roundOffNumber(
      cartItems.reduce(
        (acc: number, item: SavedProduct) => acc + item.price * item.quantity,
        0
      )
    );
  }, [cartItems]);

  const originalPrice = useMemo(() => {
    return roundOffNumber(
      cartItems.reduce(
        (acc: number, item: SavedProduct) =>
          acc +
          calculateOriginalPrice(
            item.price,
            item.quantity,
            item.discountPercentage
          ),
        0
      )
    );
  }, [cartItems]);

  return (
    <section className="bg-white py-8 antialiased  md:py-16 h-[calc(100svh-4.5rem)] dark:bg-slate-300 overflow-y-auto scroll-bar-custom">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cartItems.length > 0 ? (
              cartItems.map((item: SavedProduct) => (
                <CartItem item={item} key={item.id} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[50svh]">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your cart is empty
                </h2>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Get back to shopping
                </button>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${originalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -${roundOffNumber(originalPrice - totalPrice)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $0
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $0
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 pt-2">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${totalPrice}
                    </dd>
                  </dl>
                </div>

                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <Order />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    or
                  </span>
                  <a
                    onClick={() => navigate("/")}
                    title="Back"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-blue-400 dark:hover:text-blue-600 cursor-pointer"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
