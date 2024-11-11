import { useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import { RootState } from "../../app/store";
import { SavedProduct } from "../../common/types";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { roundOffNumber } from "../../utils/calculation";

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

  const calculateOriginalPrice = (
    price: number,
    quantity: number,
    discountPercentage: number
  ): number => {
    const totalDiscountedPrice = price * quantity;
    const originalPrice = totalDiscountedPrice / (1 - discountPercentage / 100);
    return roundOffNumber(originalPrice);
  };

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
    <section className="bg-white py-8 antialiased  md:py-16 h-[calc(100svh-4.5rem)] dark:bg-slate-300">
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
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

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

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${Math.round(totalPrice)}
                  </dd>
                </dl>
              </div>

              <a
                href="#"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
              >
                Order Now
              </a>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <a
                  onClick={() => navigate("/")}
                  title="Back"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-blue-400 dark:hover:text-blue-600"
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
        </div>
      </div>
    </section>
  );
}
