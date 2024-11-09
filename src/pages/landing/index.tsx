import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../api";
import { IProduct } from "../../common/types";
import ProductItem from "./components/ProductItem";
import { RootState } from "../../app/store";
import Spinner from "../../common/components/Spinner/Spinner";

export default function LandingPage() {
  const { getProductsRes, getProductsLoading, getProductsStatus } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts() as any);
  }, [dispatch]);

  console.log(getProductsRes, getProductsLoading, getProductsStatus);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {getProductsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {getProductsRes?.products?.map((product: IProduct) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
