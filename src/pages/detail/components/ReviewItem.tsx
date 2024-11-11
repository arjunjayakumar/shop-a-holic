import { Review } from "../../../common/types";
import StarRating from "./StarRating";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <div
      key={review.date}
      className="bg-white p-2 w-full border border-gray-200 rounded-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
        <StarRating rating={review.rating} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-ellipsis max-w-full overflow-hidden whitespace-nowrap">
          {review.comment}
        </p>
        <p className="text-sm text-gray-400">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
