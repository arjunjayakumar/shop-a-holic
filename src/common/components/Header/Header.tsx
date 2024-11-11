import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { useMemo } from "react";
import appLogo from "../../../assets/app-logo.svg";
import Image from "../Image/Image";

export default function Header() {
  const navigate = useNavigate(),
    { cartItems } = useSelector((state: RootState) => state.common),
    cartItemsCount = useMemo(() => cartItems.length, [cartItems]);
  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800 sticky top-0 z-10">
      <div className="container flex justify-between h-10 mx-auto">
        <a
          rel="noopener noreferrer"
          onClick={() => navigate("/")}
          aria-label="Back to homepage"
          className="flex items-center p-2 cursor-pointer"
          title="Back to homepage"
        >
          <Image src={appLogo} alt="logo" width={100} height={100} />
        </a>

        <div className="items-center flex-shrink-0 lg:flex">
          <button
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            onClick={() => navigate("/cart")}
            title="Cart"
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-sm font-semibold text-white dark:bg-violet-300 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
