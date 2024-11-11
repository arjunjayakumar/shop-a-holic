import { Fragment } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../common/types";
import ProductItem from "./components/ProductItem";
import { RootState } from "../../app/store";
import Spinner from "../../common/components/Spinner/Spinner";

export default function LandingPage() {
  const { productList, getProductsLoading } = useSelector(
    (state: RootState) => state.product
  );

  return (
    <div className="bg-white h-[calc(100svh-4.5rem)]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-pretty text-center text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Welcome to Shop-A-holic
        </h1>
        {getProductsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Wide variety of products...
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productList?.map((product: IProduct) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
