import { SavedProduct } from "../../../common/types";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItemQuantity } from "../../common/slice";
import { roundOffNumber } from "../../../utils/calculation";
import Image from "../../../common/components/Image/Image";

export default function CartItem({ item }: { item: SavedProduct }) {
  const dispatch: AppDispatch = useDispatch(),
    navigate = useNavigate();

  const onRemove = () => dispatch(removeCartItem(item.id));

  const setItemQuantity = (quantity: number) => {
    if (quantity < 1) return;
    if (quantity > item.stock) return;
    dispatch(updateCartItemQuantity({ quantity: quantity, id: item.id }));
  };
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 my-2">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a
          className="shrink-0 md:order-1"
          onClick={() => navigate(`/${item.id}/detail`)}
        >
          <Image
            src={item.thumbnail}
            alt={item.name}
            className="h-20 w-20"
            width={80}
            height={80}
          />
        </a>

        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:hover:bg-gray-100 disabled:dark:border-gray-600 disabled:dark:bg-gray-700 disabled:dark:hover:bg-gray-700"
              disabled={item.quantity <= 1}
              onClick={() => {
                if (item.quantity > 1) {
                  setItemQuantity(item.quantity - 1);
                }
              }}
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              placeholder=""
              value={item.quantity}
              min={1}
              onChange={(e) => {
                setItemQuantity(Number(e.target.value));
              }}
              readOnly
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:hover:bg-gray-100 disabled:dark:border-gray-600 disabled:dark:bg-gray-700 disabled:dark:hover:bg-gray-700"
              onClick={() => {
                setItemQuantity(item.quantity + 1);
              }}
              disabled={item.quantity >= item.stock}
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${roundOffNumber(item.price * item.quantity)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            className="text-base font-medium text-gray-900 hover:underline dark:text-white cursor-pointer"
            onClick={() => navigate(`/${item.id}/detail`)}
          >
            {item.name}
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              onClick={onRemove}
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
