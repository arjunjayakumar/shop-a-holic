import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../common/types";
import Image from "../../../common/components/Image/Image";

export default function ProductItem({ product }: { product: IProduct }) {
  const navigate = useNavigate();

  return (
    <div
      key={product.id}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/${product.id}/detail`)}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.rating} stars</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
}
