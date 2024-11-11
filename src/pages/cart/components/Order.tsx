import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../../common/slice";

export default function Order() {
  const [name, setName] = useState(""),
    [submitted, setSubmitted] = useState(false),
    dispatch: AppDispatch = useDispatch(),
    navigate = useNavigate();

  useEffect(() => {
    return () => {
      setName("");
      setSubmitted(false);
    };
  }, []);

  const handleOrder = () => {
    setSubmitted(true);
    if (name.length === 0) return;
    alert(`Thank you ${name} for your order!`);
    toast.success("Order placed successfully!");
    dispatch(clearCartItems());
    navigate("/");
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleOrder();
      }}
    >
      <section>
        <label
          htmlFor="default-input"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          User Name
        </label>
        <input
          type="text"
          id="default-input"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            submitted && name.length === 0
              ? "border-red-500 dark:border-red-500 dark:focus:border-red-500"
              : ""
          }`}
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value.trimStart())}
        />
        {submitted && name.length === 0 && (
          <p className="text-red-500 text-xs">Please enter your name</p>
        )}
      </section>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleOrder();
        }}
        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
      >
        Order Now
      </button>
    </form>
  );
}
