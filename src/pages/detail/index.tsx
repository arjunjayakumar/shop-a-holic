import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { IProduct, SavedProduct } from "../../common/types";
import StarRating from "./components/StarRating";
import { toast } from "react-toastify";
import Image from "../../common/components/Image/Image";
import { addCartItem } from "../../common/utils/slice";

export default function DetailPage() {
  const { productList } = useSelector((state: RootState) => state.product),
    { cartItems } = useSelector((state: RootState) => state.common),
    params = useParams(),
    dispatch: AppDispatch = useDispatch(),
    [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    if (Number(params.productID) >= 0 && productList?.length > 0) {
      const product = productList?.find(
        (product: IProduct) => product.id === Number(params.productID)
      );
      setProduct(product);
    }
  }, [params.productID, productList]);

  const cartItemQuantity = useMemo(
    () =>
      cartItems.find((item: SavedProduct) => item.id === product?.id)
        ?.quantity ?? 0,
    [cartItems, product]
  );

  const addProduct = () => {
    if (!product) return;
    if (cartItemQuantity === product.stock) {
      toast.error("This product is out of stock!");
      return;
    }

    const newItem: SavedProduct = {
      quantity: 1,
      id: product.id,
      name: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
    };

    dispatch(addCartItem(newItem));
    toast.success("Product added to cart!");
  };
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white h-[calc(100svh-4.5rem)]">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            src={product?.images[0] || ""}
            alt={product?.title || ""}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.brand}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <StarRating rating={product?.rating ?? 0} />
                <span className="text-gray-600 ml-3">
                  {product?.reviews?.length} Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{product?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center gap-4">
                {product?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="capitalize inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex ml-6 items-center">
                Discount : {product?.discountPercentage}%
              </div>

              {cartItemQuantity === product?.stock && (
                <div className="flex ml-6 items-center text-red-500">
                  <span className="mr-3">Product Out of Stock</span>
                </div>
              )}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product?.price}
              </span>
              <button
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                onClick={addProduct}
                disabled={!product}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
